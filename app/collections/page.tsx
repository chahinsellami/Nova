"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const COLLECTIONS = [
  {
    slug: "collection",
    title: "FW26",
    subtitle: "Fall / Winter 2026",
    desc: "Dark silhouettes and structured leather. Built for the cold.",
    image: "/redlether.png",
  },
  {
    slug: null,
    title: "SS27",
    subtitle: "Spring / Summer 2027",
    desc: "Lightweight constructions. Same darkness, new movement.",
    image: null,
    comingSoon: true,
  },
  {
    slug: null,
    title: "Essentials",
    subtitle: "Timeless Pieces",
    desc: "Core staples that anchor every wardrobe. No season, no expiry.",
    image: null,
    comingSoon: true,
  },
];

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      {/* ── Hero ── */}
      <section className="relative pt-36 md:pt-44 pb-16 px-4 overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-16 right-4 md:right-12 pointer-events-none select-none">
          <span className="text-[120px] md:text-[200px] font-extralight text-white/[0.015] leading-none tracking-tighter">
            N
          </span>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[8px] md:text-[10px] tracking-[0.6em] text-white/20 uppercase font-light"
          >
            Explore
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-3xl md:text-5xl lg:text-6xl font-extralight tracking-wide uppercase leading-tight"
          >
            Our Collections
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 w-16 h-px bg-gradient-to-r from-white/20 to-transparent origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-6 text-sm md:text-base font-light text-white/30 leading-relaxed tracking-wide max-w-xl"
          >
            Each collection tells a different chapter of the NOVA story — united
            by a commitment to dark luxury and meticulous craft.
          </motion.p>
        </div>
      </section>

      {/* ── Collection cards ── */}
      <section className="relative z-10 px-4 md:px-12 lg:px-20 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {col.slug ? (
                <Link href={`/${col.slug}`} className="group block">
                  <CollectionCard col={col} />
                </Link>
              ) : (
                <div className="opacity-80">
                  <CollectionCard col={col} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function CollectionCard({
  col,
}: {
  col: {
    title: string;
    subtitle: string;
    desc: string;
    image: string | null;
    comingSoon?: boolean;
  };
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] group-hover:border-white/15 transition-all duration-700">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative w-full md:w-2/5 aspect-[16/9] md:aspect-auto md:min-h-[280px] overflow-hidden bg-white/[0.02]">
          {col.image ? (
            <>
              <Image
                src={col.image}
                alt={col.title}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[60px] md:text-[80px] font-extralight text-white/[0.04] tracking-wider uppercase">
                {col.title}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 px-6 py-6 md:px-10 md:py-8 flex flex-col justify-center">
          <span className="text-[8px] md:text-[10px] tracking-[0.5em] text-white/20 uppercase font-light">
            {col.subtitle}
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-extralight tracking-wide uppercase">
            {col.title}
          </h2>
          <div className="mt-3 w-10 h-px bg-white/10" />
          <p className="mt-4 text-[11px] md:text-sm font-light text-white/30 leading-relaxed tracking-wide max-w-sm">
            {col.desc}
          </p>

          {col.comingSoon ? (
            <span className="mt-6 inline-flex items-center gap-2 text-[9px] tracking-[0.4em] uppercase text-white/20 font-light">
              <span className="w-1.5 h-1.5 rounded-full bg-white/15 animate-pulse" />
              Coming Soon
            </span>
          ) : (
            <span className="mt-6 inline-flex items-center gap-3 text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/40 group-hover:text-white/70 transition-colors duration-500">
              Explore Collection
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
