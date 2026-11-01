# Modular HTML & Sass Components (Instant Refresh)

A modern, fast development setup for building HTML & CSS components using Dart Sass and Vite with instant Hot Module Replacement (HMR) / live reload.

---

## 🚀 Quick Start

Start the local development server with instant live reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Any change you save in `.html` or `.scss` files will reflect immediately on screen.

### Other Commands

- `npm run build`: Compiles and minifies the HTML, CSS, and JS into `dist/` for production.
- `npm run preview`: Previews the production build locally.

---

## 📁 Architecture & File Structure

```text
├── index.html                  # Main showcase page displaying all components
├── package.json                # Project dependencies (Vite + sass-embedded)
├── vite.config.js              # Vite configuration (Port 3000, dev source maps)
└── src/
    ├── main.js                 # JS entry point importing main.scss
    └── scss/
        ├── main.scss           # Root stylesheet importing all partials via @use
        ├── base/
        │   ├── _variables.scss # Design tokens: colors, spacing, typography, radii, shadows
        │   ├── _reset.scss     # Modern box-sizing, margin, and layout resets
        │   └── _typography.scss# Base fonts, headings, and gradient utility
        └── components/         # Modular Component Partials
            ├── _navbar.scss    # Sticky glassmorphic navigation header
            ├── _hero.scss      # Centered hero section with tag, headline, and CTA
            ├── _card.scss      # Card component with header, body, footer & hover lift
            ├── _button.scss    # Primary, secondary, outline, and ghost buttons
            ├── _badge.scss     # Status badges, tags, and pills
            └── _footer.scss    # Responsive footer component
```

---

## 🧩 How to Add a New Component

1. Create a new partial in `src/scss/components/`, e.g., `_modal.scss`:
   ```scss
   @use '../base/variables' as *;

   .modal {
     position: fixed;
     inset: 0;
     background: rgba(0, 0, 0, 0.7);
     display: flex;
     align-items: center;
     justify-content: center;
   }
   ```
2. Import it into [`src/scss/main.scss`](file:///c:/Users/ADMIN/Desktop/Code/WEB/Kehad-Web/src/scss/main.scss):
   ```scss
   @use 'components/modal';
   ```
3. Add the HTML markup inside [`index.html`](file:///c:/Users/ADMIN/Desktop/Code/WEB/Kehad-Web/index.html).
4. Save the file — Vite will update the browser instantly.

