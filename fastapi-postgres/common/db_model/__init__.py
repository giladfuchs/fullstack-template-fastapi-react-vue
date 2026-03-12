from contextlib import asynccontextmanager
from typing import Any, Type

from pydantic import BaseModel
from sqlmodel import and_, update
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlmodel.ext.asyncio.session import AsyncSession

from common.config import conf
from common.db_model.query_db import QueryDB
from common.enums import DBOperator, ModelType
from common.serializers import BaseTable, DBQuery, FilterQuery, RowLike
from common.utils import BaseUtils


class DBModel(BaseUtils, QueryDB):
    table: Type[BaseTable] | None = None
    payload: Type[BaseModel] | None = None
    model_type: ModelType | None = None

    engine = create_async_engine(
        conf.POSTGRES_DATABASE_URL,
        echo=False,
        pool_pre_ping=True,
        pool_recycle=1800,
        pool_size=20,
        max_overflow=5,
        connect_args={
            "prepare_threshold": None,
            "connect_timeout": 10,
        },
    )
    async_session = async_sessionmaker(
        bind=engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
    )

    @classmethod
    @asynccontextmanager
    async def get_session(cls):
        session = cls.async_session()
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

    @classmethod
    def _raise_db_error(cls, ex, row=None):
        dump = (
            row
            if isinstance(row, dict)
            else (row.model_dump() if hasattr(row, "model_dump") else None)
        )
        if dump:
            cls.logger.error(f"{dump}: {ex}")
        else:
            cls.logger.error(str(ex))
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
        cls.error_400(details=ex)

    @classmethod
    async def add_update(cls, row: BaseTable | list[BaseTable]):
        async with cls.get_session() as session:
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
                cls._raise_db_error(ex, row)

    @classmethod
    async def update_exist_bulk(cls, filter_query: FilterQuery, values: dict) -> int:
        statement = update(cls.table).values(**values)

        conditions = cls.generate_where_query(filter_query.query)

        if conditions:
            statement = statement.where(and_(*conditions))

        try:
            async with cls.get_session() as session:
                results = await session.exec(statement)
                return results.rowcount
        except Exception as ex:
            cls._raise_db_error(ex, values)

    @classmethod
    async def add_or_find_update_single(
        cls,
        add_or_id: str | int,
        body: BaseModel,
        **kwargs: Any,
    ) -> BaseTable:
        user_auth = kwargs.get("user_auth")

        if add_or_id != "add":
            _id = int(add_or_id)
            query = [DBQuery(key=cls.table.id.key, opt=DBOperator.eq, value=_id)]

            if user_auth:
                query.append(
                    DBQuery(
                        key=conf.AUTH_PARENT_FIELD,
                        opt=DBOperator.eq,
                        value=user_auth.id,
                    )
                )

            body_dict = body.model_dump()
            values = {
                key: value for key, value in body_dict.items() if key not in {"id"}
            }

            updated = await cls.update_exist_bulk(
                filter_query=FilterQuery(query=query),
                values=values,
            )

            if not updated:
                cls.error_400(details="not found")

            body_dict["id"] = _id
            new_obj = cls.table(**body_dict)

        else:
            db_obj = cls.table(**body.model_dump())
            if user_auth and hasattr(db_obj, conf.AUTH_PARENT_FIELD):
                setattr(db_obj, conf.AUTH_PARENT_FIELD, user_auth.id)

            new_obj = await cls.add_update(row=db_obj)

        return new_obj

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
            async with cls.get_session() as session:
                results = await session.exec(statement)
                res = (
                    [
                        _.model_dump(include_relations=filter_query.relation_model)
                        for _ in results
                    ]
                    if as_dict
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
            async with cls.get_session() as session:
                filter_query.columns = [cls.table.id]
                select_stmt = cls.build_query(filter_query, offset, limit=0)
                results = (await session.exec(select_stmt)).all()
                if not results:
                    cls.error_400(details="not delete nothing")

                for obj in results:
                    await session.delete(obj)
                return results

        except Exception as ex:
            cls._raise_db_error(ex)

    @classmethod
    async def get_by_id(cls, _id: str | int, **kwargs):
        filter_query = FilterQuery(
            query=[DBQuery(key=cls.table.id.key, opt=DBOperator.eq, value=int(_id))],
            relation_model=kwargs.get("relation_model", False),
        )
        return await cls.fetch_rows(filter_query=filter_query, limit=1)
