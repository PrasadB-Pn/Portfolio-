/* ==========================================
   PREMIUM PORTFOLIO - JAVASCRIPT
   Smooth Interactions & Form Validation
   ========================================== */

// ==========================================
// DOM Elements
// ==========================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// ==========================================
// Mobile Menu Toggle
// ==========================================

/**
 * Toggle mobile menu visibility
 */
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

/**
 * Close menu when a nav link is clicked
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

/**
 * Close menu when clicking outside
 */
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ==========================================
// Smooth Scroll & Navbar Effects
// ==========================================

/**
 * Add scroll effect to navbar
 */
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update navbar background opacity on scroll
    if (scroll > 50) {
        navbar.style.background = 'rgba(15, 20, 25, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(15, 20, 25, 0.8)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollTop = scroll;
});

// ==========================================
// Intersection Observer for Animations
// ==========================================

/**
 * Triggers animations when elements come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animation for skill bars
            if (entry.target.classList.contains('skill-progress')) {
                animateSkillBar(entry.target);
            }
            
            // Trigger stagger animation for cards
            if (entry.target.classList.contains('project-card') ||
                entry.target.classList.contains('achievement-card') ||
                entry.target.classList.contains('skill-category')) {
                entry.target.classList.add('animated');
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements that need animation
document.querySelectorAll('.skill-progress, .project-card, .achievement-card, .skill-category').forEach(el => {
    observer.observe(el);
});

/**
 * Animate skill bar progress
 */
function animateSkillBar(element) {
    const width = element.style.width;
    element.style.width = '0';
    
    setTimeout(() => {
        element.style.transition = 'width 1.5s ease-out';
        element.style.width = width;
    }, 100);
}

// ==========================================
// Form Validation & Submission
// ==========================================

/**
 * Regular expressions for validation
 */
const validationPatterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    subject: /^.{3,100}$/,
    message: /^.{10,500}$/
};

/**
 * Validate a field
 */
function validateField(fieldId, pattern) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    const value = field.value.trim();
    
    const isValid = pattern.test(value);
    
    if (!isValid && value) {
        field.classList.add('error');
        errorElement.textContent = getErrorMessage(fieldId);
        errorElement.classList.add('show');
    } else {
        field.classList.remove('error');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    }
    
    return isValid || !value; // Allow empty fields initially
}

/**
 * Get appropriate error message
 */
function getErrorMessage(fieldId) {
    const messages = {
        name: 'Please enter a valid name (2-50 characters)',
        email: 'Please enter a valid email address',
        subject: 'Subject must be 3-100 characters',
        message: 'Message must be 10-500 characters'
    };
    
    return messages[fieldId] || 'Invalid input';
}

/**
 * Validate entire form
 */
function validateForm() {
    const nameValid = validateField('name', validationPatterns.name);
    const emailValid = validateField('email', validationPatterns.email);
    const subjectValid = validateField('subject', validationPatterns.subject);
    const messageValid = validateField('message', validationPatterns.message);
    
    return nameValid && emailValid && subjectValid && messageValid;
}

/**
 * Real-time validation
 */
document.getElementById('name').addEventListener('blur', () => {
    validateField('name', validationPatterns.name);
});

document.getElementById('email').addEventListener('blur', () => {
    validateField('email', validationPatterns.email);
});

document.getElementById('subject').addEventListener('blur', () => {
    validateField('subject', validationPatterns.subject);
});

document.getElementById('message').addEventListener('blur', () => {
    validateField('message', validationPatterns.message);
});

/**
 * Form submission handler
 */
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
        console.log('Form validation failed');
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Simulate form submission (in real project, send to server)
    console.log('Form submitted:', formData);
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Reset form
    contactForm.reset();
    
    // Clear error states
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
    });
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
});

// ==========================================
// Interactive Floating Cards
// ==========================================

/**
 * Add interactivity to floating cards
 */
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.1) rotate(0deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        // Reset animation
        card.style.transform = '';
    });
});

// ==========================================
// Cursor Effects (Optional Premium Feature)
// ==========================================

/**
 * Add parallax effect on mouse move
 */
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
    document.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angleX = (e.clientY - centerY) / 10;
        const angleY = (centerX - e.clientX) / 10;
        
        // Apply subtle 3D effect
        heroVisual.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
    
    document.addEventListener('mouseleave', () => {
        heroVisual.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ==========================================
// Scroll Animations
// ==========================================

/**
 * Stagger animation for card elements
 */
function staggerElements(elements, delay = 100) {
    elements.forEach((element, index) => {
        element.style.animation = `slideUp 0.6s ease-out ${index * delay / 1000}s both`;
    });
}

// ==========================================
// Performance Optimization
// ==========================================

/**
 * Debounce function for scroll events
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

/**
 * Optimize scroll events
 */
const optimizedScroll = debounce(() => {
    // Any additional scroll-based logic
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ==========================================
// Page Load Animations
// ==========================================

/**
 * Fade in elements on page load
 */
window.addEventListener('load', () => {
    // Ensure all images and content are loaded
    document.body.classList.add('page-loaded');
});

// ==========================================
// Accessibility Features
// ==========================================

/**
 * Handle keyboard navigation for buttons and links
 */
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ==========================================
// Analytics & Tracking (Optional)
// ==========================================

/**
 * Track section views (replace with your analytics service)
 */
const sections = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Log section view (you can send to analytics service)
            console.log(`Viewed section: ${entry.target.id}`);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));

// ==========================================
// Utility Functions
// ==========================================

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==========================================
// Local Storage for Form Data (Optional)
// ==========================================

/**
 * Auto-save form data to prevent data loss
 */
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    // Load saved data
    const savedValue = localStorage.getItem(`form_${input.id}`);
    if (savedValue) {
        input.value = savedValue;
    }
    
    // Save data on input
    input.addEventListener('input', () => {
        localStorage.setItem(`form_${input.id}`, input.value);
    });
});

/**
 * Clear saved form data on successful submission
 */
contactForm.addEventListener('submit', () => {
    formInputs.forEach(input => {
        localStorage.removeItem(`form_${input.id}`);
    });
});

// ==========================================
// Responsive Image Loading (Optional)
// ==========================================

/**
 * Lazy load images for better performance
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Initialize App
// ==========================================

/**
 * Log when page is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    console.log('Welcome to Prasad Binawade\'s Portfolio');
});

// ==========================================
// Export for module systems (if needed)
// ==========================================

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        smoothScrollTo,
        isInViewport,
        debounce
    };
}
