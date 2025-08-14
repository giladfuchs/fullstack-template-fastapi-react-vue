import os

try:
    from dotenv import load_dotenv

    load_dotenv()
except:
    pass
IS_LOCAL = os.getenv("USER", "1") == os.environ.get("USER_LOCAL")


DATABASE_URL_LOCAL = "postgresql+asyncpg://admin:admin@0.0.0.0:5434/postgres"
DATABASE_URL_PROD = os.environ.get("DATABASE_URL")


DATABASE_URL = DATABASE_URL_LOCAL if IS_LOCAL else DATABASE_URL_PROD

#     flyctl proxy 5432 -a full-stack-db
if IS_LOCAL:
    DATABASE_URL = DATABASE_URL

    # DATABASE_URL = DATABASE_URL_PROD


class Settings:
    SERVER_NAME: str = "FULL STACK TEMPLATE"
    JWT_ALGORITHM: str = "HS256"
    JWT_SECRET: str = "JWT_ALGORITHM-SECRET"
    JWT_EXP: int = 3600
    POSTGRES_DATABASE_URL: str = DATABASE_URL


conf = Settings()
