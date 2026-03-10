# NOVA — Dark Luxury Fashion

A cinematic, WebGL-powered e-commerce experience for **NOVA**, a premium fashion brand specializing in high-end darkwear and leather goods.

## About

NOVA blends minimalist design with bold craftsmanship. The website features an immersive WebGL shader background, a full-screen image slider with 5 GPU-accelerated transition effects, smooth scroll, ambient particles, and a responsive dark aesthetic — all performance-optimized across devices.

## Features

- **WebGL Displacement Background** — Full-screen Three.js shader with mouse-reactive distortion, on-demand rendering
- **Shader Effects Slider** — 5 transition effects (Glass, Frost, Ripple, Plasma, Timeshift) with on-demand rendering and auto-advance
- **Ambient Particle Field** — Three.js floating dust particles throttled to 30fps, auto-disabled on low-end devices
- **Cursor Glow** — GPU-accelerated radial glow following the cursor, disabled on touch devices
- **Smooth Scroll** — Lenis-powered smooth scrolling across all pages
- **Page Transitions** — Framer Motion fade/slide transitions between routes with scroll-to-top
- **Device-Adaptive Performance** — Automatic detection of device tier (high/medium/low) to selectively disable effects
- **Reduced Motion Support** — Respects `prefers-reduced-motion` OS setting
- **Product Catalog** — Hero cards, tilt-on-hover grid, product detail pages with size selection
- **Shopping Cart** — Slide-out cart drawer with quantity controls, size selection, and order summary
- **Responsive Design** — Tailwind CSS layout optimized for mobile through desktop
- **Dark Aesthetic** — Film grain overlays, glass-morphism, parallax sections, animated marquee

## Tech Stack

| Technology          | Purpose                                 |
| ------------------- | --------------------------------------- |
| **Next.js 16**      | React framework with App Router         |
| **React 19**        | UI components                           |
| **Three.js**        | WebGL background & particle rendering   |
| **GSAP**            | Shader transitions & loading animations |
| **Tailwind CSS v4** | Styling                                 |
| **Framer Motion**   | Scroll animations & page transitions    |
| **Lenis**           | Smooth scrolling                        |
| **TypeScript**      | Type safety                             |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/chahinsellami/Nova.git
cd Nova/portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx                 # Home — shader slider, brand statement, products
│   ├── layout.tsx               # Root layout with metadata & fonts
│   ├── ClientLayout.tsx         # Client wrapper: WebGL, particles, smooth scroll
│   ├── WebGLContext.tsx          # React context for shared WebGL background
│   ├── CartContext.tsx           # Shopping cart state management
│   ├── globals.css              # Global styles & performance hints
│   ├── components/
│   │   ├── WebGLBackground.tsx  # Three.js displacement shader background
│   │   ├── VisualSlider.tsx     # Shader effects image slider (5 effects)
│   │   ├── ParticleField.tsx    # Three.js ambient particle system
│   │   ├── CursorGlow.tsx       # GPU-accelerated cursor glow
│   │   ├── SmoothScroll.tsx     # Lenis smooth scroll provider
│   │   ├── PageTransition.tsx   # Framer Motion route transitions
│   │   ├── LoadingScreen.tsx    # GSAP branded loading animation
│   │   ├── Navbar.tsx           # Navigation with search overlay
│   │   ├── CartDrawer.tsx       # Slide-out shopping cart
│   │   ├── TiltCard.tsx         # 3D perspective hover effect
│   │   ├── Footer.tsx           # Site footer
│   │   └── MagneticButton.tsx   # Magnetic hover button effect
│   ├── hooks/
│   │   └── useDevicePerformance.ts  # Device tier detection hook
│   ├── data/
│   │   └── products.ts         # Product catalog data
│   ├── product/[id]/           # Dynamic product detail pages
│   ├── collection/             # Collection with filters
│   ├── collections/            # Collections overview
│   ├── cart/                   # Cart page
│   └── contact/                # Contact page
└── public/
    └── redlether.png           # Editorial image
```

## Performance

The site auto-detects device capability and adjusts rendering:

| Tier       | WebGL BG | Particles | Cursor Glow | Pixel Ratio |
| ---------- | -------- | --------- | ----------- | ----------- |
| **High**   | Yes      | 60        | Yes         | 2x          |
| **Medium** | Yes      | 40        | No          | 1.5x        |
| **Low**    | Yes      | Off       | No          | 1x          |

Additional optimizations:
- VisualSlider renders on-demand (not continuous RAF)
- ParticleField throttled to 30fps, pauses when tab hidden
- `content-visibility: auto` on sections for off-screen skip
- `prefers-reduced-motion` disables all animations

## Deployment

Deploy easily on [Vercel](https://vercel.com):

```bash
npm run build
```

Or connect the GitHub repo directly to Vercel for automatic deployments on every push.

## License

© 2026 NOVA. All rights reserved.
