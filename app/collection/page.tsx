"use client";

import React, { useRef, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Footer from "../components/Footer";
import TiltCard from "../components/TiltCard";
import PRODUCTS, { type Product } from "../data/products";

type SortOption = "default" | "price-asc" | "price-desc" | "sale";

/* ── Scroll-triggered product grid ── */
function ProductGrid({ products }: { products: Product[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
    >
      {products.map((product, i) => (
        <TiltCard key={product.id}>
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.94 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative rounded-xl overflow-hidden bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] shadow-lg shadow-black/30 hover:border-white/15 hover:shadow-xl hover:shadow-black/40 transition-all duration-500 h-full"
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
                  <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
                    <span className="text-white/10 text-[9px] tracking-[0.3em] uppercase">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* View overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                    View Details
                  </span>
                </div>

                {/* Sale badge */}
                {product.originalPrice && (
                  <div className="absolute top-2 left-2">
                    <span className="text-[8px] tracking-wider uppercase bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">
                      Sale
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2.5 md:p-3">
                <h3 className="text-[8px] md:text-[10px] font-light tracking-widest uppercase leading-tight truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-1.5">
                  {product.originalPrice && (
                    <span className="text-xs text-white/30 line-through tracking-wider">
                      {product.originalPrice} DT
                    </span>
                  )}
                  <span className="text-sm md:text-lg font-extralight tracking-wider text-white/80">
                    {product.price} DT
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </TiltCard>
      ))}
    </div>
  );
}

export default function CollectionPage() {
  const [sort, setSort] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [showFilters, setShowFilters] = useState(false);

  const prices = PRODUCTS.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "sale":
        result = [...result].sort(
          (a, b) => (b.originalPrice ? 1 : 0) - (a.originalPrice ? 1 : 0),
        );
        break;
    }
    return result;
  }, [sort, priceRange]);

  return (
    <div className="min-h-screen bg-transparent">
      {/* ── Hero header ── */}
      <section
        ref={heroRef}
        className="relative pt-36 md:pt-44 pb-12 px-4 overflow-hidden"
      >
        {/* Decorative watermark */}
        <div className="absolute top-16 right-4 md:right-12 pointer-events-none select-none">
          <span className="text-[120px] md:text-[200px] font-extralight text-white/[0.015] leading-none tracking-tighter">
            FW
          </span>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-[8px] md:text-[10px] tracking-[0.6em] text-white/20 uppercase font-light"
              >
                Fall / Winter 2026
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
                Collection
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-6 w-16 h-px bg-gradient-to-r from-white/20 to-transparent origin-left"
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-3xl md:text-5xl font-extralight text-white/10">
                {String(filtered.length).padStart(2, "0")}
              </span>
              <span className="text-[9px] tracking-[0.3em] text-white/15 uppercase">
                Pieces
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Controls + Grid ── */}
      <section className="relative z-10 px-4 md:px-12 lg:px-20 pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Controls bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`text-[9px] tracking-[0.3em] uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                showFilters
                  ? "border-white/30 text-white"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
                Filter
              </span>
            </button>

            {/* Sort dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-transparent border border-white/10 text-white/40 text-[9px] tracking-[0.2em] uppercase px-4 py-2 rounded-full appearance-none cursor-pointer hover:border-white/20 hover:text-white/60 transition-all duration-300 focus:outline-none pr-8"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.3)' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 10px center",
                backgroundSize: "12px",
              }}
            >
              <option value="default" className="bg-black">
                Default
              </option>
              <option value="price-asc" className="bg-black">
                Price: Low → High
              </option>
              <option value="price-desc" className="bg-black">
                Price: High → Low
              </option>
              <option value="sale" className="bg-black">
                On Sale
              </option>
            </select>
          </motion.div>

          {/* Filter panel */}
          <motion.div
            initial={false}
            animate={{
              height: showFilters ? "auto" : 0,
              opacity: showFilters ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">
                Price
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/40 w-14">
                  {priceRange[0]} DT
                </span>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      Math.min(Number(e.target.value), priceRange[1]),
                      priceRange[1],
                    ])
                  }
                  className="w-24 md:w-40 accent-white h-px appearance-none bg-white/15 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <span className="text-[10px] text-white/20">to</span>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Math.max(Number(e.target.value), priceRange[0]),
                    ])
                  }
                  className="w-24 md:w-40 accent-white h-px appearance-none bg-white/15 rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <span className="text-[10px] text-white/40 w-14">
                  {priceRange[1]} DT
                </span>
              </div>
              <span className="text-[9px] text-white/20 tracking-wider">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </motion.div>

          <ProductGrid products={filtered} />
        </div>
      </section>
      <Footer />
    </div>
  );
}
