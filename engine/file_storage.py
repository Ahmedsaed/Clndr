# Module that grabs any data-type stored by ID
import json, os
from uuid import uuid4

class FileStorage():
    """File Storage Class"""

    __event = None
    __host = None
    __time_slots = None
    __attendee = None

    def __init__(self):
        """Initialize the file storage"""
        self.__event = self.read_json_file('event.json')
        self.__host = self.read_json_file('host.json')
        self.__time_slots = self.read_json_file('time_slots.json')
        self.__attendee = self.read_json_file('attendee.json')

    # function that reads JSON data from file
    def read_json_file(self, filename):
        try:
            file_path = os.path.join(os.getcwd(), 'storage', 'json', filename)
            with open(file_path, 'r') as file:
                data = json.load(file)
                return data
        except(FileNotFoundError, json.JSONDecodeError) as e:
            print(f'Error reading {filename}: {str(e)}')
            return None

    def save(self):
        files = [
            (self.__event, 'event.json'),
            (self.__host, 'host.json'),
            (self.__time_slots, 'time_slots.json'),
            (self.__attendee, 'attendee.json'),
        ]

        for data, filename in files:
            try:
                file_path = os.path.join(os.getcwd(), 'storage', 'json', filename)
                with open(file_path, 'w') as file:
                    json.dump(data, file)
            except(FileNotFoundError, json.JSONDecodeError) as e:
                print(f'Error writing to {filename}: {str(e)}')

        return None

    # read different data-types
    def get_event_by_id(self, event_id):
        for event in self.__event:
            if event['id'] == event_id:
                return event
        return None

    def get_host_by_id(self, host_id):
        for host in self.__host:
            if host['id'] == host_id:
                return host
        return None

    def get_attendee_by_id(self, attendee_id):
        for attendee in self.__attendee:
            if attendee['AttendeeID'] == attendee_id:
                return attendee
        return None
    
    def get_time_slots_by_event_id(self, event_id):
        valid_time_slots = []
        for time_slot in self.__time_slots:
            if time_slot['event_id'] == event_id:
                valid_time_slots.append(time_slot)
        return valid_time_slots
    
    def get_attendees_by_event_id(self, event_id):
        attendees_info = []
        for attendee in self.__attendee:
            if attendee['event_id'] == event_id:
                attendees_info.append(attendee)
        return attendees_info
    
    def get_events_by_host_id(self, host_id):
        events_card = []
        for event in self.__event:
            if event['host_id'] == host_id:
                events_card.append(event)
        return events_card

    def update_time_slots(self, event_id, slots):
        """update time slots vote count based on user input"""
        for slot in slots:
            for ts in self.__time_slots:
                if ts['id'] == int(slot):
                    ts['vote_count'] += 1

    def add_attendee(self, event_id, attendee_name, attednee_email):
        """Add attendee to the event"""
        self.__attendee.append({
            "id": str(uuid4()),
            "name": attendee_name,
            "email": attednee_email,
            "event_id": event_id
        })

    def add_user(self, username, password, email):
        """Add user to the event and hash the password"""

        password = password # hash password here

        self.__host.append({
            "id": str(uuid4()),
            "name": username,
            "password": password,
            "email": email,
            "photo_id": 2
        })

        return self.__host[-1]['id']

    def get_user_id(self, username, password):
        """Get user ID from the database"""
        for user in self.__host:
            if user['name'] == username and user['password'] == password:
                return user['id']
        return None
