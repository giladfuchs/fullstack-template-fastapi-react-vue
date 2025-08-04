import os

try:
    from dotenv import load_dotenv

    load_dotenv()
except:
    pass
IS_LOCAL = os.getenv("USER") == "giladfuchs"

DATABASE_URL = "postgresql+asyncpg://admin:admin@0.0.0.0:5434/postgres" if IS_LOCAL else os.environ.get("DATABASE_URL")


class Settings:
    SERVER_NAME: str = "FULL STACK TEMPLATE"
    JWT_ALGORITHM: str = "HS256"
    JWT_SECRET: str = "JWT_ALGORITHM-SECRET"
    JWT_EXP: int = 3600
    POSTGRES_DATABASE_URL: str = DATABASE_URL



conf = Settings()
