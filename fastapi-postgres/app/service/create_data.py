from random import choice, randint

from faker import Faker
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel

from common.config import conf
from common.db_model.models import AssignmentModel, StudentModel, TeacherModel
from common.enums import Grade

fake = Faker()


class FactoryModel:
    @classmethod
    def teacher(cls) -> dict:
        return {
            "id": randint(10, 900),
            "phone": float(randint(10_000_000, 9_999_999_999)),
        }

    @classmethod
    def student(cls, teacher_id: int | None = None) -> dict:
        data = {
            "name": fake.name(),
            "grade": choice(Grade.values()),
            "phone": float(randint(10**9, 10**10)),
        }
        if teacher_id is not None:
            data["teacher_id"] = teacher_id
        return data

    @classmethod
    def assignment(cls, student_id: int, teacher_id: int | None = None) -> dict:
        data = {
            "title": fake.sentence(nb_words=3),
            "detail": fake.text(),
            "student_id": student_id,
        }
        if teacher_id is not None:
            data["teacher_id"] = teacher_id
        return data


async def reset_postgres_schema():
    engine = create_async_engine(
        conf.POSTGRES_DATABASE_URL,
        echo=False,
        pool_pre_ping=True,
    )
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)


async def create_fake_data():
    await reset_postgres_schema()

    teachers_rows = [TeacherModel.table(**FactoryModel.teacher()) for _ in range(5)]
    teachers = await TeacherModel.add_update(teachers_rows)

    students_rows = []
    for _ in range(25):
        teacher = choice(teachers)
        students_rows.append(
            StudentModel.table(**FactoryModel.student(teacher_id=teacher.id))
        )
    students = await StudentModel.add_update(students_rows)

    assignments_rows = []
    for _ in range(150):
        student = choice(students)
        assignments_rows.append(
            AssignmentModel.table(
                **FactoryModel.assignment(
                    student_id=student.id, teacher_id=student.teacher_id
                )
            )
        )
    await AssignmentModel.add_update(assignments_rows)

    print("Fake data inserted successfully!")


if __name__ == "__main__":
    import asyncio

    asyncio.run(create_fake_data())
