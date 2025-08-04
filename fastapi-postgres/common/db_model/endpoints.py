from typing import Any, List, Union, Callable

from fastapi import Depends, Query
CALLABLE_LIST = Callable[..., List[Any]]
from starlette.responses import JSONResponse

from common.db_model import DBModel
from common.serializers import BaseTable, FilterQuery, Pagination


def get_pagination(
    limit: int = Query(0, ge=0), offset: int = Query(0, ge=0)
) -> Pagination:
    return Pagination(limit=limit, offset=offset)


class DBModelEndpoints(DBModel):

    @classmethod
    def fetch_rows_callable(cls, *args: Any, **kwargs: Any) -> CALLABLE_LIST:
        async def route(
            pagination: Pagination = Depends(get_pagination),
            filter_query: FilterQuery = FilterQuery(),
        ) -> Union[List[cls.table], JSONResponse]:
            res = await cls.fetch_rows(
                filter_query=filter_query,
                limit=pagination.limit,
                offset=pagination.offset,
                **kwargs
            )

            if filter_query.relation_model:
                return JSONResponse(content=res)
            return res

        return route

    @classmethod
    def add_or_find_update_callable(cls, *args: Any, **kwargs: Any) -> CALLABLE_LIST:
        async def route(
            add_or_id: str,
            body: Union[None, cls.table],
        ) -> BaseTable:
            return await cls.add_or_find_update(add_or_id=add_or_id, body=body)

        return route
