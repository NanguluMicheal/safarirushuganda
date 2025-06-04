export function initBooking() {
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const tour = document.getElementById('tour').value;
            const date = document.getElementById('date').value;
            const people = document.getElementById('people').value;

            alert(`Booking submitted!\nName: ${name}\nEmail: ${email}\nTour: ${tour}\nDate: ${date}\nNumber of People: ${people}`);
            form.reset();
        });
    }
}