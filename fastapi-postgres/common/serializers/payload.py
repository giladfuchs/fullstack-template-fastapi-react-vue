from typing import List

from pydantic import BaseModel, Field

from common.enums import Grade


class AssignmentPayload(BaseModel):
    id: int | None = Field(default=None)
    title: str
    detail: str
    student_id: int


class StudentPayload(BaseModel):
    name: str
    grade: Grade
    phone: float


class FullStudentPayload(StudentPayload):
    assignments: List[AssignmentPayload] = []
    id: int


class TeacherPayload(BaseModel):
    id: int
    phone: float
