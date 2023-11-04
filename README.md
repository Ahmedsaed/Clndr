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
- [ ] Hash passwords before storing in database
- [ ] validate password requirements
- [ ] implement password reset
- [ ] implement a tooltip to show participants' names when hovering over a time slot
