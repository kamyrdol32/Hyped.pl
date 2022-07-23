from random import randrange
from flask import jsonify, Blueprint

import core
import models

api_blueprint = Blueprint('api', __name__, )


@api_blueprint.route('/db/create')
def create_db():
    core.db.create_all()
    return jsonify({'msg': 'Database created'})


@api_blueprint.route('/films/get')
@api_blueprint.route('/films/get/<nr>')
def get_films(nr=1):
    Table = []
    Films = models.Film.query.filter(models.Film.ID.between((int(nr) - 1) * 10, int(nr) * 10 - 1))
    for Data in Films:
        Table.append({
            "ID": Data.ID,
            "Title": Data.Title,
            "Year": Data.Year,
            "Duration": Data.Duration,
            "Director": Data.Director,
            "Country": Data.Country,
            "Genre": Data.Genre,
            "Rating": Data.Rating,
            "Description": Data.Description,
            "Image": Data.Image,
            "URL": Data.URL,
        })
    print("Zakres od " + str((int(nr) - 1) * 10) + " do " + str(int(nr) * 10 - 1))
    return jsonify(Table), 200


@api_blueprint.route('/film/get/<nr>')
def get_film(nr=False):
    if nr:
        print("Film get - " + str(nr))
        Film = models.Film.query.filter_by(ID=nr).first()
        return jsonify({
            "ID": Film.ID,
            "Title": Film.Title,
            "Year": Film.Year,
            "Duration": Film.Duration,
            "Director": Film.Director,
            "Country": Film.Country,
            "Genre": Film.Genre,
            "Rating": Film.Rating,
            "Description": Film.Description,
            "Image": Film.Image,
            "URL": Film.URL,
        })
    else:
        return jsonify('Error'), 500


@api_blueprint.route('/comments/get/<nr>')
def get_film_comments(nr=False):
    if nr:
        print("Film Comments get - " + str(nr))
        Comments = models.Film_Comment.query.filter_by(Film_ID=nr)
        Table = []
        for Comment in Comments:
            Table.append({
                "ID": Comment.ID,
                "Film_ID": Comment.Film_ID,
                "User_ID": Comment.User_ID,
                "User": models.User.query.filter_by(ID=Comment.User_ID).first().Username,
                "Comment": Comment.Comment,
                "Rate": Comment.Rate,
                "Date": Comment.Date,
            })
        return jsonify(Table), 200
    else:
        return jsonify('Error'), 500