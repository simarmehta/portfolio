// MOBILE MENU TOGGLE
const menu = document.querySelector('#mobile-menu');
const navList = document.querySelector('.nav-list');

menu.addEventListener('click', () => {
  navList.classList.toggle('show');
});

// FOOTER YEAR
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// FORM SUBMISSION (simple front-end demo)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Your message has been sent! I’ll get back to you soon.');
    contactForm.reset();
  });
}

// SCROLL REVEAL (Intersection Observer)
const reveals = document.querySelectorAll('.reveal');
const revealOptions = { threshold: 0.1 };
const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, revealOptions);

reveals.forEach(r => revealOnScroll.observe(r));

// STARFIELD CANVAS
const starsCanvas = document.getElementById('stars-canvas');
if (starsCanvas) {
  const ctx = starsCanvas.getContext('2d');

  function resizeCanvas() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Create random stars
  const starCount = 200;
  let stars = [];
  function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        radius: Math.random() * 2,
        velocity: 0.2 + Math.random() * 0.5
      });
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    ctx.fillStyle = '#fff';

    stars.forEach(star => {
      star.y += star.velocity;
      if (star.y > starsCanvas.height) {
        star.x = Math.random() * starsCanvas.width;
        star.y = 0;
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fill();
    });

    requestAnimationFrame(animateStars);
  }

  initStars();
  animateStars();
}
