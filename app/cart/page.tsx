"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../CartContext";
import Footer from "../components/Footer";

export default function CartPage() {
  const { items, removeFromCart, totalItems } = useCart();

  const total = items.reduce((sum, item) => {
    const price = parseInt(item.price);
    return sum + price * item.qty;
  }, 0);

  return (
    <div className="min-h-screen bg-transparent">
      {/* ── Header ── */}
      <section className="relative pt-36 md:pt-44 pb-12 px-4 overflow-hidden">
        {/* Decorative watermark */}
        <div className="absolute top-16 right-4 md:right-12 pointer-events-none select-none">
          <span className="text-[120px] md:text-[200px] font-extralight text-white/[0.015] leading-none tracking-tighter">
            &times;
          </span>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[8px] md:text-[10px] tracking-[0.6em] text-white/20 uppercase font-light"
          >
            Your Selection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-3xl md:text-5xl font-extralight tracking-wide uppercase"
          >
            Shopping Cart
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 w-16 h-px bg-gradient-to-r from-white/20 to-transparent origin-left"
          />
        </div>
      </section>

      {/* ── Cart content ── */}
      <section className="relative z-10 px-4 md:px-12 pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto">
          {items.length === 0 ? (
            /* ── Empty state ── */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-14 md:p-20 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-white/[0.08] flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="w-7 h-7 text-white/15"
                >
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-white/30 text-sm tracking-wide font-light mb-2">
                Your cart is empty
              </p>
              <p className="text-[10px] text-white/15 tracking-wider mb-8">
                Discover something you love from our collection.
              </p>
              <Link
                href="/collection"
                className="group relative inline-block border border-white/15 px-10 py-3.5 text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-white/50 hover:text-white/80 transition-all duration-500 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/[0.04] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative">Browse Collection</span>
              </Link>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* ── Items list ── */}
              <div className="md:col-span-2 space-y-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group flex gap-5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] p-4 transition-all duration-500"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-20 h-28 md:w-24 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-white/[0.02]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h3 className="text-xs md:text-sm font-light tracking-[0.15em] uppercase">
                            {item.name}
                          </h3>
                          <p className="text-[10px] text-white/20 tracking-wider mt-1">
                            Qty: {item.qty}
                          </p>
                        </div>
                        <div className="flex items-end justify-between">
                          <span className="text-sm md:text-base font-extralight tracking-wider text-white/60">
                            {item.price}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white/60 transition-colors duration-300"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* ── Summary ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="md:col-span-1"
              >
                <div className="sticky top-28 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8">
                  <h3 className="text-[10px] tracking-[0.4em] uppercase text-white/30 font-light mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-[11px] tracking-wider">
                      <span className="text-white/30">
                        Subtotal ({totalItems}{" "}
                        {totalItems === 1 ? "item" : "items"})
                      </span>
                      <span className="text-white/60">{total} DT</span>
                    </div>
                    <div className="flex justify-between text-[11px] tracking-wider">
                      <span className="text-white/30">Shipping</span>
                      <span className="text-white/40">
                        {total >= 150 ? "Free" : "15 DT"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/[0.06] pt-4 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                        Total
                      </span>
                      <span className="text-lg md:text-xl font-extralight tracking-wider">
                        {total + (total >= 150 ? 0 : 15)} DT
                      </span>
                    </div>
                  </div>

                  <button className="group relative w-full border border-white/20 py-4 text-[10px] tracking-[0.5em] uppercase text-white/60 hover:text-white transition-all duration-500 overflow-hidden mb-3">
                    <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative group-hover:text-black transition-colors duration-500">
                      Checkout
                    </span>
                  </button>

                  <Link
                    href="/collection"
                    className="block text-center text-[9px] tracking-[0.3em] uppercase text-white/20 hover:text-white/40 transition-colors duration-300"
                  >
                    Continue Shopping
                  </Link>

                  {total < 150 && (
                    <p className="mt-5 text-[9px] text-white/15 tracking-wider text-center">
                      Add {150 - total} DT more for free shipping
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
