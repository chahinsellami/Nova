"use client";

import { useSyncExternalStore } from "react";

export type PerfTier = "high" | "medium" | "low";

interface PerfProfile {
  tier: PerfTier;
  isMobile: boolean;
  isTouch: boolean;
  pixelRatioCap: number;
  particleCount: number;
  /** Whether to enable WebGL background mouse tracking RAF */
  enableMouseTracking: boolean;
  /** Whether to enable particle field at all */
  enableParticles: boolean;
  /** Whether to enable cursor glow */
  enableCursorGlow: boolean;
  /** Whether to reduce framer-motion animations */
  prefersReducedMotion: boolean;
}

let cached: PerfProfile | null = null;

function detect(): PerfProfile {
  if (cached) return cached;

  if (typeof window === "undefined") {
    cached = {
      tier: "high",
      isMobile: false,
      isTouch: false,
      pixelRatioCap: 2,
      particleCount: 80,
      enableMouseTracking: true,
      enableParticles: true,
      enableCursorGlow: true,
      prefersReducedMotion: false,
    };
    return cached;
  }

  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const cores = navigator.hardwareConcurrency || 4;
  const memory =
    (navigator as unknown as { deviceMemory?: number }).deviceMemory || 8;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let tier: PerfTier = "high";

  if (prefersReducedMotion || memory <= 2 || cores <= 2) {
    tier = "low";
  } else if (isMobile || memory <= 4 || cores <= 4) {
    tier = "medium";
  }

  const profiles: Record<PerfTier, PerfProfile> = {
    high: {
      tier: "high",
      isMobile,
      isTouch,
      pixelRatioCap: 2,
      particleCount: 80,
      enableMouseTracking: true,
      enableParticles: true,
      enableCursorGlow: !isTouch,
      prefersReducedMotion,
    },
    medium: {
      tier: "medium",
      isMobile,
      isTouch,
      pixelRatioCap: 1.5,
      particleCount: 40,
      enableMouseTracking: true,
      enableParticles: true,
      enableCursorGlow: false,
      prefersReducedMotion,
    },
    low: {
      tier: "low",
      isMobile,
      isTouch,
      pixelRatioCap: 1,
      particleCount: 20,
      enableMouseTracking: false,
      enableParticles: false,
      enableCursorGlow: false,
      prefersReducedMotion: true,
    },
  };

  cached = profiles[tier];
  return cached;
}

function subscribe() {
  // Static value — no subscriptions needed
  return () => {};
}

function getSnapshot(): PerfProfile {
  return detect();
}

function getServerSnapshot(): PerfProfile {
  return {
    tier: "high",
    isMobile: false,
    isTouch: false,
    pixelRatioCap: 2,
    particleCount: 80,
    enableMouseTracking: true,
    enableParticles: true,
    enableCursorGlow: true,
    prefersReducedMotion: false,
  };
}

export default function useDevicePerformance(): PerfProfile {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
