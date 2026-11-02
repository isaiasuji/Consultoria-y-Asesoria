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
    '"La riqueza es lo que no ves" — Morgan Housel',
    '"El flujo de caja es más importante que la utilidad"',
    '"Las decisiones sin datos financieros son apuestas"',
    '"Una proyección financiera evita crisis futuras"',
    '"El análisis del sector define la estrategia"',
    '"Una buena idea sin un proyecto bien formulado no consigue recursos"'
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
    'Diagnóstico y Plan Financiero Personal',
    'Acompañamiento Mensual en Finanzas Personales',
    'Conferencias y Talleres de Finanzas Personales',
    'Asesoría para Compra de Vivienda y Manejo de Deudas',
    'Diagnóstico Financiero del Negocio',
    'Proyección de Flujos de Efectivo y Presupuestos',
    'Modelación Financiera y Valoración de Empresas',
    'CFO Externo para Mipymes',
    'Dashboards, Power BI y Automatización en Excel',
    'Formulación de Proyectos para Convocatorias',
    'Estructuración Presupuestal de Proyectos',
    'Monitoreo de Convocatorias y Fondos',
    'Estructuración Financiera de Ofertas para Licitaciones',
    'Indicadores Financieros Habilitantes',
    'Acuerdos Marco y Tienda Virtual del Estado'
  ];
  const isNew = [0,1,2,3,9,10,11];

  if (svcGrid) {
    services.forEach((s, i) => {
      const card = document.createElement('div');
      card.className = 'svc-card fi' + (isNew.includes(i) ? ' hl' : '');
      card.innerHTML = `<div class="svc-n">${String(i + 1).padStart(2, '0')}</div><div class="svc-t">${s}</div>`;
      svcGrid.appendChild(card);
    });
    const last = document.createElement('div');
    last.className = 'svc-card hl fi';
    last.innerHTML = `<div class="svc-n">+</div><div class="svc-t">Y muchos más de acuerdo a tu necesidad</div>`;
    svcGrid.appendChild(last);
  }

  // ── COUNTER ANIMATION ───────────────────────────────────
  function animateCounter(el) {
    const target = +el.dataset.target, pre = el.dataset.pre || '', suf = el.dataset.suf || '+';
    let value = 0;
    const step = Math.max(1, Math.ceil(target / (1000 / 16)));
    const timer = setInterval(() => {
      value = Math.min(value + step, target);
      el.innerHTML = pre + value + '<em>' + suf + '</em>';
      if (value >= target) clearInterval(timer);
    }, 16);
  }
  const metricsEl = document.querySelector('.metrics');
  if (metricsEl) {
    let started = false;
    const counterObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        document.querySelectorAll('.m-num[data-target]').forEach(animateCounter);
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

  // ── CONTACT FORM (FormSubmit integration) ───────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const nombre = document.getElementById('f-nombre');
      const correo = document.getElementById('f-correo');
      let valid    = true;

      // Validate required fields before allowing FormSubmit to send
      [nombre, correo].forEach(field => {
        if (!field) return;
        if (!field.value.trim()) {
          field.style.borderColor = 'rgba(220, 80, 80, 0.5)';
          field.style.background  = 'rgba(220, 80, 80, 0.05)';
          valid = false;
        } else {
          field.style.borderColor = '';
          field.style.background  = '';
        }
      });

      if (correo && correo.value.trim()) {
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim());
        if (!emailOk) {
          correo.style.borderColor = 'rgba(220, 80, 80, 0.5)';
          correo.style.background  = 'rgba(220, 80, 80, 0.05)';
          valid = false;
        }
      }

      if (!valid) {
        e.preventDefault(); // Block submission if invalid
        // Scroll to first error
        const firstError = contactForm.querySelector('input[style*="rgb(220"]');
        if (firstError) firstError.focus();
        return;
      }

      // Valid: show loading state on button
      const btn     = document.getElementById('btnSubmit');
      const btnText = document.getElementById('btnText');
      if (btn && btnText) {
        btnText.textContent = 'Enviando...';
        btn.style.opacity   = '0.75';
        btn.style.cursor    = 'not-allowed';
      }
      // FormSubmit will now submit and redirect to gracias.html
    });

    // Clear error styles on input
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        field.style.background  = '';
      });
    });
  }

});
