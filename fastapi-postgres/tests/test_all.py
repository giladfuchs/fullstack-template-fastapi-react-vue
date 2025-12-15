import json

import pytest
from httpx import AsyncClient

from app.service.create_data import FactoryModel
from common.enums import DBOperator, ModelType


class TestApi:
    __test__ = False

    def __init__(self, client: AsyncClient, headers: dict | None = None):
        self.client: AsyncClient = client
        self.headers: dict = headers or {}

    @classmethod
    async def create(cls, client: AsyncClient, auto_login: bool = False):
        self = cls(client)
        if auto_login:
            await self.login_with_first_teacher()
        return self

    async def login_with_first_teacher(self) -> None:
        teachers = await self.fetch_rows(model=ModelType.teacher)
        teacher = teachers[0]
        r = await self.client.post("/auth/login", json=teacher)
        assert r.status_code == 200, f"/auth/login failed: {r.status_code} {r.text}"
        data = r.json()
        assert "token" in data, data
        self.headers = {"Authorization": f"Bearer {data['token']}"}

    async def add_or_update(
        self, *, model: ModelType, add_or_id: str | int, body: dict | None = None
    ) -> dict:
        r = await self.client.post(
            f"/{model}/{add_or_id}", json=body or {}, headers=self.headers
        )
        assert (
            r.status_code == 200
        ), f"{model}/{add_or_id} failed: {r.status_code} {r.text}"
        return r.json()

    async def fetch_rows(self, *, model: ModelType, body: dict | None = None) -> list:
        r = await self.client.post(f"/{model}", json=body or {}, headers=self.headers)
        assert r.status_code == 200, f"{model} failed: {r.status_code} {r.text}"
        data = r.json()
        assert isinstance(data, list), f"{model} should return list, got {type(data)}"
        return data

    async def delete_row(self, *, model: ModelType, _id: int | str) -> None:
        body = {"query": [{"key": "id", "value": _id, "opt": DBOperator.eq}]}
        r = await self.client.request(
            "DELETE", f"/{model}", content=json.dumps(body), headers=self.headers
        )
        assert r.status_code == 200, f"{model} failed: {r.status_code} {r.text}"


@pytest.mark.anyio
async def test_teacher_flow(client: AsyncClient):
    api = await TestApi.create(client)
    await api.add_or_update(
        model=ModelType.teacher, add_or_id="add", body=FactoryModel.teacher()
    )
    await api.fetch_rows(model=ModelType.teacher)


@pytest.mark.anyio
async def test_student_flow(client: AsyncClient):
    api = await TestApi.create(client, auto_login=True)
    student_new = FactoryModel.student()
    await api.add_or_update(model=ModelType.student, add_or_id="add", body=student_new)
    students = await api.fetch_rows(
        model=ModelType.student, body=dict(relation_model=True)
    )
    row = next((r for r in students if r.get("phone") == student_new["phone"]), None)
    assert row is not None
    student_id: int = row["id"]
    await api.add_or_update(
        model=ModelType.student, add_or_id=student_id, body=FactoryModel.student()
    )
    await api.delete_row(model=ModelType.student, _id=student_id)


@pytest.mark.anyio
async def test_assignment_flow(client: AsyncClient):
    api = await TestApi.create(client, auto_login=True)
    students = await api.fetch_rows(
        model=ModelType.student, body=dict(relation_model=True)
    )
    student_id: int = students[0]["id"]
    await api.add_or_update(
        model=ModelType.assignment,
        add_or_id="add",
        body=FactoryModel.assignment(student_id=student_id),
    )
    students = await api.fetch_rows(
        model=ModelType.student, body=dict(relation_model=True)
    )
    student_with_assignments = next((s for s in students if s.get("assignments")), None)
    if student_with_assignments:
        student_id2: int = student_with_assignments["id"]
        assignment_id: int = student_with_assignments["assignments"][0]["id"]
        await api.add_or_update(
            model=ModelType.assignment,
            add_or_id=assignment_id,
            body=FactoryModel.assignment(student_id=student_id2),
        )
        await api.delete_row(model=ModelType.assignment, _id=assignment_id)
    else:
        print("no assignments to check")
