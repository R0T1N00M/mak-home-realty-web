import PropertyListing from '../components/property-listing.js';

// Real Estate Website JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();

    // Property Listings Section
    const propertyListingsContainer = document.getElementById('property-listings');
    if (propertyListingsContainer) {
        // Example property data
        const properties = [
            new PropertyListing(
                'Beautiful Family Home',
                '500,000',
                'Orange County, CA',
                'Spacious 4 bed, 3 bath home with large backyard.',
                'images/home1.jpg'
            ),
            new PropertyListing(
                'Modern Apartment',
                '300,000',
                'Irvine, CA',
                '2 bed, 2 bath apartment in the heart of the city.',
                'images/home2.jpg'
            ),
            new PropertyListing(
                'Luxury Villa',
                '1,200,000',
                'Newport Beach, CA',
                'Stunning villa with ocean views and private pool.',
                'images/home3.jpg'
            )
        ];

        properties.forEach(property => {
            property.displayListing(propertyListingsContainer);
        });
    }
});

// Initialize all website functionality
function initializeWebsite() {
    setupTabSwitching();
    setupSmoothScrolling();
    setupHeaderScrollEffect();
    setupFormValidation();
    setupMobileMenu();
}

// Search functionality
function performSearch() {
    const form = document.getElementById('searchForm');
    const formData = new FormData(form);
    const searchData = {};
    for (let [key, value] of formData.entries()) {
        searchData[key] = value;
    }
    const cityInput = form.querySelector('input[placeholder="City"]');
    if (!cityInput.value.trim()) {
        alert('Please enter a city to search.');
        cityInput.focus();
        return;
    }
    console.log('Search data:', searchData);
    alert('Search functionality would be implemented here with your MLS integration!');
}

// Tab switching functionality
function setupTabSwitching() {
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchForm = document.querySelector('.search-form');
    const originalSearchForm = searchForm.innerHTML;
    searchTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            searchTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            if (this.textContent.includes('Value')) {
                switchToValueForm();
            } else {
                switchToSearchForm();
            }
        });
    });
    function switchToValueForm() {
        searchForm.innerHTML = `
            <input type="text" placeholder="Property Address" required>
            <input type="text" placeholder="City" required>
            <input type="text" placeholder="State">
            <input type="text" placeholder="Zip Code">
            <input type="email" placeholder="Your Email" required>
            <input type="tel" placeholder="Your Phone">
        `;
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.textContent = 'GET MY HOME VALUE';
        searchBtn.onclick = requestHomeValuation;
    }
    function switchToSearchForm() {
        searchForm.innerHTML = originalSearchForm;
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.textContent = 'SEARCH';
        searchBtn.onclick = performSearch;
    }
}

// Home valuation request
function requestHomeValuation() {
    const form = document.getElementById('searchForm');
    const formData = new FormData(form);
    const addressInput = form.querySelector('input[placeholder="Property Address"]');
    const emailInput = form.querySelector('input[placeholder="Your Email"]');
    if (!addressInput.value.trim()) {
        alert('Please enter a property address.');
        addressInput.focus();
        return;
    }
    if (!emailInput.value.trim()) {
        alert('Please enter your email address.');
        emailInput.focus();
        return;
    }
    alert('Thank you! We will send your home valuation report to your email within 24 hours.');
    console.log('Valuation request submitted');
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function setupHeaderScrollEffect() {
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    function updateHeader() {
        const header = document.querySelector('header');
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        ticking = false;
    }
}

// Form validation
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidationError);
        });
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    field.classList.remove('error');
    if (field.required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearValidationError(e) {
    const field = e.target;
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Mobile menu functionality (for future mobile nav implementation)
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Utility function to debounce events
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

// Contact form functionality (if you add a contact form)
function handleContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    if (!isValid) {
        alert('Please correct the errors in the form before submitting.');
        return;
    }
    alert('Thank you for your message! We will get back to you soon.');
    form.reset();
}

// Export functions for global access (if needed)
window.performSearch = performSearch;
window.requestHomeValuation = requestHomeValuation;
window.handleContactForm = handleContactForm;