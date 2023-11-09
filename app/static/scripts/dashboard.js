const expandBtns = document.querySelectorAll('.expand-btn');

expandBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		btn
		.parentNode
		.parentNode
		.querySelectorAll('.event-details')[0]
		.classList.toggle('expand');

		btn.classList.toggle('expanded');
	});
});
