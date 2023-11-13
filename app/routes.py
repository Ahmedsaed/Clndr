from app import app
from flask import render_template, request, make_response, jsonify, session, redirect
from flask_login import LoginManager, login_user, login_required, logout_user, UserMixin, current_user
from engine import storage
from app.login import User, load_user

# Define a route to retrieve the home page
@app.route('/')
def home_page():
    return render_template('home.html')

# Define a route to retrieve the login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # Validate user credentials
        username = request.form['username']
        password = request.form['password']

        # Perform authentication and retrieve user ID if valid
        user_id = storage.get_user_id(username, password)

        if user_id is None:
            return render_template('login.html', error='Invalid username or password')

        # Log in the user
        user = User(user_id)
        login_user(user)

        return redirect('/dashboard')

    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # Retrieve form data
        print(request.form)
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        # Perform validation and store user data in the database
        user_id = storage.add_user(username, password, email)

        # Log in the user after successful registration
        user = User(user_id)
        login_user(user)

        return redirect('/dashboard')

    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    # Log out the user
    logout_user()
    return redirect('/login')

if __name__ == '__main__':
    app.run()

# Define a route to retrieve the dashboard page
@app.route('/dashboard')
@login_required
def dashboard_page():
    user_id = current_user.id

    return render_template('dashboard.html', user_id=user_id)

@app.route('/create', methods=['GET', 'POST'])
@login_required
def create_event():
    if request.method == 'POST':
        # Retrieve form data
        print(request.form)
        title = request.form['title']
        description = request.form['description']
        date = request.form['date']
        time = request.form['time']
        location = request.form['location']

        # Perform validation and store user data in the database
        event_id = storage.add_event(title, description, date, time, location)

        return redirect('/dashboard')

    return render_template('create.html')

# Define a route to retrieve event page
@app.route('/event/<event_id>')
def event_page(event_id):
    # Render the HTML template by passing the event_id to it
    return render_template('event.html', event_id=event_id)

# Define a route to retrieve the success page
@app.route('/event/submission/success')
def success_page():
    return render_template('success.html')

@app.teardown_appcontext
def on_app_teardown(exception=None):
    # Save data to disk here
    storage.save()
