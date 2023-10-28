from app import app
from flask import render_template, request, make_response, jsonify


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
def get_user_details(user_details):
    return jsonify(user_file_storage)


# Define directory where available time slots are stored
time_slots_file_storage = '/test3/'

# Define a route to retrieve time slots available
@app.route('/api/time_slots/<time_slots>')
def get_time_slots(time_slots):
    return jsonify(time_slots_file_storage)