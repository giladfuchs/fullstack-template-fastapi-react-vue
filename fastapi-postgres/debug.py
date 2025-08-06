"""
if you want to run it without docker

 POSTGRES_DATABASE_URL = "postgresql://admin:admin@0.0.0.0:5432/postgres"
 docker run --name postgresql -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -p 5434:5432   -d postgres
"""

import uvicorn

from app import create_app

def run_app():
    app_debug = create_app(docs=True)

    port = 5001

    uvicorn.run(app_debug, host="0.0.0.0", port=port)


if __name__ == "__main__":
    run_app()


