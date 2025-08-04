import os

try:
    from dotenv import load_dotenv

    load_dotenv()
except:
    pass
IS_LOCAL = os.getenv("USER") == "giladfuchs"


class Settings:
    SERVER_NAME: str = "FULL STACK TEMPLATE"
    JWT_ALGORITHM: str = "HS256"
    JWT_SECRET: str = "JWT_ALGORITHM-SECRET"
    JWT_EXP: int = 3600
    POSTGRES_DATABASE_URL = (
        "postgresql+asyncpg://admin:admin@0.0.0.0:5434/postgres"
        if IS_LOCAL
        else "postgresql+asyncpg://admin:admin@db:5434/postgres"
    )

    # POSTGRES_DATABASE_URL = "postgresql://admin:admin@0.0.0.0:5434/postgres"


conf = Settings()
