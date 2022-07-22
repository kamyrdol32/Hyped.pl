import hashlib

from flask import jsonify, Blueprint, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, set_access_cookies, \
    unset_jwt_cookies

import core
import models

authorization_blueprint = Blueprint('auth', __name__, )


@authorization_blueprint.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400

    username = request.json['username']
    email = request.json['email']
    password = request.json['password']
    password_confirm = request.json['password_confirm']

    username_db = models.User.query.filter_by(Username=username).first()
    if username_db and username == username_db.Username:
        return jsonify({"error": "Username already exists"}), 400
    email_db = models.User.query.filter_by(Email=email).first()
    if email_db and email == email_db.Email:
        return jsonify({"error": "Email already exists"}), 400
    if password != password_confirm:
        return jsonify({"error": "Passwords do not match"}), 400

    if username and password and email:
        try:
            user = models.User(
                Username=username,
                Email=email,
                Password=hashlib.sha256(password.encode('utf-8')).hexdigest()
            )
            core.db.session.add(user)
            core.db.session.commit()
            # send_email(username, email, 'Registration', 'You have successfully registered!')
            return jsonify({'success': 'Prosze potwierdzic konto poprzez E-Mail', 'key': hashlib.sha256(user.Username.encode('utf-8')).hexdigest()})
        except Exception as error:
            core.db.session.rollback()
            core.app.logger.error(error)
            return jsonify({'error': error}), 500
    else:
        return jsonify({'error': 'Username, email or password is empty'})


@authorization_blueprint.route('/login', methods=['POST'])
def login():
    try:
        if not request.is_json:
            return jsonify({"error": "Missing JSON in request"}), 400

        username = request.json.get('username', None)
        password = request.json.get('password', None)

        print(username, password)

        if not username:
            return jsonify({"error": "Missing username parameter"}), 400
        if not password:
            return jsonify({"error": "Missing password parameter"}), 400

        user = models.User.query.filter_by(Username=username).first()
        if user and user.Username == username and user.Password == hashlib.sha256(password.encode('utf-8')).hexdigest():
            if user.Is_Active == 0:
                return jsonify({"error": "User is not active"}), 400

            access_token = create_access_token(identity=username)
            response = jsonify({
                "access_token": access_token,
            })
            set_access_cookies(response, access_token)
            print(response, access_token)
            return response, 200
        else:
            return jsonify({"error": "Wprowadzono błędne dane"}), 401
    except Exception as error:
        core.app.logger.error(error)
        return jsonify({'error': error}), 500


@authorization_blueprint.route('/logout', methods=['GET'])
def logout():
    response = jsonify({"sucess": "logout successful"})
    unset_jwt_cookies(response)
    return response, 200


@authorization_blueprint.route('/activate/<id>/<key>', methods=['GET'])
def activate(id, key):
    try:
        user = models.User.query.filter_by(ID=id).first()
        if user and not user.Is_Active and hashlib.sha256(user.Username.encode('utf-8')).hexdigest() == key:
            user.Is_Active = 1
            core.db.session.commit()
            return jsonify({'success': 'User activated'})
        else:
            return jsonify({'error': 'Bad activation key'})
    except Exception as error:
        core.app.logger.error(error)
        return jsonify({'msg': error}), 500


@authorization_blueprint.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    userData = models.User.query.filter_by(Username=current_user).first()
    response = jsonify({
        "username": userData.Username,
        "email": userData.Email,
    })
    print(response)
    return response, 200



