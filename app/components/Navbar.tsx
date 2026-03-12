"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../CartContext";
import PRODUCTS from "../data/products";

/* ── Search Overlay ── */
function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    ).slice(0, 5);
  }, [query]);

  const navigateTo = (id: string) => {
    onClose();
    router.push(`/product/${id}`);
  };

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-start justify-center pt-24 transition-all duration-400 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />
      <div
        className={`relative w-[90%] max-w-lg transition-all duration-400 ${
          open ? "translate-y-0 scale-100" : "-translate-y-6 scale-95"
        }`}
      >
        {/* Search input */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-white/[0.06] border border-white/10 rounded-xl pl-11 pr-10 py-4 text-sm text-white placeholder:text-white/25 tracking-wider focus:outline-none focus:border-white/25 transition-colors"
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
          >
            <svg
              className="w-4 h-4"
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

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-2 bg-white/[0.05] border border-white/10 rounded-xl overflow-hidden backdrop-blur-md">
            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => navigateTo(product.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.06] transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex-shrink-0 overflow-hidden relative">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white/10 text-[6px]">N</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] tracking-wider uppercase text-white/70 truncate">
                    {product.name}
                  </p>
                  <p className="text-[10px] text-white/30 tracking-wider">
                    {product.price} DT
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="mt-2 bg-white/[0.05] border border-white/10 rounded-xl p-6 text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/25">
              No results found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [theme, setTheme] = useState<string>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("site-theme") || "dark"
      : "dark",
  );
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.removeAttribute("data-theme");
    }
    localStorage.setItem("site-theme", theme);
  }, [theme]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/40 backdrop-blur-md border-b border-white/[0.04]"
            : ""
        } ${theme === "light" && !scrolled ? "nav--light-top" : ""}`}
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
              {/* Theme toggle */}
              <button
                onClick={() =>
                  setTheme((t) => (t === "light" ? "dark" : "light"))
                }
                className="text-white/50 hover:text-white transition-colors duration-500 p-1"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="text-white/50 hover:text-white transition-colors duration-500"
                aria-label="Search"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
              <button
                onClick={openCart}
                className="text-white/50 hover:text-white transition-colors duration-500 flex items-center gap-2"
              >
                Cart
                <span className="w-4 h-4 rounded-full border border-white/15 flex items-center justify-center text-[9px] text-white/30">
                  {totalItems}
                </span>
              </button>
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

          {/* Mobile Menu — full screen overlay */}
          <div
            className={`md:hidden fixed inset-0 bg-black/80 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
              isOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/collection", label: "Collection" },
              { href: "/contact", label: "Contact" },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-xl font-extralight tracking-[0.3em] uppercase text-white/70 hover:text-white transition-all duration-300"
                style={{
                  transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => openCart(), 200);
              }}
              className="text-xl font-extralight tracking-[0.3em] uppercase text-white/70 hover:text-white transition-all duration-300"
              style={{
                transitionDelay: isOpen ? "180ms" : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {`Cart (${totalItems})`}
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => setSearchOpen(true), 200);
              }}
              className="text-xl font-extralight tracking-[0.3em] uppercase text-white/70 hover:text-white transition-all duration-300"
              style={{
                transitionDelay: isOpen ? "240ms" : "0ms",
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              Search
            </button>
            <div className="absolute bottom-12 flex flex-col items-center gap-2">
              <div className="w-8 h-px bg-white/10" />
              <span className="text-[8px] tracking-[0.5em] text-white/20 uppercase">
                NOVA &copy; 2026
              </span>
            </div>
          </div>
        </div>
      </nav>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
