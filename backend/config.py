from datetime import timedelta

# Flask
TESTING = True
DEBUG = True
FLASK_ENV = 'development'
SECRET_KEY = 'gsdD#T%FDS#'
JSON_SORT_KEYS = False


# JWT
JWT_SECRET_KEY = 'fgdR@#TRH#^4E'
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=10)


# Email
MAIL_SERVER = "smtp.gmail.com"
MAIL_PORT = 465
MAIL_USERNAME = "kamyrdol32test@gmail.com"
MAIL_PASSWORD = "243frfdSHG#$5hgedtr"
MAIL_USE_TLS = False
MAIL_USE_SSL = True


# SQLALCHEMY
SQLALCHEMY_DATABASE_URI = 'mysql://Magisterka:C3XwsNxp[N2W0hFG@localhost:3306/Magisterka'
# SQLALCHEMY_DATABASE_URI = 'mysql://Magisterka:C3XwsNxp[N2W0hFG@192.168.0.200:3306/Magisterka'
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_POOL_SIZE = 5000
SQLALCHEMY_MAX_OVERFLOW = 5000