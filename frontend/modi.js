document.addEventListener('DOMContentLoaded', function () {

    // Header scroll effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) { // Add 'scrolled' class after 50px of scrolling
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Adjust body padding on mobile when header scrolls
        if (window.innerWidth <= 768) {
            if (window.scrollY > 50) {
                document.body.classList.add('header-scrolled');
            } else {
                document.body.classList.remove('header-scrolled');
            }
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- NEW FORM SUBMISSION HANDLING FOR BOTH FORMS ---

    const contactForm = document.getElementById('contact-form');
    const consultationForm = document.getElementById('consultation-form');

    // Attach listener to the "Get in Touch" form
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = {
                formType: 'contact',
                name: document.getElementById('name').value.trim(),
                mobile: document.getElementById('mobile').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            const submitButton = contactForm.querySelector('.submit-button');
            handleFormSubmit(formData, submitButton, 'Send Message', 'Thank you for your message! We will get in touch shortly.');
        });
    }

    // Attach listener to the "Book a Consultation" form
    if (consultationForm) {
        consultationForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = {
                formType: 'consultation',
                name: document.getElementById('consult-name').value.trim(),
                mobile: document.getElementById('consult-mobile').value.trim(),
                timing: document.getElementById('consult-timing').value
            };
            const submitButton = consultationForm.querySelector('.submit-button');
            handleFormSubmit(formData, submitButton, 'Book Appointment', 'Appointment booked successfully! We will contact you to confirm.');
        });
    }

    // Generic function to handle fetch request for both forms
    async function handleFormSubmit(data, button, originalButtonText, successMessage) {
        button.disabled = true;
        button.textContent = 'Sending...';

        // Basic validation
        for (const key in data) {
            if (!data[key]) {
                alert('Please fill out all fields.');
                button.disabled = false;
                button.textContent = originalButtonText;
                return;
            }
        }

        try {
            const response = await fetch('https://ayazbackend.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert(successMessage);
                button.form.reset(); // Reset the form the button belongs to
            } else {
                const errorText = await response.text();
                alert(`Failed to send message: ${errorText}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred while sending your message. Please check if the backend server is running.');
        } finally {
            button.disabled = false;
            button.textContent = originalButtonText;
        }
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = item.querySelector('img').src;
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Also close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Burger menu functionality
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Accordion menu for mobile
    const dropdowns = document.querySelectorAll('.nav-links .dropdown');

    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropbtn');
        button.addEventListener('click', function(e) {
            // Only run this logic if the mobile nav is active
            if (window.innerWidth <= 768) {
                e.preventDefault();
                // Close other open dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                // Toggle the clicked dropdown
                dropdown.classList.toggle('active');
            }
        });
    });
});
