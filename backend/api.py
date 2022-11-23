from flask import jsonify, Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity

import core

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
    Films = core.models.Film.query.filter(core.models.Film.ID.between((int(nr) - 1) * 10, int(nr) * 10 - 1))
    for Data in Films:
        Table.append({
            "ID": Data.ID,
            "Title": Data.Title,
            "Original_Title": Data.Original_Title,
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
        Film = core.models.Film.query.filter_by(ID=nr).first()
        if Film:
            return jsonify({
                "ID": Film.ID,
                "Title": Film.Title,
                "Original_Title": Film.Original_Title,
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
            return jsonify({'msg': 'Film not found'}), 404
    else:
        return jsonify('Error'), 500


##########
# Serials
##########

@api_blueprint.route('/serials/get')
@api_blueprint.route('/serials/get/<nr>')
def get_serials(nr=1):
    Table = []
    Serials = core.models.Serial.query.filter(core.models.Serial.ID.between((int(nr) - 1) * 10, int(nr) * 10 - 1))
    for Data in Serials:
        Table.append({
            "ID": Data.ID,
            "Title": Data.Title,
            "Original_Title": Data.Original_Title,
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

@api_blueprint.route('/serial/get/<nr>')
def get_serial(nr=False):
    if nr:
        print("[GET] Serial - " + str(nr))
        Serial = core.models.Serial.query.filter_by(ID=nr).first()
        return jsonify({
            "ID": Serial.ID,
            "Title": Serial.Title,
            "Original_Title": Serial.Original_Title,
            "Year": Serial.Year,
            "Duration": Serial.Duration,
            "Director": Serial.Director,
            "Country": Serial.Country,
            "Genre": Serial.Genre,
            "Rating": Serial.Rating,
            "Description": Serial.Description,
            "Image": Serial.Image,
            "URL": Serial.URL,
        })
    else:
        return jsonify('Error'), 500

@api_blueprint.route('/search/<name>')
def search(name):
    if name:
        try:

            name = name.replace('_', ' ')

            Films = core.models.Film.query.filter(core.models.Film.Title.like('%' + name + '%')).all()
            Serials = core.models.Serial.query.filter(core.models.Serial.Title.like('%' + name + '%')).all()

            Table = []

            if Films:
                for Data in Films:
                    Table.append({
                        "Type": "Film",
                        "ID": Data.ID,
                        "Title": Data.Title,
                        "Original_Title": Data.Original_Title,
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

            if Serials:
                for Data in Serials:
                    Table.append({
                        "Type": "Serial",
                        "ID": Data.ID,
                        "Title": Data.Title,
                        "Original_Title": Data.Original_Title,
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


                print("Znaleziono: " + str(len(Table)))

            return jsonify(sorted(Table, key=lambda k: k['ID']))

        except Exception as error:
            return jsonify({'error': error}), 500
    else:
        return jsonify('Name error'), 500

##########
# Comments
##########

@api_blueprint.route('/comments/get/<type>/<nr>')
def get_film_comments(type=False, nr=False):
    if nr and type:
        print("[GET] Comments - " + str(nr))
        if type == "film":
            Comments = core.models.Comment.query.filter_by(Film_ID=nr)
        elif type == "serial":
            Comments = core.models.Comment.query.filter_by(Serial_ID=nr)
        Table = []
        for Comment in Comments:
            Table.append({
                "ID": Comment.ID,
                "Film_ID": Comment.Film_ID,
                "User_ID": Comment.User_ID,
                "User": core.models.User.query.filter_by(ID=Comment.User_ID).first().Username,
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

            print(type)

            if type == "film":
                Comment = core.models.Comment(
                    User_ID=core.models.User.query.filter_by(Username=current_user).first().ID,
                    Comment=comment,
                    Film_ID=nr,
                    Serial_ID=None,
                )
                core.db.session.add(Comment)
                core.db.session.commit()
                return jsonify({'success': 'Comment added'}), 200
            if type == "serial":
                Comment = core.models.Comment(
                    User_ID=core.models.User.query.filter_by(Username=current_user).first().ID,
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

@api_blueprint.route('/rating/get/<type>/<nr>')
@jwt_required()
def get_film_rating(type=False, nr=False):
    current_user = get_jwt_identity()
    if nr and type and current_user:

        print("[GET] Rating " + type + " - " + str(nr))
        if type == "film":
            Rating = core.models.Rating.query.filter_by(Film_ID=nr, User_ID=core.models.User.query.filter_by(Username=current_user).first().ID).first()
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
                    "Serial_ID": None,
                    "User_ID": None,
                    "Rating": 0,
                }), 200
        if type == "serial":
            Rating = core.models.Rating.query.filter_by(Serial_ID=nr, User_ID=core.models.User.query.filter_by(Username=current_user).first().ID).first()
            if Rating:
                return jsonify({
                    "ID": Rating.ID,
                    "Serial_ID": Rating.Serial_ID,
                    "User_ID": Rating.User_ID,
                    "Rating": Rating.Rate,
                }), 200
            else:
                return jsonify({
                    "ID": None,
                    "Serial_ID": None,
                    "User_ID": None,
                    "Rating": 0,
                }), 200
        return jsonify('Error'), 500
    else:
        print("[GET] Rating - Error")
        return jsonify('Error'), 500


@api_blueprint.route('/rating/get_all')
@jwt_required()
def get_all_film_rating():
    current_user = get_jwt_identity()
    if current_user:
        print("[GET] All user Rating")
        Ratings = core.models.Rating.query.filter_by(User_ID=core.models.User.query.filter_by(
            Username=current_user).first().ID)
        Table = []
        for Rating in Ratings:
            if Rating.Film_ID:
                Table.append({
                    "ID": Rating.ID,
                    "Type": "film",
                    "DataID": Rating.Film_ID,
                    "DataName": core.models.Film.query.filter_by(ID=Rating.Film_ID).first().Title,
                    "Rating": Rating.Rate,
                })
            if Rating.Serial_ID:
                Table.append({
                    "ID": Rating.ID,
                    "Type": "serial",
                    "DataID": Rating.Serial_ID,
                    "DataName": core.models.Serial.query.filter_by(ID=Rating.Serial_ID).first().Title,
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
                if core.models.Rating.query.filter_by(Film_ID=nr, User_ID=core.models.User.query.filter_by(
                        Username=current_user).first().ID).first():
                    Rating = core.models.Rating.query.filter_by(Film_ID=nr, User_ID=core.models.User.query.filter_by(
                        Username=current_user).first().ID).first()
                    Rating.Rate = rating
                    core.db.session.commit()
                    return jsonify({'success': 'Rating refreshed'}), 200
                else:
                    Rating = core.models.Rating(
                        User_ID=core.models.User.query.filter_by(Username=current_user).first().ID,
                        Rate=(rating),
                        Film_ID=nr,
                        Serial_ID=None,
                    )

            if type == "serial":
                if core.models.Rating.query.filter_by(Serial_ID=nr, User_ID=core.models.User.query.filter_by(
                        Username=current_user).first().ID).first():
                    Rating = core.models.Rating.query.filter_by(Serial_ID=nr, User_ID=core.models.User.query.filter_by(
                        Username=current_user).first().ID).first()
                    Rating.Rate = rating
                    core.db.session.commit()
                    return jsonify({'success': 'Rating refreshed'}), 200
                else:
                    Rating = core.models.Rating(
                        User_ID=core.models.User.query.filter_by(Username=current_user).first().ID,
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

##########
# Newses
##########

@api_blueprint.route('/news/get')
def get_all_news():
    print("[GET] All news")
    Newses = core.models.Newses.query.all()
    Table = []
    for News in Newses:
        Table.append({
            "ID": News.ID,
            "Title": News.Title,
            "Description": News.Description,
            "Text": News.Text,
            "Image": News.Image,
            "URL": News.URL,
            "Date": News.Date,
        })
    return jsonify(Table), 200