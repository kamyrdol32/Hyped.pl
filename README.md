# Hyped

This website is a platform for movie enthusiasts to discover, rate, and review movies. With a vast collection of movies, TV shows, and documentaries, users can easily browse through different genres, filter content based on their preferences, and view ratings and reviews from other users. The website also offers personalized recommendations based on a user's viewing history and ratings. Users can create and customize their profiles, connect with other users, and even create and join movie clubs. The website is regularly updated with new content and features to keep users engaged. The repository contains the source code for the website, along with detailed documentation on how to customize it for different movie-related needs.

## Authors

| Author | Backend | Frontend |
| :---: | :---: | :---: |
| **Kamil Żegleń** ([kamyrdol32](https://github.com/kamyrdol32))  | 100% | 100% |

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

## Installation
### Requirements
  - **Docker & Docker Compose**
  
### Environment Variables
To run this project, you will need to add the following environment file on **backend** directory:

**.env**
```bash
SECRET_KEY=""
SQLALCHEMY_DATABASE_URI=""
JWT_SECRET_KEY=""
MAIL_USERNAME=""
MAIL_PASSWORD=""
```

### Instruction
To deploy this project run project

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
