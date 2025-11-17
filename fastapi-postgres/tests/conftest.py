import pytest
from asgi_lifespan import LifespanManager
from httpx import ASGITransport, AsyncClient

from main import app


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"


@pytest.fixture(scope="session", autouse=True)
async def seed_data():
    transport = ASGITransport(app=app)
    async with LifespanManager(app):
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            r = await ac.get("/auth/create_fake_data")
            assert r.status_code == 200, r.text


@pytest.fixture(scope="function")
async def client() -> AsyncClient:
    transport = ASGITransport(app=app)
    async with LifespanManager(app):
        async with AsyncClient(transport=transport, base_url="http://test") as ac:
            yield ac
