from app import app
from flask import render_template, request, make_response, jsonify

# Define a route to retrieve HTML page
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
