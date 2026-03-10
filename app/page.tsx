"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useWebGLBackground } from "./WebGLContext";

/* ── Data ────────────────────────────────────────────────── */

const SLIDES = [
  {
    product: "/redlether.png",
    name: "RED LETHER JACKET",
    price: "80 DT",
    collection: "FW26",
    id: "red-leather-jacket",
    label: ["NOVA", "X KYOTO BLACK"],
  },
  {
    product: "/blacklether.png",
    name: "BLACK LETHER JACKET",
    price: "80 DT",
    collection: "FW26",
    id: "BLACK-LETHER-JACKET",
    label: ["NOVA", "X SHADOW"],
  },
];

/* ── Component ───────────────────────────────────────────── */

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bulletRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const bgRef = useWebGLBackground();

  const state = useRef({
    current: 0,
    next: 1,
    total: SLIDES.length - 1,
    animating: false,
    initial: true,
    bgIndex: 0, // tracks which bg image is currently shown (alternates 0↔1)
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* ── Initial styles ─────────────────────────────────── */
    slideRefs.current.forEach((slide, i) => {
      if (i === 0 || !slide) return;
      gsap.set(slide, { autoAlpha: 0 });
    });

    bulletRefs.current.forEach((bullet, i) => {
      if (!bullet) return;
      const txt = bullet.querySelector(".bullet-text");
      const line = bullet.querySelector(".bullet-line");
      if (i === 0) {
        gsap.set(txt, { alpha: 1 });
        gsap.set(line, { scaleX: 1, transformOrigin: "left" });
      } else {
        gsap.set(txt, { alpha: 0.25 });
        gsap.set(line, { scaleX: 0, transformOrigin: "left" });
      }
    });

    /* ── Transition logic ───────────────────────────────── */
    const transition = (targetIndex: number, dir: 1 | -1) => {
      const s = state.current;

      // Alternate background: 0→1→0→1…
      const nextBg = s.bgIndex === 0 ? 1 : 0;
      bgRef?.current?.transitionTo(nextBg);
      s.bgIndex = nextBg;

      const curSlide = slideRefs.current[s.current];
      const nxtSlide = slideRefs.current[targetIndex];
      if (!curSlide || !nxtSlide) return;

      const curImgs = curSlide.querySelectorAll(".slide-img");
      const nxtImgs = nxtSlide.querySelectorAll(".slide-img");
      const curText = curSlide.querySelectorAll(".text-line div");
      const nxtText = nxtSlide.querySelectorAll(".text-line div");

      const curBullet = bulletRefs.current[s.current];
      const nxtBullet = bulletRefs.current[targetIndex];

      const tl = gsap.timeline({ paused: true });

      if (s.initial && scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          yPercent: 100,
          alpha: 0,
          duration: 1.5,
          ease: "power4.inOut",
        });
        s.initial = false;
      }

      // Pre-position next slide off-screen (direction-aware)
      gsap.set(nxtImgs, { yPercent: dir * 120, scaleY: 1.3, force3d: true });
      if (nxtText.length) gsap.set(nxtText, { yPercent: dir * 100 });

      // Current slide OUT (opposite direction)
      tl.to(
        curImgs,
        {
          yPercent: dir * -120,
          scaleY: 1.3,
          duration: 0.7,
          ease: "power3.inOut",
          force3d: true,
        },
        0,
      );

      if (curBullet) {
        const cT = curBullet.querySelector(".bullet-text");
        const cL = curBullet.querySelector(".bullet-line");
        if (cT) tl.to(cT, { alpha: 0.25, duration: 0.5, ease: "none" }, 0);
        if (cL) {
          tl.set(cL, { transformOrigin: "right" }, 0);
          tl.to(cL, { scaleX: 0, duration: 0.5, ease: "power3.inOut" }, 0);
        }
      }

      if (curText.length) {
        tl.fromTo(
          curText,
          { yPercent: 0 },
          { yPercent: dir * -100, duration: 0.6, ease: "power3.inOut" },
          0,
        );
      }

      // Swap slides — tighter overlap so no visible gap
      tl.set(curSlide, { autoAlpha: 0 }, 0.3);
      tl.set(nxtSlide, { autoAlpha: 1 }, 0.3);

      // Next slide IN — starts earlier, overlaps with outgoing
      tl.to(
        nxtImgs,
        {
          yPercent: 0,
          scaleY: 1,
          duration: 0.7,
          ease: "power3.out",
          force3d: true,
        },
        0.3,
      );

      if (nxtText.length) {
        tl.to(nxtText, { yPercent: 0, duration: 0.6, ease: "power3.out" }, 0.4);
      }

      if (nxtBullet) {
        const nT = nxtBullet.querySelector(".bullet-text");
        const nL = nxtBullet.querySelector(".bullet-line");
        if (nT) tl.to(nT, { alpha: 1, duration: 0.5, ease: "none" }, 0.3);
        if (nL) {
          tl.set(nL, { transformOrigin: "left" }, 0.3);
          tl.to(nL, { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, 0.3);
        }
      }

      tl.call(() => {
        s.current = targetIndex;
        s.next = s.current === s.total ? 0 : s.current + 1;
        s.animating = false;
      });

      tl.play();
    };

    const nextSlide = () => {
      const s = state.current;
      if (s.animating) return;
      s.animating = true;
      const target = s.current === s.total ? 0 : s.current + 1;
      transition(target, 1);
    };

    const prevSlide = () => {
      const s = state.current;
      if (s.animating) return;
      s.animating = true;
      const target = s.current === 0 ? s.total : s.current - 1;
      transition(target, -1);
    };

    /* ── Events ─────────────────────────────────────────── */
    let accDelta = 0;
    let deltaTimeout: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (state.current.animating) return;

      accDelta += e.deltaY;
      if (deltaTimeout) clearTimeout(deltaTimeout);
      deltaTimeout = setTimeout(() => {
        accDelta = 0;
      }, 150);

      if (accDelta >= 50) {
        nextSlide();
        accDelta = 0;
      } else if (accDelta <= -50) {
        prevSlide();
        accDelta = 0;
      }
    };

    let touchStartY = 0;
    let touchStartTime = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const elapsed = Date.now() - touchStartTime;
      if (deltaY > 30 || (deltaY > 15 && elapsed < 300)) {
        nextSlide();
      } else if (deltaY < -30 || (deltaY < -15 && elapsed < 300)) {
        prevSlide();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    /* ── Cleanup ────────────────────────────────────────── */
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      if (deltaTimeout) clearTimeout(deltaTimeout);
    };
  }, [bgRef]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none touch-none"
    >
      {/* ── Slides ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          className="absolute inset-0 z-10 flex items-center justify-center"
        >
          {/* ── Card ── */}
          <div
            className="relative overflow-hidden
              w-[88%] max-w-[380px] rounded-2xl
              md:max-w-none md:w-[72%] lg:w-[62%] xl:w-[56%] md:rounded-3xl
              bg-white/[0.03] backdrop-blur-sm border border-white/[0.07]
              shadow-2xl shadow-black/50
              flex flex-col md:flex-row md:h-[72vh] md:max-h-[620px]"
          >
            {/* Image section */}
            <div className="slide-img relative w-full aspect-[4/5] md:aspect-auto md:w-[48%] md:h-full shrink-0 overflow-hidden will-change-transform">
              <Image
                src={slide.product}
                alt={slide.name}
                fill
                sizes="(max-width: 768px) 88vw, 34vw"
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover"
                draggable={false}
              />
            </div>

            {/* Info section */}
            <div className="flex flex-col justify-center p-5 pt-4 pb-6 md:p-10 lg:p-14 flex-1 relative">
              {/* Accent line */}
              <div className="text-line overflow-hidden mb-3 md:mb-6">
                <div className="w-8 md:w-12 h-px bg-white/20" />
              </div>

              <div className="text-line overflow-hidden">
                <div className="text-[7px] md:text-[10px] tracking-[0.5em] text-white/30 font-light uppercase mb-1.5 md:mb-3">
                  {slide.collection} &mdash; Limited Edition
                </div>
              </div>

              <div className="text-line overflow-hidden">
                <div className="text-sm md:text-2xl lg:text-3xl font-extralight tracking-wide md:tracking-[0.12em] uppercase leading-tight">
                  {slide.name}
                </div>
              </div>

              <div className="text-line overflow-hidden mt-1.5 md:mt-4">
                <div className="text-[11px] md:text-base font-light text-white/40 tracking-[0.2em] md:tracking-[0.25em]">
                  {slide.price}
                </div>
              </div>

              {/* Separator */}
              <div className="text-line overflow-hidden mt-4 md:mt-8">
                <div className="w-full h-px bg-white/[0.06]" />
              </div>

              {/* Buttons */}
              <div className="text-line overflow-hidden mt-4 md:mt-8 flex gap-3 md:gap-4">
                <div>
                  <Link
                    href="/collection"
                    className="inline-block bg-white text-black px-5 py-2 md:px-10 md:py-3.5 text-[7px] md:text-[10px] tracking-[0.4em] font-medium uppercase hover:bg-white/90 transition-colors duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
                <div>
                  <Link
                    href="/collection"
                    className="inline-block border border-white/15 px-4 py-2 md:px-8 md:py-3.5 text-[7px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] font-light uppercase text-white/45 hover:border-white/30 hover:text-white transition-all duration-500"
                  >
                    Details
                  </Link>
                </div>
              </div>

              {/* Label — desktop only */}
              <div className="hidden md:flex absolute bottom-8 right-10 flex-col items-end gap-0.5">
                {slide.label.map((line, j) => (
                  <span
                    key={j}
                    className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/10"
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Bullet indicators — right side */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 md:gap-5">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              bulletRefs.current[i] = el;
            }}
            className="flex items-center gap-3"
          >
            <span className="bullet-line block w-6 md:w-8 h-px bg-white origin-left" />
            <span className="bullet-text text-[10px] md:text-[11px] font-light tracking-widest">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-3 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.5em] text-white/25 uppercase font-light">
          Scroll
        </span>
        <div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)",
          }}
        />
      </div>
    </div>
  );
}
