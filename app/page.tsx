"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useWebGLBackground } from "./WebGLContext";

/* ── Data ────────────────────────────────────────────────── */

const SLIDES = [
  {
    product: "/redlether.png",
    name: "RED LETHER JACKET",
    price: "$185",
    collection: "FW26",
    id: "red-leather-jacket",
    label: ["NOVA", "X KYOTO BLACK"],
  },
  {
    product: "/blacklether.png",
    name: "BLACK LETHER JACKET",
    price: "$340",
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
    const transitionNext = () => {
      const s = state.current;

      // Alternate background: 0→1→0→1…
      const nextBg = s.bgIndex === 0 ? 1 : 0;
      bgRef?.current?.transitionTo(nextBg);
      s.bgIndex = nextBg;

      const curSlide = slideRefs.current[s.current];
      const nxtSlide = slideRefs.current[s.next];
      if (!curSlide || !nxtSlide) return;

      const curImgs = curSlide.querySelectorAll(".slide-img");
      const nxtImgs = nxtSlide.querySelectorAll(".slide-img");
      const curText = curSlide.querySelectorAll(".text-line div");
      const nxtText = nxtSlide.querySelectorAll(".text-line div");

      const curBullet = bulletRefs.current[s.current];
      const nxtBullet = bulletRefs.current[s.next];

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

      // Current slide OUT
      tl.to(
        curImgs,
        {
          yPercent: -185,
          scaleY: 1.5,
          duration: 1.5,
          ease: "expo.inOut",
          stagger: 0.075,
        },
        0,
      );

      if (curBullet) {
        const cT = curBullet.querySelector(".bullet-text");
        const cL = curBullet.querySelector(".bullet-line");
        if (cT) tl.to(cT, { alpha: 0.25, duration: 1.5, ease: "none" }, 0);
        if (cL) {
          tl.set(cL, { transformOrigin: "right" }, 0);
          tl.to(cL, { scaleX: 0, duration: 1.5, ease: "expo.inOut" }, 0);
        }
      }

      if (curText.length) {
        tl.fromTo(
          curText,
          { yPercent: 0 },
          { yPercent: -100, duration: 2, ease: "power4.inOut" },
          0,
        );
      }

      tl.set(curSlide, { autoAlpha: 0 });
      tl.set(nxtSlide, { autoAlpha: 1 }, 1);

      // Next slide IN
      if (nxtText.length) {
        tl.fromTo(
          nxtText,
          { yPercent: 100 },
          { yPercent: 0, duration: 2, ease: "power4.out" },
          1.5,
        );
      }

      tl.fromTo(
        nxtImgs,
        { yPercent: 150, scaleY: 1.5 },
        {
          yPercent: 0,
          scaleY: 1,
          duration: 1.5,
          ease: "expo.inOut",
          stagger: 0.075,
        },
        1,
      );

      if (nxtBullet) {
        const nT = nxtBullet.querySelector(".bullet-text");
        const nL = nxtBullet.querySelector(".bullet-line");
        if (nT) tl.to(nT, { alpha: 1, duration: 1.5, ease: "none" }, 1);
        if (nL) {
          tl.set(nL, { transformOrigin: "left" }, 1);
          tl.to(nL, { scaleX: 1, duration: 1.5, ease: "expo.inOut" }, 1);
        }
      }

      tl.call(() => {
        s.animating = false;
      });

      tl.play();
    };

    const nextSlide = () => {
      const s = state.current;
      if (s.animating) return;
      s.animating = true;
      transitionNext();
      s.current = s.current === s.total ? 0 : s.current + 1;
      s.next = s.current === s.total ? 0 : s.current + 1;
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

      if (Math.abs(accDelta) >= 50) {
        nextSlide();
        accDelta = 0;
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY - e.changedTouches[0].clientY > 50) nextSlide();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") nextSlide();
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
      className="relative w-full h-screen overflow-hidden select-none"
    >
      {/* ── Slides ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          className="absolute inset-0 z-10 flex items-center"
        >
          {/* Product image */}
          <div className="slide-img absolute overflow-hidden left-[50%] -translate-x-1/2 top-[14%] w-[55%] h-[45%] md:translate-x-0 md:left-[8%] md:top-[12%] md:w-[30%] md:h-[72%]">
            <img
              src={slide.product}
              alt={slide.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.4), transparent 40%)",
              }}
            />
          </div>

          {/* Product info + Buy */}
          <div className="absolute z-20 left-[50%] -translate-x-1/2 bottom-[6%] text-center md:text-left md:translate-x-0 md:left-[46%] md:top-[50%] md:bottom-auto md:-translate-y-1/2">
            <div className="text-line overflow-hidden">
              <div className="text-[8px] md:text-[9px] tracking-[0.5em] text-white/25 font-light uppercase mb-2 md:mb-4">
                {slide.collection} &mdash; Limited Edition
              </div>
            </div>
            <div className="text-line overflow-hidden">
              <div className="text-xl sm:text-2xl lg:text-5xl font-extralight tracking-[0.1em] md:tracking-[0.15em] uppercase leading-tight">
                {slide.name}
              </div>
            </div>
            <div className="text-line overflow-hidden mt-2 md:mt-4">
              <div className="text-xs md:text-sm lg:text-base font-light text-white/40 tracking-[0.2em]">
                {slide.price}
              </div>
            </div>
            <div className="text-line overflow-hidden mt-4 md:mt-10 flex gap-3 md:gap-4 justify-center md:justify-start">
              <div>
                <Link
                  href={`/product/${slide.id}`}
                  className="inline-block bg-white text-black px-6 md:px-10 py-2.5 md:py-3.5 text-[8px] md:text-[9px] tracking-[0.4em] font-medium uppercase hover:bg-white/90 transition-colors duration-300"
                >
                  Buy Now
                </Link>
              </div>
            </div>
            <div className="text-line overflow-hidden mt-3 md:mt-4">
              <div>
                <Link
                  href={`/product/${slide.id}`}
                  className="inline-block border border-white/15 px-6 md:px-10 py-2.5 md:py-3.5 text-[8px] md:text-[9px] tracking-[0.4em] font-light uppercase text-white/50 hover:border-white/40 hover:text-white transition-all duration-500"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

          {/* Vertical label — bottom right */}
          <div
            className="absolute right-4 md:right-6 bottom-20 md:bottom-16 z-20 hidden md:block"
            style={{ writingMode: "vertical-rl" }}
          >
            {slide.label.map((line, j) => (
              <div key={j} className="text-line overflow-hidden">
                <div className="text-[11px] font-bold tracking-[0.25em] uppercase leading-snug">
                  {line}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bullet indicators — right side */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 md:gap-6">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              bulletRefs.current[i] = el;
            }}
            className="flex items-center gap-3"
          >
            <span className="bullet-line block w-6 h-px bg-white origin-left" />
            <span className="bullet-text text-[10px] font-light tracking-wider">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-3 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.4em] text-white/30 uppercase">
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </div>
    </div>
  );
}
