/* ═══════════════════════════════════════════════════════════
   DR. AINDRILA KUNDU — script.js
   FIXES APPLIED IN THIS VERSION:
   [1] document.documentElement.classList.remove('no-js')
       runs FIRST — gates CSS animations, prevents white page
   [2] Literal em-dash replaced with ASCII ' - ' throughout
       (was causing SyntaxError on some browsers/servers)
   [3] IntersectionObserver guarded with typeof check
       + graceful fallback to show-all for older browsers
   [4] All getElementById calls null-guarded before use
   [5] Failsafe timeout: all content visible after 2.5s
       regardless of observer state
   [6] navToggle span destructuring guarded (was crashing
       if spans weren't found)
═══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────
   BUG FIX #1 — MUST BE THE VERY FIRST LINE OF CODE
   Removes 'no-js' from <html> immediately, enabling CSS
   animations. If this line never runs, content stays
   visible (no-js safe fallback in CSS).
───────────────────────────────────────────────────────── */
document.documentElement.classList.remove('no-js');

/* ─────────────────────────────────────────────────────────
   BUG FIX #5 — FAILSAFE: show ALL content after 2.5s
   No matter what else happens, nothing stays hidden.
───────────────────────────────────────────────────────── */
var failsafeTimer = setTimeout(function () {
  var hidden = document.querySelectorAll('.reveal, .stat-card');
  for (var i = 0; i < hidden.length; i++) {
    hidden[i].classList.add('visible');
  }
}, 2500);

