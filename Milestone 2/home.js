document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    function showSlide(index) {
        if (index < 0) {
            currentIndex = carouselItems.length - 1;
        } else if (index >= carouselItems.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        carouselItems.forEach((item, i) => {
            item.style.transform = `translateX(-${currentIndex * 100}%)`;
        });
    }

    prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

    showSlide(currentIndex); // Initialize the first slide
});
