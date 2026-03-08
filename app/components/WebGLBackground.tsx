"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

/* ── Shaders ─────────────────────────────────────────────── */

const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAG = `
varying vec2 vUv;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D disp;

uniform float dispPower;
uniform float intensity;

void main() {
  vec2 uv = vUv;

  vec4 d = texture2D(disp, uv);
  vec2 dispVec = vec2(d.x, d.y);

  vec2 distPos1 = uv + (dispVec * intensity * dispPower);
  vec2 distPos2 = uv + (dispVec * -(intensity * (1.0 - dispPower)));

  vec4 _texture1 = texture2D(texture1, distPos1);
  vec4 _texture2 = texture2D(texture2, distPos2);

  gl_FragColor = mix(_texture1, _texture2, dispPower);
}
`;

/* ── Image data ──────────────────────────────────────────── */

const BG_IMAGES = [
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg1.jpg",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/bg2.jpg",
];

const DISP_MAP =
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/58281/rock-_disp.png";

/**
 * Full-screen WebGL displacement background.
 * Exposes a ref-based API so parent pages can trigger transitions.
 */
export interface WebGLBackgroundHandle {
  /** Trigger a displacement transition to a specific texture index (0 or 1) */
  transitionTo: (index: number) => void;
}

export default function WebGLBackground({
  handleRef,
}: {
  handleRef?: React.MutableRefObject<WebGLBackgroundHandle | null>;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    const inner = canvasRef.current;
    if (!el || !inner) return;

    /* ── Three.js setup ─────────────────────────────────── */
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.offsetWidth, el.offsetHeight);
    inner.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(
      el.offsetWidth / -2,
      el.offsetWidth / 2,
      el.offsetHeight / 2,
      el.offsetHeight / -2,
      1,
      1000,
    );
    camera.lookAt(scene.position);
    camera.position.z = 1;

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "";

    const render = () => renderer.render(scene, camera);

    const textures: THREE.Texture[] = [];
    BG_IMAGES.forEach((url) => {
      const tex = loader.load(url, render);
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      textures.push(tex);
    });

    const dispTex = loader.load(DISP_MAP, render);
    dispTex.magFilter = dispTex.minFilter = THREE.LinearFilter;
    dispTex.wrapS = dispTex.wrapT = THREE.RepeatWrapping;

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        dispPower: { value: 0.0 },
        intensity: { value: 0.5 },
        res: {
          value: new THREE.Vector2(el.offsetWidth, el.offsetHeight),
        },
        size: { value: new THREE.Vector2(1, 1) },
        texture1: { value: textures[0] },
        texture2: { value: textures[1] },
        disp: { value: dispTex },
      },
      transparent: true,
      vertexShader: VERT,
      fragmentShader: FRAG,
    });

    const geometry = new THREE.PlaneGeometry(
      el.offsetWidth,
      el.offsetHeight,
      1,
    );
    const mesh = new THREE.Mesh(geometry, mat);
    scene.add(mesh);
    render();

    /* current texture index being displayed */
    let currentIdx = 0;
    let animating = false;

    /* Expose imperative handle */
    if (handleRef) {
      handleRef.current = {
        transitionTo: (nextIdx: number) => {
          if (animating || nextIdx === currentIdx) return;
          animating = true;

          mat.uniforms.texture1.value = textures[currentIdx];
          mat.uniforms.texture2.value = textures[nextIdx];
          mat.uniforms.dispPower.value = 0;
          render();

          gsap.to(mat.uniforms.dispPower, {
            value: 1,
            duration: 1.2,
            ease: "expo.inOut",
            onUpdate: render,
            onComplete: () => {
              mat.uniforms.dispPower.value = 0;
              mat.uniforms.texture1.value = textures[nextIdx];
              mat.uniforms.texture2.value = textures[nextIdx];
              render();
              currentIdx = nextIdx;
              animating = false;
            },
          });
        },
      };
    }

    /* ── Resize (debounced) ─────────────────────────────── */
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!el) return;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        renderer.setSize(w, h);
        camera.left = w / -2;
        camera.right = w / 2;
        camera.top = h / 2;
        camera.bottom = h / -2;
        camera.updateProjectionMatrix();
        mat.uniforms.res.value.set(w, h);
        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(w, h, 1);
        render();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    /* ── Cleanup ────────────────────────────────────────── */
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      renderer.dispose();
      geometry.dispose();
      mat.dispose();
      textures.forEach((t) => t.dispose());
      dispTex.dispose();
      if (inner.contains(renderer.domElement)) {
        inner.removeChild(renderer.domElement);
      }
      if (handleRef) handleRef.current = null;
    };
  }, [handleRef]);

  return (
    <div ref={wrapperRef} className="fixed inset-0 w-full h-full z-0">
      {/* Three.js canvas */}
      <div ref={canvasRef} className="absolute inset-0" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}
