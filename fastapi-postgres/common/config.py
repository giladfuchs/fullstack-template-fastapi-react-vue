import os

from pydantic_settings import BaseSettings

# load .env locally if present (won't affect server)
try:
    from dotenv import load_dotenv  # type: ignore

    load_dotenv()
except ImportError:
    pass

IS_LOCAL = os.getenv("USER", "1") == os.environ.get("USER_LOCAL")

DATABASE_URL_LOCAL = "postgresql+psycopg://admin:admin@0.0.0.0:5434/postgres"
DATABASE_URL_PROD = os.environ.get("DATABASE_URL")

DATABASE_URL = DATABASE_URL_LOCAL if IS_LOCAL else DATABASE_URL_PROD

if IS_LOCAL:
    # DATABASE_URL = DATABASE_URL_PROD
    print(DATABASE_URL)


class Settings(BaseSettings):
    SERVER_NAME: str = "FULL STACK TEMPLATE"
    JWT_ALGORITHM: str = "HS256"
    JWT_SECRET: str = "JWT_ALGORITHM-SECRET"
    JWT_EXP: int = 3600
    POSTGRES_DATABASE_URL: str = DATABASE_URL

    # multi-tenant field owner
    # (e.g. teacher_id as the owner of students and their tasks)
    AUTH_PARENT_FIELD: str = "teacher_id"


conf = Settings()
