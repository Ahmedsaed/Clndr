document.getElementById('create-form').addEventListener('submit', function(e) {
	e.preventDefault();
});

let selected_slots = [

];

function updateScheduleInfo(data) {
	let schedule = document.getElementById("schedule");
	schedule.innerHTML = "";

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
	const timeSlotsByDayAndWeek = data.reduce((acc, OrginalSlot) => {
	  const slot = { ...OrginalSlot };
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
	  weekTemplate.innerHTML = `<div id="week-number">${weekLabel}</div>`;

	  for (const [day, timeSlots] of Object.entries(days)) {
		  const dayTemplate = document.createElement('div');
		  dayTemplate.innerHTML = `
			  <div id="day-info">${formatDate(day)}</div>
			  <div id="cal-btn-group"></div>
		  `;

		  const calBtnGroup = dayTemplate.querySelector('#cal-btn-group');

		  const sortedTimeSlots = sortTimeSlotsByTime(timeSlots);

		  sortedTimeSlots.forEach(slot => {
			  const timeButton = document.createElement('button');

			  timeButton.innerHTML = `
				<div>
				  <div>
					${slot.time}
				  </div>
				</div>
			  `

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

function addSlot() {
	let date = document.getElementById("event-slots-date").value;
	let time = document.getElementById("event-slots-time").value;

	date = date.split("-").reverse().join("/");

	if (date && time) {
		let slot = {
			"date": date,
			"time": time
		};

		selected_slots.push(slot);
		updateScheduleInfo(selected_slots);
	}
}

function submitForm() {
	let name = document.getElementById("event-title").value;
	let description = document.getElementById("event-description").value;
	let location = document.getElementById("event-location").value;
	let duration = document.getElementById("event-duration").value;
	let slots = selected_slots;

	let data = {
		"title": name,
		"description": description,
		"duration": duration,
		"location": location,
		"slots": slots
	};

	console.log(data);

	fetch("/create", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
	}).then((response) => {
		window.location.href = response.url;
	});
}
