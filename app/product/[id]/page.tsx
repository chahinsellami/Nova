"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getProductById } from "../../data/products";
import PRODUCTS from "../../data/products";
import { useCart } from "../../CartContext";
import Footer from "../../components/Footer";

const ACCORDION_ITEMS = [
  { key: "materials", label: "Materials" },
  { key: "shipping", label: "Shipping" },
  { key: "exchange", label: "Exchange & Returns" },
] as const;

const SIZE_CHART = [
  { size: "XS", chest: "82-86", waist: "62-66", hips: "86-90" },
  { size: "S", chest: "86-90", waist: "66-70", hips: "90-94" },
  { size: "M", chest: "90-94", waist: "70-74", hips: "94-98" },
  { size: "L", chest: "94-98", waist: "74-78", hips: "98-102" },
  { size: "XL", chest: "98-102", waist: "78-82", hips: "102-106" },
  { size: "XXL", chest: "102-106", waist: "82-86", hips: "106-110" },
];

/* ── Size Guide Modal ── */
function SizeGuideModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-black/90 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-sm tracking-[0.4em] uppercase text-white/60 mb-1">
              Size Guide
            </h3>
            <p className="text-[10px] text-white/25 tracking-wider mb-6">
              Measurements in centimeters
            </p>

            <table className="w-full text-[10px] md:text-[11px] tracking-wider">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/40 font-light uppercase py-3 pr-4">
                    Size
                  </th>
                  <th className="text-left text-white/40 font-light uppercase py-3 pr-4">
                    Chest
                  </th>
                  <th className="text-left text-white/40 font-light uppercase py-3 pr-4">
                    Waist
                  </th>
                  <th className="text-left text-white/40 font-light uppercase py-3">
                    Hips
                  </th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="border-b border-white/[0.05]">
                    <td className="py-3 pr-4 text-white/70 font-medium">
                      {row.size}
                    </td>
                    <td className="py-3 pr-4 text-white/40">{row.chest}</td>
                    <td className="py-3 pr-4 text-white/40">{row.waist}</td>
                    <td className="py-3 text-white/40">{row.hips}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-[9px] text-white/15 tracking-wider mt-4">
              If between sizes, we recommend sizing up for a relaxed fit.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ProductPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const { addToCart, openCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-sm tracking-widest uppercase mb-6">
            Product not found
          </p>
          <Link
            href="/collection"
            className="text-[10px] tracking-[0.4em] uppercase text-white/50 border border-white/15 px-6 py-3 hover:text-white hover:border-white/30 transition-all"
          >
            Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${product.id}-${selectedSize}`,
        name: `${product.name} (${selectedSize})`,
        price: `${product.price} DT`,
        image: product.image,
      });
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 800);
  };

  const toggleSection = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  const accordionContent: Record<string, string> = {
    materials: product.materials,
    shipping: product.shipping,
    exchange: product.exchange,
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* ── Breadcrumb hero ── */}
      <div className="relative pt-32 md:pt-40 pb-6 px-4 md:px-12 overflow-hidden">
        <div className="absolute top-16 right-4 md:right-12 pointer-events-none select-none">
          <span className="text-[120px] md:text-[180px] font-extralight text-white/[0.015] leading-none tracking-tighter">
            N
          </span>
        </div>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/25"
          >
            <Link
              href="/collection"
              className="hover:text-white/60 transition-colors duration-300"
            >
              Collection
            </Link>
            <span className="text-white/10">/</span>
            <span className="text-white/40">{product.name}</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 md:px-12 pb-20"
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* ── Image Section ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:w-[55%] lg:w-[50%]"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/10 text-[10px] tracking-[0.4em] uppercase">
                    Image Coming Soon
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Product Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="md:w-[45%] lg:w-[50%] flex flex-col"
          >
            {/* Brand */}
            <span className="text-[9px] tracking-[0.5em] uppercase text-white/25 font-light mb-2">
              NOVA
            </span>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extralight tracking-wide uppercase leading-tight mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              {product.originalPrice && (
                <span className="text-sm text-white/30 line-through tracking-wider">
                  {product.originalPrice}.000 DT
                </span>
              )}
              <span className="text-lg md:text-xl font-light tracking-wider text-white/90">
                {product.price}.000 DT
              </span>
              {product.originalPrice && (
                <span className="text-[9px] tracking-wider uppercase bg-blue-600 text-white px-2 py-0.5 rounded-full font-medium">
                  Sale
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-[11px] md:text-xs text-white/35 leading-relaxed tracking-wide mb-8">
              {product.description}
            </p>

            {/* Size */}
            <div className="mb-6">
              <span className="text-xs tracking-wider text-white/60 mb-3 block">
                Size
              </span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border text-[11px] tracking-wider font-light transition-all duration-200 ${
                      selectedSize === size
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-white/60 hover:border-white/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-[9px] text-white/20 mt-2 tracking-wider">
                  Select a size to continue
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <span className="text-xs tracking-wider text-white/60 mb-3 block">
                Quantity
              </span>
              <div className="inline-flex items-center border border-white/15 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors text-lg font-light"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm tracking-wider">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors text-lg font-light"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-10">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 text-[11px] tracking-[0.4em] uppercase font-medium transition-all duration-300 rounded-lg border ${
                  added
                    ? "bg-white/15 text-white border-white/15"
                    : selectedSize
                      ? "bg-transparent text-white border-white/30 hover:bg-white hover:text-black"
                      : "bg-transparent text-white/20 border-white/10 cursor-not-allowed"
                }`}
              >
                {added ? "Added to Cart ✓" : "Add to Cart"}
              </button>

              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 text-[11px] tracking-[0.4em] uppercase font-medium transition-all duration-300 rounded-lg ${
                  selectedSize
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-white/10 text-white/20 cursor-not-allowed"
                }`}
              >
                Buy it Now
              </button>
            </div>

            {/* Accordion Sections */}
            <div className="border-t border-white/[0.06]">
              {ACCORDION_ITEMS.map(({ key, label }) => (
                <div key={key} className="border-b border-white/[0.06]">
                  <button
                    onClick={() => toggleSection(key)}
                    className="w-full flex items-center justify-between py-4 group"
                  >
                    <span className="text-xs tracking-wider text-white/60 group-hover:text-white transition-colors">
                      {label}
                    </span>
                    <svg
                      className={`w-4 h-4 text-white/30 transition-transform duration-300 ${
                        openSection === key ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openSection === key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[11px] text-white/30 leading-relaxed tracking-wide pb-4">
                          {accordionContent[key]}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Size Guide button */}
              <div className="border-b border-white/[0.06]">
                <button
                  onClick={() => setSizeGuideOpen(true)}
                  className="w-full flex items-center justify-between py-4 group"
                >
                  <span className="text-xs tracking-wider text-white/60 group-hover:text-white transition-colors">
                    Size Guide
                  </span>
                  <svg
                    className="w-4 h-4 text-white/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── You May Also Like ── */}
        <RelatedProducts currentId={product.id} />
      </motion.div>

      <Footer />

      <SizeGuideModal
        open={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </div>
  );
}

/* ── Related Products Section ── */
function RelatedProducts({ currentId }: { currentId: string }) {
  const related = PRODUCTS.filter((p) => p.id !== currentId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20 md:mt-28"
    >
      <span className="text-[8px] md:text-[10px] tracking-[0.6em] text-white/20 uppercase font-light">
        Curated for you
      </span>
      <h3 className="mt-2 text-xl md:text-2xl font-extralight tracking-wide uppercase">
        You May Also Like
      </h3>
      <div className="mt-3 w-10 h-px bg-white/15" />

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {related.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={`/product/${product.id}`}
              className="group block rounded-xl overflow-hidden bg-white/[0.04] border border-white/[0.06] hover:border-white/15 transition-all duration-500"
            >
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
                    <span className="text-white/10 text-[8px] tracking-[0.3em] uppercase">
                      Coming Soon
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="p-2.5">
                <h4 className="text-[8px] md:text-[9px] font-light tracking-widest uppercase truncate text-white/60">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  {product.originalPrice && (
                    <span className="text-[10px] text-white/25 line-through tracking-wider">
                      {product.originalPrice} DT
                    </span>
                  )}
                  <span className="text-xs md:text-sm font-extralight tracking-wider text-white/70">
                    {product.price} DT
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
