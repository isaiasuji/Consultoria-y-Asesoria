// ============================================================
//   CONSULTORÍA & ASESORÍA — datos.js
//   ÚNICO archivo que hay que editar para cambiar precios,
//   eventos, boletín vigente y datos de pago.
// ============================================================

window.CYA = {

  // ── Contacto y pagos (sin pasarela) ──────────────────────
  // El cliente paga por transferencia y envía el comprobante por WhatsApp.
  // Si dejas un campo vacío (""), no se muestra en la página de compra.
  pago: {
    whatsapp: "573043420425",             // sin + ni espacios
    correo: "isaiasuji@gmail.com",
    llaveBreB: "1192815522",                         // EDITA: tu llave Bre-B (ej. @cyafinanciero)
    nequi: "",                             // EDITA: número Nequi, si aplica
    titular: "Isaías Urazán J.",
    qr: ""                                 // EDITA: ruta a una imagen de tu QR, ej. "assets/img/qr.png"
  },

  // ── Boletín del Bolsillo (gratis) ────────────────────────
  // Cada mes: sube el PDF a assets/docs/ y cambia estos datos.
  boletin: {
    mes: "Octubre 2026",
    edicion: 1,
    archivo: "assets/docs/Boletin_del_Bolsillo_Octubre_2026.pdf",
    paginas: ["assets/img/boletin-oct-p-1.jpg", "assets/img/boletin-oct-p-2.jpg", "assets/img/boletin-oct-p-3.jpg", "assets/img/boletin-oct-p-4.jpg"],
    disponibleHasta: "2026-11-30",         // fecha en que llega la siguiente edición
    adelanto: [
      { cifra: "6,29%", texto: "inflación anual: qué le está haciendo a tu ahorro" },
      { cifra: "28,34%", texto: "tasa de usura: cuánto te cuesta diferir una compra" },
      { cifra: "1 de 3", texto: "empresas sobrevive cinco años: por qué cierran las demás" }
    ]
  },

  // ── Productos de pago ────────────────────────────────────
  // id: lo usa la página de compra (comprar.html?p=ID)
  productos: {
    "cfo-externo": {
      nombre: "Ensayo «Por qué cierran las pymes colombianas (y cómo evitarlo)» · Ed. Nov 2026",
      tipo: "PDF premium · 20 páginas",
      precio: 39900,                       // EDITA: precio en pesos
      precioAntes: 0,                      // 0 = no mostrar precio tachado
      entrega: "Recibes el PDF por correo o WhatsApp en menos de 24 horas después de confirmar el pago.",
      imagen: "assets/img/cfo-p-01.jpg"
    },
    "evento-preventa": {
      nombre: "Entrada · Conferencia «Tu dinero, tus reglas» (oferta de lanzamiento)",
      tipo: "Evento presencial · 3 horas · almuerzo incluido",
      precio: 50000,                       // EDITA: oferta de lanzamiento
      precioAntes: 100000,                 // EDITA: precio general, se muestra tachado
      entrega: "Recibes tu entrada con código QR por WhatsApp en menos de 24 horas después de confirmar el pago.",
      imagen: "assets/img/perfil-400.jpg"
    },
    "evento-general": {
      nombre: "Entrada · Conferencia «Tu dinero, tus reglas»",
      tipo: "Evento presencial · 3 horas · almuerzo incluido",
      precio: 160000,                      // EDITA: precio general
      precioAntes: 0,
      entrega: "Recibes tu entrada con código QR por WhatsApp en menos de 24 horas después de confirmar el pago.",
      imagen: "assets/img/perfil-400.jpg"
    }
  },

  // ── Próximo evento (DATOS DE EJEMPLO: reemplázalos) ──────
  evento: {
    titulo: "Tu dinero, tus reglas",
    subtitulo: "Conferencia de finanzas personales para construir riqueza y tranquilidad",
    fechaISO: "2027-02-13T09:00:00-05:00", // EDITA: fecha y hora de inicio (hora Colombia)
    fechaTexto: "Sábado 13 de febrero de 2027 · 9:00 a. m. – 12:00 m.",
    lugar: "Salón privado en Pereira · dirección exacta al confirmar tu entrada",
    cupos: 40,                             // EDITA: cupos totales
    cuposVendidos: 0,                      // EDITA a mano a medida que vendas
    preventaHasta: "2027-01-15",           // EDITA: fin de la preventa
    // Videos: pega el enlace "embed" de YouTube (ej. https://www.youtube.com/embed/ID) o deja "" para mostrar "Próximamente"
    videos: [
      { titulo: "¿Por qué ganas más y te alcanza igual?", url: "" },
      { titulo: "El error de las 36 cuotas", url: "" },
      { titulo: "Qué vas a vivir en la conferencia", url: "" }
    ]
  }
};
