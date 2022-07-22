import json

from flask import Flask, render_template
from flask_jwt_extended import JWTManager, get_jwt, create_access_token, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone, timedelta

import models
import api
import authorization

import scraper

app = Flask(__name__)
app.config.from_pyfile('config.py')
app.register_blueprint(api.api_blueprint, url_prefix='/api')
app.register_blueprint(authorization.authorization_blueprint, url_prefix='/auth')
app.register_blueprint(scraper.scraper_blueprint, url_prefix='/scraper')

db = SQLAlchemy(app)
jwt = JWTManager(app)


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
    app.run()
