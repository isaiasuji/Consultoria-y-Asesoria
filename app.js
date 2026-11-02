// ============================================================
//   CONSULTORÍA & ASESORÍA — app.js
//   Lee datos.js y llena boletín, eventos y compra.
// ============================================================
(function () {
  const D = window.CYA || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const cop = n => '$' + Math.round(n).toLocaleString('es-CO');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const wa = (msg) => `https://wa.me/${(D.pago || {}).whatsapp}?text=${encodeURIComponent(msg)}`;

  // ── Textos simples: <span data-cya="evento.titulo"> ───────
  $$('[data-cya]').forEach(el => {
    const v = el.dataset.cya.split('.').reduce((o, k) => (o || {})[k], D);
    if (v !== undefined) el.textContent = v;
  });

  // ── Cuenta regresiva ──────────────────────────────────────
  $$('[data-countdown]').forEach(box => {
    const t = new Date(box.dataset.countdown || (D.evento || {}).fechaISO).getTime();
    const cells = ['días', 'horas', 'min', 'seg'];
    box.innerHTML = cells.map(c => `<div class="cd"><b>0</b><span>${c}</span></div>`).join('');
    const bs = $$('b', box);
    function tick() {
      let s = Math.max(0, Math.floor((t - Date.now()) / 1000));
      const v = [Math.floor(s / 86400), Math.floor(s % 86400 / 3600), Math.floor(s % 3600 / 60), s % 60];
      v.forEach((n, i) => bs[i].textContent = String(n).padStart(i ? 2 : 1, '0'));
    }
    tick(); setInterval(tick, 1000);
  });

  // ── Cupos del evento ──────────────────────────────────────
  const ev = D.evento || {};
  $$('[data-cupos]').forEach(el => {
    const libres = Math.max(0, ev.cupos - ev.cuposVendidos);
    const pct = ev.cupos ? Math.max(4, ev.cuposVendidos / ev.cupos * 100) : 0;
    el.innerHTML = `<div class="cupos"><span>Cupos disponibles</span><span><b style="color:#fff">${libres}</b> de ${ev.cupos}</span></div><div class="bar"><i style="width:${pct}%"></i></div>`;
  });

  // ── Precios desde datos.js ────────────────────────────────
  $$('[data-precio]').forEach(el => {
    const p = (D.productos || {})[el.dataset.precio]; if (!p) return;
    el.innerHTML = `<b>${cop(p.precio)}</b>${p.precioAntes ? `<s>${cop(p.precioAntes)}</s>` : ''}<small>COP</small>`;
  });
  $$('[data-preventa-hasta]').forEach(el => {
    const f = new Date(ev.preventaHasta + 'T23:59:59-05:00');
    const dias = Math.ceil((f - Date.now()) / 86400000);
    el.textContent = dias > 0 ? `La oferta de lanzamiento termina en ${dias} día${dias === 1 ? '' : 's'}` : 'Oferta de lanzamiento finalizada';
  });

  // ── Videos del evento ─────────────────────────────────────
  const vbox = $('#videos');
  if (vbox && ev.videos) {
    vbox.innerHTML = ev.videos.map(v => v.url
      ? `<div class="video"><iframe src="${esc(v.url)}" title="${esc(v.titulo)}" allowfullscreen loading="lazy"></iframe></div>`
      : `<div class="video"><div class="play"><svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8z"/></svg></div><small>Próximamente</small><h4>${esc(v.titulo)}</h4></div>`
    ).join('');
  }

  // ── Boletín ───────────────────────────────────────────────
  const B = D.boletin || {};
  $$('[data-boletin-link]').forEach(a => { a.href = B.archivo; a.setAttribute('download', ''); });
  const ad = $('#adelanto');
  if (ad && B.adelanto) ad.innerHTML = B.adelanto.map(x => `<div><b>${esc(x.cifra)}</b><span>${esc(x.texto)}</span></div>`).join('');
  const st = $('#stack');
  if (st && B.paginas) st.innerHTML = B.paginas.slice(0, 3).map((src, i) => `<img src="${src}" alt="Página ${i + 1} del Boletín del Bolsillo">`).join('');
  $$('[data-boletin-hasta]').forEach(el => {
    const f = new Date(B.disponibleHasta + 'T23:59:59-05:00');
    const dias = Math.max(0, Math.ceil((f - Date.now()) / 86400000));
    el.textContent = dias ? `${dias} día${dias === 1 ? '' : 's'}` : 'pocas horas';
  });

  // ── Página de compra ──────────────────────────────────────
  const ck = $('#checkout');
  if (ck) {
    const id = new URLSearchParams(location.search).get('p') || 'evento-preventa';
    const p = (D.productos || {})[id];
    if (!p) { ck.innerHTML = '<p class="lede">Producto no encontrado. <a href="index.html" style="color:#6ab0de">Volver al inicio</a></p>'; return; }
    const esEvento = id.startsWith('evento');
    let qty = 1;
    const P = D.pago || {};
    const datos = [
      P.llaveBreB && ['Llave Bre-B', P.llaveBreB],
      P.nequi && ['Nequi', P.nequi],
      P.titular && ['Titular', P.titular]
    ].filter(Boolean);
    ck.innerHTML = `
      <div class="box">
        <img src="${p.imagen}" alt="" style="border-radius:10px;max-height:220px;width:100%;object-fit:cover;margin-bottom:16px;${id === 'cfo-externo' ? '' : 'object-position:center'}">
        <p class="eyebrow" style="margin-bottom:6px">${esc(p.tipo)}</p>
        <h2>${esc(p.nombre)}</h2>
        ${esEvento ? `<div class="qty"><button type="button" id="qm" aria-label="Menos">−</button><output id="qn">1</output><button type="button" id="qp" aria-label="Más">+</button><span style="font-size:13px;color:#8fb0c8">entrada(s)</span></div>` : ''}
        <div class="total"><span style="color:#8fb0c8;font-size:13px">Total a pagar</span><b id="tot">${cop(p.precio)}</b></div>
        ${p.precioAntes ? `<p class="fine">Ahorras <strong>${cop(p.precioAntes - p.precio)}</strong> por entrada con esta oferta.</p>` : ''}
        <div class="secure"><svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg><span>Pagas directo a ${esc(P.titular || 'Consultoría & Asesoría')}, sin intermediarios. ${esc(p.entrega)}</span></div>
      </div>
      <div class="box">
        <h2>Cómo comprar en 3 pasos</h2>
        <ol class="steps">
          <li><div><h4>Transfiere el total</h4>
            ${(P.llaveBreB || P.nequi) ? `<p>Desde cualquier banco o billetera, por ${[P.llaveBreB && 'Bre-B', P.nequi && 'Nequi'].filter(Boolean).join(' o ')}:</p><div class="paydata">${datos.map(d => `<div><span><small>${d[0]}</small><br>${esc(d[1])}</span>${d[0] !== 'Titular' ? `<button class="copy" data-copy="${esc(d[1])}">Copiar</button>` : ''}</div>`).join('')}</div>${P.qr ? `<img src="${P.qr}" alt="Código QR de pago" style="width:160px;margin-top:10px;border-radius:8px">` : ''}`
              : `<p>Escríbenos por WhatsApp y te enviamos al instante la llave Bre-B o los datos de transferencia.</p>`}
          </div></li>
          <li><div><h4>Envía el comprobante</h4><p>Un clic abre WhatsApp con tu pedido ya escrito. Adjunta la captura del pago.</p>
            <a id="waBtn" class="btn btn-primary" style="margin-top:10px" target="_blank" rel="noopener">Enviar comprobante por WhatsApp</a></div></li>
          <li><div><h4>Recibe tu ${esEvento ? 'entrada' : 'PDF'}</h4><p>${esc(p.entrega)}</p></div></li>
        </ol>
        <p class="fine">¿Prefieres pagar con tarjeta o necesitas factura? <a href="${wa('Hola, quiero comprar ' + p.nombre + ' y necesito otro medio de pago o factura.')}" target="_blank" rel="noopener" style="color:#6ab0de">Escríbenos</a> y lo resolvemos.</p>
      </div>`;
    const upd = () => {
      const tot = p.precio * qty;
      $('#tot').textContent = cop(tot);
      if ($('#qn')) $('#qn').textContent = qty;
      $('#waBtn').href = wa(`Hola Isaías, acabo de pagar: ${p.nombre}${esEvento ? ` × ${qty}` : ''} por ${cop(tot)}. Te envío el comprobante. Mi nombre es: `);
    };
    if ($('#qm')) { $('#qm').onclick = () => { qty = Math.max(1, qty - 1); upd(); }; $('#qp').onclick = () => { qty = Math.min(10, qty + 1); upd(); }; }
    upd();
    $$('.copy', ck).forEach(b => b.onclick = () => { navigator.clipboard && navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Copiado'; setTimeout(() => b.textContent = 'Copiar', 1500); });
  }

  if ($('.sticky-buy')) document.body.classList.add('has-sticky');
})();
