import hashlib

from flask import jsonify, Blueprint, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, \
    unset_jwt_cookies, get_jwt

import core
import models

authorization_blueprint = Blueprint('auth', __name__, )


@authorization_blueprint.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json['username']
    email = request.json['email']
    password = request.json['password']

    username_db = models.User.query.filter_by(Username=username).first()
    if username_db and username == username_db.Username:
        return jsonify({"msg": "Username already exists"}), 400
    email_db = models.User.query.filter_by(Email=email).first()
    if email_db and email == email_db.Email:
        return jsonify({"msg": "Email already exists"}), 400

    if username and password and email:
        try:
            user = models.User(Username=username, Email=email, Password=hashlib.sha256(password.encode('utf-8')).hexdigest())
            core.db.session.add(user)
            core.db.session.commit()
            send_email(username, email, 'Registration', 'You have successfully registered!')
            return jsonify({'msg': 'User added', 'key': hashlib.sha256(user.Username.encode('utf-8')).hexdigest()})
        except Exception as error:
            core.db.session.rollback()
            core.app.logger.error(error)
            return jsonify({'msg': error}), 500
    else:
        return jsonify({'msg': 'Username, email or password is empty'})


@authorization_blueprint.route('/login', methods=['POST'])
def login():
    try:
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400

        username = request.json.get('username', None)
        password = request.json.get('password', None)

        if not username:
            return jsonify({"msg": "Missing username parameter"}), 400
        if not password:
            return jsonify({"msg": "Missing password parameter"}), 400

        user = models.User.query.filter_by(Username=username).first()
        if user and user.Username == username and user.Password == hashlib.sha256(password.encode('utf-8')).hexdigest():
            if user.Is_Active == 0:
                return jsonify({"msg": "User is not active"}), 400

            additional_claims = {
                'ID': models.User.query.filter_by(Username=username).first().ID,
                'Username': models.User.query.filter_by(Username=username).first().Username,
                'Email': models.User.query.filter_by(Username=username).first().Email,
            }

            response = jsonify({"msg": "login successful", "user": username})
            access_token = create_access_token(identity=username, additional_claims=additional_claims)
            set_access_cookies(response, access_token)
            return response, 200
        else:
            return jsonify({"msg": "Bad username or password"}), 401
    except Exception as error:
        core.app.logger.error(error)
        return jsonify({'msg': error}), 500


@authorization_blueprint.route('/activate/<id>/<key>', methods=['GET'])
def activate(id, key):
    try:
        user = models.User.query.filter_by(ID=id).first()
        if user and not user.Is_Active and hashlib.sha256(user.Username.encode('utf-8')).hexdigest() == key:
            user.Is_Active = 1
            core.db.session.commit()
            return jsonify({'msg': 'User activated'})
        else:
            return jsonify({'msg': 'Bad activation key'})
    except Exception as error:
        core.app.logger.error(error)
        return jsonify({'msg': error}), 500



@authorization_blueprint.route('/logout', methods=['GET'])
@jwt_required()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response, 200


@authorization_blueprint.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    claims = get_jwt()
    return jsonify(current_user, claims), 200

###

def send_email(name, email, subject, message):
    msg = core.Message(name + " - " + subject, sender=email, recipients=["kam.zeglen@gmail.com"])
    msg.html = "Wiadomość od: <b>"+ name + "</b><br><br>" + message + "<br><br>###<br>Adres kontaktowy: " + email + "<br>###"
    core.mail.send(msg)
