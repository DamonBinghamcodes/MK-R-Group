// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const closeMenu = document.getElementById('close-menu');

// Toggle hamburger menu
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('show');
  closeMenu.style.display = navLinks.classList.contains('show') ? 'block' : 'none';
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    closeMenu.style.display = 'none';
  });
});

// Close menu when clicking close button
closeMenu.addEventListener('click', () => {
  navLinks.classList.remove('show');
  closeMenu.style.display = 'none';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && !closeMenu.contains(e.target)) {
    navLinks.classList.remove('show');
    closeMenu.style.display = 'none';
  }
});

// Scroll fade-in sections with staggered animation
const sections = document.querySelectorAll('.section, #hero, #about, #services, #projects, #contact');

window.addEventListener('scroll', () => {
  sections.forEach((section, index) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      setTimeout(() => {
        section.classList.add('visible');
      }, index * 100); // Stagger effect by 100ms per section
    }
  });
});

// Scroll to Top Button functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Wait until the HTML is fully parsed
document.addEventListener('DOMContentLoaded', () => {
  // Find the scroll-to-top button by its ID
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return; // If it doesn’t exist, stop here

  // When the button is clicked…
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();                                           // Prevent default link behaviour
    document.documentElement.style.scrollSnapType = 'none';       // Temporarily disable snap-to-section
    window.scrollTo({ top: 0, behavior: 'smooth' });              // Smooth scroll back to the very top
    setTimeout(() => {
      document.documentElement.style.scrollSnapType = 'y mandatory'; // Re-enable mandatory snapping
    }, 600); // 600ms ≈ your scroll duration
  });
});

// Section dots highlight on scroll
const dots = document.querySelectorAll('.dot');
const sectionsArr = Array.from(document.querySelectorAll('.section'));

window.addEventListener('scroll', () => {
  let currentSectionIndex = 0;

  sectionsArr.forEach((section, index) => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= window.innerHeight / 2) {
      currentSectionIndex = index;
    }
  });

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentSectionIndex]) {
    dots[currentSectionIndex].classList.add('active');
  }
});

// Click dots to scroll to section
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const target = document.querySelector(dot.getAttribute('data-target'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});