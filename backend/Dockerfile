# Image
FROM python:3.8-slim-buster

# Work directory
WORKDIR /backend

# Environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV FLASK_RUN_PORT=5003
ENV FLASK_RUN_CERT=adhoc

# Requirements & Installations
RUN apt-get update
RUN apt-get install python3-dev default-libmysqlclient-dev gcc  -y
RUN pip install --upgrade pip
COPY requirements.txt ./
RUN pip install -r requirements.txt

# Copy source code
COPY . .

# Run
#CMD ["flask", "run"]
CMD ["gunicorn", "--bind", "0.0.0.0:5003", "app:app"]

# Expose port
EXPOSE 5003