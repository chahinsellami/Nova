"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Footer from "../components/Footer";

const INFO = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-5 h-5"
      >
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "hello@nova.tn",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-5 h-5"
      >
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Location",
    value: "Tunis, Tunisia",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="w-5 h-5"
      >
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Hours",
    value: "Mon – Sat, 10am – 7pm",
  },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  return (
    <div className="min-h-screen bg-transparent">
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-36 md:pt-44 pb-20 px-4 overflow-hidden"
      >
        {/* Decorative watermark */}
        <div className="absolute top-16 right-4 md:right-12 pointer-events-none select-none">
          <span className="text-[120px] md:text-[200px] font-extralight text-white/[0.015] leading-none tracking-tighter">
            ?
          </span>
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-5xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-[8px] md:text-[10px] tracking-[0.6em] text-white/20 uppercase font-light"
          >
            Get in touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-4 text-3xl md:text-5xl lg:text-6xl font-extralight tracking-wide uppercase leading-tight"
          >
            We&apos;d love to
            <br />
            <span className="text-white/40">hear from you</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 w-16 h-px bg-gradient-to-r from-white/20 to-transparent origin-left"
          />
        </motion.div>
      </section>

      {/* ── Content: Form + Info ── */}
      <section className="relative z-10 px-4 md:px-12 lg:px-20 pb-24 md:pb-32">
        <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12 md:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-3"
          >
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-3"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="w-full bg-white/[0.03] border border-white/[0.08] px-5 py-3.5 text-sm font-light tracking-wide text-white/70 placeholder:text-white/15 outline-none focus:border-white/20 transition-colors duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-3"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  className="w-full bg-white/[0.03] border border-white/[0.08] px-5 py-3.5 text-sm font-light tracking-wide text-white/70 placeholder:text-white/15 outline-none focus:border-white/20 transition-colors duration-300"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-3"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full bg-white/[0.03] border border-white/[0.08] px-5 py-3.5 text-sm font-light tracking-wide text-white/40 outline-none focus:border-white/20 transition-colors duration-300 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.2)' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                    backgroundSize: "14px",
                  }}
                >
                  <option value="" className="bg-black">
                    Select a topic
                  </option>
                  <option value="order" className="bg-black">
                    Order inquiry
                  </option>
                  <option value="sizing" className="bg-black">
                    Sizing help
                  </option>
                  <option value="collab" className="bg-black">
                    Collaboration
                  </option>
                  <option value="other" className="bg-black">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-3"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] px-5 py-3.5 text-sm font-light tracking-wide text-white/70 placeholder:text-white/15 outline-none focus:border-white/20 transition-colors duration-300 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full border border-white/15 py-4 text-[10px] tracking-[0.5em] uppercase text-white/50 hover:text-white transition-all duration-500 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/[0.04] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative">Send Message</span>
              </motion.button>
            </form>
          </motion.div>

          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-2 flex flex-col gap-8 md:pt-10"
          >
            {INFO.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-white/25 group-hover:border-white/20 group-hover:text-white/45 transition-all duration-500">
                    {item.icon}
                  </div>
                  <span className="text-[9px] tracking-[0.4em] uppercase text-white/25 font-light">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-light text-white/50 tracking-wide pl-[52px]">
                  {item.value}
                </p>
              </motion.div>
            ))}

            {/* Divider */}
            <div className="w-full h-px bg-white/[0.05] my-2" />

            {/* Social */}
            <div>
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/20 font-light block mb-4">
                Follow Us
              </span>
              <div className="flex gap-3">
                {["Instagram", "Twitter", "TikTok"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="text-[10px] tracking-[0.2em] uppercase text-white/25 border border-white/[0.08] px-4 py-2 rounded-full hover:border-white/20 hover:text-white/50 transition-all duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
