from typing import Type

from fastapi import APIRouter, Body, Depends, HTTPException

from app.service.auth import Auth
from common.db_model import DBModel
from common.serializers import FilterQuery, Pagination


def generate_crud_routes(
    model: Type[DBModel],
    prefix: str,
    require_token: bool = True,
    allowed_methods: list[str] = ["read", "add", "edit", "delete"],
):
    router = APIRouter(prefix=f"/{prefix}", tags=[prefix])

    def _plain_filter(
        filter_query: FilterQuery = Body(default=FilterQuery()),
    ) -> FilterQuery:
        return filter_query

    filter_dep = Auth.user_filtered_query() if require_token else Depends(_plain_filter)
    jwt_dep = Depends(Auth.jwt_required) if require_token else Depends(lambda: None)

    response_payload = (
        model.payload | model.full_payload
        if hasattr(model, "full_payload")
        else model.payload
    )

    if "read" in allowed_methods:

        @router.post("", response_model=list[response_payload] | response_payload)
        async def fetch_rows(
            pagination: Pagination = Depends(),
            filter_query: FilterQuery = filter_dep,
        ):
            rows = await model.fetch_rows(
                filter_query=filter_query,
                limit=pagination.limit,
                offset=pagination.offset,
            )
            return rows

    if "delete" in allowed_methods:

        @router.delete("")
        async def delete_rows(
            filter_query: FilterQuery = filter_dep,
        ):
            await model.delete_rows(filter_query=filter_query)
            return True

    if "add" in allowed_methods or "edit" in allowed_methods:

        @router.post("/{add_or_id}", response_model=model.payload)
        async def add_or_update(
            add_or_id: str,
            body: model.payload,
            user_auth=jwt_dep,
        ):

            if add_or_id == "add" and "add" not in allowed_methods:
                raise HTTPException(status_code=403, detail="Add not allowed")
            if add_or_id != "add" and "edit" not in allowed_methods:
                raise HTTPException(status_code=403, detail="Edit not allowed")

            return await model.add_or_find_update_single(
                add_or_id=add_or_id, body=body, user_auth=user_auth
            )

    return router
