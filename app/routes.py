from app import app
from flask import render_template, request, make_response, jsonify

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
