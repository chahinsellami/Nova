"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import { WebGLProvider, useWebGLBackground } from "./WebGLContext";
import { CartProvider } from "./CartContext";
import PageTransition from "./components/PageTransition";

const WebGLBackground = dynamic(() => import("./components/WebGLBackground"), {
  ssr: false,
});

const ParticleField = dynamic(() => import("./components/ParticleField"), {
  ssr: false,
});

const CursorGlow = dynamic(() => import("./components/CursorGlow"), {
  ssr: false,
});

function LayoutInner({ children }: { children: React.ReactNode }) {
  const bgRef = useWebGLBackground();
  return (
    <>
      <WebGLBackground handleRef={bgRef!} />
      <ParticleField />
      <CursorGlow />
      <Navbar />
      <main className="relative z-10">
        <PageTransition>{children}</PageTransition>
      </main>
    </>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <WebGLProvider>
        <LayoutInner>{children}</LayoutInner>
      </WebGLProvider>
    </CartProvider>
  );
}
