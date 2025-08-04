from fastapi import APIRouter

from common.db_model.models import TeacherModel
from common.serializers import Token
from service.auth import auth_service

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(form_data: TeacherModel.table):
    return await auth_service.authenticate_user(
        _id=int(form_data.id), phone=int(form_data.phone)
    )
