# Dev Patel — Full Stack Developer Portfolio

A premium, production-ready portfolio built with React 19, Vite, Tailwind CSS v4, and Framer Motion.

## Tech Stack

- **React 19** + Vite 8
- **Tailwind CSS v4** (CSS-first theming, dark/light via CSS variables)
- **Framer Motion** (animations, scroll reveals, page transitions)
- **React Icons**
- **Swiper** (project image carousels)
- **React CountUp** (animated statistics)
- **React Intersection Observer**
- **React Helmet Async** (SEO)
- **EmailJS** (contact form)

## Features

- Perfect dark & light themes (no hardcoded colors, full token system)
- Pixel-perfect responsive layout from 320px to 1920px
- Accessible UI: semantic HTML, ARIA labels, keyboard navigation, focus traps, reduced-motion support
- Performance: route-level code splitting, lazy images, memoized hooks, zero CDN bloat
- SEO: meta tags, Open Graph, Twitter cards, JSON-LD structured data
- Glassmorphism cards, gradient accents, animated background, tilt effects

## Getting Started

```bash
npm install
npm run dev
```

## Build & Preview

```bash
npm run build
npm run preview
```

## Lint

```bash
npm run lint
```

## Contact Form (EmailJS)

1. Create an EmailJS service, template, and key at https://emailjs.com
2. Copy `.env.example` to `.env` and fill in the values:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Without these values the form gracefully simulates a successful send so the demo still works.

## Structure

```
src/
├── components/
│   ├── layout/      # Navbar, Footer, ScrollProgress, ScrollToTop, BackgroundFX
│   ├── sections/    # Hero, About, Education, Skills, Projects, Certificates, Achievements, Contact
│   ├── seo/         # SEO (Helmet) component
│   └── ui/          # Reusable: Button, Badge, Card, Modal, Reveal, TiltCard, AnimatedNumber, ...
├── data/            # All content in structured data files
├── hooks/           # useTheme, useActiveSection, useScrollDirection, useScrollLock
├── App.jsx
└── main.jsx
```

## Deployment

The build output in `dist/` is fully static — deploy to Vercel, Netlify, or any static host.
