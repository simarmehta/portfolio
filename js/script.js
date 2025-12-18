// ==========================
// INITIALIZATION
// ==========================

// Console Easter Egg
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%c🚀 Welcome to my portfolio', 'font-size: 14px; color: #06b6d4;');
console.log('%c💡 Interested in the code? Check out the repo!', 'font-size: 12px; color: #b8c5d6;');
console.log('%c⌨️  Keyboard Shortcuts:', 'font-size: 14px; font-weight: bold; color: #3b82f6; margin-top: 10px;');
console.log('%c  • Press "t" to toggle theme', 'font-size: 12px; color: #b8c5d6;');
console.log('%c  • Press "h" to go to hero section', 'font-size: 12px; color: #b8c5d6;');
console.log('%c  • Press "p" to jump to projects', 'font-size: 12px; color: #b8c5d6;');
console.log('%c  • Press "c" to view contact info', 'font-size: 12px; color: #b8c5d6;');

// ==========================
// MOBILE MENU TOGGLE
// ==========================
const menu = document.querySelector('#mobile-menu');
const navList = document.querySelector('.nav-list');

if (menu && navList) {
  menu.addEventListener('click', () => {
    navList.classList.toggle('show');
    menu.classList.toggle('active');
  });

  // Close menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('show');
      menu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !navList.contains(e.target)) {
      navList.classList.remove('show');
      menu.classList.remove('active');
    }
  });
}

// ==========================
// SCROLL PROGRESS INDICATOR
// ==========================
const scrollProgress = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;

  if (scrollProgress) {
    scrollProgress.style.width = scrollPercentage + '%';
  }
}

window.addEventListener('scroll', updateScrollProgress);

// ==========================
// CUSTOM CURSOR
// ==========================
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

if (cursorDot && cursorOutline && window.innerWidth > 768) {
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let outlineX = 0;
  let outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Smooth cursor dot movement
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;

    // Smooth cursor outline movement with delay
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorDot.style.left = cursorX + 'px';
    cursorDot.style.top = cursorY + 'px';
    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Cursor interactions
  const interactiveElements = document.querySelectorAll('a, button, .magnetic, .project-card, .skill-card');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorOutline.style.opacity = '1';
    });

    el.addEventListener('mouseleave', () => {
      cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorOutline.style.opacity = '0.5';
    });
  });
}

// ==========================
// MAGNETIC BUTTON EFFECT
// ==========================
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(element => {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Use lighter magnetic effect for project cards to prevent overlap
    const multiplier = element.classList.contains('project-card') ? 0.05 : 0.3;
    element.style.transform = `translate(${x * multiplier}px, ${y * multiplier}px)`;
  });

  element.addEventListener('mouseleave', () => {
    element.style.transform = 'translate(0, 0)';
  });
});

// ==========================
// THEME SWITCHER
// ==========================
const themeBtns = document.querySelectorAll('.theme-btn');
let currentTheme = localStorage.getItem('theme') || 'dark';

// Apply saved theme on load
if (currentTheme !== 'dark') {
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateActiveThemeBtn();
}

themeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.getAttribute('data-theme');

    if (theme === currentTheme) return;

    if (theme === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }

    currentTheme = theme;
    localStorage.setItem('theme', theme);
    updateActiveThemeBtn();
  });
});

function updateActiveThemeBtn() {
  themeBtns.forEach(btn => {
    const theme = btn.getAttribute('data-theme');
    if (theme === currentTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

updateActiveThemeBtn();

// ==========================
// TYPING EFFECT
// ==========================
const typedTextSpan = document.querySelector('.typed-text');
const phrases = [
  'ML Engineer',
  'MLOps Specialist',
  'AI Enthusiast',
  'Coffee Lover ☕',
  'F1 Fan 🏎️',
  'Cloud Architect'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  if (!typedTextSpan) return;

  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    // Pause before deleting
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 500;
  }

  setTimeout(type, typingSpeed);
}

// Start typing effect after a delay
setTimeout(type, 1000);

// ==========================
// SCROLL REVEAL ANIMATION
// ==========================
const reveals = document.querySelectorAll('.reveal');
const revealOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const revealOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

reveals.forEach(reveal => revealOnScroll.observe(reveal));

// ==========================
// ANIMATE SKILL PROGRESS BARS
// ==========================
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.style.width;
      bar.style.width = '0%';

      setTimeout(() => {
        bar.style.width = width;
      }, 200);

      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ==========================
// STARFIELD CANVAS ANIMATION
// ==========================
const starsCanvas = document.getElementById('stars-canvas');

if (starsCanvas) {
  const ctx = starsCanvas.getContext('2d');
  let stars = [];
  const starCount = 200;

  function resizeCanvas() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    initStars();
  }

  function initStars() {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        radius: Math.random() * 2,
        velocity: 0.2 + Math.random() * 0.5,
        opacity: Math.random() * 0.5 + 0.5
      });
    }
  }

  function animateStars() {
    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

    stars.forEach((star) => {
      star.y += star.velocity;

      // Reset star to top when it goes off screen
      if (star.y > starsCanvas.height) {
        star.x = Math.random() * starsCanvas.width;
        star.y = 0;
        star.radius = Math.random() * 2;
        star.opacity = Math.random() * 0.5 + 0.5;
      }

      // Draw star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();

      // Add twinkling effect
      if (Math.random() > 0.99) {
        star.opacity = Math.random() * 0.5 + 0.5;
      }
    });

    requestAnimationFrame(animateStars);
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animateStars();
}

