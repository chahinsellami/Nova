"use client";

import { useEffect, useRef } from "react";

/**
 * Soft radial glow that follows the cursor.
 * Pure CSS — no Three.js overhead needed here.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    // Check for touch-only device
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) {
      el.style.display = "none";
      return;
    }

    let x = -200;
    let y = -200;
    let cx = -200;
    let cy = -200;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const lerp = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      el.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      raf = requestAnimationFrame(lerp);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 z-[2] pointer-events-none w-[400px] h-[400px] rounded-full opacity-[0.04]"
      style={{
        background:
          "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
        willChange: "transform",
      }}
    />
  );
}
