"use client";

import React from "react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "Collection", href: "/collection" },
      { label: "New Arrivals", href: "/collection" },
      { label: "Best Sellers", href: "/collection" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping", href: "/shipping" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "TikTok", href: "#" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-10 px-6 overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-64 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="md:max-w-[200px]">
            <h3 className="text-lg font-extralight tracking-[0.4em] uppercase mb-3">
              NOVA
            </h3>
            <p className="text-[10px] text-white/25 leading-relaxed tracking-wide">
              Limited edition darkwear. Crafted for those who move in silence.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex gap-16 md:gap-20">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-[9px] tracking-[0.4em] uppercase text-white/30 font-light mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[11px] text-white/40 hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[9px] text-white/15 tracking-wider">
            &copy; 2026 NOVA. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-[9px] text-white/15 hover:text-white/40 tracking-wider transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[9px] text-white/15 hover:text-white/40 tracking-wider transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
