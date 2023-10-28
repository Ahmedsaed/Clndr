// Function called when a time-slot is clicked
function handleTimeSlotClick(slot) {
    // Grabs the counter for the clicked time slot, updates it with an increment.
    const counterElement = slot.querySelector('.slot-counter');
    const count = parseInt(counterElement.textContent, 10);
    const newCount = count + 1;
    counterElement.textContent = newCount;
}
