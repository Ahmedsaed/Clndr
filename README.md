# Clndr

Group Meeting Scheduler

## Introduction
Clndr is a web application that allows users to create events and invite participants to select their availability. The event creator can then view the most selected time slot and location to schedule the event.

- Deployed Site: [Link to your deployed site](insert_link_here)
- Final Project Blog Article: [Link to your blog article](insert_link_here)
- Author(s) LinkedIn: [Ahmed Saed](insert_link_here), [Adham Essam](insert_link_here)

## Installation
1. Clone the repository
2. Run `pip install -r requirements.txt`
3. Run `python run.py`
4. Open `http://localhost:5000/` in your browser

## Usage
- Open http://localhost:5000/ in your browser
- Login/Register an account
- Visit the dashboard to view created events or create new events
- share your event link with your attendees

## Contributing
We welcome contributions! If you'd like to contribute to Clndr, please follow these steps:

1. Fork the repository
2. Create a new branch
3. Make your changes and commit them
4. Submit a pull request

## Related Projects
- Calendly
- Doodle
- Cal.com

## Licensing
This project is licensed under the GPL-3.0 License - see the [LICENSE.md](https://www.gnu.org/licenses/gpl-3.0.html#license-text) file for details.

## TODOs
- [X] Design and implement the landing page
	- [X] update `Meeting` Word with other words (e.g. Event, Gathering, etc.) in a smooth transition
	- [ ] shuffle through project pictures in feature section (while highlighting the feature text)
	- [X] add a navigation bar
- [X] implement dashboard to show events created by user
	- [X] Frontend design is implemented (needs to be connected to backend)
	- [X] Apply rotation transition to the expand button icon
	- [X] view event details
	- [X] view most selected time slot
	- [X] view event location and duration
	- [X] expand the event to view all time slots and participants
- [X] implement event creation page
	- [X] add event name
	- [X] add event location
	- [X] add event duration
	- [X] add event time slots
	- [X] add event description
	- [ ] add remove button to each time slot
	- [ ] validate each time slot before adding it (duration and duplication)
- [X] Refactor html templates to use jinja2 inheritance
	- [X] create base template (header, footer, etc.)
	- [X] update child templates for each page
	- [X] add logout and navigation buttons to the header in base template
- [ ] add the ability to upload user profile picture in registration page
	- [ ] update storage and api to handle profile pictures
- [ ] Update the login/register website to switch based on user actions
	- [ ] change the page title
	- [ ] select the correct form
- [ ] add a favcon
- [ ] add Download button in attendee page (to download csv file of attendees)
- [ ] Handle event duration in hours
- [ ] Hash passwords before storing in database
- [ ] validate password requirements
- [ ] implement password reset
- [ ] implement a tooltip to show participants' names when hovering over a time slot


