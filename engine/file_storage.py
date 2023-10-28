#!/usr/bin/python3
"""
Contains the FileStorage class
"""

import json
from hashlib import md5

class FileStorage:
    """serializes instances to a JSON file & deserializes back to instances"""

    # string - path to the JSON file
    __file_path = "file.json"
    # dictionary - empty but will store all objects
    __objects = {}
