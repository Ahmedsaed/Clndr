#!/usr/bin/python3
"""Starts a Flask web server"""
from app import app
app.secret_key = "abcdefghijklmnopqrstuvwxyz1234567890"

if __name__ == "__main__":
    app.run(debug=True, port=5000)
