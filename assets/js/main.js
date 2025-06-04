import { initNavigation } from './navigation.js';
import { initForms } from './form-handling.js';
import { initBrochure } from './brochure.js';
import { initLightbox } from './lightbox.js';

// Initialize functionality
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initForms();
    initBrochure();
    initLightbox();

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const inquiryData = {
                type: 'inquiry',
                name: formData.get('name'),
                email: formData.get('email'),
                tour: formData.get('tour-inquiry'),
                message: formData.get('message'),
                timestamp: new Date().toISOString()
            };

            // Store in localStorage
            let inquiries = JSON.parse(localStorage.getItem('safariRushData')) || [];
            inquiries.push(inquiryData);
            localStorage.setItem('safariRushData', JSON.stringify(inquiries));

            alert(`Thank you for your inquiry, ${inquiryData.name}! We will get back to you at ${inquiryData.email}.`);
            contactForm.reset();

            // Close the modal
            const modal = document.getElementById('contact-modal');
            modal.style.display = 'none';
        });
    }
});