// Portfolio JS - Ramisa Maliyat Anime Theme
// All interactions and animations

// Wait for DOM
document.addEventListener('DOMContentLoaded', function() {
    // Init AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle (Bootstrap handles toggle, add custom smooth)
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // Project filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            const filterValue = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category.includes(filterValue)) {
                    item.classList.remove('hidden');
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                }
            });
        });
    });

    // Skill bar animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe skill sections
    document.querySelectorAll('.skill-card').forEach(card => {
        observer.observe(card);
    });

    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation
            if (name === '' || email === '' || message === '') {
                showAlert('Please fill in all required fields! 💔', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address! 📧', 'error');
                return;
            }

            // Simulate send
            showAlert('Message sent successfully! I&#39;ll reply soon! 💕✨', 'success');

            // Reset form
            contactForm.reset();
        });
    }

    // Navbar active link highlighting
    window.addEventListener('scroll', highlightActiveNav);

    function highlightActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        let scrolled = window.pageYOffset;
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (scrolled >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    // Char by char animation for hero text
    function animateChar(element) {
        const text = element.textContent;
        element.innerHTML = '';
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${i * 0.1}s`;
            element.appendChild(span);
        });
    }

    // Run char animation on hero text if exists
    const heroTitle = document.querySelector('.animate-char');
    if (heroTitle) {
        animateChar(heroTitle);
    }

    // Heart cursor trail effect (performance optimized)
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create heart trail
        createHeartTrail();
    });

    function createHeartTrail() {
        if (Math.random() > 0.95) { // 5% chance per frame
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = mouseX + 'px';
            heart.style.top = mouseY + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.fontSize = '12px';
            heart.style.zIndex = '9999';
            heart.style.animation = 'heartFloat 2s ease-out forwards';
            document.body.appendChild(heart);
            
            // Remove after animation
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2000);
        }
    }

    // Add heart float animation to CSS (inline for demo)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartFloat {
            0% {
                opacity: 1;
                transform: translateY(0px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) scale(0.5) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero image
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Intersection observer for staggered animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.project-card, .skill-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        revealObserver.observe(el);
    });
});

// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type) {
    // Create alert
    const alert = document.createElement('div');
    alert.className = `alert alert-${type === 'success' ? 'success shadow-lg-custom' : 'danger'} position-fixed`;
    alert.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; border: none; border-radius: 20px; backdrop-filter: blur(10px);';
    alert.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle text-success me-3' : 'fa-exclamation-circle text-danger me-3'} fa-lg"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(alert);
    
    // Auto remove
    setTimeout(() => {
        if (alert.parentNode) {
            alert.classList.add('fade');
            alert.style.transition = 'opacity 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }
    }, 4000);
}



// Page flip transitions (simple fade + scale)
function initPageTransitions() {
    const links = document.querySelectorAll('a[href]:not([href^=\"#\"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            document.body.style.opacity = '0';
            document.body.style.transform = 'scale(0.95)';
            setTimeout(() => location.href = link.href, 250);
        });
    });
}

// Preload for better animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    initRain();
    initPageTransitions();
});

