from datetime import datetime
from core import db


class User(db.Model):
    __tablename__ = 'Users'
    ID = db.Column(db.Integer, primary_key=True)
    Username = db.Column(db.String(80), unique=True, nullable=False)
    Email = db.Column(db.String(120), unique=True, nullable=False)
    Password = db.Column(db.String(120), nullable=False)
    Secret_Key = db.Column(db.String(10), nullable=False)
    Is_Active = db.Column(db.Boolean, default=False)
    Is_Admin = db.Column(db.Boolean, default=False)

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


class Film(db.Model):
    __tablename__ = 'Films'
    ID = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(128), nullable=True)
    Year = db.Column(db.Integer, nullable=True)
    Duration = db.Column(db.Integer, nullable=True)
    Director = db.Column(db.String(128), nullable=True)
    Country = db.Column(db.String(128), nullable=True)
    Genre = db.Column(db.String(128), nullable=True)
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
        print('[Models] Film created -', self.Title)

    def __repr__(self):
        return '<Film %r>' % self.Title

    def __str__(self):
        return self.Title


class Serial(db.Model):
    __tablename__ = 'Serials'
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
        print('[Models] Serial created -', self.Title)

    def __repr__(self):
        return '<Film %r>' % self.Title

    def __str__(self):
        return self.Title


class Comment(db.Model):
    __tablename__ = 'Comments'
    ID = db.Column(db.Integer, primary_key=True)
    User_ID = db.Column(db.Integer, db.ForeignKey('Users.ID'))
    Film_ID = db.Column(db.Integer, db.ForeignKey('Films.ID'), nullable=True)
    Serial_ID = db.Column(db.Integer, db.ForeignKey('Serials.ID'), nullable=True)
    Comment = db.Column(db.String(1000), nullable=True)
    Date = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)

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


class Rating(db.Model):
    __tablename__ = 'Rates'
    ID = db.Column(db.Integer, primary_key=True)
    User_ID = db.Column(db.Integer, db.ForeignKey('Users.ID'))
    Film_ID = db.Column(db.Integer, db.ForeignKey('Films.ID'), nullable=True)
    Serial_ID = db.Column(db.Integer, db.ForeignKey('Serials.ID'), nullable=True)
    Rate = db.Column(db.Integer, nullable=True)

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


class Newses(db.Model):
    __tablename__ = 'Newses'
    ID = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(128), nullable=True)
    Description = db.Column(db.String(1000), nullable=True)
    Text = db.Column(db.String(100000), nullable=True)
    Image = db.Column(db.String(1000), nullable=True)
    URL = db.Column(db.String(1000), nullable=True)
    Date = db.Column(db.DateTime, nullable=True, default=datetime.utcnow)

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

