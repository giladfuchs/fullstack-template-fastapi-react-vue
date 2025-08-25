#!/bin/bash
echo Starting server
gunicorn main:app --worker-class uvicorn.workers.UvicornWorker --workers 1 --bind 0.0.0.0:80

