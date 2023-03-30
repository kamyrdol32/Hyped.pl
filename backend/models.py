import app

from datetime import datetime


class User(app.db.Model):
    __tablename__ = "Users"
    ID = app.db.Column(app.db.Integer, primary_key=True)
    Username = app.db.Column(app.db.String(80), unique=True, nullable=False)
    Email = app.db.Column(app.db.String(120), unique=True, nullable=False)
    Password = app.db.Column(app.db.String(120), nullable=False)
    Secret_Key = app.db.Column(app.db.String(10), nullable=False)
    Is_Active = app.db.Column(app.db.Boolean, default=False)
    Is_Admin = app.db.Column(app.db.Boolean, default=False)

    def __init__(
        self, Username, Email, Password, Secret_Key, Is_Active=False, Is_Admin=False
    ):
        self.Username = Username
        self.Email = Email
        self.Password = Password
        self.Secret_Key = Secret_Key
        self.Is_Active = Is_Active
        self.Is_Admin = Is_Admin
        print("[Models] User created - " + str(self.Username))

    def __repr__(self):
        return "<User %r>" % self.Username

    def __str__(self):
        return self.Username


class Film(app.db.Model):
    __tablename__ = "Films"
    ID = app.db.Column(app.db.Integer, primary_key=True)
    Title = app.db.Column(app.db.String(128), nullable=True)
    Original_Title = app.db.Column(app.db.String(128), nullable=True)
    Year = app.db.Column(app.db.Integer, nullable=True)
    Duration = app.db.Column(app.db.Integer, nullable=True)
    Director = app.db.Column(app.db.String(128), nullable=True)
    Country = app.db.Column(app.db.String(128), nullable=True)
    Genre = app.db.Column(app.db.String(128), nullable=True)
    Rating = app.db.Column(app.db.Float, nullable=True)
    Description = app.db.Column(app.db.String(1000), nullable=True)
    Image = app.db.Column(app.db.String(1000), nullable=True)
    URL = app.db.Column(app.db.String(1000), nullable=True)

    def __init__(
        self,
        Title,
        Original_Title,
        Year,
        Duration,
        Director,
        Country,
        Genre,
        Rating,
        Description,
        Image,
        URL,
    ):
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
        print("[Models] Film created -", self.Title)

    def __repr__(self):
        return "<Film %r>" % self.Title

    def __str__(self):
        return self.Title


class Serial(app.db.Model):
    __tablename__ = "Serials"
    ID = app.db.Column(app.db.Integer, primary_key=True)
    Title = app.db.Column(app.db.String(128), nullable=True)
    Original_Title = app.db.Column(app.db.String(128), nullable=True)
    Year = app.db.Column(app.db.String(80), nullable=True)
    Duration = app.db.Column(app.db.Integer, nullable=True)
    Director = app.db.Column(app.db.String(80), nullable=True)
    Country = app.db.Column(app.db.String(80), nullable=True)
    Genre = app.db.Column(app.db.String(80), nullable=True)
    Rating = app.db.Column(app.db.Float, nullable=True)
    Description = app.db.Column(app.db.String(1000), nullable=True)
    Image = app.db.Column(app.db.String(1000), nullable=True)
    URL = app.db.Column(app.db.String(1000), nullable=True)

    def __init__(
        self,
        Title,
        Original_Title,
        Year,
        Duration,
        Director,
        Country,
        Genre,
        Rating,
        Description,
        Image,
        URL,
    ):
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
        print("[Models] Serial created -", self.Title)

    def __repr__(self):
        return "<Film %r>" % self.Title

    def __str__(self):
        return self.Title


class Comment(app.db.Model):
    __tablename__ = "Comments"
    ID = app.db.Column(app.db.Integer, primary_key=True)
    User_ID = app.db.Column(app.db.Integer, app.db.ForeignKey("Users.ID"))
    Film_ID = app.db.Column(
        app.db.Integer, app.db.ForeignKey("Films.ID"), nullable=True
    )
    Serial_ID = app.db.Column(
        app.db.Integer, app.db.ForeignKey("Serials.ID"), nullable=True
    )
    Comment = app.db.Column(app.db.String(1000), nullable=True)
    Date = app.db.Column(app.db.DateTime, nullable=True, default=datetime.utcnow)

    def __init__(self, User_ID, Film_ID, Serial_ID, Comment):
        self.User_ID = User_ID
        self.Film_ID = Film_ID
        self.Serial_ID = Serial_ID
        self.Comment = Comment
        print("[Models] Comment created -", self.Comment)

    def __repr__(self):
        return "<Film comment %r>" % self.Comment

    def __str__(self):
        return self.Comment


class Rating(app.db.Model):
    __tablename__ = "Rates"
    ID = app.db.Column(app.db.Integer, primary_key=True)
    User_ID = app.db.Column(app.db.Integer, app.db.ForeignKey("Users.ID"))
    Film_ID = app.db.Column(
        app.db.Integer, app.db.ForeignKey("Films.ID"), nullable=True
    )
    Serial_ID = app.db.Column(
        app.db.Integer, app.db.ForeignKey("Serials.ID"), nullable=True
    )
    Rate = app.db.Column(app.db.Integer, nullable=True)

    def __init__(self, User_ID, Film_ID, Serial_ID, Rate):
        self.User_ID = User_ID
        self.Film_ID = Film_ID
        self.Serial_ID = Serial_ID
        self.Rate = Rate
        print("[Models] Rating created -", self.Rate)

    def __repr__(self):
        return "<Film rate %r>" % self.Rate

    def __str__(self):
        return self.Rate


class Newses(app.db.Model):
    __tablename__ = "Newses"
    ID = app.db.Column(app.db.Integer, primary_key=True)
    Title = app.db.Column(app.db.String(128), nullable=True)
    Description = app.db.Column(app.db.String(1000), nullable=True)
    Text = app.db.Column(app.db.String(10000), nullable=True)
    Image = app.db.Column(app.db.String(1000), nullable=True)
    URL = app.db.Column(app.db.String(1000), nullable=True)
    Date = app.db.Column(app.db.DateTime, nullable=True, default=datetime.utcnow)

    def __init__(self, Title, Description, Text, Image, URL):
        self.Title = Title
        self.Description = Description
        self.Text = Text
        self.Image = Image
        self.URL = URL
        print("[Models] News created -", self.Title)

    def __repr__(self):
        return "<News %r>" % self.Title

    def __str__(self):
        return self.Title
