function updateEventInfo(events) {
	for(const event of events) {
		const template = document.getElementById("event-template");
		
		const eventItem = template.content.cloneNode(true).querySelector(".event-item");
	
		eventItem.querySelector(".event-name").textContent = event.name;
		eventItem.querySelector(".event-location").textContent = event.location;
		eventItem.querySelector(".event-duration").textContent = event.duration + " minutes";
		eventItem.querySelector(".event-slot-count").textContent = event.time_slots.length + " time slots";
		eventItem.querySelector(".n-attendees").textContent = "Attendees: " + event.attendees.length;

		const topVote = eventItem.querySelector(".top-vote");
		if (event.time_slots.length > 0) {
			const topTimeSlot = event.time_slots[0];
			topVote.textContent = `Top Vote: ${topTimeSlot.date}, ${topTimeSlot.time}`;
		}

		const schedule = eventItem.querySelector("#schedule");

        schedule.innerHTML = "";

        event.time_slots.forEach(timeSlot => {
			const mainDiv = document.createElement("div");


			
            const dayInfo = `${timeSlot.date}, ${timeSlot.time}`;
            const button = document.createElement("button");
            button.dataset.object = timeSlot.id;

            const timeSlotDiv = document.createElement("div");
            timeSlotDiv.textContent = timeSlot.time;
            const voteCountDiv = document.createElement("div");
            voteCountDiv.textContent = timeSlot.vote_count;

            button.appendChild(timeSlotDiv);
            button.appendChild(voteCountDiv);

            const calBtnGroup = eventItem.querySelector(".cal-btn-group");
            calBtnGroup.appendChild(button);

            const dayElement = document.createElement("div");
            dayElement.classList.add("day-info");
            dayElement.textContent = dayInfo;

            const newWeekNumber = document.createElement("div");
            newWeekNumber.classList.add("week-number");
            newWeekNumber.textContent = "This Week";

            const newDayContainer = document.createElement("div");
            newDayContainer.appendChild(newWeekNumber);
            newDayContainer.appendChild(dayElement);
            newDayContainer.appendChild(calBtnGroup);

            const newScheduleContainer = document.createElement("div");
            newScheduleContainer.appendChild(newDayContainer);

            schedule.appendChild(newScheduleContainer);
        });

		const attendeesList = eventItem.querySelector("#attendees-list");
		
		event.attendees.forEach(attendee => {
			const attendeeRow = document.createElement("tr");
			const nameCell = document.createElement("td");
			const emailCell = document.createElement("td");
			nameCell.textContent = attendee.name;
			emailCell.textContent = attendee.email;
			attendeeRow.appendChild(nameCell);
			attendeeRow.appendChild(emailCell);
			attendeesList.querySelector("tbody").appendChild(attendeeRow);
		});

		const eventsContainer = document.getElementById("window-body");
		eventsContainer.appendChild(eventItem);
	}
}

function addClickHandler() {
	const expandBtns = document.querySelectorAll('.expand-btn');
	expandBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			const eventItem = btn.closest('.event-item');
			eventItem.querySelector('.event-details').classList.toggle('expand');
			btn.classList.toggle('expanded');
		});
	});
}

fetch(`/api/host/events`)
	.then(function (response) {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.json();
	})
	.then(function (data) {
		console.log(data);
		updateEventInfo(data);
		addClickHandler();
	})
	.catch(function (error) {
		console.error('Error:', error);
	})
