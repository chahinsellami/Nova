"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../CartContext";
import Footer from "../components/Footer";

const PRODUCTS = [
  {
    id: "red-leather-jacket",
    name: "Red Lether Jacket",
    price: "80 DT",
    image: "/redlether.png",
    description: "Premium hand-crafted leather jacket in deep crimson.",
  },
  {
    id: "black-leather-jacket",
    name: "Black Lether Jacket",
    price: "80 DT",
    image: "/blacklether.png",
    description: "Classic black leather jacket with shadow finish.",
  },
];

export default function CollectionPage() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  const handleAdd = (product: (typeof PRODUCTS)[number]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
  };

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-[11px] tracking-[0.5em] uppercase text-white/40 font-light mb-2">
          FW26 Collection
        </h1>
        <h2 className="text-3xl md:text-5xl font-extralight tracking-wider uppercase mb-16">
          The Jackets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white/[0.03] mb-5">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm md:text-base font-light tracking-[0.1em] uppercase">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/30 mt-1">
                    {product.description}
                  </p>
                </div>
                <span className="text-sm md:text-base font-light text-white/60 tracking-wider whitespace-nowrap ml-4">
                  {product.price}
                </span>
              </div>

              <button
                onClick={() => handleAdd(product)}
                className={`w-full py-3 text-[10px] md:text-[11px] tracking-[0.4em] uppercase font-medium transition-all duration-300 ${
                  added === product.id
                    ? "bg-white/20 text-white border border-white/20"
                    : "bg-white text-black hover:bg-white/90"
                }`}
              >
                {added === product.id ? "Added ✓" : "Add to Cart"}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="mt-32" />
      <Footer />
    </div>
  );
}
