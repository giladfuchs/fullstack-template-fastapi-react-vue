from fastapi import APIRouter

from common.db_model.models import TeacherModel
from common.serializers import Token
from service.auth import auth_service
from service.create_data import create_fake_data

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(form_data: TeacherModel.payload):
    return await auth_service.authenticate_user(_id=form_data.id, phone=form_data.phone)


@router.get("/create_fake_data")
async def create_fake_data():
    return await create_fake_data()
