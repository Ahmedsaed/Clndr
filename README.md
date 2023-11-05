# Clndr

Group Meeting Scheduler

## Description
Clndr is a web application that allows users to create events and invite participants to select their availability. The event creator can then view the most selected time slot and location to schedule the event.

## How to contribute
1. Clone the repository
2. run `pip install -r requirements.txt`
3. run `python run.py`
4. open `http://localhost:5000/` in your browser

## TODOs
- [ ] implement dashboard to show events created by user
	- [X] Frontend design is implemented (needs to be connected to backend)
	- [ ] Apply rotation transition to the expand button icon
	- [ ] view event details
	- [ ] view most selected time slot
	- [ ] view event location and duration
	- [ ] expand the event to view all time slots and participants
- [ ] implement event creation page
	- [ ] add event name
	- [ ] add event location
	- [ ] add event duration
	- [ ] add event time slots
	- [ ] add event description
- [ ] Refactor html templates to use jinja2 inheritance
	- [ ] create base template (header, footer, etc.)
	- [ ] create child templates for each page
	- [ ] add logout and navigation buttons to the header in base template
- [ ] add the ability to upload user profile picture in registration page
	- [ ] update storage and api to handle profile pictures
- [ ] add Download button in attendee page (to download csv file of attendees)
- [ ] Handle event duration in hours
- [ ] Hash passwords before storing in database
- [ ] validate password requirements
- [ ] implement password reset
- [ ] implement a tooltip to show participants' names when hovering over a time slot
