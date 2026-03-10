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
  {
    id: "olive-bomber",
    name: "Olive Bomber Jacket",
    price: "95 DT",
    image: "",
    description: "Military-inspired bomber in matte olive.",
  },
  {
    id: "navy-trench",
    name: "Navy Trench Coat",
    price: "120 DT",
    image: "",
    description: "Tailored trench coat in midnight navy.",
  },
  {
    id: "camel-suede",
    name: "Camel Suede Jacket",
    price: "110 DT",
    image: "",
    description: "Soft suede jacket in warm camel tone.",
  },
  {
    id: "charcoal-puffer",
    name: "Charcoal Puffer",
    price: "90 DT",
    image: "",
    description: "Lightweight puffer in matte charcoal.",
  },
  {
    id: "ivory-moto",
    name: "Ivory Moto Jacket",
    price: "100 DT",
    image: "",
    description: "Biker-cut jacket in off-white ivory.",
  },
  {
    id: "burgundy-blazer",
    name: "Burgundy Blazer",
    price: "85 DT",
    image: "",
    description: "Structured blazer in deep burgundy.",
  },
  {
    id: "stone-parka",
    name: "Stone Parka",
    price: "130 DT",
    image: "",
    description: "Oversized parka in weathered stone.",
  },
  {
    id: "midnight-denim",
    name: "Midnight Denim Jacket",
    price: "75 DT",
    image: "",
    description: "Raw denim jacket in deep indigo wash.",
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
        <h2 className="text-[15px] tracking-[0.5em] uppercase text-white/40 font-light mb-2">
          FW26 Collection
        </h2>
        <div className="w-16 h-px bg-white/10 mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative rounded-xl overflow-hidden bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] shadow-lg shadow-black/30 hover:border-white/15 hover:shadow-xl hover:shadow-black/40 transition-all duration-500"
            >
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
              </div>

              {/* Info */}
              <div className="p-2.5 md:p-3">
                <h3 className="text-[8px] md:text-[10px] font-light tracking-[0.1em] uppercase leading-tight truncate">
                  {product.name}
                </h3>
                <span className="block mt-1.5 text-sm md:text-lg font-extralight tracking-wider text-white/80">
                  {product.price}
                </span>

                <button
                  onClick={() => handleAdd(product)}
                  className={`w-full mt-2.5 py-1.5 md:py-2 rounded-lg text-[7px] md:text-[9px] tracking-[0.3em] uppercase font-medium transition-all duration-300 ${
                    added === product.id
                      ? "bg-white/15 text-white border border-white/15"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {added === product.id ? "Added ✓" : "Add to Cart"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="mt-32" />
      <Footer />
    </div>
  );
}
