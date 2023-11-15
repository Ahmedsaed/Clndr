function updateScheduleInfo(data, schedule) {
  // Function to format the date as "Saturday, October 28" based on input format
  function formatDate(inputDate) {
      const months = [
          "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"
      ];
      const dateParts = inputDate.split('/');
      const day = dateParts[0];
      const month = months[parseInt(dateParts[1]) - 1];
      const year = dateParts[2];

      // Get the day of the week
      const dayOfWeek = new Date(year, parseInt(dateParts[1]) - 1, day).toLocaleDateString('en-US', { weekday: 'long' });

      return `${dayOfWeek}, ${month} ${day}`;
  }

  // Function to determine the week label
  function getWeekLabel(date) {
    const currentDate = new Date();

    // Split the date string into day, month, and year components
    const [day, month, year] = date.split('/').map(Number);

    // Create a new date object with the parsed components
    const slotDate = new Date(year, month - 1, day); // month is 0-based

    if (isNaN(slotDate.getTime())) {
        return "Invalid Date";
    }

    if (slotDate < currentDate) {
        return "This Week";
    } else if (slotDate >= currentDate && slotDate <= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)) {
        return "Next Week";
    } else {
        const weeksOut = Math.ceil((slotDate - currentDate) / (7 * 24 * 60 * 60 * 1000));
        return `${weeksOut} Week${weeksOut > 1 ? 's' : ''} Out`;
    }
  }

  // Parse the response data into an object grouped by day and week
  const timeSlotsByDayAndWeek = data.reduce((acc, slot) => {
    const day = slot.date;
    const weekLabel = getWeekLabel(slot.date);

    if (!acc[weekLabel]) {
        acc[weekLabel] = {};
    }

    if (!acc[weekLabel][day]) {
        acc[weekLabel][day] = [];
    }

    // Convert the 24-hour format to 12-hour format
    const timeParts = slot.time.split(':');
    const hour = parseInt(timeParts[0]);
    const minute = timeParts[1];
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hour % 12 || 12}:${minute} ${period}`;

    slot.time = formattedTime;

    acc[weekLabel][day].push(slot);
    return acc;
  }, {});

  // Function to sort time slots by time
  function sortTimeSlotsByTime(timeSlots) {
      return timeSlots.sort((a, b) => a.time.localeCompare(b.time));
  }

  // Loop through the parsed data and create the HTML structure
  for (const [weekLabel, days] of Object.entries(timeSlotsByDayAndWeek)) {
    const weekTemplate = document.createElement('div');
    weekTemplate.innerHTML = `<div class="week-number">${weekLabel}</div>`;

    for (const [day, timeSlots] of Object.entries(days)) {
        const dayTemplate = document.createElement('div');
        dayTemplate.innerHTML = `
            <div class="day-info">${formatDate(day)}</div>
            <div class="cal-btn-group"></div>
        `;

        const calBtnGroup = dayTemplate.querySelector('.cal-btn-group');

        const sortedTimeSlots = sortTimeSlotsByTime(timeSlots);

        sortedTimeSlots.forEach(slot => {
            const timeButton = document.createElement('button');

            timeButton.innerHTML = `
              <div>
                <div>
                  ${slot.time}
                </div>
                <div>
                  ${slot.vote_count}
                </div>
              </div>
            `
            timeButton.dataset.object = `${slot.id}`

            timeButton.addEventListener("click", (e) => {
              handleTimeSlotClick(timeButton);
            });

            calBtnGroup.appendChild(timeButton);
        });

        weekTemplate.appendChild(dayTemplate);
    }

    schedule.appendChild(weekTemplate);
  }
}

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

		let schedule = eventItem.querySelector("#schedule");
		updateScheduleInfo(event["time_slots"], schedule);

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
		updateEventInfo(data);
		addClickHandler();
	})
	.catch(function (error) {
		console.error('Error:', error);
	})
