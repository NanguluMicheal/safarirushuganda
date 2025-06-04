export function initForms() {
    // Booking Form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        const tourSelect = document.getElementById('tour');
        const customTourDetails = document.getElementById('custom-tour-desc');
        const customTourDiv = document.getElementById('custom-tour-details');
        const charCounter = document.getElementById('char-count');

        // Show/hide custom tour description field
        tourSelect?.addEventListener('change', () => {
            if (tourSelect.value === 'Custom Tour') {
                customTourDiv.style.display = 'block';
                customTourDetails.setAttribute('required', 'true');
            } else {
                customTourDiv.style.display = 'none';
                customTourDetails.removeAttribute('required');
            }
        });

        // Character counter for custom tour description
        customTourDetails?.addEventListener('input', () => {
            const charCount = customTourDetails.value.length;
            charCounter.textContent = charCount;
            if (charCount < 10 && tourSelect.value === 'Custom Tour') {
                customTourDetails.setCustomValidity('Please enter at least 10 characters.');
            } else {
                customTourDetails.setCustomValidity('');
            }
        });

        // Handle booking form submission
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(bookingForm);
            const bookingData = {
                type: 'booking',
                name: formData.get('client-name'),
                email: formData.get('client-email'),
                phone: formData.get('client-phone'),
                tour: formData.get('tour'),
                customTourDesc: formData.get('custom-tour-desc') || 'N/A',
                date: formData.get('date'),
                guests: formData.get('guests'),
                message: formData.get('message') || 'N/A',
                timestamp: new Date().toISOString()
            };

            // Store in localStorage
            let bookings = JSON.parse(localStorage.getItem('safariRushData')) || [];
            bookings.push(bookingData);
            localStorage.setItem('safariRushData', JSON.stringify(bookings));

            // Show confirmation
            let confirmationMessage = `
                Thank you for your booking, ${bookingData.name}!
                Tour: ${bookingData.tour}
                Date: ${bookingData.date}
                Guests: ${bookingData.guests}
                Email: ${bookingData.email}
                Phone: ${bookingData.phone}
            `;
            if (bookingData.tour === 'Custom Tour') {
                confirmationMessage += `\nCustom Tour Description: ${bookingData.customTourDesc}`;
            }
            if (bookingData.message !== 'N/A') {
                confirmationMessage += `\nMessage: ${bookingData.message}`;
            }
            alert(confirmationMessage);

            bookingForm.reset();
            customTourDiv.style.display = 'none';
            charCounter.textContent = '0';
        });
    }
}