import core

from core import db
from datetime import datetime



class User(db.Model):
    __tablename__ = 'Users'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    Username = core.db.Column(core.db.String(80), unique=True, nullable=False)
    Email = core.db.Column(core.db.String(120), unique=True, nullable=False)
    Password = core.db.Column(core.db.String(120), nullable=False)
    Secret_Key = core.db.Column(core.db.String(10), nullable=False)
    Is_Active = core.db.Column(core.db.Boolean, default=False)
    Is_Admin = core.db.Column(core.db.Boolean, default=False)


    def __init__(self, Username, Email, Password, Secret_Key, Is_Active=False, Is_Admin=False):
        self.Username = Username
        self.Email = Email
        self.Password = Password
        self.Secret_Key = Secret_Key
        self.Is_Active = Is_Active
        self.Is_Admin = Is_Admin
        print("[Models] User created - " + str(self.Username))


    def __repr__(self):
        return '<User %r>' % self.Username


    def __str__(self):
        return self.Username


class Film(core.db.Model):
    __tablename__ = 'Films'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    Title = core.db.Column(core.db.String(128), nullable=True)
    Original_Title = core.db.Column(core.db.String(128), nullable=True)
    Year = core.db.Column(core.db.Integer, nullable=True)
    Duration = core.db.Column(core.db.Integer, nullable=True)
    Director = core.db.Column(core.db.String(128), nullable=True)
    Country = core.db.Column(core.db.String(128), nullable=True)
    Genre = core.db.Column(core.db.String(128), nullable=True)
    Rating = core.db.Column(core.db.Float, nullable=True)
    Description = core.db.Column(core.db.String(1000), nullable=True)
    Image = core.db.Column(core.db.String(1000), nullable=True)
    URL = core.db.Column(core.db.String(1000), nullable=True)

    def __init__(self, Title, Original_Title, Year, Duration, Director, Country, Genre, Rating, Description, Image, URL):
        self.Title = Title
        self.Original_Title = Original_Title
        self.Year = Year
        self.Duration = Duration
        self.Director = Director
        self.Country = Country
        self.Genre = Genre
        self.Rating = Rating
        self.Description = Description
        self.Image = Image
        self.URL = URL
        print('[Models] Film created -', self.Title)

    def __repr__(self):
        return '<Film %r>' % self.Title

    def __str__(self):
        return self.Title


class Serial(core.db.Model):
    __tablename__ = 'Serials'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    Title = core.db.Column(core.db.String(128), nullable=True)
    Original_Title = core.db.Column(core.db.String(128), nullable=True)
    Year = core.db.Column(core.db.String(80), nullable=True)
    Duration = core.db.Column(core.db.Integer, nullable=True)
    Director = core.db.Column(core.db.String(80), nullable=True)
    Country = core.db.Column(core.db.String(80), nullable=True)
    Genre = core.db.Column(core.db.String(80), nullable=True)
    Rating = core.db.Column(core.db.Float, nullable=True)
    Description = core.db.Column(core.db.String(1000), nullable=True)
    Image = core.db.Column(core.db.String(1000), nullable=True)
    URL = core.db.Column(core.db.String(1000), nullable=True)

    def __init__(self, Title, Original_Title, Year, Duration, Director, Country, Genre, Rating, Description, Image, URL):
        self.Title = Title
        self.Original_Title = Original_Title
        self.Year = Year
        self.Duration = Duration
        self.Director = Director
        self.Country = Country
        self.Genre = Genre
        self.Rating = Rating
        self.Description = Description
        self.Image = Image
        self.URL = URL
        print('[Models] Serial created -', self.Title)

    def __repr__(self):
        return '<Film %r>' % self.Title

    def __str__(self):
        return self.Title


class Comment(core.db.Model):
    __tablename__ = 'Comments'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    User_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Users.ID'))
    Film_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Films.ID'), nullable=True)
    Serial_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Serials.ID'), nullable=True)
    Comment = core.db.Column(core.db.String(1000), nullable=True)
    Date = core.db.Column(core.db.DateTime, nullable=True, default=datetime.utcnow)

    def __init__(self, User_ID, Film_ID, Serial_ID, Comment):
        self.User_ID = User_ID
        self.Film_ID = Film_ID
        self.Serial_ID = Serial_ID
        self.Comment = Comment
        print('[Models] Comment created -', self.Comment)

    def __repr__(self):
        return '<Film comment %r>' % self.Comment

    def __str__(self):
        return self.Comment


class Rating(core.db.Model):
    __tablename__ = 'Rates'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    User_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Users.ID'))
    Film_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Films.ID'), nullable=True)
    Serial_ID = core.db.Column(core.db.Integer, core.db.ForeignKey('Serials.ID'), nullable=True)
    Rate = core.db.Column(core.db.Integer, nullable=True)

    def __init__(self, User_ID, Film_ID, Serial_ID, Rate):
        self.User_ID = User_ID
        self.Film_ID = Film_ID
        self.Serial_ID = Serial_ID
        self.Rate = Rate
        print("[Models] Rating created -", self.Rate)

    def __repr__(self):
        return '<Film rate %r>' % self.Rate

    def __str__(self):
        return self.Rate


class Newses(core.db.Model):
    __tablename__ = 'Newses'
    ID = core.db.Column(core.db.Integer, primary_key=True)
    Title = core.db.Column(core.db.String(128), nullable=True)
    Description = core.db.Column(core.db.String(1000), nullable=True)
    Text = core.db.Column(core.db.String(10000), nullable=True)
    Image = core.db.Column(core.db.String(1000), nullable=True)
    URL = core.db.Column(core.db.String(1000), nullable=True)
    Date = core.db.Column(core.db.DateTime, nullable=True, default=datetime.utcnow)

    def __init__(self, Title, Description, Text, Image, URL):
        self.Title = Title
        self.Description = Description
        self.Text = Text
        self.Image = Image
        self.URL = URL
        print('[Models] News created -', self.Title)

    def __repr__(self):
        return '<News %r>' % self.Title

    def __str__(self):
        return self.Title
