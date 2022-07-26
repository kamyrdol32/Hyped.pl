from flask import jsonify, Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

import core
import models

api_blueprint = Blueprint('api', __name__, )


@api_blueprint.route('/db/create')
def create_db():
    core.db.create_all()
    return jsonify({'msg': 'Database created'})


##########
# Films
##########

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
        print("[GET] Film - " + str(nr))
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


##########
# Comments
##########

@api_blueprint.route('/comments/get/<nr>')
def get_film_comments(nr=False):
    if nr:
        print("[GET] Comments - " + str(nr))
        Comments = models.Comment.query.filter_by(Film_ID=nr)
        Table = []
        for Comment in Comments:
            Table.append({
                "ID": Comment.ID,
                "Film_ID": Comment.Film_ID,
                "User_ID": Comment.User_ID,
                "User": models.User.query.filter_by(ID=Comment.User_ID).first().Username,
                "Comment": Comment.Comment,
                "Date": Comment.Date,
            })
        return jsonify(Table), 200
    else:
        return jsonify('Error'), 500


@api_blueprint.route('/comments/add/<nr>', methods=['POST'])
@jwt_required()
def add_film_comments(nr=False):
    current_user = get_jwt_identity()
    try:
        if nr:
            print("[ADD] Comments - " + str(nr))

            if not request.is_json:
                return jsonify({"error": "Missing JSON in request"}), 400

            comment = request.json.get('comment', None)
            type = request.json.get('type', None)

            if type == "film":
                Comment = models.Comment(
                    User_ID=models.User.query.filter_by(Username=current_user).first().ID,
                    Comment=comment,
                    Film_ID=nr,
                    Serial_ID=None,
                )
                core.db.session.add(Comment)
                core.db.session.commit()
                return jsonify({'success': 'Comment added'}), 200
            if type == "serial":
                Comment = models.Comment(
                    User_ID=models.User.query.filter_by(Username=current_user).first().ID,
                    Comment=comment,
                    Film_ID=None,
                    Serial_ID=nr,
                )
                core.db.session.add(Comment)
                core.db.session.commit()
                return jsonify({'success': 'Comment added'}), 200
            return jsonify({'success': 'Comment added'}), 200
        else:
            return jsonify('error'), 500
    except Exception as error:
        return jsonify({'error': str(error)}), 500


##########
# Rating
##########

@api_blueprint.route('/rating/get/<nr>')
@jwt_required()
def get_film_rating(nr=False):
    current_user = get_jwt_identity()
    if nr and current_user:
        print("[GET] Rating - " + str(nr))
        Rating = models.Rating.query.filter_by(Film_ID=nr, User_ID=models.User.query.filter_by(
            Username=current_user).first().ID).first()
        if Rating:
            return jsonify({
                "ID": Rating.ID,
                "Film_ID": Rating.Film_ID,
                "User_ID": Rating.User_ID,
                "Rating": Rating.Rate,
            }), 200
        else:
            return jsonify({
                "ID": None,
                "Film_ID": None,
                "User_ID": None,
                "Rating": 0,
            }), 200
    else:
        return jsonify('Error'), 500


@api_blueprint.route('/rating/get_all')
@jwt_required()
def get_all_film_rating():
    current_user = get_jwt_identity()
    if current_user:
        print("[GET] All user Rating")
        Ratings = models.Rating.query.filter_by(User_ID=models.User.query.filter_by(
            Username=current_user).first().ID)
        Table = []
        for Rating in Ratings:
            Table.append({
                "ID": Rating.ID,
                "Film_ID": Rating.Film_ID,
                "Film_Name": models.Film.query.filter_by(ID=Rating.Film_ID).first().Title,
                "Rating": Rating.Rate,
            })
        return jsonify(Table), 200
    else:
        return jsonify('Error'), 500


@api_blueprint.route('/rating/add/<nr>', methods=['POST'])
@jwt_required()
def add_film_rating(nr=False):
    current_user = get_jwt_identity()
    try:
        if nr:
            print("[ADD] Rating - " + str(nr))

            if not request.is_json:
                return jsonify({"error": "Missing JSON in request"}), 400

            rating = request.json.get('rating', None)
            type = request.json.get('type', None)
            Rating = []

            if type == "film":
                if models.Rating.query.filter_by(Film_ID=nr, User_ID=models.User.query.filter_by(
                        Username=current_user).first().ID).first():
                    Rating = models.Rating.query.filter_by(Film_ID=nr, User_ID=models.User.query.filter_by(
                        Username=current_user).first().ID).first()
                    Rating.Rate = rating
                    core.db.session.commit()
                    return jsonify({'success': 'Rating refreshed'}), 200
                else:
                    Rating = models.Rating(
                        User_ID=models.User.query.filter_by(Username=current_user).first().ID,
                        Rate=(rating),
                        Film_ID=nr,
                        Serial_ID=None,
                    )

            if type == "serial":
                if models.Rating.query.filter_by(Serial_ID=nr, User_ID=models.User.query.filter_by(
                        Username=current_user).first().ID).first():
                    Rating = models.Rating.query.filter_by(Serial_ID=nr, User_ID=models.User.query.filter_by(
                        Username=current_user).first().ID).first()
                    Rating.Rate = rating
                    core.db.session.commit()
                    return jsonify({'success': 'Rating refreshed'}), 200
                else:
                    Rating = models.Rating(
                        User_ID=models.User.query.filter_by(Username=current_user).first().ID,
                        Rate=(rating),
                        Film_ID=None,
                        Serial_ID=nr,
                    )
            core.db.session.add(Rating)
            core.db.session.commit()
            return jsonify({'success': 'Rating added'}), 200
        else:
            return jsonify('error'), 500
    except Exception as error:
        return jsonify({'error': str(error)}), 500


