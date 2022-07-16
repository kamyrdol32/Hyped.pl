from flask import Flask, render_template
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

import models
import api
import authorization

# import scraper

app = Flask(__name__)
app.config.from_pyfile('config.py')
app.register_blueprint(api.api_blueprint, url_prefix='/api')
app.register_blueprint(authorization.authorization_blueprint, url_prefix='/auth')
# app.register_blueprint(scraper.scraper_blueprint, url_prefix='/scraper')

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


if __name__ == '__main__':
    app.run()
