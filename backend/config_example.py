###
# Change name of config file to config.py
###

from datetime import timedelta

# Flask
TESTING = True
DEBUG = True
FLASK_ENV = 'development'
SECRET_KEY = ''
JSON_SORT_KEYS = False


# JWT
JWT_SECRET_KEY = ''
JWT_TOKEN_LOCATION = 'cookies'
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)


# Email
MAIL_SERVER = "smtp.gmail.com"
MAIL_PORT = 465
MAIL_USERNAME = ""
MAIL_PASSWORD = ""
MAIL_USE_TLS = False
MAIL_USE_SSL = True


# SQLALCHEMY
SQLALCHEMY_DATABASE_URI = ''
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_POOL_SIZE = 50000
SQLALCHEMY_MAX_OVERFLOW = 50000