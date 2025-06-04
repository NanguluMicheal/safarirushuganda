export function initModal() {
    const openModalButtons = document.querySelectorAll('.open-modal');
    const modal = document.querySelector('#contact-modal');
    const closeModal = document.querySelector('.close-modal');
    const contactForm = document.querySelector('#contact-form');

    openModalButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#contact-message').value;

        alert(`Thank you for your message, ${name}!\nWe'll get back to you at ${email}.\nYour message: ${message}`);

        contactForm.reset();
        modal.style.display = 'none';
    });
}