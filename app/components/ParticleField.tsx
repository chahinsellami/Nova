"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Floating dust-like particles rendered with Three.js.
 * Reacts subtly to mouse movement for depth.
 * Throttled to ~30fps and pauses when tab is hidden.
 */
export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Skip on very small screens / low-end
    const isMobile = window.innerWidth < 768;

    const w = el.offsetWidth;
    const h = el.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5),
    );
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    // Fewer particles on mobile
    const count = isMobile
      ? Math.min(30, Math.floor((w * h) / 20000))
      : Math.min(60, Math.floor((w * h) / 12000));
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * w;
      positions[i * 3 + 1] = (Math.random() - 0.5) * h;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      velocities[i * 3] = (Math.random() - 0.5) * 0.15;
      velocities[i * 3 + 1] = Math.random() * 0.12 + 0.03;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.15,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / w - 0.5) * 2;
      mouseY = (e.clientY / h - 0.5) * 2;
    };
    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    // Throttled animation loop (~30fps)
    let raf: number;
    let paused = false;
    let lastFrame = 0;
    const FRAME_INTERVAL = 1000 / 30; // ~30fps

    const animate = (now: number) => {
      raf = requestAnimationFrame(animate);
      if (paused) return;

      const delta = now - lastFrame;
      if (delta < FRAME_INTERVAL) return;
      lastFrame = now - (delta % FRAME_INTERVAL);

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < count; i++) {
        arr[i * 3] += velocities[i * 3];
        arr[i * 3 + 1] += velocities[i * 3 + 1];
        arr[i * 3 + 2] += velocities[i * 3 + 2];

        // Wrap around
        if (arr[i * 3 + 1] > h / 2) arr[i * 3 + 1] = -h / 2;
        if (arr[i * 3] > w / 2) arr[i * 3] = -w / 2;
        if (arr[i * 3] < -w / 2) arr[i * 3] = w / 2;
      }
      posAttr.needsUpdate = true;

      // Subtle camera sway from mouse
      camera.position.x += (mouseX * 15 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 10 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    // Pause when tab is hidden
    const onVisibility = () => {
      paused = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Resize
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!el) return;
        const nw = el.offsetWidth;
        const nh = el.offsetHeight;
        renderer.setSize(nw, nh);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (resizeTimer) clearTimeout(resizeTimer);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}
