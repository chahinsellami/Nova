"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../CartContext";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/40 backdrop-blur-md border-b border-white/[0.04]"
          : ""
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Left */}
          <div className="hidden md:flex gap-10 text-[11px] font-light tracking-[0.15em] uppercase">
            <Link
              href="/collection"
              className="text-white/50 hover:text-white transition-colors duration-500"
            >
              Collection
            </Link>
          </div>

          {/* Logo */}
          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <span className="text-[13px] font-light tracking-[0.35em] uppercase">
              NOVA
            </span>
          </Link>

          {/* Right */}
          <div className="hidden md:flex gap-10 text-[11px] font-light tracking-[0.15em] uppercase items-center ml-auto">
            <Link
              href="/contact"
              className="text-white/50 hover:text-white transition-colors duration-500"
            >
              Contact
            </Link>
            <Link
              href="/cart"
              className="text-white/50 hover:text-white transition-colors duration-500 flex items-center gap-2"
            >
              Cart
              <span className="w-4 h-4 rounded-full border border-white/15 flex items-center justify-center text-[9px] text-white/30">
                {totalItems}
              </span>
            </Link>
          </div>

          {/* Mobile */}
          <button
            className="md:hidden ml-auto p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-5 h-px bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`}
              />
              <span
                className={`block w-5 h-px bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-8 pt-4">
            <div className="flex flex-col gap-6 text-[11px] font-light tracking-[0.15em] uppercase">
              <Link
                href="/collection"
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                Collection
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
              >
                Cart ({totalItems})
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
