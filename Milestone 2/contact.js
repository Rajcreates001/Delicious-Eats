document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Your message has been sent! Thank you for reaching out.');
        contactForm.reset();
    });
});
