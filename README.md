# Consultoría & Asesoría — Sitio web (versión 2026)

## Páginas
| Archivo | Qué es |
|---|---|
| index.html | Inicio: 4 frentes, resultados en convocatorias, evento, boletín, servicios, agendar cita |
| quienes-somos.html | Perfil de Isaías |
| boletin.html | Boletín del Bolsillo gratis + ensayo CFO premium (borroso, de pago) + suscripción |
| eventos.html | Próximo evento: cuenta regresiva, videos, agenda, entradas, preguntas |
| comprar.html | Compra sin pasarela: transferencia + comprobante por WhatsApp (`comprar.html?p=ID`) |
| escribenos.html | Formulario para agendar cita (FormSubmit → isaiasuji@gmail.com) |

## Lo único que se edita: `datos.js`
- **Pagos:** escribe tu llave Bre-B y/o número Nequi. Si los dejas vacíos, la página de compra pide al cliente escribir por WhatsApp para recibir los datos.
- **Precios:** `productos` → `precio` y `precioAntes` (precio tachado).
- **Evento:** título, fecha (`fechaISO` mueve la cuenta regresiva), lugar, cupos y `cuposVendidos` (actualízalo a mano), fin de preventa y enlaces de YouTube de tus videos (formato `https://www.youtube.com/embed/ID`).
- **Boletín del mes:** sube el PDF nuevo a `assets/docs/`, las 4 miniaturas a `assets/img/` y cambia `boletin`.

⚠️ Los datos del evento son de ejemplo: cámbialos antes de publicar.

## El ensayo CFO NO está en el sitio
Es de pago: lo envías tú por correo o WhatsApp al confirmar el pago. Nunca lo subas a `assets/`.

## Publicar en Vercel
Sube esta carpeta completa al repositorio de GitHub conectado a Vercel (o arrástrala en vercel.com → tu proyecto → Deployments). Vercel publica solo.
