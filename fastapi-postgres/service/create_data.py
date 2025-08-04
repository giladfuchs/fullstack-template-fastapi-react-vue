import asyncio
from random import choice, randint

from faker import Faker
from sqlalchemy.ext.asyncio import create_async_engine
from sqlmodel import SQLModel
from sqlmodel.ext.asyncio.session import AsyncSession

from common.config import conf
from common.db_model import DBModel
from common.db_model.models import AssignmentModel, StudentModel, TeacherModel
from common.enums import Grade

conf.POSTGRES_DATABASE_URL = "postgresql+asyncpg://admin:admin@0.0.0.0:5434/postgres"

fake = Faker()


async def create_fake_data():
    engine = create_async_engine(conf.POSTGRES_DATABASE_URL, echo=False)
    DBModel.engine = engine

    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)

    teachers = []
    students = []
    assignments = []

    for _ in range(5):
        teacher = TeacherModel.table(phone=randint(10**9, 10**10))
        await TeacherModel.add_or_find_update("add", teacher)
        teachers.append(teacher)

    for _ in range(25):
        teacher = choice(teachers)
        student = StudentModel.table(
            name=fake.name(),
            grade=choice(Grade.values()),
            phone=randint(10**9, 10**10),
            teacher_id=teacher.id,
        )
        await StudentModel.add_or_find_update("add", student)
        students.append(student)

    for _ in range(150):
        student = choice(students)
        assignment = AssignmentModel.table(
            title=fake.sentence(nb_words=3),
            detail=fake.text(),
            student_id=student.id,
            teacher_id=student.teacher_id,
        )
        await AssignmentModel.add_or_find_update("add", assignment)
        assignments.append(assignment)

    print("Fake data inserted successfully!")


if __name__ == "__main__":
    asyncio.run(create_fake_data())
