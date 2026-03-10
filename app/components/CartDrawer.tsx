"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../CartContext";

export default function CartDrawer() {
  const { items, removeFromCart, totalItems, isCartOpen, closeCart } =
    useCart();

  const total = items.reduce((sum, item) => {
    const price = parseInt(item.price);
    return sum + (isNaN(price) ? 0 : price * item.qty);
  }, 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isCartOpen, closeCart]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[56] w-full max-w-sm bg-black/95 border-l border-white/[0.06] backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
              <h2 className="text-xs tracking-[0.4em] uppercase text-white/60">
                Cart ({totalItems})
              </h2>
              <button
                onClick={closeCart}
                className="text-white/30 hover:text-white transition-colors p-1"
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
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-white/20">
                    Your cart is empty
                  </p>
                  <button
                    onClick={closeCart}
                    className="text-[9px] tracking-[0.3em] uppercase text-white/40 border border-white/10 px-5 py-2 rounded-full hover:text-white hover:border-white/25 transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                    >
                      <div className="relative w-16 h-20 rounded-md overflow-hidden flex-shrink-0 bg-white/[0.03]">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white/10 text-[7px]">N</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h3 className="text-[10px] tracking-wider uppercase text-white/70 truncate">
                            {item.name}
                          </h3>
                          <p className="text-[9px] text-white/30 mt-0.5">
                            Qty: {item.qty}
                          </p>
                        </div>
                        <div className="flex items-end justify-between">
                          <span className="text-[11px] text-white/50 tracking-wider">
                            {item.price}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[8px] tracking-[0.2em] uppercase text-white/25 hover:text-white/60 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/[0.06]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                    Total
                  </span>
                  <span className="text-sm tracking-wider font-light">
                    {total} DT
                  </span>
                </div>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full py-3.5 text-center text-[10px] tracking-[0.4em] uppercase font-medium bg-white text-black rounded-lg hover:bg-white/90 transition-colors"
                >
                  View Cart & Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
