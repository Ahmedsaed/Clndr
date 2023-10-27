from app import app
from flask import render_template, request, make_response, jsonify

# Define a route to retrieve HTML page
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

# Define a route to retrieve event page
@app.route('/event/<event_id>')
def event_page(event_id):
    # Render the HTML template by passing the event_id to it
    html_content = render_template('event.html', event_id=event_id)

    # Create a response
    response = make_response(html_content)

    # Set the event ID in the custom response header
    response.headers['X-Event-ID'] = event_id

    return response


# Define directory where event details are stored
event_file_storage = '/test/'

# Define a route to retrieve event details
@app.route('/api/event/<event_id>')
def get_event_details(event_id):
    return jsonify(event_file_storage)


# Define directory where user details are stored
user_file_storage = '/test2/'

# Define a route to retrieve user details
@app.route('/api/user/<user_details>')
def get_user_details(user_id):
    return jsonify(user_file_storage)


# Define directory where available time slots are stored
time_slots_file_storage = '/test3/'

# Define a route to retrieve time slots available
@app.route('/api/time_slots/<time_slots>')
def get_time_slots(time_slots):
    return jsonify(time_slots_file_storage)
