document.addEventListener('DOMContentLoaded', () => {

    /**----------- Toggle icon and navbar (Hamburger Menu)------------- */
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };
    }

    /**----------- Scroll sections active link and sticky header------------- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('header nav a');
    const header = document.querySelector('header');

    const handleScroll = () => {
        // --- Sticky Header Logic ---
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 100);
        }

        // --- Active Link on Scroll Logic ---
        let currentSectionId = '';
        sections.forEach(sec => {
            const top = window.scrollY;
            const offset = sec.offsetTop - 150;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                currentSectionId = id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });

        /**----------- Remove toggle icon and navbar when scrolling------------- */
        if (menuIcon && navbar) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        }
    };

    window.addEventListener('scroll', handleScroll);


    /**======================= Scroll Reveal =======================*/
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal({
            distance: '80px',
            duration: 2000,
            delay: 200
        });

        ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
        ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact-real form', { origin: 'bottom' });
        ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
        ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
    }

    /**======================= Typed JS =======================*/
    const typedElement = document.querySelector('.multiple-text');
    if (typeof Typed !== 'undefined' && typedElement) {
        const typed = new Typed('.multiple-text', {
            strings: ['Frontend Developer', 'Web Designer', 'Software Engineer'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    /**======================= Contact Form Validation and Submission =======================*/
    const form = document.querySelector(".contact-real form");

    // --- THIS IS THE CRITICAL FIX ---
    // Only run form logic if the form element actually exists on the page
    if (form) {
        const fullName = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const subject = document.getElementById("subject");
        const mess = document.getElementById("message");

        const sendEmail = () => {
            const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}<br>`;

            email.send({
                SecureToken: "ccf5e38e-3858-46a3-9424-619babbfe784", // This token is public. For a real app, use a backend.
                To: 'soumahyamoussa28@gmail.com',
                From: "soumahyamoussa28@gmail.com",
                Subject: subject.value,
                Body: bodyMessage
            }).then(message => {
                if (message == "OK" && typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: "Success!",
                        text: "Message sent successfully!",
                        icon: "success"
                    });
                }
            });
        }

        const checkEmail = () => {
            const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
            const errorTxtEmail = form.querySelector(".error-txt.email");
            
            if (!email.value.match(emailRegex)) {
                email.parentElement.classList.add("error");
                if (email.value.trim() !== "") {
                    errorTxtEmail.innerText = "Enter a valid email address";
                } else {
                    errorTxtEmail.innerText = "Email Address can't be blank";
                }
                return false;
            } else {
                email.parentElement.classList.remove("error");
                return true;
            }
        }

        const checkInputs = () => {
            const items = form.querySelectorAll(".item");
            let allValid = true;
            for (const item of items) {
                if (item.value.trim() === "") {
                    item.parentElement.classList.add("error");
                    allValid = false;
                } else {
                    item.parentElement.classList.remove("error");
                }
            }
            return allValid;
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const allFieldsFilled = checkInputs();
            const emailIsValid = checkEmail();

            if (allFieldsFilled && emailIsValid) {
                sendEmail();
                form.reset();
            }
        });
    }
});