"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import PRODUCTS from "./data/products";
import TiltCard from "./components/TiltCard";
import Footer from "./components/Footer";

const VisualSlider = dynamic(() => import("./components/VisualSlider"), {
  ssr: false,
});

/* ═══════════════════════════════════════════════
   BRAND STATEMENT
   ═══════════════════════════════════════════════ */
function BrandStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative z-10 bg-transparent overflow-hidden py-28 md:py-44"
    >
      <motion.div
        style={{ y, opacity }}
        className="max-w-5xl mx-auto px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[8px] md:text-[10px] tracking-[0.8em] text-white/50 uppercase font-light"
        >
          Established 2024
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-3xl md:text-5xl lg:text-6xl font-extralight tracking-wide leading-tight"
        >
          Where darkness meets
          <br />
          <span className="text-white/60">elegance</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-sm md:text-base font-light text-white/60 leading-relaxed max-w-2xl mx-auto tracking-wide"
        >
          NOVA crafts garments that exist at the intersection of shadow and
          sophistication. Each piece is designed to move with you — constructed
          with premium materials and an uncompromising attention to detail.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent origin-center"
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MARQUEE TICKER
   ═══════════════════════════════════════════════ */
function Marquee() {
  const items = [
    "PREMIUM LEATHER",
    "HANDCRAFTED",
    "LIMITED EDITION",
    "FW26",
    "SUSTAINABLE",
    "NOVA",
    "DARK LUXURY",
    "MADE TO LAST",
  ];
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <section className="relative z-10 bg-transparent border-y border-white/[0.04] py-5 overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-white/30 font-light px-6 md:px-10">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/8 shrink-0" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   WHY NOVA — FEATURES
   ═══════════════════════════════════════════════ */
function WhyNova() {
  const features = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="w-6 h-6"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
      title: "Premium Materials",
      desc: "Sourced from the finest tanneries and mills worldwide.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="w-6 h-6"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Built to Last",
      desc: "Reinforced construction with lifetime warranty on hardware.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="w-6 h-6"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
      ),
      title: "Worldwide Shipping",
      desc: "Free delivery on orders over 150 DT. 3-5 day express.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="w-6 h-6"
        >
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
        </svg>
      ),
      title: "Designed with Care",
      desc: "Every stitch considered. Every detail intentional.",
    },
  ];

  return (
    <section className="relative z-10 bg-transparent px-4 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center md:text-left group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/[0.15] text-white/50 group-hover:border-white/30 group-hover:text-white/70 transition-all duration-500 mb-4">
                {f.icon}
              </div>
              <h3 className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-light mb-2 text-white/90">
                {f.title}
              </h3>
              <p className="text-[10px] md:text-[11px] text-white/50 font-light leading-relaxed tracking-wide">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   EDITORIAL SPLIT
   ═══════════════════════════════════════════════ */
function EditorialSplit() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      className="relative z-10 bg-transparent px-4 md:px-12 lg:px-20 py-20 md:py-32"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-xl"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-[-10%]">
            <Image
              src="/redlether.png"
              alt="NOVA Editorial"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>

        {/* Text */}
        <div className="flex flex-col justify-center py-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[8px] md:text-[10px] tracking-[0.6em] text-white/50 uppercase font-light"
          >
            The Craft
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-4 text-2xl md:text-4xl font-extralight tracking-wide uppercase leading-tight"
          >
            Obsessed with
            <br />
            every detail
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 w-10 h-px bg-white/30 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-sm md:text-base font-light text-white/60 leading-relaxed tracking-wide"
          >
            From the initial sketch to the final stitch, each NOVA garment
            undergoes a meticulous process. We work exclusively with
            hand-selected leathers and fabrics, ensuring every jacket carries
            weight, character, and intention.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-4 text-sm md:text-base font-light text-white/60 leading-relaxed tracking-wide"
          >
            Our hardware is custom-cast in matte finish. Our linings use
            temperature-regulating fabric. Nothing is accidental.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <Link
              href="/collection"
              className="inline-block border border-white/20 px-8 py-3 text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/60 hover:border-white/40 hover:text-white/90 transition-all duration-500"
            >
              Explore Collection
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   NEWSLETTER
   ═══════════════════════════════════════════════ */
function Newsletter() {
  return (
    <section className="relative z-10 bg-transparent border-t border-white/[0.04] px-4 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[8px] md:text-[10px] tracking-[0.6em] text-white/50 uppercase font-light"
        >
          Stay in the shadows
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-4 text-xl md:text-3xl font-extralight tracking-wide uppercase"
        >
          Join the Nova circle
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 text-[11px] md:text-sm text-white/55 font-light tracking-wide"
        >
          Be the first to know about new drops, exclusive offers, and
          behind‑the‑scenes stories.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-none px-5 py-3 text-[10px] md:text-xs tracking-[0.15em] text-white/60 placeholder:text-white/15 outline-none focus:border-white/20 transition-colors duration-300"
          />
          <button
            type="submit"
            className="bg-white text-black px-6 py-3 text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-medium hover:bg-white/90 transition-colors duration-300 shrink-0"
          >
            Subscribe
          </button>
        </motion.form>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 text-[8px] text-white/30 tracking-widest uppercase"
        >
          No spam. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Split into hero (first 2 with images) and rest
  const heroProducts = PRODUCTS.filter((p) => p.image).slice(0, 2);
  const gridProducts = PRODUCTS.filter((p) => !heroProducts.includes(p));

  return (
    <section className="relative z-10 bg-transparent px-4 md:px-12 lg:px-20 py-20 md:py-32 overflow-hidden">
      {/* Decorative background number */}
      <div className="absolute top-8 right-4 md:right-12 pointer-events-none select-none">
        <span className="text-[120px] md:text-[200px] font-extralight text-white/[0.02] leading-none tracking-tighter">
          FW
        </span>
      </div>

      {/* Section heading — split layout */}
      <div className="max-w-7xl mx-auto mb-14 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-[8px] md:text-[10px] tracking-[0.6em] text-white/50 uppercase font-light">
            FW26 Collection
          </span>
          <h2 className="mt-3 text-2xl md:text-4xl lg:text-5xl font-extralight tracking-wide uppercase">
            Featured Products
          </h2>
          <div className="mt-4 w-12 h-px bg-white/30" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-baseline gap-2"
        >
          <span className="text-3xl md:text-5xl font-extralight text-white/25">
            {String(PRODUCTS.length).padStart(2, "0")}
          </span>
          <span className="text-[9px] tracking-[0.3em] text-white/35 uppercase">
            Pieces
          </span>
        </motion.div>
      </div>

      {/* Hero cards — 2 big cards side by side */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {heroProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={`/product/${product.id}`}
              className="group relative block rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/15 transition-all duration-700"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Hover reveal description */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                  <div className="text-center px-8 max-w-sm">
                    <p className="text-[10px] md:text-xs font-light text-white/60 leading-relaxed tracking-wide">
                      {product.description}
                    </p>
                    <span className="inline-block mt-4 text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-white/40 border-b border-white/15 pb-0.5">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Sale badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[8px] tracking-widest uppercase text-white/70">
                    Sale
                  </div>
                )}
              </div>

              {/* Info bar */}
              <div className="relative px-5 py-4 md:px-6 md:py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xs md:text-sm tracking-[0.15em] uppercase font-light">
                    {product.name}
                  </h3>
                  <span className="text-[9px] md:text-[10px] text-white/40 tracking-[0.3em] uppercase mt-0.5 block">
                    {product.sizes.length} sizes available
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm md:text-lg font-extralight tracking-wider text-white/80">
                    {product.price} DT
                  </span>
                  {product.originalPrice && (
                    <span className="block text-[9px] text-white/40 line-through">
                      {product.originalPrice} DT
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Standard grid */}
      <div
        ref={ref}
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
      >
        {gridProducts.map((product, i) => (
          <TiltCard key={product.id}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.06] hover:border-white/15 shadow-lg shadow-black/30 hover:shadow-xl hover:shadow-black/40 transition-all duration-500 h-full"
            >
              <Link href={`/product/${product.id}`} className="block h-full">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/[0.03] flex items-center justify-center relative">
                      <span className="text-white/10 text-[9px] tracking-[0.3em] uppercase">
                        Coming Soon
                      </span>
                      {/* Animated border pulse for coming soon */}
                      <div className="absolute inset-0 border border-white/[0.04] animate-pulse rounded-t-xl" />
                    </div>
                  )}
                  {/* Sale badge */}
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8px] tracking-widest uppercase text-white/70">
                      Sale
                    </div>
                  )}
                  {/* hover arrow */}
                  <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-1 group-hover:translate-y-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="w-3 h-3 text-white/50 -rotate-45"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 md:p-4">
                  <h3 className="text-[10px] md:text-xs tracking-[0.15em] uppercase font-light truncate">
                    {product.name}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="text-[11px] md:text-sm font-light tracking-wider text-white/70">
                      {product.price} DT
                    </span>
                    {product.originalPrice && (
                      <span className="text-[9px] md:text-xs text-white/40 line-through">
                        {product.originalPrice} DT
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-7xl mx-auto mt-14 md:mt-20 flex justify-center"
      >
        <Link
          href="/collection"
          className="group relative border border-white/20 px-10 py-3.5 text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-white/60 hover:text-white/90 transition-all duration-500 overflow-hidden"
        >
          <span className="absolute inset-0 bg-white/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          <span className="relative">View Full Collection</span>
        </Link>
      </motion.div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <VisualSlider />
      {/* Scroll indicator */}
      <div className="relative z-10 bg-transparent flex justify-center py-6">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[8px] tracking-[0.5em] text-white/40 uppercase">
            Scroll
          </span>
          <svg
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
            className="text-white/15"
          >
            <path
              d="M6 0v14M1 9l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
      {/* BrandStatement moved into the slider component */}
      <FeaturedProducts />
      <Marquee />
      <EditorialSplit />
      <WhyNova />
      <Newsletter />
      <Footer />
    </>
  );
}
