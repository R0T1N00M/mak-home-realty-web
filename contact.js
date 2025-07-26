// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

// Initialize all contact page functionality
function initializeContactPage() {
    setupFormSubmission();
    setupScheduler();
    setupHeaderScrollEffect();
    setupSmoothScrolling();
    setMinimumDate();
}

// Set minimum date to today for scheduling
function setMinimumDate() {
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Modal functions
function openScheduler() {
    const modal = document.getElementById('schedulerModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeScheduler() {
    const modal = document.getElementById('schedulerModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Setup scheduler functionality
function setupScheduler() {
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('schedulerModal');
        if (event.target == modal) {
            closeScheduler();
        }
    }

    // Scheduling form submission
    const schedulingForm = document.getElementById('schedulingForm');
    if (schedulingForm) {
        schedulingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const schedulingData = {};
            
            for (let [key, value] of formData.entries()) {
                schedulingData[key] = value;
            }
            
            // Create email content
            const emailSubject = `New Meeting Request from ${schedulingData.clientName}`;
            const emailBody = `
New meeting request details:

Name: ${schedulingData.clientName}
Email: ${schedulingData.clientEmail}
Phone: ${schedulingData.clientPhone}
Meeting Type: ${schedulingData.meetingType}
Preferred Date: ${schedulingData.preferredDate}
Preferred Time: ${schedulingData.preferredTime}
Meeting Format: ${schedulingData.meetingFormat}
Additional Notes: ${schedulingData.notes || 'None'}

Please confirm this appointment by replying to this email or calling the client directly.
            `;
            
            // Create mailto link
            const mailtoLink = `mailto:TuanNguyen5enterprise@protonmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show confirmation message
            alert(`Thank you ${schedulingData.clientName}! Your meeting request has been sent. I'll confirm your appointment within 24 hours.`);
            
            // Reset form and close modal
            this.reset();
            closeScheduler();
        });
    }
}

// Setup form submission
function setupFormSubmission() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#e74c3c';
                    isValid = false;
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // In a real application, you would send this data to your backend
                alert('Thank you for your message! I will get back to you within 24 hours.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
}

// Header scroll effect
function setupHeaderScrollEffect() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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
}

// Export functions for global access
window.openScheduler = openScheduler;
window.closeScheduler = closeScheduler;