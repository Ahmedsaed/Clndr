function updateEventItem(eventItem, eventDetails) {
	const eventCard = eventItem.querySelector('.event-card');
	const eventName = eventCard.querySelector('.event-name');
	const eventLocation = eventCard.querySelector('.event-location');
	const eventDuration = eventCard.querySelector('.event-duration');
	const eventSlotCount = eventCard.querySelector('.event-slot-count');

	eventName.textContent = eventDetails.name;
	eventLocation.textContent = eventDetails.location;
	eventDuration.textContent = `${eventDetails.duration} minutes`;
	eventSlotCount.textContent = `${eventDetails.duration} time slots`;
}

const events_attendees_route = `/api/event/attendees/${event_id}`
const user_events_route = `api/host/events/${host_id}`
const expandBtns = document.querySelectorAll('.expand-btn');

expandBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		const eventItem = btn.closest('.event-item');
		eventItem.querySelector('.event-details').classList.toggle('expand');
		btn.classList.toggle('expanded');

		if (btn.classList.contains('expanded')) {
			const eventData = fetchEventData();
			const eventID = eventItem.dataset.eventID;
			const eventDetails = eventData.find(event => event.id === parseInt(eventID, 10));

			if(eventDetails) {
				updateEventItem(eventItem, eventDetails);
			}
		}
	});
});
