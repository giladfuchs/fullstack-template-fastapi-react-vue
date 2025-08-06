from fastapi import APIRouter, Depends

from app.routers import auth, teacher
from app.routers.crud_auth import generate_crud_auth_routes
from common.db_model.models import AssignmentModel, StudentModel

routes = [auth, teacher]

router = APIRouter()
router.include_router(generate_crud_auth_routes(AssignmentModel, "/assignment"))
router.include_router(generate_crud_auth_routes(StudentModel, "/student"))
for _ in routes:
    router.include_router(_.router)
