"use client";

import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/[0.06] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-light text-[11px] tracking-[0.3em] uppercase mb-4">
              NOVA
            </h3>
            <p className="text-xs text-white/30 leading-relaxed">
              Limited edition darkwear.
              <br />
              Premium essentials.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-light text-sm mb-4">Shop</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/mens" className="hover:text-white transition">
                  Mens
                </Link>
              </li>
              <li>
                <Link href="/womens" className="hover:text-white transition">
                  Womens
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-white transition"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-light text-sm mb-4">Support</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-light text-sm mb-4">Follow</h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>&copy; 2026 NOVA. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