// ==========================
// HEADER SCROLL EFFECT
// ==========================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ==========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');

    // Don't prevent default for non-section links
    if (href === '#') return;

    e.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==========================
// KEYBOARD SHORTCUTS
// ==========================
document.addEventListener('keydown', (e) => {
  // Ignore if typing in input/textarea
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const key = e.key.toLowerCase();
  const headerHeight = document.querySelector('.header').offsetHeight;

  switch(key) {
    case 't':
      // Toggle through themes
      const themes = ['dark', 'sunset', 'emerald'];
      const currentIndex = themes.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      const nextTheme = themes[nextIndex];

      if (nextTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', nextTheme);
      }

      currentTheme = nextTheme;
      localStorage.setItem('theme', nextTheme);
      updateActiveThemeBtn();
      break;

    case 'h':
      // Go to hero section
      window.scrollTo({ top: 0, behavior: 'smooth' });
      break;

    case 'p':
      // Jump to projects
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const targetPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
      break;

    case 'c':
      // View contact info
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
      break;
  }
});

// ==========================
// FOOTER YEAR
// ==========================
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ==========================
// PARALLAX EFFECT ON SCROLL
// ==========================
const floatingElements = document.querySelectorAll('.float-element');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;

  floatingElements.forEach((el, index) => {
    const speed = 0.5 + (index * 0.2);
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ==========================
// PERFORMANCE: Lazy load images
// ==========================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================
// CONSOLE COMMAND HELPERS
// ==========================
window.portfolio = {
  contact: () => {
    console.log('%c📧 Email: sm11377@nyu.edu', 'font-size: 14px; color: #06b6d4;');
    console.log('%c💼 LinkedIn: linkedin.com/in/simarnyu', 'font-size: 14px; color: #06b6d4;');
    console.log('%c💻 GitHub: github.com/simarmehta', 'font-size: 14px; color: #06b6d4;');
  },

  skills: () => {
    console.log('%c🚀 Technical Skills:', 'font-size: 16px; font-weight: bold; color: #3b82f6;');
    console.log('Languages: Python, C++, JavaScript, R, Dart');
    console.log('ML/AI: PyTorch, TensorFlow, Scikit-Learn, OpenCV');
    console.log('Cloud: AWS (CDK, Lambda, CloudFormation, S3), Azure');
    console.log('MLOps: Docker, Kubernetes, Helm');
    console.log('Databases: MongoDB, PostgreSQL, ChromaDB');
  },

  theme: (themeName) => {
    if (!themeName) {
      console.log('%c🎨 Available themes: dark (Professional Blue), sunset (Orange/Red), emerald (Green)', 'font-size: 14px; color: #3b82f6;');
      console.log(`%cCurrent theme: ${currentTheme}`, 'font-size: 14px; color: #b8c5d6;');
      return;
    }

    const validThemes = ['dark', 'sunset', 'emerald'];
    if (!validThemes.includes(themeName)) {
      console.log('%c❌ Invalid theme. Use: dark, sunset, or emerald', 'font-size: 14px; color: #ef4444;');
      return;
    }

    if (themeName === 'dark') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }

    currentTheme = themeName;
    localStorage.setItem('theme', themeName);
    updateActiveThemeBtn();
    console.log(`%c✅ Theme changed to: ${themeName}`, 'font-size: 14px; color: #10b981;');
  },

  help: () => {
    console.log('%c🎯 Available Commands:', 'font-size: 16px; font-weight: bold; color: #3b82f6;');
    console.log('%cportfolio.contact()', 'font-size: 14px; color: #06b6d4;', '- View contact information');
    console.log('%cportfolio.skills()', 'font-size: 14px; color: #06b6d4;', '- View technical skills');
    console.log('%cportfolio.theme(name)', 'font-size: 14px; color: #06b6d4;', '- Change theme (dark/sunset/emerald)');
    console.log('%cportfolio.help()', 'font-size: 14px; color: #06b6d4;', '- Show this help message');
  }
};

console.log('%c💡 Try typing portfolio.help() for available commands!', 'font-size: 12px; color: #b8c5d6; margin-top: 10px;');

// ==========================
// INITIALIZATION COMPLETE
// ==========================
console.log('%c✅ Portfolio loaded successfully!', 'font-size: 14px; font-weight: bold; color: #10b981;');
