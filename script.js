/* ============================================
   SHIVAM SHARAD PAWAR — PORTFOLIO JAVASCRIPT
   Loading · Animations · Interactivity
   ============================================ */

(function () {
  'use strict';

  // =========== LOADING SCREEN ===========
  const LOAD_MESSAGES = [
    'Initializing secure connection...',
    'Decrypting personal data modules...',
    'Loading skill matrix...',
    'Establishing identity: SHIVAM_SSP...',
    'Mounting project repositories...',
    'Calibrating AI/ML neural paths...',
    'Syncing experience timeline...',
    'Rendering UI components...',
    'Compiling portfolio assets...',
    'System ready. Welcome.'
  ];

  const loader = document.getElementById('loader');
  const main = document.getElementById('main');
  const loadBar = document.getElementById('load-bar');
  const loadPct = document.getElementById('load-percent');
  const loadStatus = document.getElementById('load-status');
  const loadLog = document.getElementById('load-log');

  let progress = 0;
  let msgIdx = 0;

  function addLog(msg) {
    const line = document.createElement('div');
    line.textContent = '> ' + msg;
    loadLog.appendChild(line);
    loadLog.scrollTop = loadLog.scrollHeight;
  }

  function updateLoader() {
    const step = Math.random() * 8 + 3;
    progress = Math.min(progress + step, 100);

    loadBar.style.width = progress + '%';
    loadPct.textContent = Math.floor(progress) + '%';

    const statusIdx = Math.floor((progress / 100) * LOAD_MESSAGES.length);
    if (statusIdx < LOAD_MESSAGES.length && statusIdx !== msgIdx - 1) {
      loadStatus.textContent = LOAD_MESSAGES[statusIdx].split('.')[0].toUpperCase();
      addLog(LOAD_MESSAGES[statusIdx]);
      msgIdx = statusIdx + 1;
    }

    if (progress < 100) {
      setTimeout(updateLoader, 120 + Math.random() * 80);
    } else {
      loadPct.textContent = '100%';
      loadStatus.textContent = 'ACCESS GRANTED';
      addLog('Portfolio loaded successfully ✓');
      setTimeout(finishLoading, 600);
    }
  }

  function finishLoading() {
    loader.classList.add('fade-out');
    main.classList.add('visible');
    document.body.style.overflow = 'auto';
    setTimeout(() => { loader.remove(); }, 800);
    initAll();
  }

  setTimeout(updateLoader, 300);

  // =========== INIT ALL ===========
  function initAll() {
    initNavbar();
    initHeroRoles();
    initCounters();
    initReveal();
    initSkillBars();
    initContactForm();
    initMobileMenu();
  }

  // =========== NAVBAR ===========
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Active link highlight
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === current) {
          link.classList.add('active');
        }
      });
    }, { passive: true });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          // Close mobile menu
          document.getElementById('nav-mobile').classList.remove('open');
          document.getElementById('nav-hamburger').classList.remove('open');
        }
      });
    });
  }

  // =========== MOBILE MENU ===========
  function initMobileMenu() {
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('nav-mobile');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  // =========== HERO ROLE TYPER ===========
  function initHeroRoles() {
    const roles = [
      'Full Stack Developer',
      'Frontend Developer',
      'Backend Developer',
      'UI/UX Designer',
      'AI/ML Engineer',
      'Problem Solver',
      'CSE Engineer'
    ];
    const roleEl = document.getElementById('hero-role');
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let delay = 120;

    function type() {
      const current = roles[roleIdx];
      if (!deleting) {
        roleEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          deleting = true;
          delay = 2000; // pause before deleting
        } else {
          delay = 100 + Math.random() * 40;
        }
      } else {
        roleEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        delay = 50;
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          delay = 300;
        }
      }
      setTimeout(type, delay);
    }
    type();
  }

  // =========== COUNTER ANIMATION ===========
  function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    let triggered = false;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !triggered) {
        triggered = true;
        counters.forEach(counter => {
          const target = parseInt(counter.dataset.target, 10);
          let count = 0;
          const speed = Math.ceil(target / 40);
          const interval = setInterval(() => {
            count += speed;
            if (count >= target) {
              count = target;
              clearInterval(interval);
            }
            counter.textContent = count;
          }, 40);
        });
      }
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
  }

  // =========== REVEAL ON SCROLL ===========
  function initReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
  }

  // =========== SKILL BAR ANIMATION ===========
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width;
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 200);
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    bars.forEach(bar => observer.observe(bar));
  }

  // =========== CONTACT FORM ===========
  function initContactForm() {
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-success');
    const btnText = document.getElementById('btn-text');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const msg = document.getElementById('form-msg').value.trim();

      if (!name || !email || !msg) return;

      btnText.textContent = 'Sending...';

      // Simulate send (replace with actual email service like EmailJS)
      setTimeout(() => {
        btnText.textContent = 'Send Message';
        successMsg.classList.add('visible');
        form.reset();
        setTimeout(() => successMsg.classList.remove('visible'), 5000);
      }, 1500);
    });
  }

})();
