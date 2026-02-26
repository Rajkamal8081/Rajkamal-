/* ========================================
   PORTFOLIO WEBSITE - VANILLA JAVASCRIPT
   ======================================== */

// ========================================
// HAMBURGER MENU FUNCTIONALITY
// ========================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Toggle hamburger menu
 */
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

/**
 * Close menu when a nav link is clicked
 */
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/**
 * Close menu when clicking outside
 */
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

/**
 * Update active nav link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 200;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
            });

            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

document.addEventListener('scroll', updateActiveNavLink);

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

/**
 * Intersection Observer for scroll reveal animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.addEventListener('DOMContentLoaded', () => {
    const observableElements = document.querySelectorAll(
        '.skill-card, .project-card, .about-text p'
    );
    observableElements.forEach((element) => {
        observer.observe(element);
    });
});

// ========================================
// ANIMATED PROGRESS BARS
// ========================================

let progressAnimated = false;

/**
 * Animate progress bars on scroll
 */
function animateProgressBars() {
    const skillSection = document.getElementById('skills');
    if (!skillSection) return;

    const skillOffset = skillSection.offsetTop;
    const currentScroll = window.scrollY + window.innerHeight;

    if (currentScroll > skillOffset && !progressAnimated) {
        progressAnimated = true;

        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach((bar) => {
            // Get width from data-width attribute
            const dataWidth = bar.getAttribute('data-width');
            const width = dataWidth ? dataWidth + '%' : bar.style.width;
            
            bar.style.width = '0';

            setTimeout(() => {
                bar.style.animation = `expandWidth 1.5s ease-out forwards`;
                bar.style.width = width;
            }, 100);
        });
    }
}

window.addEventListener('scroll', animateProgressBars);

// ========================================
// CONTACT FORM VALIDATION
// ========================================

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');
const successMessage = document.getElementById('successMessage');

/**
 * Email validation regex
 */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate name field
 */
function validateName() {
    const nameValue = nameInput.value.trim();

    if (nameValue === '') {
        nameError.textContent = 'Name is required';
        nameInput.classList.add('error');
        return false;
    } else if (nameValue.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        nameInput.classList.add('error');
        return false;
    } else {
        nameError.textContent = '';
        nameInput.classList.remove('error');
        return true;
    }
}

/**
 * Validate email field
 */
function validateEmail() {
    const emailValue = emailInput.value.trim();

    if (emailValue === '') {
        emailError.textContent = 'Email is required';
        emailInput.classList.add('error');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email';
        emailInput.classList.add('error');
        return false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('error');
        return true;
    }
}

/**
 * Validate message field
 */
function validateMessage() {
    const messageValue = messageInput.value.trim();

    if (messageValue === '') {
        messageError.textContent = 'Message is required';
        messageInput.classList.add('error');
        return false;
    } else if (messageValue.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        messageInput.classList.add('error');
        return false;
    } else {
        messageError.textContent = '';
        messageInput.classList.remove('error');
        return true;
    }
}

/**
 * Real-time validation on input
 */
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

/**
 * Form submission handler
 */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous success message
    successMessage.textContent = '';

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isMessageValid) {
        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };

        // Log form data (in a real application, you'd send this to a server)
        console.log('Form Data Submitted:', formData);

        // Display success message
        successMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        successMessage.style.color = '#10b981';

        // Reset form
        contactForm.reset();
        nameInput.classList.remove('error');
        emailInput.classList.remove('error');
        messageInput.classList.remove('error');

        // Clear success message after 5 seconds
        setTimeout(() => {
            successMessage.textContent = '';
        }, 5000);

        // Optional: Add animation to success message
        successMessage.style.animation = 'slideIn 0.3s ease-out';
    }
});

// ========================================
// SMOOTH SCROLL BEHAVIOR
// ========================================

/**
 * Smooth scroll for Hire Me button
 * (Already handled in HTML with onclick, but ensuring it works)
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// DOWNLOAD CV FUNCTIONALITY
// ========================================

const downloadCVBtn = document.querySelector('.btn-secondary');

downloadCVBtn.addEventListener('click', () => {
    // This is a placeholder - in a real application, you'd link to an actual CV file
    console.log('Download CV clicked');

    // Create a simple notification
    const notification = document.createElement('div');
    notification.textContent = 'CV download functionality coming soon!';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color, #6366f1);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
});

// ========================================
// SCROLL TO TOP ON PAGE LOAD
// ========================================

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ========================================
// PERFORMANCE: Debounce scroll events
// ========================================

/**
 * Debounce function to optimize scroll event listeners
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// ACCESSIBILITY & KEYBOARD NAVIGATION
// ========================================

/**
 * Keyboard navigation for nav links
 */
document.addEventListener('keydown', (e) => {
    // Close menu on Escape key
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// DARK MODE SUPPORT (Optional Enhancement)
// ========================================

/**
 * Check user's system preference for dark mode
 */
function initializeDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
        document.body.classList.add('dark-mode');
    }
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', initializeDarkMode);

// ========================================
// ANIMATION HELPER: Add animation to success message
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// LOG INITIALIZATION MESSAGE
// ========================================

console.log('%cPortfolio Website Loaded! 🚀', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS & Vanilla JavaScript', 'color: #8b5cf6; font-size: 12px;');
