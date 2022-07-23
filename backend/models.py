from datetime import datetime
from core import db


class User(db.Model):
    __tablename__ = 'Users'
    ID = db.Column(db.Integer, primary_key=True)
    Username = db.Column(db.String(80), unique=True, nullable=False)
    Email = db.Column(db.String(120), unique=True, nullable=False)
    Password = db.Column(db.String(120), nullable=False)
    Is_Active = db.Column(db.Boolean, default=False)
    Is_Admin = db.Column(db.Boolean, default=False)

    def __init__(self, Username, Email, Password, Is_Active=False, Is_Admin=False):
        self.Username = Username
        self.Email = Email
        self.Password = Password
        self.Is_Active = Is_Active
        self.Is_Admin = Is_Admin

        print('User created -', self.Username)

    def __repr__(self):
        return '<User %r>' % self.Username

    def __str__(self):
        return self.Username


class Film(db.Model):
    __tablename__ = 'Films'
    ID = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(80), nullable=True)
    Year = db.Column(db.Integer, nullable=True)
    Duration = db.Column(db.Integer, nullable=True)
    Director = db.Column(db.String(80), nullable=True)
    Country = db.Column(db.String(80), nullable=True)
    Genre = db.Column(db.String(80), nullable=True)
    Rating = db.Column(db.Float, nullable=True)
    Description = db.Column(db.String(1000), nullable=True)
    Image = db.Column(db.String(1000), nullable=True)
    URL = db.Column(db.String(1000), nullable=True)

    def __init__(self, Title, Year, Duration, Director, Country, Genre, Rating, Description, Image, URL):
        self.Title = Title
        self.Year = Year
        self.Duration = Duration
        self.Director = Director
        self.Country = Country
        self.Genre = Genre
        self.Rating = Rating
        self.Description = Description
        self.Image = Image
        self.URL = URL
        print('Film created -', self.Title)

    def __repr__(self):
        return '<Film %r>' % self.Title

    def __str__(self):
        return self.Title


class Film_Comment(db.Model):
    __tablename__ = 'Films_Comments'
    ID = db.Column(db.Integer, primary_key=True)
    Film_ID = db.Column(db.Integer, db.ForeignKey('Films.ID'))
    User_ID = db.Column(db.Integer, db.ForeignKey('Users.ID'))
    Comment = db.Column(db.String(1000), nullable=True)
    Rate = db.Column(db.Integer, nullable=True)
    Date = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)

    def __init__(self, Film_ID, User_ID, Comment, Rate, Date):
        self.Film_ID = Film_ID
        self.User_ID = User_ID
        self.Comment = Comment
        self.Rate = Rate
        self.Date = Date
        print('Film comment created -', self.Comment)

    def __repr__(self):
        return '<Film comment %r>' % self.Comment

    def __str__(self):
        return self.Comment


class Serials(db.Model):
    __tablename__ = 'Serials'
    ID = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(80), unique=True, nullable=False)
    Year = db.Column(db.Integer, nullable=True)
    Director = db.Column(db.String(80), nullable=True)
    Country = db.Column(db.String(80), nullable=True)
    Genre = db.Column(db.String(80), nullable=True)
    Rating = db.Column(db.Float, nullable=True)
    Description = db.Column(db.String(1000), nullable=True)
    Image = db.Column(db.String(1000), nullable=True)
    URL = db.Column(db.String(1000), nullable=True)

    def __init__(self, Title, Year, Director, Country, Genre, Rating, Description, Image, URL):
        self.Title = Title
        self.Year = Year
        self.Director = Director
        self.Country = Country
        self.Genre = Genre
        self.Rating = Rating
        self.Description = Description
        self.Image = Image
        self.URL = URL
        print('Serial created -', self.title)

    def __repr__(self):
        return '<Serial %r>' % self.title

    def __str__(self):
        return self.title
