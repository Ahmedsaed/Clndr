from flask import Flask
from flask_login import LoginManager
import os

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')

# Initialize Flask-Login
login_manager = LoginManager()
login_manager.init_app(app)

from app import routes
from app import login
import api
