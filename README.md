# Hyped.pl

This website is a platform for movie enthusiasts to discover, rate, and review movies. With a vast collection of movies, TV shows, and documentaries, users can easily browse through different genres, filter content based on their preferences, and view ratings and reviews from other users. The website also offers personalized recommendations based on a user's viewing history and ratings. Users can create and customize their profiles, connect with other users, and even create and join movie clubs. The website is regularly updated with new content and features to keep users engaged. The repository contains the source code for the website, along with detailed documentation on how to customize it for different movie-related needs.

## Authors

| Author | Backend | Frontend |
| :---: | :---: | :---: |
| **Kamil Żegleń** ([kamyrdol32](https://github.com/kamyrdol32))  | ![100%](https://progress-bar.dev/100)  | ![100%](https://progress-bar.dev/100)  |

## Technologies used:
  - **Python**:
      - Flask,
      - Flask Mail,
      - Flask-JWT-Extended
      - Flask-SQLAlchemy
      - Jinja2,
  - **JavaScript**:
      - React,
  - **SQL**
  - **HTML**
  - **CSS**:
    - Bootstrap,

## Installation
### Requirements
  - **Docker & Docker Compose**

### Instruction

Add config.py in /backend directory

```bash
from datetime import timedelta

# Flask
TESTING = True
FLASK_DEBUG = True
SECRET_KEY = "#"
JSON_SORT_KEYS = False


# JWT
JWT_SECRET_KEY = ""
JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=30)


# Email
MAIL_SERVER = "smtp.gmail.com"
MAIL_PORT = 465
MAIL_USERNAME = ""
MAIL_PASSWORD = ""
MAIL_USE_TLS = False
MAIL_USE_SSL = True
MAIL_DEFAULT_SENDER = ""
MAIL_DEBUG = True
MAIL_SUPPRESS_SEND = False


# SQLALCHEMY
SQLALCHEMY_DATABASE_URI =  ""
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_POOL_SIZE = 50000
SQLALCHEMY_MAX_OVERFLOW = 50000
```

create docker network

```bash
docker network create hyped_default
```

and run project

```bash
docker-compose up
```

## Demo:
<https://hyped.kamilzeglen.pl/>

## Photos
### Main Page
![Main Page](https://i.imgur.com/DdkRzJB.png)
### Login Panel
![Login Panel](https://i.imgur.com/nFLkYKy.png)
### Profile
![Profile](https://i.imgur.com/ZM50Rcg.png)
### Movies list
![Movies list](https://i.imgur.com/N9KNy73.png)
### Move description
![Move description](https://i.imgur.com/HNL3BDZ.png)
