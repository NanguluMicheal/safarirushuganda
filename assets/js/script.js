// Tour package data (used for brochure generation)
const tourPackages = [
    {
        name: "Gorilla Trekking Adventure",
        description: "Embark on a thrilling trek through Bwindi Impenetrable Forest to observe endangered mountain gorillas in their natural habitat. This 3-day adventure includes gorilla permits, expert trackers, and a visit to a local Batwa community. Accommodation is provided in cozy forest lodges, with meals featuring Ugandan cuisine. Highlights include a one-hour gorilla encounter and scenic hikes through lush landscapes.",
        duration: "3 Days",
        price: "$1,200 per person"
    },
    {
        name: "Savanna Safari Experience",
        description: "Explore Queen Elizabeth National Park on this 4-day safari, featuring morning and evening game drives to spot lions, elephants, leopards, and more. Enjoy a boat cruise along the Kazinga Channel for hippo and crocodile sightings. Stay in luxury lodges or tented camps with stunning savanna views, all meals included, and a guided bush walk to enhance your wildlife experience.",
        duration: "4 Days",
        price: "$900 per person"
    },
    {
        name: "Nile River Adventure",
        description: "Experience the thrill of the Nile River in Jinja with this 2-day adventure. Activities include white-water rafting on Grade 5 rapids, a boat trip to the Nile’s source, and optional bungee jumping. Accommodation is in riverside cabins with breakfast and dinner provided. Perfect for adrenaline seekers looking for a short, action-packed getaway.",
        duration: "2 Days",
        price: "$500 per person"
    },
    {
        name: "Murchison Falls Safari",
        description: "Witness the awe-inspiring Murchison Falls, where the Nile squeezes through a narrow gorge. This 3-day safari includes boat safaris to the falls’ base, game drives in Murchison Falls National Park to see giraffes and buffalo, and a hike to the top for panoramic views. Stay in comfortable lodges with all meals included, guided by experts in Uganda’s wildlife.",
        duration: "3 Days",
        price: "$800 per person"
    },
    {
        name: "Kidepo Valley Wilderness",
        description: "Journey to the remote Kidepo Valley National Park for a 5-day wilderness escape. Enjoy game drives to spot cheetahs, ostriches, and rare antelopes, plus visits to the Karamojong community for cultural insights. Accommodation ranges from luxury lodges to tented camps under starry skies, with all meals provided. Ideal for those seeking an off-the-beaten-path adventure.",
        duration: "5 Days",
        price: "$1,500 per person"
    },
    {
        name: "Lake Mburo Getaway",
        description: "Unwind on this 2-day retreat to Lake Mburo National Park. Highlights include horseback safaris among zebras and impalas, a boat ride on Lake Mburo to spot hippos, and guided nature walks. Stay in charming lakeside cottages with meals included, offering a peaceful escape with stunning scenery and abundant birdlife.",
        duration: "2 Days",
        price: "$400 per person"
    },
    {
        name: "Cultural Immersion Tour",
        description: "Dive into Uganda’s vibrant heritage with this 4-day cultural tour. Visit Kampala’s historical sites like the Kasubi Tombs, participate in traditional dance and craft workshops in Jinja, and spend a day in a rural Mbale village learning farming techniques. Accommodation is in boutique guesthouses, with all meals featuring local dishes like matoke. A perfect blend of history, culture, and community engagement.",
        duration: "4 Days",
        price: "$700 per person"
    },
    {
        name: "Birdwatching Extravaganza",
        description: "Discover Uganda’s avian wonders on this 5-day birdwatching tour, targeting over 1,000 species. Explore Mabamba Swamp for the Shoebill Stork, Kibale Forest for forest birds, and Queen Elizabeth National Park’s Kazinga Channel. Stay in eco-lodges with expert birding guides, binoculars provided, and all meals included. Ideal for enthusiasts eager to tick off rare species.",
        duration: "5 Days",
        price: "$1,000 per person"
    },
    {
        name: "Mount Elgon Hiking Expedition",
        description: "Conquer Mount Elgon on this 4-day hiking expedition, featuring trails through bamboo forests, caves, and moorlands. Reach the Wagagai Peak (4,321m) for breathtaking views, with stops at Sipi Falls for relaxation. Accommodation includes mountain camps and lodges, with porters, guides, and hearty meals provided. A challenging yet rewarding adventure for nature lovers.",
        duration: "4 Days",
        price: "$850 per person"
    }
];

// Company information for the brochure
const companyInfo = {
    name: "Safari Rush Uganda",
    address: "4D Airport Road, Entebbe",
    phone: "+256 779 122 114",
    email: "info@safarirush.com",
    website: "https://safarirushuganda.com",
    socialMedia: { facebook: "https://facebook.com/safarirush", twitter: "https://twitter.com/safarirush", instagram: "https://instagram.com/safarirush" }
};

// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a:not(.open-modal)').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const scrollPosition = window.scrollY;
        heroBackground.style.transform = `scale(1.1) translateY(${scrollPosition * 0.3}px)`;
    }
});

// Modal functionality
const modal = document.getElementById('contact-modal');
const openModal = document.querySelector('.open-modal');
const closeModal = document.querySelector('.close-modal');

if (openModal && modal && closeModal) {
    openModal.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill out all fields.');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            alert('Please enter a valid email address.');
        }
    });
}

// Booking form: Show/hide custom tour details and character counter
const tourSelect = document.getElementById('tour');
const customTourDetails = document.getElementById('custom-tour-details');
const customTourDesc = document.getElementById('custom-tour-desc');
const charCountSpan = document.getElementById('char-count');

if (tourSelect && customTourDetails) {
    tourSelect.addEventListener('change', function() {
        if (this.value === 'Custom Tour') {
            customTourDetails.style.display = 'block';
        } else {
            customTourDetails.style.display = 'none';
            if (customTourDesc) customTourDesc.value = ''; // Reset textarea
            if (charCountSpan) charCountSpan.textContent = '0'; // Reset counter
        }
    });
}

if (customTourDesc && charCountSpan) {
    customTourDesc.addEventListener('input', function() {
        charCountSpan.textContent = this.value.length;
    });
}

// Booking form validation and calendar restriction
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('client-name').value.trim();
        const email = document.getElementById('client-email').value.trim();
        const phone = document.getElementById('client-phone').value.trim();
        const tour = document.getElementById('tour').value;
        const customTourDesc = document.getElementById('custom-tour-desc')?.value.trim();
        const date = document.getElementById('date').value;
        const guests = document.getElementById('guests').value;

        if (!name || !email || !phone || !tour || !date || !guests) {
            alert('Please fill out all fields.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (!/^\+?\d{7,15}$/.test(phone)) {
            alert('Please enter a valid phone number (7-15 digits, optional + at the start).');
            return;
        }

        if (tour === 'Custom Tour' && (!customTourDesc || customTourDesc.length < 10)) {
            alert('Please provide a detailed description of your custom tour (at least 10 characters).');
            return;
        }

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert('Please select a future date for your booking.');
            return;
        }

        let confirmationMessage = `Booking successful!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nTour: ${tour}\n`;
        if (tour === 'Custom Tour') {
            confirmationMessage += `Custom Tour Details: ${customTourDesc}\n`;
        }
        confirmationMessage += `Date: ${date}\nGuests: ${guests}`;
        alert(confirmationMessage);
    });

    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Brochure generation
document.querySelectorAll('#download-brochure').forEach(button => {
    button.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.setFontSize(20);
        doc.setTextColor(245, 166, 35);
        doc.text(companyInfo.name, 20, 20);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Address: ${companyInfo.address}`, 20, 30);
        doc.text(`Phone: ${companyInfo.phone}`, 20, 40);
        doc.text(`Email: ${companyInfo.email}`, 20, 50);
        doc.text(`Website: ${companyInfo.website}`, 20, 60);
        doc.text("Social Media:", 20, 70);
        doc.text(`Facebook: ${companyInfo.socialMedia.facebook}`, 20, 80);
        doc.text(`Twitter: ${companyInfo.socialMedia.twitter}`, 20, 90);
        doc.text(`Instagram: ${companyInfo.socialMedia.instagram}`, 20, 100);

        doc.setFontSize(16);
        doc.setTextColor(245, 166, 35);
        doc.text("Our Tour Packages", 20, 120);

        let yPosition = 130;
        tourPackages.forEach((tour, index) => {
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(`${index + 1}. ${tour.name}`, 20, yPosition);
            // Split description into multiple lines if it's too long
            const descriptionLines = doc.splitTextToSize(`Description: ${tour.description}`, 170);
            doc.text(descriptionLines, 20, yPosition + 10);
            const descriptionHeight = descriptionLines.length * 10;
            doc.text(`Duration: ${tour.duration}`, 20, yPosition + 10 + descriptionHeight);
            doc.text(`Price: ${tour.price}`, 20, yPosition + 20 + descriptionHeight);
            yPosition += 30 + descriptionHeight;
            if (yPosition > 260) {
                doc.addPage();
                yPosition = 20;
            }
        });

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on ${new Date().toLocaleDateString()}`, 20, yPosition + 20);

        doc.save('SafariRushUganda_Brochure.pdf');
    });
});