(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
    // --- Hotel Booking Form Submission ---
    $(document).ready(function () {
        // Booking Form (booking.html)
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const data = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    checkin: document.getElementById('checkin').value,
                    checkout: document.getElementById('checkout').value,
                    adult: document.getElementById('select1').value,
                    child: document.getElementById('select2').value,
                    room: document.getElementById('select3').value,
                    message: document.getElementById('message').value
                };
                fetch('http://localhost:3000/api/booking', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        bookingForm.reset();
                        const thankYou = document.getElementById('thankYouMessage');
                        if (thankYou) thankYou.style.display = 'block';
                    }
                })
                .catch(() => alert('Booking failed. Please try again.'));
            });
        }

        // Contact Form (contact.html)
        // Find the contact form by looking for a form with name/email/subject/message fields
        const contactForm = (function() {
            const forms = document.getElementsByTagName('form');
            for (let f of forms) {
                if (
                    f.querySelector('#name') &&
                    f.querySelector('#email') &&
                    f.querySelector('#subject') &&
                    f.querySelector('#message')
                ) return f;
            }
            return null;
        })();
        if (contactForm) {
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const data = {
                    name: contactForm.querySelector('#name').value,
                    email: contactForm.querySelector('#email').value,
                    subject: contactForm.querySelector('#subject').value,
                    message: contactForm.querySelector('#message').value
                };
                fetch('http://localhost:3000/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(res => {
                    if (res.success) {
                        contactForm.reset();
                        // Show a simple confirmation
                        if (!document.getElementById('contactThankYou')) {
                            const div = document.createElement('div');
                            div.id = 'contactThankYou';
                            div.className = 'alert alert-success mt-3';
                            div.innerText = 'Thank you for contacting us! We will get back to you soon.';
                            contactForm.parentNode.appendChild(div);
                        }
                    }
                })
                .catch(() => alert('Message failed. Please try again.'));
            });
        }
    });
    
    // --- Register & Login Forms ---
    $(document).ready(function () {
        // Register Form
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const data = {
                    name: document.getElementById('regName').value,
                    email: document.getElementById('regEmail').value,
                    phone: document.getElementById('regPhone').value,
                    password: document.getElementById('regPassword').value
                };
                fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(res => {
                    const msg = document.getElementById('registerMsg');
                    msg.innerText = res.message;
                    msg.className = res.success ? 'alert alert-success' : 'alert alert-danger';
                    if (res.success) registerForm.reset();
                })
                .catch(() => {
                    const msg = document.getElementById('registerMsg');
                    msg.innerText = 'Registration failed. Please try again.';
                    msg.className = 'alert alert-danger';
                });
            });
        }

        // Login Form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const data = {
                    loginId: document.getElementById('loginId').value,
                    password: document.getElementById('loginPassword').value
                };
                fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(res => {
                    const msg = document.getElementById('loginMsg');
                    msg.innerText = res.message;
                    msg.className = res.success ? 'alert alert-success' : 'alert alert-danger';
                    if (res.success) {
                        // Store user info in localStorage (for demo session)
                        localStorage.setItem('hotelUser', JSON.stringify(res.user));
                        loginForm.reset();
                        setTimeout(() => { window.location.href = 'index.html'; }, 1000);
                    }
                })
                .catch(() => {
                    const msg = document.getElementById('loginMsg');
                    msg.innerText = 'Login failed. Please try again.';
                    msg.className = 'alert alert-danger';
                });
            });
        }
    });
    
})(jQuery);

