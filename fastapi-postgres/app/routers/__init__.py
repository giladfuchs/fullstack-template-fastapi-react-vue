from fastapi import APIRouter

from app.routers import auth
from app.routers.crud import generate_crud_routes
from common.db_model.models import AssignmentModel, StudentModel, TeacherModel

router = APIRouter()

router.include_router(
    generate_crud_routes(
        TeacherModel,
        TeacherModel.model_type,
        require_token=False,
        allowed_methods=["read", "add"],
    )
)
router.include_router(
    generate_crud_routes(StudentModel, StudentModel.model_type, require_token=True)
)
router.include_router(
    generate_crud_routes(
        AssignmentModel, AssignmentModel.model_type, require_token=True
    )
)

router.include_router(auth.router)
