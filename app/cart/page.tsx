"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../CartContext";

export default function CartPage() {
  const { items, removeFromCart, totalItems } = useCart();

  const total = items.reduce((sum, item) => {
    const price = parseInt(item.price);
    return sum + price * item.qty;
  }, 0);

  return (
    <div className="min-h-screen bg-transparent pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extralight tracking-wider uppercase mb-12">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="border border-white/10 p-12 text-center">
            <p className="text-white/40 text-sm mb-6">Your cart is empty</p>
            <Link
              href="/collection"
              className="inline-block bg-white text-black px-10 py-3.5 text-[10px] tracking-[0.4em] font-medium uppercase hover:bg-white/90 transition-colors duration-300"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-12">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 border border-white/10 p-4"
                >
                  <div className="relative w-20 h-28 flex-shrink-0 bg-white/[0.03]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-light tracking-[0.1em] uppercase">
                        {item.name}
                      </h3>
                      <p className="text-xs text-white/40 mt-1">
                        Qty: {item.qty}
                      </p>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="text-sm text-white/60">
                        {item.price}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-6">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm tracking-[0.2em] uppercase text-white/50">
                  Total ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
                <span className="text-xl font-light">{total} DT</span>
              </div>
              <button className="w-full bg-white text-black py-4 text-[11px] tracking-[0.4em] font-medium uppercase hover:bg-white/90 transition-colors duration-300">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
