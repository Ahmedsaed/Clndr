from app import login_manager, app
from flask_login import LoginManager, UserMixin

# User class for Flask-Login
class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

@login_manager.user_loader
def load_user(user_id):
    # Load user from the user ID
    return User(user_id)
