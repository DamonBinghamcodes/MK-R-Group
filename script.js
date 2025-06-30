// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navbar = document.getElementById('navbar');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(21, 21, 21, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(21, 21, 21, 0.8)';
        }
    }
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animations
document.querySelectorAll('.fade-in, .service-card, .project-card, .value-card, .team-member').forEach(el => {
    observer.observe(el);
});

// Counter Animation (for stats)
function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + (counter.getAttribute('data-target') === '100' ? '%' : '+');
        }
    };

    updateCounter();
}

// Observe stat counters
document.querySelectorAll('.stat-number').forEach(counter => {
    observer.observe(counter);
    counter.addEventListener('animationstart', () => {
        if (!counter.classList.contains('counted')) {
            animateCounter(counter);
            counter.classList.add('counted');
        }
    });
});

// Project Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Form Submissions
const contactForms = document.querySelectorAll('.contact-form');

contactForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#22c55e';
            
            // Reset form
            form.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
});

// Lazy Loading for Images (when added)
const lazyImages = document.querySelectorAll('img[data-src]');

if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Accessibility: Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Performance: Debounce scroll events
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations can be added here
    console.log('Scroll event fired');
}, 100));

// Page load animations
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    document.querySelectorAll('.fade-in').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100);
    });
});

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Console welcome message
console.log(`
🏗️ MK&R Group Website
Built with modern web technologies
© 2024 MK&R Group. All rights reserved.
`);

// Error handling for missing elements
function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

// Enhanced mobile menu with touch gestures and improved performance
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

function handleGesture() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
            // Swipe left - close menu
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    }
}

function closeMobileMenu() {
    if (menuToggle && mobileMenu) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleGesture();
}, { passive: true });

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics
    console.log('Event tracked:', eventName, eventData);
}

// Track button clicks
document.querySelectorAll('.btn-primary, .btn-text').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('button_click', {
            button_text: btn.textContent,
            button_type: btn.classList.contains('btn-primary') ? 'primary' : 'text'
        });
    });
});

// Track form submissions
contactForms.forEach(form => {
    form.addEventListener('submit', () => {
        trackEvent('form_submission', {
            form_id: form.id || 'contact_form'
        });
    });
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
        }
    });
});

if ('PerformanceObserver' in window) {
    perfObserver.observe({ entryTypes: ['measure'] });
}

// Accessibility enhancements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
        announceToScreenReader('Menu closed');
    }
    
    // Focus management for mobile menu
    if (e.key === 'Tab' && mobileMenu && mobileMenu.classList.contains('active')) {
        const focusableElements = mobileMenu.querySelectorAll('a, button');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--ease', 'linear');
    // Disable complex animations
    document.querySelectorAll('.floating, .accent-glow').forEach(el => {
        el.style.animation = 'none';
    });
}

// Monitor viewport changes for responsive adjustments
const handleViewportChange = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', debounce(handleViewportChange, 100));
handleViewportChange(); // Initial call

// Optimize images loading based on connection
if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Implement low-quality image fallbacks
        document.querySelectorAll('.project-image, .service-image').forEach(img => {
            img.style.filter = 'blur(1px)';
        });
    }
}