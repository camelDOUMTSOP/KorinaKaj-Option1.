document.addEventListener('DOMContentLoaded', function () {

    /* ========================================
       HEADER SCROLL
       ======================================== */
    var header = document.querySelector('.header');

    function handleScroll() {
        if (!header) return;
        if (window.pageYOffset > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();


    /* ========================================
       MOBILE MENU
       ======================================== */
    var menuToggle = document.querySelector('.menu-toggle');
    var mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow =
                mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    /* ========================================
       SMOOTH SCROLL
       ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                var offset = header ? header.offsetHeight + 20 : 20;
                var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });


    /* ========================================
       SCROLL REVEAL ANIMATIONS
       ======================================== */
    var revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    var revealElements = document.querySelectorAll(revealSelectors);

    function checkReveal() {
        var trigger = window.innerHeight * 0.88;
        revealElements.forEach(function (el) {
            if (el.getBoundingClientRect().top < trigger) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal, { passive: true });
    window.addEventListener('resize', checkReveal, { passive: true });
    // Déclencher immédiatement pour les éléments déjà visibles
    setTimeout(checkReveal, 100);
    setTimeout(checkReveal, 500);


    /* ========================================
       RESULTS SLIDER (avant/après)
       ======================================== */
    var slides = document.querySelectorAll('.results-slider .slide');

    if (slides.length > 0) {
        var currentSlide = 0;

        function showSlide(index) {
            slides.forEach(function (slide) {
                slide.classList.remove('active');
            });
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Auto-play
        setInterval(function () {
            showSlide(currentSlide + 1);
        }, 4000);
    }


    /* ========================================
       TESTIMONIALS SLIDER (captures WhatsApp)
       ======================================== */
    var testimonialTrack = document.querySelector('.testimonials-slider-track');
    var testimonialSlides = document.querySelectorAll('.testimonial-slide');
    var prevBtn = document.querySelector('.testimonial-prev');
    var nextBtn = document.querySelector('.testimonial-next');
    var dotsContainer = document.querySelector('.testimonial-dots');

    if (testimonialTrack && testimonialSlides.length > 0) {
        var currentTestimonial = 0;
        var totalTestimonials = testimonialSlides.length;

        // Créer les dots
        if (dotsContainer) {
            for (var i = 0; i < totalTestimonials; i++) {
                var dot = document.createElement('button');
                dot.classList.add('testimonial-dot');
                if (i === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', 'Témoignage ' + (i + 1));
                dot.dataset.index = i;
                dotsContainer.appendChild(dot);
            }
        }

        var dots = document.querySelectorAll('.testimonial-dot');

        function goToTestimonial(index) {
            currentTestimonial = (index + totalTestimonials) % totalTestimonials;
            testimonialTrack.style.transform = 'translateX(-' + (currentTestimonial * 100) + '%)';

            dots.forEach(function (d) { d.classList.remove('active'); });
            if (dots[currentTestimonial]) {
                dots[currentTestimonial].classList.add('active');
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                goToTestimonial(currentTestimonial - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                goToTestimonial(currentTestimonial + 1);
            });
        }

        dots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                goToTestimonial(parseInt(this.dataset.index));
            });
        });
    }


    /* ========================================
       COUNTER ANIMATION (stats)
       ======================================== */
    var statNumbers = document.querySelectorAll('.stat-number');
    var statsAnimated = false;

    function animateCounters() {
        if (statsAnimated) return;

        var statsSection = document.querySelector('.results-stats');
        if (!statsSection) return;

        var rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            statsAnimated = true;

            statNumbers.forEach(function (counter) {
                var target = parseInt(counter.getAttribute('data-count')) || 0;
                var suffix = counter.getAttribute('data-suffix') || '';
                var current = 0;
                var step = Math.ceil(target / 50);

                var interval = setInterval(function () {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(interval);
                    } else {
                        counter.textContent = current + suffix;
                    }
                }, 40);
            });
        }
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    setTimeout(animateCounters, 1000);

});