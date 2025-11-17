from typing import Any, Type

from pydantic import BaseModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import selectinload
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from common.config import conf
from common.enums import DBOperator, ModelType
from common.serializers import BaseTable, DBQuery, FilterQuery, RowLike
from common.utils import BaseUtils

opts = {
    DBOperator.eq: "__eq__",
    DBOperator.ne: "__ne__",
    DBOperator.lt: "__lt__",
    DBOperator.le: "__le__",
    DBOperator.gt: "__gt__",
    DBOperator.ge: "__ge__",
    DBOperator.like: "like",
    DBOperator.ilike: "ilike",  # PostgreSQL only
    DBOperator.in_: "in_",
    DBOperator.not_in: "notin_",
    DBOperator.is_null: "is_",
}


class DBModel(BaseUtils):
    table: Type[BaseTable] | None = None
    payload: Type[BaseModel] | None = None
    model_type: ModelType | None = None

    engine = create_async_engine(
        conf.POSTGRES_DATABASE_URL,
        echo=False,
    )

    @classmethod
    async def add_update(cls, row: BaseTable | list[BaseTable]):
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
                    return merged_rows
                else:
                    async with session.begin():
                        session.add(row)
                    await session.refresh(row)
                    return row
            except Exception as ex:
                await session.rollback()
                dump = "" if isinstance(row, list) else row.model_dump()
                cls.logger.error(f"{dump}: {ex}")
                if isinstance(ex, IntegrityError):
                    orig = str(getattr(ex, "orig", ""))
                    if "duplicate key value" in orig:
                        field = "unique"
                        if "Key (" in orig:
                            try:
                                field = orig.split("Key (")[1].split(")=")[0]
                            except Exception:
                                pass
                        cls.error_400(details=f"unique:{field}")
                else:
                    cls.error_400(details=ex)

    @classmethod
    async def add_or_find_update_single(
        cls,
        add_or_id: str | int,
        body: BaseModel | dict[str, Any],
        **kwargs: Any,
    ) -> "cls.table":
        user_auth = kwargs.get("user_auth")

        if add_or_id != "add":
            db_obj = await cls.get_by_id(_id=add_or_id, **kwargs)

            if db_obj and (
                not user_auth or user_auth.id == getattr(db_obj, conf.AUTH_PARENT_FIELD)
            ):
                cls.set_elements_by_dict(db_obj, body, exclude_items=["id"])
            else:
                cls.error_400(details="not found")

        else:
            db_obj = cls.table()
            cls.set_elements_by_dict(db_obj, body)

            if user_auth and hasattr(db_obj, conf.AUTH_PARENT_FIELD):
                setattr(db_obj, conf.AUTH_PARENT_FIELD, user_auth.id)

        new_obj = await cls.add_update(row=db_obj)
        return new_obj

    # Generate SQLAlchemy filter conditions with AND logic from a list of DBQuery objects
    @classmethod
    def generate_where_query(cls, query: list[DBQuery]):
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
        as_dict: bool = False,
    ) -> RowLike | list[RowLike]:
        statement = cls.build_query(filter_query, offset, limit)

        try:
            async with AsyncSession(cls.engine) as session:
                results = await session.exec(statement)
                res = (
                    [
                        _.model_dump(include_relations=filter_query.relation_model)
                        for _ in results
                    ]
                    if as_dict or filter_query.relation_model
                    else list(results)
                )
        except Exception as ex:
            cls.error_400(details=ex)

        if not res:
            cls.error_400(details="not found")
        if limit == 1:
            return res[0]
        return res

    @classmethod
    async def delete_rows(
        cls, filter_query: FilterQuery = FilterQuery(), offset: int = 0
    ):
        try:
            async with AsyncSession(cls.engine) as session:
                select_stmt = cls.build_query(filter_query, offset, limit=0)
                results = (await session.exec(select_stmt)).all()
                if not results:
                    cls.error_400(details="not delete nothing")
                for obj in results:
                    await session.delete(obj)
                await session.commit()
        except Exception as ex:
            cls.error_400(details=ex)

    @classmethod
    async def get_by_id(cls, _id: str | int, **kwargs):
        filter_query = FilterQuery(
            query=[DBQuery(key=cls.table.id.key, opt=DBOperator.eq, value=int(_id))],
            relation_model=kwargs.get("relation_model", False),
        )
        return await cls.fetch_rows(filter_query=filter_query, limit=1)
