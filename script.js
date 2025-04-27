// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Scroll fade-in sections with staggered animation
const sections = document.querySelectorAll('.section');

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