"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Floating dust-like particles rendered with Three.js.
 * Reacts subtly to mouse movement for depth.
 */
export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const w = el.offsetWidth;
    const h = el.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    el.appendChild(renderer.domElement);

    // Particles
    const count = Math.min(120, Math.floor((w * h) / 8000));
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
    window.addEventListener("mousemove", onMouseMove);

    // Animation loop
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);

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
    animate();

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
