#!/bin/bash
echo Starting server
gunicorn main:app --worker-class uvicorn.workers.UvicornWorker --workers 2 --bind 0.0.0.0:80 --timeout 60 --graceful-timeout 30 --keep-alive 5

