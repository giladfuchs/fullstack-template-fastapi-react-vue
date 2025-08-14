#!/bin/bash
echo Starting server
gunicorn main:app -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:80 --workers 1
