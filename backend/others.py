import core
import random
import string

from flask_mail import Message

import models


def send_welcome_email(username, email, key):
    print(email)
    msg = Message("Hyped.pl - Potwierdzenie rejestracji", recipients=[email])
    msg.body = "Witaj " + str(username) + "!\n\n" + \
               "Aby potwierdzić rejestrację kliknij w poniższy link:\n\n" + \
               "http://hyped.pl/account/activate/" + str(key) + "\n" + \
               "http://localhost:3000/account/activate/" + str(key) + "\n\n" + \
               "Pozdrawiamy,\n" + \
               "Zespół Hyped.pl"
    core.mail.send(msg)
    return "Message sent!"


def keyGenerator(stringlength=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringlength))
