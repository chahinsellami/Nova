"use client";

import React, { useRef } from "react";
import Link from "next/link";

/**
 * Button that subtly warps toward the cursor on hover.
 */
export default function MagneticButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };

  const handleLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <Link
      ref={btnRef}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </Link>
  );
}
