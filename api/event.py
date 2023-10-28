from app import app
from flask import render_template, request, make_response, jsonify


# Define a route to retrieve event details
@app.route('/api/event/<event_id>')
def get_event_details(event_id):

    data = {
        "id": event_id,
        "duration": 30,
        "name": "Meeting #1",
        "description": "Awesome event",
        "location": "Online",
        "host_id": 2
    }

    return jsonify(data)


# Define a route to retrieve user details
@app.route('/api/host/<host_id>')
def get_user_details(host_id):

    data = {
        "id": host_id,
        "name": "Ahmed Saed",
        "photo_id": 2
    }

    return jsonify(data)

# Define a route to retrieve time slots available
@app.route('/api/time_slots/<event_id>')
def get_time_slots(event_id):

    data = [
        {
            "id": 1,
            "date": "1/11/2023",
            "time": "17:00",
            "vote_count": 0,
            "event_id": event_id
        },
        {
            "id": 1,
            "date": "1/11/2023",
            "time": "1:00",
            "vote_count": 0,
            "event_id": event_id
        },
        {
            "id": 1,
            "date": "1/11/2023",
            "time": "13:00",
            "vote_count": 0,
            "event_id": event_id
        },
        {
            "id": 1,
            "date": "9/11/2023",
            "time": "18:00",
            "vote_count": 0,
            "event_id": event_id
        },
        {
            "id": 1,
            "date": "20/11/2023",
            "time": "16:00",
            "vote_count": 0,
            "event_id": event_id
        },
        {
            "id": 1,
            "date": "1/12/2023",
            "time": "011:00",
            "vote_count": 0,
            "event_id": event_id
        },
        {
            "id": 1,
            "date": "1/12/2023",
            "time": "03:00",
            "vote_count": 0,
            "event_id": event_id
        },
    ]

    return jsonify(data)
