from common.db_model import DBModel
from common.enums import ModelType
from common.serializers import payload as _payload
from common.serializers import table_model


class TeacherModel(DBModel):
    model_type = ModelType.teacher
    table = table_model.Teacher
    payload = _payload.TeacherPayload


class StudentModel(DBModel):
    model_type = ModelType.student
    table = table_model.Student
    payload = _payload.StudentPayload
    full_payload = _payload.FullStudentPayload


class AssignmentModel(DBModel):
    model_type = ModelType.assignment
    table = table_model.Assignment
    payload = _payload.AssignmentPayload
