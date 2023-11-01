// Client Side Logic

let base_url = "http://127.0.0.1:5000";
let selected_slots = [];
let nextBtn = document.getElementById("schedule-options").children[1];
let submitBtn = document.getElementById("submit-btn");

function updateEventInfo(data) {
	let event_name = document.getElementById("event-name");
  let [event_duration, event_location] = document.getElementById("event-info").children;
  let event_description = document.getElementById("event-description").children[0];

  event_name.textContent = data["name"]
  event_duration.textContent = data["duration"] + " minutes"
  event_location.textContent = data['location']
  event_description.textContent = data['description']
}

function updateUserInfo(data) {
  let [host_photo, host_name] = document.getElementById("user-info").children

  host_name.textContent = data["name"]
  host_photo.src = `${base_url}/static/images/${data["photo_id"]}.png`
}

// Function called when a time-slot is clicked
function handleTimeSlotClick(slot) {
  // Grabs the counter for the clicked time slot, updates it with an increment.
  const counterElement = slot.children[0].children[1];
  const selectedSlots1Counter = document.getElementById("selected-slots-1");
  const selectedSlots2Counter = document.getElementById("selected-slots-2");
  let slot_object = slot.dataset.object;

  if (selected_slots.indexOf(slot_object) == -1) {
    const count = parseInt(counterElement.textContent, 10);
    const newCount = count + 1;
    counterElement.textContent = newCount;
    selected_slots.push(slot_object);
  }
  else {
    const count = parseInt(counterElement.textContent, 10);
    const newCount = count - 1;
    counterElement.textContent = newCount;
    selected_slots.splice(selected_slots.indexOf(slot_object), 1);
  }

  slot.classList.toggle("clicked");

  selectedSlots1Counter.textContent = `${selected_slots.length} times selected`
  selectedSlots2Counter.textContent = `${selected_slots.length} times selected`
}

function updateScheduleInfo(data) {
  let schedule = document.getElementById("schedule");

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

function setupEventListeners() {
  nextBtn.addEventListener("click", () => {
    let event_calendar = document.getElementById("event-calendar");
    let event_form = document.getElementById("event-form");

    event_calendar.style.opacity = 0;

    setTimeout(() => {
      event_calendar.classList.toggle("hidden");
      event_form.classList.toggle("hidden");
    }, 500);
  })

  submitBtn.addEventListener("click", () => {
    let attendee_name = document.getElementById("name");
    let attendee_email = document.getElementById("email");

    data = {
      "attendee_name": attendee_name.value,
      "attendee_email": attendee_email.value,
      "selected_slots": selected_slots,
      "event_id": event_id
    }

    fetch(`/api/event/submission`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        console.log(response.json())
      })
  })
}

fetch(`/api/event/${event_id}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

	  return response.json();
  })
  .then(data => {
    updateEventInfo(data)
    return fetch(`/api/host/${data["host_id"]}`)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    updateUserInfo(data)
    return fetch(`/api/time_slots/${event_id}`)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    updateScheduleInfo(data);
    setupEventListeners();
  })
  .catch(error => {
    console.error('Error:', error);
  });
