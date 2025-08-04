from typing import Any, Dict, List, Union

from pydantic import BaseModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import selectinload
from sqlmodel import Session, select
from sqlmodel.ext.asyncio.session import AsyncSession

from common.config import conf
from common.serializers import BaseTable, DBQuery, FilterQuery
from common.utils.errors import ErrorService
from common.utils.log import logger
from common.utils.parse_obj import set_elements_by_dict

opts = {
    "eq": "__eq__",
    "ne": "__ne__",
    "lt": "__lt__",
    "le": "__le__",
    "gt": "__gt__",
    "ge": "__ge__",
    "like": "like",
    "ilike": "ilike",  # PostgreSQL only
    "in": "in_",
    "not_in": "notin_",
    "is_null": "is_",
}


class DBModel:
    table = None
    engine = create_async_engine(
        conf.POSTGRES_DATABASE_URL,
        echo=False,
    )

    @classmethod
    async def add_update(cls, row: Union[BaseTable, List[BaseTable]], **kwargs):
        async with AsyncSession(cls.engine) as session:
            try:
                if isinstance(row, list):
                    merged_rows = []
                    async with session.begin():
                        for obj in row:
                            merged = await session.merge(obj)
                            merged_rows.append(merged)
                    for obj in merged_rows:
                        await session.refresh(obj)
                else:
                    async with session.begin():
                        session.add(row)
                    await session.refresh(row)

            except Exception as ex:
                await session.rollback()
                logger.error(f"{row!s}: {ex}")
                if isinstance(ex, IntegrityError):
                    orig = str(getattr(ex, "orig", ""))
                    if "UniqueViolationError" in orig:
                        field = "unique"
                        if "Key (" in orig:
                            try:
                                field = orig.split("Key (")[1].split(")=")[0]
                            except Exception:
                                pass
                        ErrorService.error_400(details=f"unique:{field}")
                else:
                    ErrorService.error_400(details=ex)

    @classmethod
    async def add_or_find_update(
        cls,
        add_or_id: Union[str, int],
        body: Union[
            BaseTable, BaseModel, Dict, List[Union[BaseTable, BaseModel, Dict]]
        ],
        **kwargs: Any,
    ) -> BaseTable:
        db_obj: BaseTable = body
        user_auth = kwargs.get("user_auth")

        if add_or_id != "add" and not isinstance(body, list):
            db_obj = await cls.get_by_id(_id=add_or_id, **kwargs)
            if db_obj and (not user_auth or user_auth.id == db_obj.teacher_id):
                set_elements_by_dict(db_obj, body, exclude_items=["id"], **kwargs)
            else:
                ErrorService.error_400(details="not found")

        elif (
            add_or_id == "add"
            and isinstance(body, BaseModel)
            and not isinstance(body, BaseTable)
        ):
            db_obj = cls.table()
            set_elements_by_dict(db_obj, body, **kwargs)

            if user_auth:
                setattr(db_obj, "teacher_id", user_auth.id)

        await cls.add_update(row=db_obj, **kwargs)
        return db_obj

    # Generate SQLAlchemy filter conditions with AND logic from a list of DBQuery objects
    @classmethod
    def generate_where_query(cls, query: List[DBQuery]):
        # Build a tuple of SQLAlchemy expressions by applying the operator (e.g., ==, >=) on each field
        ans = tuple(
            getattr(getattr(cls.table, q.key), opts.get(q.opt, q.opt))(q.value)
            for q in query
            if hasattr(cls.table, q.key)
            and hasattr(getattr(cls.table, q.key), opts.get(q.opt, q.opt))
        )
        return ans

    @classmethod
    def build_query(cls, filter_query: FilterQuery, offset: int = 0, limit: int = 1000):
        statement = select(cls.table)

        if filter_query.query:
            statement = statement.where(*cls.generate_where_query(filter_query.query))

        if filter_query.relation_model:
            statement = statement.options(selectinload("*"))

        if filter_query.sort:
            try:
                field, direction = filter_query.sort.split(":")
                col = getattr(cls.table, field, None)
                if col:
                    direction = direction.lower()
                    statement = statement.order_by(
                        col.asc() if direction == "asc" else col.desc()
                    )
            except Exception:
                raise ValueError(
                    f"Invalid sort format: '{filter_query.sort}'. Expected 'field:asc' or 'field:desc'"
                )

        if offset:
            statement = statement.offset(offset)

        if limit:
            statement = statement.limit(limit)

        return statement

    @classmethod
    async def fetch_rows(
        cls,
        filter_query: FilterQuery = FilterQuery(),
        offset: int = 0,
        limit: int = 1000,
        to_dict: bool = False,
        **kwargs,
    ) -> Union["cls.table", List["cls.table"], dict, List[dict]]:
        statement = cls.build_query(filter_query, offset, limit)

        try:
            async with AsyncSession(cls.engine) as session:
                results = await session.exec(statement)
                res = (
                    [
                        _.dict(include_relations=filter_query.relation_model)
                        for _ in results
                    ]
                    if to_dict or filter_query.relation_model
                    else list(results)
                )
        except Exception as ex:
            ErrorService.error_400(details=ex)

        if not res:
            ErrorService.error_400(details="not found")
        if limit == 1:
            return res[0]
        return res

    @classmethod
    async def delete_rows(
        cls, filter_query: FilterQuery = FilterQuery(), offset: int = 0, **kwargs
    ):
        try:
            async with AsyncSession(cls.engine) as session:
                select_stmt = cls.build_query(filter_query, offset, limit=0)
                results = (await session.exec(select_stmt)).all()
                for obj in results:
                    await session.delete(obj)
                await session.commit()
        except Exception as ex:
            ErrorService.error_400(details=ex)

    @classmethod
    async def get_by_id(cls, _id: Union[int, str], **kwargs):
        filter_query = FilterQuery(
            query=[DBQuery(key=cls.table.id.key, opt="eq", value=int(_id))],
            relation_model=kwargs.get("relation_model", False),
        )
        return await cls.fetch_rows(filter_query=filter_query, limit=1, **kwargs)
