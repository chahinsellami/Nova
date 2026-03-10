"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * Branded loading screen with NOVA logo reveal.
 * Fades out after content is ready.
 */
export default function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate logo in
    tl.fromTo(
      logoRef.current,
      { opacity: 0, letterSpacing: "0.1em", scale: 0.9 },
      {
        opacity: 1,
        letterSpacing: "0.5em",
        scale: 1,
        duration: 1,
        ease: "power3.out",
      },
      0.3,
    );

    // Animate line expanding
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: "power3.inOut" },
      0.6,
    );

    // Wait and fade out
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      delay: 0.5,
      onComplete: () => setVisible(false),
    });

    return () => {
      tl.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <span
        ref={logoRef}
        className="text-2xl md:text-4xl font-extralight tracking-[0.5em] uppercase text-white opacity-0"
      >
        NOVA
      </span>
      <div
        ref={lineRef}
        className="w-16 h-px bg-white/20 mt-4 origin-center"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
