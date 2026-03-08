# NOVA — Premium Clothing Brand

A modern, immersive e-commerce website for **NOVA**, a premium clothing brand specializing in high-end darkwear and leather goods.

## About

NOVA is a fashion-forward clothing brand that blends minimalist design with bold craftsmanship. This website serves as the brand's digital storefront, featuring an interactive product showcase with cinematic transitions and a WebGL-powered background.

## Features

- **Three.js Displacement Shader Background** — Full-screen WebGL background with GLSL shader-based displacement transitions between images
- **GSAP-Powered Slide Transitions** — Smooth, cinematic product transitions triggered by scroll, touch, or keyboard
- **Responsive Design** — Tailwind CSS layout that adapts across devices
- **Product Showcase** — Full-screen slider highlighting leather goods with pricing and purchase links
- **Multi-Page Store** — Separate Men's and Women's collection pages with animated product grids
- **Dark Aesthetic** — A cohesive dark theme with film grain overlays and subtle typography

## Tech Stack

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| **Next.js 15**      | React framework with App Router |
| **React 19**        | UI components                   |
| **Three.js**        | WebGL background rendering      |
| **GSAP**            | Animations and transitions      |
| **Tailwind CSS v4** | Styling                         |
| **Framer Motion**   | Page-level animations           |
| **TypeScript**      | Type safety                     |

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
│   ├── page.tsx              # Home — product slider with WebGL background
│   ├── layout.tsx            # Root layout with metadata
│   ├── ClientLayout.tsx      # Client wrapper for WebGL + Navbar
│   ├── WebGLContext.tsx       # React context for shared background
│   ├── globals.css           # Global styles
│   ├── components/
│   │   ├── WebGLBackground.tsx  # Three.js displacement shader
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Site footer
│   │   └── ProductCard.tsx      # Product card component
│   ├── mens/                 # Men's collection page
│   ├── womens/               # Women's collection page
│   ├── cart/                 # Shopping cart
│   ├── collections/          # Collections page
│   └── data/
│       └── products.ts       # Product data
└── public/
    ├── redlether.png         # Product image
    └── blacklether.png       # Product image
```

## Deployment

Deploy easily on [Vercel](https://vercel.com):

```bash
npm run build
```

Or connect the GitHub repo directly to Vercel for automatic deployments on every push.

## License

© 2026 NOVA. All rights reserved.
