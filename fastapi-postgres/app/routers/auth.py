from fastapi import APIRouter

from app.service.auth import Auth
from app.service.create_data import create_fake_data
from common.db_model.models import TeacherModel
from common.serializers import Token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(form_data: TeacherModel.payload):
    return await Auth.authenticate_user(_id=form_data.id, phone=form_data.phone)


@router.get("/create_fake_data")
async def create_fake_data_route():
    await create_fake_data()
    return {
        "status": "ok",
        "message": "Fake data inserted successfully!",
    }
