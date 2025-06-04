export function initBrochure() {
    const downloadButton = document.getElementById('download-brochure');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Add content to the PDF
            doc.setFontSize(20);
            doc.text('Safari Rush Uganda Brochure', 20, 20);

            doc.setFontSize(12);
            doc.text('Discover the Pearl of Africa with Unforgettable Safari Tours', 20, 30);

            doc.setFontSize(16);
            doc.text('Our Tours:', 20, 50);
            doc.setFontSize(12);
            doc.text('Gorilla Trekking Adventure - $1,200 (3 Days)', 20, 60);
            doc.text('Savanna Safari Experience - $900 (4 Days)', 20, 70);
            doc.text('Nile River Adventure - $500 (2 Days)', 20, 80);
            doc.text('Murchison Falls Safari - $800 (3 Days)', 20, 90);
            doc.text('Kidepo Valley Wilderness - $1,500 (5 Days)', 20, 100);
            doc.text('Lake Mburo Getaway - $400 (2 Days)', 20, 110);
            doc.text('Cultural Immersion Tour - $700 (4 Days)', 20, 120);
            doc.text('Birdwatching Extravaganza - $1,000 (5 Days)', 20, 130);
            doc.text('Mount Elgon Hiking Expedition - $850 (4 Days)', 20, 140);

            doc.setFontSize(16);
            doc.text('Contact Us:', 20, 160);
            doc.setFontSize(12);
            doc.text('Phone: +256 779 122 114', 20, 170);
            doc.text('Email: info@safarirush.com', 20, 180);
            doc.text('Address: 4D Airport Road, Entebbe', 20, 190);

            // Save the PDF
            doc.save('SafariRushUganda_Brochure.pdf');
        });
    }
}