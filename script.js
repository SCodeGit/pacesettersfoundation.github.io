// ======== Helper Functions ========
const q = (sel, parent=document) => parent.querySelector(sel);
const qAll = (sel, parent=document) => Array.from(parent.querySelectorAll(sel));

// ======== Mobile Navigation Toggle ========
const navToggle = q('.nav-toggle');
const nav = q('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });
}

// Close nav when link is clicked (mobile)
qAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('show');
  });
});

// ======== Reveal Animation on Scroll ========
const reveals = qAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => revealObserver.observe(r));

// ======== Back to Top Button ========
const topBtn = q('#topBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    topBtn.classList.add('show');
  } else {
    topBtn.classList.remove('show');
  }
});

if (topBtn) {
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ======== Optional Smooth Scroll for Anchors ========
qAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      const target = q(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ======== Small UI Enhancements ========
// Add focus outline only for keyboard users
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') document.body.classList.add('keyboard-user');
});