document.addEventListener('DOMContentLoaded', function () {

  /* ───────────────────────────────────────────────────────
     1. NAVBAR — scroll shadow + active link highlight
  ─────────────────────────────────────────────────────── */
  var navbar   = document.getElementById('navbar');
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  function updateNav() {
    /* BUG FIX #4 — null guard */
    if (!navbar) return;

    navbar.classList.toggle('scrolled', window.scrollY > 40);

    var current = '';
    for (var i = 0; i < sections.length; i++) {
      if (window.scrollY >= sections[i].offsetTop - 110) {
        current = sections[i].id;
      }
    }
    for (var j = 0; j < navLinks.length; j++) {
      var href = navLinks[j].getAttribute('href');
      if (href === '#' + current) {
        navLinks[j].classList.add('active');
      } else {
        navLinks[j].classList.remove('active');
      }
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ───────────────────────────────────────────────────────
     2. MOBILE NAV TOGGLE
  ─────────────────────────────────────────────────────── */
  var navToggle    = document.getElementById('navToggle');
  var navLinksList = document.getElementById('navLinks');

  /* BUG FIX #4 — null guard entire mobile nav block */
  if (navToggle && navLinksList) {

    function openMenu() {
      navLinksList.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      /* BUG FIX #6 — guard span destructuring */
      var spans = navToggle.querySelectorAll('span');
      if (spans.length >= 3) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      }
      document.addEventListener('click', outsideClickHandler);
    }

    function closeMenu() {
      navLinksList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      var spans = navToggle.querySelectorAll('span');
      for (var i = 0; i < spans.length; i++) {
        spans[i].style.transform = '';
        spans[i].style.opacity   = '';
      }
      document.removeEventListener('click', outsideClickHandler);
    }

    function outsideClickHandler(e) {
      if (navbar && !navbar.contains(e.target)) closeMenu();
    }

    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (navLinksList.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close menu when any nav link is clicked */
    var menuLinks = navLinksList.querySelectorAll('a');
    for (var k = 0; k < menuLinks.length; k++) {
      menuLinks[k].addEventListener('click', closeMenu);
    }
  }

  /* ───────────────────────────────────────────────────────
     3. SMOOTH SCROLL for anchor links
  ─────────────────────────────────────────────────────── */
  var anchors = document.querySelectorAll('a[href^="#"]');
  for (var a = 0; a < anchors.length; a++) {
    anchors[a].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  }

  /* ───────────────────────────────────────────────────────
     4. COUNT-UP ANIMATION
  ─────────────────────────────────────────────────────── */
  function animateCount(el, target, duration) {
    duration = duration || 1800;
    var start = null;
    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      /* Ease-out cubic */
      var ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(step);
  }

  /* ───────────────────────────────────────────────────────
     5. INTERSECTION OBSERVER — stats + scroll reveal
     BUG FIX #3: typeof check before using IntersectionObserver
     BUG FIX #6: fallback shows all content in older browsers
  ─────────────────────────────────────────────────────── */

  if (typeof IntersectionObserver !== 'undefined') {

    /* Clear the failsafe — observers are working */
    clearTimeout(failsafeTimer);

    /* Stat card count-up observer */
    var statObserver = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          var targetVal = parseInt(entry.target.getAttribute('data-target'), 10);
          var countEl   = entry.target.querySelector('.count-up');
          if (countEl && targetVal) animateCount(countEl, targetVal);
        }
      }
    }, { threshold: 0.4 });

    /* All stat cards — visibility class */
    var allStatObs = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          (function (el, delay) {
            setTimeout(function () { el.classList.add('visible'); }, delay);
          })(entries[i].target, i * 100);
          allStatObs.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.2 });

    var statCards = document.querySelectorAll('.stat-card[data-target]');
    var allStats  = document.querySelectorAll('.stat-card');
    for (var s = 0; s < statCards.length; s++) statObserver.observe(statCards[s]);
    for (var t = 0; t < allStats.length; t++)  allStatObs.observe(allStats[t]);

    /* Scroll-reveal observer */
    var revealObserver = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          (function (el, delay) {
            setTimeout(function () { el.classList.add('visible'); }, delay);
          })(entries[i].target, i * 70);
          revealObserver.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    var revealEls = document.querySelectorAll('.reveal');
    for (var r = 0; r < revealEls.length; r++) revealObserver.observe(revealEls[r]);

  } else {
    /* BUG FIX #3 — Fallback for browsers without IntersectionObserver
       (UC Browser, Samsung Internet <10, etc.)
       Just show everything immediately. */
    var allContent = document.querySelectorAll('.reveal, .stat-card');
    for (var f = 0; f < allContent.length; f++) {
      allContent[f].classList.add('visible');
    }
  }

  /* ───────────────────────────────────────────────────────
     6. CONTACT FORM — mailto handler
     BUG FIX #2: em-dash replaced with ASCII ' - '
  ─────────────────────────────────────────────────────── */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = (form.querySelector('[name="name"]')    ? form.querySelector('[name="name"]').value    : '').trim();
      var phone   = (form.querySelector('[name="phone"]')   ? form.querySelector('[name="phone"]').value   : '').trim();
      var email   = (form.querySelector('[name="email"]')   ? form.querySelector('[name="email"]').value   : '').trim();
      var concern = (form.querySelector('[name="concern"]') ? form.querySelector('[name="concern"]').value : '').trim();
      var message = (form.querySelector('[name="message"]') ? form.querySelector('[name="message"]').value : '').trim();

      if (!name || !phone) {
        alert('Please fill in your name and phone number.');
        return;
      }

      var lines = ['Name: ' + name, 'Phone: ' + phone];
      if (email)   lines.push('Email: ' + email);
      if (concern) lines.push('Concern: ' + concern);
      if (message) lines.push('\nMessage:\n' + message);

      /* BUG FIX #2: ' - ' instead of em-dash literal */
      var subjectText = concern
        ? 'Consultation Request - ' + concern
        : 'Consultation Request';

      var subject = encodeURIComponent(subjectText);
      var body    = encodeURIComponent(lines.join('\n'));

      window.location.href = 'mailto:aindrila21nov@gmail.com?subject=' + subject + '&body=' + body;

      /* Visual feedback */
      var btn  = form.querySelector('button[type="submit"]');
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = 'Opening email...';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = orig;
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  /* ───────────────────────────────────────────────────────
     7. GALLERY LIGHTBOX
     Auto-activates only on real images (not .ph placeholders)
  ─────────────────────────────────────────────────────── */
  /* Inject keyframes once */
  if (!document.getElementById('lightbox-kf')) {
    var kfStyle = document.createElement('style');
    kfStyle.id = 'lightbox-kf';
    kfStyle.textContent =
      '@keyframes lbIn  { from { opacity:0; transform:scale(0.95) } to { opacity:1; transform:scale(1) } }' +
      '@keyframes lbOut { from { opacity:1 } to { opacity:0 } }';
    document.head.appendChild(kfStyle);
  }

  var galItems = document.querySelectorAll('.gal-item:not(.ph)');
  for (var g = 0; g < galItems.length; g++) {
    galItems[g].style.cursor = 'zoom-in';
    galItems[g].addEventListener('click', function () {
      var img = this.querySelector('img');
      if (!img) return;

      var overlay = document.createElement('div');
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-label', 'Image lightbox');
      overlay.style.cssText =
        'position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;' +
        'background:rgba(6,15,30,0.96);display:flex;align-items:center;' +
        'justify-content:center;cursor:zoom-out;padding:24px;' +
        'animation:lbIn .2s ease;-webkit-animation:lbIn .2s ease;';

      var clone = document.createElement('img');
      clone.src = img.src;
      clone.alt = img.alt;
      clone.style.cssText =
        'max-width:90vw;max-height:90vh;border-radius:12px;' +
        'object-fit:contain;box-shadow:0 20px 80px rgba(0,0,0,0.8);';

      var closeBtn = document.createElement('button');
      closeBtn.innerHTML = '&times;';
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.style.cssText =
        'position:absolute;top:20px;right:24px;background:none;border:none;' +
        'color:white;font-size:2.5rem;cursor:pointer;line-height:1;opacity:0.7;';

      function close() {
        overlay.style.animation = 'lbOut .15s ease forwards';
        overlay.style.WebkitAnimation = 'lbOut .15s ease forwards';
        setTimeout(function () {
          if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        }, 150);
        document.removeEventListener('keydown', escHandler);
      }

      function escHandler(e) {
        if (e.key === 'Escape') close();
      }

      overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
      closeBtn.addEventListener('click', close);
      document.addEventListener('keydown', escHandler);

      overlay.appendChild(clone);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      closeBtn.focus();
    });
  }

}); /* end DOMContentLoaded */
