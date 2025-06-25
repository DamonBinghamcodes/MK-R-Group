// Create animated background particles
function createParticles() {
    const bg = document.getElementById('animatedBg');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'bg-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        bg.appendChild(particle);
    }
}

// Enhanced navigation functionality
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const scrollToTopBtn = document.getElementById('scrollToTop');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Enhanced smooth scrolling with offset for fixed navbar
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        // Only prevent default for internal section links (anchors)
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Navbar scroll effect and scroll to top button
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (scrollTop > window.innerHeight) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    
    lastScrollTop = scrollTop;
});

// Enhanced scroll to next section function
function scrollToNext() {
    const sections = document.querySelectorAll('.section');
    const currentScroll = window.scrollY;
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        
        if (sectionTop > currentScroll + 200) {
            const offsetTop = sectionTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            break;
        }
    }
}

// Enhanced active navigation link based on scroll position
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Enhanced Intersection Observer for section animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger counter animation for stats every time section comes into view
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            if (statNumbers.length > 0) {
                statNumbers.forEach(stat => {
                    // Reset and animate every time
                    stat.dataset.animated = 'false';
                    animateCounter(stat);
                });
            }
        } else {
            // Reset animation state when section leaves view
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            if (statNumbers.length > 0) {
                statNumbers.forEach(stat => {
                    stat.dataset.animated = 'false';
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Update active nav on scroll with throttling
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
});

// Enhanced counter animation with smooth easing
function animateCounter(element) {
    const originalText = element.textContent;
    const hasPlus = originalText.includes('+');
    const hasPercent = originalText.includes('%');
    const isTime = originalText.includes('/');
    
    if (isTime) {
        // Animate 24/7 with a typewriter effect
        element.textContent = '0/0';
        setTimeout(() => {
            element.textContent = '24/7';
        }, 500);
        return;
    }
    
    const target = parseInt(originalText.replace(/\D/g, ''));
    if (!target) return;
    
    // Prevent multiple animations running
    if (element.animating) return;
    element.animating = true;
    
    let current = 0;
    const duration = 2000;
    const steps = 100;
    const stepTime = duration / steps;
    const increment = target / steps;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
            element.animating = false;
            // Restore original text to maintain exact values
            element.textContent = originalText;
            return;
        }
        
        // Use easing function for smooth animation
        const progress = current / target;
        const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const displayValue = Math.floor(target * easedProgress);
        
        let suffix = '';
        if (hasPercent) suffix = '%';
        else if (hasPlus) suffix = '+';
        
        element.textContent = displayValue + suffix;
    }, stepTime);
}

// Enhanced form submission with validation
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const project = document.getElementById('project').value.trim();
    
    // Basic validation
    if (!name || !email || !project) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? 'var(--accent-color)' : '#ff4757'};
        color: ${type === 'success' ? 'var(--primary-bg)' : 'white'};
        padding: 20px 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 500;
        max-width: 350px;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 400);
    }, 4000);
}

// Smooth reveal animations for service cards
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    serviceObserver.observe(card);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    
    // Initialize first section as visible
    document.querySelector('.section').classList.add('visible');
    
    // Preload critical animations
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// Performance optimization - Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeIntersectionObserver();
    initializeContactForm();
    initializeScrollToTop();
});

// Navigation functionality
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuToggle && navMenu && !menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scroll to section anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects
function initializeScrollEffects() {
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class to navbar
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// Intersection Observer for section animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation for stats every time section comes into view
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                if (statNumbers.length > 0) {
                    statNumbers.forEach(stat => {
                        // Reset and animate every time
                        stat.dataset.animated = 'false';
                        animateCounter(stat);
                    });
                }
            } else {
                // Reset animation state when section leaves view
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                if (statNumbers.length > 0) {
                    statNumbers.forEach(stat => {
                        stat.dataset.animated = 'false';
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const project = document.getElementById('project').value.trim();
            
            // Basic validation
            if (!name || !email || !project) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Scroll to top functionality
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Show/hide scroll to top button
            if (scrollTop > window.innerHeight) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Apple-style mobile nav toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
      });
    });
  }

  // Animate section cards and contact form on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
});