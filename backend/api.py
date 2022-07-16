from random import randrange
from flask import jsonify, Blueprint

import core
import models

api_blueprint = Blueprint('api', __name__, )


@api_blueprint.route('/db/create')
def create_db():
    core.db.create_all()
    return jsonify({'msg': 'Database created'})


@api_blueprint.route('/films/add')
def add_film():
    try:
        film = models.Film(
            Title='Film ' + str(randrange(1, 100)),
            Year=randrange(1900, 2020),
            Director='Director ' + str(randrange(1, 100)),
            Country='Country ' + str(randrange(1, 100)),
            Genre='Genre ' + str(randrange(1, 100)),
            Rating=randrange(1, 10),
            Description='Description ' + str(randrange(1, 100)),
            Image='Image ' + str(randrange(1, 100)),
            URL='URL ' + str(randrange(1, 100))
        )
        core.db.session.add(film)
        core.db.session.commit()
        return jsonify('Film added - ' + film.Title), 201
    except Exception as error:
        print(error)
        return jsonify('Error'), 500



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

@api_blueprint.route('/films/delete/<nr>')
def delete_film(nr):
    try:
        Film = models.Film.query.filter_by(ID=nr).first()
        core.db.session.delete(Film)
        core.db.session.commit()
        # print('Film deleted - ', Film.Title)
        return jsonify('Film deleted - ' + Film.Title), 200
    except:
        # print('Film not found')
        return jsonify('Film not found'), 404
