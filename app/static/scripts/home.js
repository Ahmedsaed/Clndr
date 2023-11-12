document.addEventListener('DOMContentLoaded', function () {
    const words = document.querySelectorAll('.header-word');
    let currentIndex = 0;

    function showNextWord() {
        const currentWord = words[currentIndex];
		currentWord.style.opacity = 0;

        currentIndex = (currentIndex + 1) % words.length;

		setTimeout(() => {
			currentWord.classList.add('hidden');
			const nextWord = words[currentIndex];
			nextWord.classList.remove('hidden');
			nextWord.style.opacity = 1;
		}, 500)

        setTimeout(showNextWord, 2000); // Change word every 2 seconds (adjust as needed)
    }

    // Initial setup
    setTimeout(showNextWord, 2000); // Start the animation
});
