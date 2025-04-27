// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle hamburger menu
hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  navLinks.classList.toggle('show');
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove('show');
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
      }, index * 200); // Stagger effect by 200ms per section
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