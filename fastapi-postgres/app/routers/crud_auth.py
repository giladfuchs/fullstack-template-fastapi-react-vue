from typing import List, Type

from fastapi import APIRouter, Depends

from common.db_model import DBModel
from common.serializers import FilterQuery, Pagination
from service.auth import jwt_required, user_filtered_query


def generate_crud_auth_routes(model: Type[DBModel], prefix: str):
    router = APIRouter(prefix=prefix, tags=[prefix.strip("/")])
    response_payload = getattr(model, "full_payload", model.payload)

    @router.post("", response_model=List[response_payload])
    async def fetch_rows(
        pagination: Pagination = Depends(),
        filter_query: FilterQuery = user_filtered_query(),
    ):
        rows = await model.fetch_rows(
            filter_query=filter_query, limit=pagination.limit, offset=pagination.offset
        )
        return [response_payload.model_validate(obj) for obj in rows]

    @router.delete("")
    async def delete_rows(
        filter_query: FilterQuery = user_filtered_query(),
    ):
        await model.delete_rows(filter_query=filter_query)
        return True

    @router.post("/{add_or_id}")
    async def add_or_update(
        add_or_id: str,
        body: model.payload,
        user_auth=Depends(jwt_required),
    ):
        await model.add_or_find_update(
            add_or_id=add_or_id, body=body, user_auth=user_auth
        )
        return True

    return router
