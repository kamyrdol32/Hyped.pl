import app
import random
import string

from flask_mail import Message


def send_welcome_email(username, email, key):
    msg = Message("Hyped.pl - Potwierdzenie rejestracji", recipients=[email])
    msg.body = (
        "Witaj "
        + str(username)
        + "!\n\n"
        + "Aby potwierdzić rejestrację kliknij w poniższy link:\n\n"
        + "http://hyped.kamilzeglen.pl/account/activate/"
        + str(key)
        + "\n\n"
        + "Pozdrawiamy,\n"
        + "Zespół Hyped.pl"
    )
    app.mail.send(msg)
    return "Message sent!"


def send_forgot_email(username, email, key, password):
    msg = Message("Hyped.pl - Reset hasła", recipients=[email])
    msg.body = (
        "Witaj "
        + str(username)
        + "!\n\n"
        + "Twoje konto zostało zresetowane:\n\n"
        + "http://hyped.pl/account/activate/"
        + str(key)
        + "\n"
        + "http://87.207.92.40:3000/account/activate/"
        + str(key)
        + "\n\n"
        + "Nowo wygenerowane hasło: "
        + str(password)
        + "\n\n"
        + "Pozdrawiamy,\n"
        + "Zespół Hyped.pl "
    )
    app.mail.send(msg)
    return "Message sent!"


def keyGenerator(stringlength=10):
    letters = string.ascii_lowercase
    return "".join(random.choice(letters) for i in range(stringlength))


def passwordGenerator(stringlength=32):
    letters = string.ascii_lowercase
    return "".join(random.choice(letters) for i in range(stringlength))
