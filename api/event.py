from app import app
from flask import render_template, request, make_response, jsonify
from engine.file_storage import get_event_by_id, get_host_by_id, get_time_slots_by_event_id, get_attendee_by_id


# Define a route to retrieve event details
@app.route('/api/event/<int:event_id>')
def get_event_details(event_id):

    data = get_event_by_id(event_id)

    return jsonify(data)


# Define a route to retrieve user details
@app.route('/api/host/<int:host_id>')
def get_user_details(host_id):

    data = get_host_by_id(host_id)

    return jsonify(data)

# Define a route to retrieve time slots available
@app.route('/api/time_slots/<int:event_id>')
def get_time_slots(event_id):

    data = get_time_slots_by_event_id(event_id)

    print(data)

    return jsonify(data)
