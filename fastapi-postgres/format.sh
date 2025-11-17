#!/bin/bash
#it's not in the requirement file maybe you need to install it
# Format Python code with black and sort imports with isort
echo "Running isort..."
isort .

echo "Running black..."
black .
