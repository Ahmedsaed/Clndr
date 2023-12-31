from app import app
from flask import render_template, request, make_response, jsonify, redirect
from engine import storage


@app.route('/api/event/<event_id>')
def get_event_details(event_id):
    """Define a route to retrieve event details"""
    data = storage.get_event_by_id(event_id)

    return jsonify(data)

@app.route('/api/event/attendees/<int:host_id>')
def get_event_attendees(event_id):
    """Define a route to retrieve details of attendees of events"""
    data = storage.get_attendees_by_event_id(event_id)

    return jsonify(data)

@app.route('/api/host/<host_id>')
def get_user_details(host_id):
    """Define a route to retrieve user details"""
    data = storage.get_host_by_id(host_id)

    print(data)

    return jsonify(data)

@app.route('/api/time_slots/<event_id>')
def get_time_slots(event_id):
    """Define a route to retrieve time slots available"""
    data = storage.get_time_slots_by_event_id(event_id)

    return jsonify(data)


@app.route("/api/event/submission", methods=["POST"])
def update_event_pool():
    data = request.get_json()

    storage.update_time_slots(data['event_id'], data['selected_slots'])
    storage.add_attendee(data['event_id'], data['attendee_name'], data['attendee_email'])

    return redirect('/event/submission/success')
