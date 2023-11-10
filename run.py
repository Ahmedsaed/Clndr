#!/usr/bin/python3
"""Starts a Flask web server"""
from app import app

if __name__ == "__main__":
    app.run(debug=True, port=5000)
