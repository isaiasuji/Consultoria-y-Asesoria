# Consultoría & Asesoría — Sitio Web

Sitio web corporativo de consultoría financiera empresarial y estatal.

---

## Estructura del proyecto

```
consultoria-asesoria/
├── index.html              ← Página de inicio
├── quienes-somos.html      ← Perfil profesional
├── escribenos.html         ← Formulario de contacto
├── styles.css              ← Todos los estilos + responsive
├── script.js               ← JavaScript funcional
├── README.md               ← Este archivo
└── assets/
    └── images/
        ├── logo.png        ← Logo principal
        └── favicon.png     ← Ícono del navegador
```

---

## Publicar en GitHub Pages

### Paso 1 — Crear repositorio en GitHub
1. Ve a [github.com](https://github.com) e inicia sesión
2. Clic en **"New repository"**
3. Nombre sugerido: `consultoria-asesoria`
4. Selecciona **Public**
5. Clic en **"Create repository"**

### Paso 2 — Subir los archivos
**Opción A — Desde el navegador (más fácil):**
1. En la página del repositorio, clic en **"uploading an existing file"**
2. Arrastra TODOS los archivos y la carpeta `assets/`
3. Escribe un mensaje como `"Sitio inicial"` y clic en **"Commit changes"**

**Opción B — Con Git (terminal):**
```bash
cd consultoria-asesoria
git init
git add .
git commit -m "Sitio inicial"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/consultoria-asesoria.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages
1. En el repositorio, ve a **Settings → Pages**
2. En **"Source"** selecciona `Deploy from a branch`
3. Branch: `main` / Folder: `/ (root)`
4. Clic en **Save**
5. En 1-2 minutos tu sitio estará en:
   `https://TU_USUARIO.github.io/consultoria-asesoria/`

---

## Publicar en Vercel (recomendado — más rápido)

### Opción A — Desde GitHub (recomendada)
1. Sube el repositorio a GitHub (pasos arriba)
2. Ve a [vercel.com](https://vercel.com) e inicia sesión con GitHub
3. Clic en **"New Project"**
4. Selecciona el repositorio `consultoria-asesoria`
5. Deja la configuración por defecto (Vercel detecta HTML estático)
6. Clic en **"Deploy"**
7. En ~30 segundos el sitio estará publicado con URL tipo:
   `https://consultoria-asesoria.vercel.app`

### Opción B — Drag & Drop (sin Git)
1. Ve a [vercel.com/new](https://vercel.com/new)
2. Arrastra la carpeta completa `consultoria-asesoria/`
3. Vercel lo publica automáticamente

### Dominio personalizado (opcional)
1. En Vercel → tu proyecto → **Settings → Domains**
2. Escribe tu dominio (ej: `consultoriaasesoria.com`)
3. Sigue las instrucciones para apuntar los DNS

---

## Configurar formulario de contacto real

El formulario actualmente muestra un mensaje de confirmación visual.
Para recibir los mensajes por email, integra uno de estos servicios gratuitos:

### Opción 1 — Formspree (más fácil)
1. Crea cuenta en [formspree.io](https://formspree.io)
2. Crea un nuevo formulario y copia tu endpoint
3. En `escribenos.html`, cambia la etiqueta `<form>`:
```html
<form id="contactForm" action="https://formspree.io/f/TU_ID" method="POST">
```
4. Elimina el `e.preventDefault()` en `script.js` o ajusta para envío real

### Opción 2 — Web3Forms (sin cuenta)
1. Ve a [web3forms.com](https://web3forms.com) y obtén tu Access Key gratis
2. Agrega dentro del `<form>`:
```html
<input type="hidden" name="access_key" value="TU_ACCESS_KEY">
```

---

## Notas técnicas

- **Sin dependencias locales:** todas las fuentes cargan desde Google Fonts CDN
- **Logo embebido:** el archivo `assets/images/logo.png` es la imagen original PNG
- **Responsive:** breakpoints en 900px (tablet) y 640px (móvil)
- **Compatible con:** Chrome, Firefox, Safari, Edge (versiones modernas)
- **Funciona offline** al abrir `index.html` directamente en el navegador
  (excepto las fuentes Google, que requieren conexión)
