import uvicorn

from app import create_app


def run_app():
    app_debug = create_app(docs=True)

    port = 5001

    uvicorn.run(app_debug, host="0.0.0.0", port=port)


if __name__ == "__main__":
    run_app()
