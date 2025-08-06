from typing import List

from fastapi import APIRouter

from common.db_model.models import TeacherModel

router = APIRouter(prefix="/teacher", tags=["teacher"])

router.add_api_route(
    "",
    TeacherModel.fetch_rows_callable(),
    methods=["POST"],
    summary="Filter",
    response_model=List[TeacherModel.payload],
)
router.add_api_route(
    "/{add_or_id}",
    TeacherModel.add_or_find_update_callable(),
    methods=["POST"],
    summary="add_or_edit",
)
