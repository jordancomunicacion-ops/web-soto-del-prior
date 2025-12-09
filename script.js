console.log('Soto del Prior: Script Loaded');

document.addEventListener('DOMContentLoaded', () => {
    const scroller = document.querySelector('.horizontal-scroller');

    if (!scroller) {
        console.error('Soto del Prior: Scroller element not found');
        return;
    }

    // --- 1. Vertical to Horizontal Scroll Mapping ---
    window.addEventListener('wheel', (evt) => {
        // If specific horizontal scroll is detected (e.g. trackpad), let it happen naturally
        if (Math.abs(evt.deltaX) > Math.abs(evt.deltaY)) {
            return;
        }

        // Only hijack vertical scrolling
        if (Math.abs(evt.deltaY) > 0) {
            evt.preventDefault();

            scroller.scrollBy({
                left: evt.deltaY * 3,
                behavior: 'auto'
            });
        }
    }, { passive: false });


    // --- 2. Navigation Handling (Smooth Scroll to Section) ---

    // Helper function to scroll to specific position
    const scrollToPosition = (leftPosition) => {
        scroller.scrollTo({
            left: leftPosition,
            behavior: 'smooth'
        });
    };

    // A. Logo "Back to Start" Logic
    const logoLink = document.querySelector('.logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent jump
            scrollToPosition(0); // Scroll to very beginning
        });
    }

    // B. General Navigation Links (Anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href').substring(1);
            if (!targetId) return;

            // NO check for 'contacto' here, so it scrolls normally to the footer

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                scrollToPosition(targetSection.offsetLeft);
            }
        });
    });

    // --- 3. Contact Modal Logic ---
    const contactModal = document.getElementById('contact-modal');
    // Targeted selector for the specific email icon
    const contactTrigger = document.getElementById('trigger-contact-modal');
    // New trigger for 'Organizar Evento' button
    const eventTrigger = document.getElementById('trigger-event-modal');

    const closeModalBtn = document.getElementById('close-modal');
    const contactForm = document.getElementById('contact-form');
    const captchaQuestion = document.getElementById('captcha-question');
    const captchaInput = document.getElementById('captcha-input');

    let captchaAnswer = 0;

    const generateCaptcha = () => {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        captchaAnswer = num1 + num2;
        if (captchaQuestion) {
            captchaQuestion.textContent = `${num1} + ${num2}`;
        }
        if (captchaInput) {
            captchaInput.value = ''; // Clear previous input
        }
    };

    const openModal = (e) => {
        e.preventDefault();
        generateCaptcha();
        if (contactModal) contactModal.classList.remove('hidden');
    };

    const closeModal = () => {
        if (contactModal) contactModal.classList.add('hidden');
    };

    // Only attach the modal opener to the specific icon
    if (contactTrigger) {
        contactTrigger.addEventListener('click', openModal);
    }

    // Attach to the event button
    if (eventTrigger) {
        eventTrigger.addEventListener('click', openModal);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close on click outside
    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });
    }

    // Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userAnswer = parseInt(captchaInput.value);
            if (userAnswer !== captchaAnswer) {
                alert('Captcha incorrecto. Por favor, inténtalo de nuevo.');
                generateCaptcha();
                return;
            }

            // Gather Data
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            // Construct Mailto (Client-side "send")
            const subject = `Nuevo mensaje de contacto de ${name}`;
            const body = `Nombre: ${name}%0D%0ACorreo: ${email}%0D%0AMensaje:%0D%0A${message}`;

            window.location.href = `mailto:info@sotodelprior.com?subject=${subject}&body=${body}`;

            // Feedback and close
            closeModal();
            contactForm.reset();
        });
    }

});
