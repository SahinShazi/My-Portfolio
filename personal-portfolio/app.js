// Mobile navigation toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Gallery filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Form validation and submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            alert('Please enter your name');
            isValid = false;
            nameInput.focus();
            return;
        }
        
        if (!emailInput.value.trim()) {
            alert('Please enter your email');
            isValid = false;
            emailInput.focus();
            return;
        }
        
        if (!messageInput.value.trim()) {
            alert('Please enter your message');
            isValid = false;
            messageInput.focus();
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            alert('Please enter a valid email address');
            isValid = false;
            emailInput.focus();
            return;
        }
        
        if (isValid) {
            // In a real implementation, you would send the form data to a server here
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });
}

// Image lazy loading (for when you add real images)
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver support
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
});

// Simple animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .gallery-item, .testimonial');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);