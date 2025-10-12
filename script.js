// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('visible');
});

// Back to top button
const topBtn = document.getElementById('topBtn');
window.onscroll = function() {
  topBtn.style.display = (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) ? 'flex' : 'none';
};

topBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Simple selectors
const q = (s, p=document) => p.querySelector(s);
const qAll = (s, p=document) => Array.from(p.querySelectorAll(s));

// Mobile nav toggle
const navToggle = q('.nav-toggle');
navToggle && navToggle.addEventListener('click', () => {
  const nav = q('.nav');
  if (!nav) return;
  nav.style.display = (nav.style.display === 'flex') ? '' : 'flex';
});

// Smooth scroll for in-page anchors and nav
qAll('a[href^="#"], a[href$=".html"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href) return;
    // For same-page anchors
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) { e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
    }
    // For page links, let browser handle navigation
  });
});

// Reveal on scroll
const reveals = qAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
reveals.forEach(r => obs.observe(r));

// Counters
const counters = qAll('.num');
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target || el.textContent || '0', 10);
      if (!el.dataset.animated) {
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          el.textContent = Math.floor(progress * target);
          if (progress < 1) requestAnimationFrame(step);
          else { el.textContent = target; el.dataset.animated = '1'; }
        };
        requestAnimationFrame(step);
      }
      counterObs.unobserve(el);
    }
  });
}, {threshold: 0.25});
counters.forEach(c => counterObs.observe(c));

// Gallery lightbox
const galleryItems = qAll('.gallery-item');
const lightbox = q('#lightbox');
const lightboxImg = q('#lightboxImg');
const lightboxClose = q('.lightbox-close');

galleryItems.forEach(img => {
  img.addEventListener('click', () => {
    const full = img.dataset.full || img.src;
    lightboxImg.src = full;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
lightboxClose && lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden', 'true');
});
lightbox && lightbox.addEventListener('click', (e) => { if (e.target === lightbox) { lightbox.classList.remove('active'); lightbox.setAttribute('aria-hidden', 'true'); } });

// Back to top button (static)
const topBtn = q('#topBtn');
window.addEventListener('scroll', () => {
  if (!topBtn) return;
  if (window.scrollY > 300) topBtn.style.display = 'flex';
  else topBtn.style.display = 'none';
});
topBtn && topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Donation page small helpers (works if donate.html included)
try {
  const donateLink = q('#donateLink');
  if (donateLink) {
    // set default placeholder (replace with your provider link)
    // donateLink.href = 'https://paystack.com/pay/your-code';
  }
} catch(e){/* ignore */}

// Accessibility: show focus outlines when using keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') document.body.classList.add('show-focus');
});

