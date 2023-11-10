from flask_login import current_user, login_required
from app import app
from flask import render_template, request, make_response, jsonify, redirect
from engine import storage

# Define a route to retrieve the dashboard page
@app.route('/api/host/events')
@login_required
def get_detailed_user_events():
    user_id = current_user.id

    events = storage.get_events_by_host_id(user_id)
   
    detailed_events = []
    for event in events:
        time_slots = storage.get_time_slots_by_event_id(event['id'])
        attendees = storage.get_attendees_by_event_id(event['id'])

        event['time_slots'] = time_slots
        event['attendees'] = attendees

        detailed_events.append(event)

    return jsonify(detailed_events)
