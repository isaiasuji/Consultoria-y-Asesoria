// ============================================================
//   CONSULTORÍA & ASESORÍA — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ── HAMBURGER MENU ──────────────────────────────────────
  const hambBtn  = document.getElementById('hambBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hambBtn && mobileMenu) {
    hambBtn.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hambBtn.classList.toggle('open', isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hambBtn.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hambBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hambBtn.classList.remove('open');
      }
    });
  }

  // ── ACTIVE NAV LINK ─────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── ROTATING TIPS (index only) ──────────────────────────
  const tipEl   = document.getElementById('tipEl');
  const dotsEl  = document.getElementById('tipDots');
  const tips = [
    '"El flujo de caja es más importante que la utilidad"',
    '"Las decisiones sin datos financieros son apuestas"',
    '"Una proyección financiera evita crisis futuras"',
    '"El análisis del sector define la estrategia"',
    '"La automatización financiera aumenta la rentabilidad"'
  ];

  if (tipEl && dotsEl) {
    // Build dots
    tips.forEach((_, i) => {
      const d = document.createElement('div');
      d.className = 'tip-dot' + (i === 0 ? ' active' : '');
      dotsEl.appendChild(d);
    });

    let ti = 0;

    function showTip(i) {
      tipEl.classList.remove('visible');
      setTimeout(() => {
        tipEl.textContent = tips[i];
        tipEl.classList.add('visible');
        dotsEl.querySelectorAll('.tip-dot').forEach((d, j) => {
          d.classList.toggle('active', j === i);
        });
      }, 320);
    }

    showTip(0);
    setInterval(() => {
      ti = (ti + 1) % tips.length;
      showTip(ti);
    }, 4000);
  }

  // ── SERVICES GRID (index only) ──────────────────────────
  const svcGrid = document.getElementById('svcGrid');
  const services = [
    'Diagnóstico Financiero del Negocio',
    'Proyección de Flujos de Efectivo',
    'Proyección de Informes Empresariales Periódicos',
    'Análisis y Estrategias de Flujo de Caja',
    'DataBases',
    'Creación de Dashboards',
    'Modelación (Predicción Financiera)',
    'Cálculo y Revisión de Indicadores Financieros y Organizacionales',
    'Valoración de Empresas (EV, WACC, ROI)',
    'Estructuración y Revisión de Procesos de Contratación Estatal',
    'Análisis Integral del Sector / Nicho',
    'Proyección o Revisión de Presupuestos',
    'Automatización Avanzada de Excel',
    'Power BI',
    'Estadística Aplicada'
  ];

  if (svcGrid) {
    services.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'svc-card fi';
      card.innerHTML = `<div class="svc-n">${String(i + 1).padStart(2, '0')}</div><div class="svc-t">${s}</div>`;
      svcGrid.appendChild(card);
    });
    const last = document.createElement('div');
    last.className = 'svc-card hl fi';
    last.innerHTML = `<div class="svc-n">+</div><div class="svc-t">Y muchos más de acuerdo a su necesidad</div>`;
    svcGrid.appendChild(last);
  }

  // ── COUNTER ANIMATION ───────────────────────────────────
  function animateCounter(el, target, duration) {
    let value = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      value = Math.min(value + step, target);
      el.innerHTML = value + '<em>+</em>';
      if (value >= target) clearInterval(timer);
    }, 16);
  }

  const m1 = document.getElementById('m1');
  const m2 = document.getElementById('m2');
  const m3 = document.getElementById('m3');
  let countersStarted = false;

  const metricsEl = document.querySelector('.metrics');
  if (metricsEl) {
    const counterObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !countersStarted) {
        countersStarted = true;
        if (m1) animateCounter(m1, 15, 900);
        if (m2) animateCounter(m2, 13, 1100);
        if (m3) animateCounter(m3, 3,  700);
      }
    }, { threshold: 0.3 });
    counterObs.observe(metricsEl);
  }

  // ── SCROLL FADE-IN ──────────────────────────────────────
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        fadeObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  document.querySelectorAll('.fi').forEach(el => fadeObs.observe(el));

  // ── CONTACT FORM ────────────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nombre  = document.getElementById('f-nombre');
      const correo  = document.getElementById('f-correo');
      let valid = true;

      // Simple validation
      [nombre, correo].forEach(field => {
        if (!field) return;
        if (!field.value.trim()) {
          field.style.borderColor = 'rgba(220, 80, 80, 0.5)';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (correo && correo.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(correo.value.trim())) {
          correo.style.borderColor = 'rgba(220, 80, 80, 0.5)';
          valid = false;
        }
      }

      if (!valid) return;

      // Show success
      document.getElementById('formWrap').style.display = 'none';
      document.getElementById('formOk').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Reset validation styling on input
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

});
