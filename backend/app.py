import json

from flask import Flask, render_template
from flask_jwt_extended import JWTManager, get_jwt, create_access_token, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
from datetime import datetime, timezone, timedelta

app = Flask(__name__)
app.config.from_pyfile('config.py')

db = SQLAlchemy(app)
jwt = JWTManager(app)
mail = Mail(app)

import models
import api
import authorization

app.register_blueprint(api.api_blueprint, url_prefix='/api')
app.register_blueprint(authorization.authorization_blueprint, url_prefix='/auth')
@app.errorhandler(404)
def not_found_error(error):
    print(error)
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    print(error)
    return render_template('500.html'), 500


# Define a function that will be called whenever access to a protected endpoint is attempted
@app.after_request
def refresh_expiring_tokens(response):
    try:
        exp_timestamp = get_jwt()['exp']
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
            return response
    except (RuntimeError, KeyError):
        return response


if __name__ == '__main__':
    app.run(port=5003, debug=True)
