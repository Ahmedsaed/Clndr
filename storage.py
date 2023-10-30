# Module that grabs any data-type stored by ID
import json, os

# function that reads JSON data from file
def read_json_file(filename):
    try:
        file_path = os.path.join('storage', filename)
        with open(file_path, 'r') as file:
            data = json.load(file)
        return data
    except(FileNotFoundError, json.JSONDecodeError) as e:
        print(f'Error reading {filename}: {str(e)}')
        return None
    
# read different data-types
def get_event_by_id(event_id):
    events = read_json_file('events.json')
    for event in events:
        if event['EventID'] == event_id:
            return event
        return None

def get_host_by_id(host_id):
    hosts = read_json_file('host.join')
    for host in hosts:
        if host['UserID'] == host_id:
            return host
        return None

def get_time_slots_by_id(time_slot_id):
    time_slots = read_json_file('time_slots.json')
    for time_slot in time_slots:
        if time_slot['SlotID'] == time_slot_id:
            return time_slot
        return None

def get_attendee_by_id(attendee_id):
    attendees = read_json_file('attendee.json')
    for attendee in attendees:
        if attendee['AttendeeID'] == attendee_id:
            return attendee
        return None
