#!/bin/bash

# Development tools (not in requirements.txt):
# pip install ruff isort black

# Format Python code with black and sort imports with isort
echo "Running isort..."
isort .

echo "Running black..."
black .

echo "Running ruff (lint)..."
ruff check .   --fix