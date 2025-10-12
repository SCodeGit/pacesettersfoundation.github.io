// ==========================
// Helper selectors
// ==========================
const q = (s, p = document) => p.querySelector(s);
const qAll = (s, p = document) => Array.from(p.querySelectorAll(s));

// ==========================
// Mobile nav toggle
// ==========================
const navToggle = q('.nav-toggle');
const navMenu = q('.nav');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('visible');
  });
  
  // Optional: close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('visible');
    }
  });
}

// ==========================
// Back to top button
// ==========================
const topBtn = q('#topBtn');

window.addEventListener('scroll', () => {
  if (!topBtn) return;
  topBtn.style.display = (window.scrollY > 300) ? 'flex' : 'none';
});

topBtn && topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================
// Smooth scroll for anchors
// ==========================
qAll('a[href^="#"], a[href$=".html"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href) return;
    
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        const headerOffset = 80; // adjust if fixed header
        const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - headerOffset,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ==========================
// Reveal on scroll
// ==========================
const reveals = qAll('.reveal');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(r => revealObserver.observe(r));

// ==========================
// Counters
// ==========================
const counters = qAll('.num');
const counterObserver = new IntersectionObserver((entries, o
