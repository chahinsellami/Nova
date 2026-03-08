"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Left */}
          <div className="hidden md:flex gap-10 text-[11px] font-light tracking-[0.15em] uppercase">
            <Link
              href="/mens"
              className="text-white/50 hover:text-white transition-colors duration-500"
            >
              Mens
            </Link>
            <Link
              href="/womens"
              className="text-white/50 hover:text-white transition-colors duration-500"
            >
              Womens
            </Link>
            <Link
              href="/collections"
              className="text-white/50 hover:text-white transition-colors duration-500"
            >
              Collections
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
                0
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
                href="/mens"
                className="text-white/50 hover:text-white transition-colors"
              >
                Mens
              </Link>
              <Link
                href="/womens"
                className="text-white/50 hover:text-white transition-colors"
              >
                Womens
              </Link>
              <Link
                href="/collections"
                className="text-white/50 hover:text-white transition-colors"
              >
                Collections
              </Link>
              <Link
                href="/contact"
                className="text-white/50 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/cart"
                className="text-white/50 hover:text-white transition-colors"
              >
                Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
