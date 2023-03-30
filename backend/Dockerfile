FROM python:3.11-alpine

# Create app directory
WORKDIR /backend

# Environment variables
ENV FLASK_APP=core.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV FLASK_RUN_PORT=5004
ENV POETRY_VERSION=1.4.0

# System deps:
RUN pip install --no-cache-dir "poetry==$POETRY_VERSION"

# Copy only requirements to cache them in docker layer
COPY poetry.lock pyproject.toml ./

# Project initialization:
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev

# Copy project
COPY . .

# Expose port
EXPOSE 5004

# Run app
CMD ["gunicorn", "--bind", "0.0.0.0:5004", "wsgi:app"]