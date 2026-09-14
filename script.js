/* ==========================================
   VELOCITYMOTO — script.js
   ========================================== */

// ---- Preloader ----
window.addEventListener('load', () => {
  const fill = document.getElementById('preloaderFill');
  const preloader = document.getElementById('preloader');
  if (fill) fill.style.width = '100%';
  setTimeout(() => {
    if (preloader) preloader.classList.add('hidden');
  }, 1800);
});

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Back to top
  const backTop = document.getElementById('backTop');
  if (backTop) {
    backTop.classList.toggle('visible', window.scrollY > 400);
  }
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close menu on nav link click
navLinks?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- Back to Top ----
document.getElementById('backTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id], div[id]');
const navLinksAll = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ---- Counter animation ----
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => counterObserver.observe(el));

// ---- Reveal on scroll ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Add reveal class dynamically to cards
document.querySelectorAll(
  '.cat-card, .bike-card, .feat-card, .testi-card, .process-step, .info-card'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 100;
  revealObserver.observe(el);
});

// ---- Inventory Filter ----
const filterBtns = document.querySelectorAll('.filter-btn');
const bikeCards = document.querySelectorAll('.bike-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    bikeCards.forEach(card => {
      const match = filter === 'all' || card.dataset.cat === filter;
      card.style.transition = 'all 0.4s ease';
      if (match) {
        card.style.display = '';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 20);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => { card.style.display = 'none'; }, 350);
      }
    });
  });
});

// ---- Wishlist heart toggle ----
document.querySelectorAll('.btn-heart').forEach(btn => {
  btn.addEventListener('click', function () {
    const isActive = this.dataset.active === 'true';
    this.dataset.active = !isActive;
    this.style.color = isActive ? '' : '#e8003d';
    this.style.borderColor = isActive ? '' : '#e8003d';
    this.style.background = isActive ? '' : 'rgba(232,0,61,0.1)';
    this.textContent = isActive ? '♡' : '♥';
  });
});

// ---- Contact Form ----
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('fullName')?.value.trim();
  const phone = document.getElementById('phone')?.value.trim();
  if (!name || !phone) {
    showFormError('Please enter your name and phone number.');
    return;
  }
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
  }, 1500);
});

function showFormError(msg) {
  const existing = document.querySelector('.form-error');
  if (existing) existing.remove();
  const err = document.createElement('p');
  err.className = 'form-error';
  err.textContent = msg;
  err.style.cssText = 'color:#e8003d;font-size:0.85rem;margin-top:-10px;margin-bottom:10px;';
  document.getElementById('contactForm').insertBefore(err, document.getElementById('submitBtn'));
  setTimeout(() => err.remove(), 4000);
}

// ---- Smooth scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Parallax on hero image ----
window.addEventListener('scroll', () => {
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    const scrollY = window.scrollY;
    heroImg.style.transform = `scale(1.05) translateY(${scrollY * 0.15}px)`;
  }
});
