export function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.textContent = navLinks.classList.contains('active') ? '✖' : '☰';
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.textContent = '☰';
        });
    });

    // Handle modal for contact link
    const contactLink = document.querySelector('.open-modal');
    const modal = document.getElementById('contact-modal');
    const closeModal = document.querySelector('.close-modal');

    contactLink?.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeModal?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}