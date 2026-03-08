"use client";

import { Footer, ProductCard } from "@/app/components";
import { womensProducts } from "@/app/data/products";
import { motion } from "framer-motion";

export default function WomensPage() {
  return (
    <div className="relative min-h-screen pt-24">
      <section className="px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className="mb-20"
          >
            <span className="text-[9px] tracking-[0.5em] text-white/25 font-light uppercase">
              FW26 Collection
            </span>
            <h1 className="text-4xl lg:text-6xl font-extralight mt-4 tracking-[0.15em] uppercase">
              Womens
            </h1>
            <p className="text-white/30 font-light mt-5 max-w-sm text-xs leading-relaxed tracking-wide">
              Shadow-cast elegance. Refined textures and draping for the
              understated. Each piece numbered.
            </p>
          </motion.div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pb-20">
            {womensProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
