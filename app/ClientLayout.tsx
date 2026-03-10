"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import { WebGLProvider, useWebGLBackground } from "./WebGLContext";
import { CartProvider } from "./CartContext";
import PageTransition from "./components/PageTransition";
import useDevicePerformance from "./hooks/useDevicePerformance";

const WebGLBackground = dynamic(() => import("./components/WebGLBackground"), {
  ssr: false,
});

const ParticleField = dynamic(() => import("./components/ParticleField"), {
  ssr: false,
});

const CursorGlow = dynamic(() => import("./components/CursorGlow"), {
  ssr: false,
});

const LoadingScreen = dynamic(() => import("./components/LoadingScreen"), {
  ssr: false,
});

const SmoothScroll = dynamic(() => import("./components/SmoothScroll"), {
  ssr: false,
});

function LayoutInner({ children }: { children: React.ReactNode }) {
  const bgRef = useWebGLBackground();
  const pathname = usePathname();
  const perf = useDevicePerformance();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <LoadingScreen />
      <WebGLBackground handleRef={bgRef!} />
      {perf.enableParticles && <ParticleField />}
      {perf.enableCursorGlow && <CursorGlow />}
      <SmoothScroll />
      <Navbar />
      <CartDrawer />
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
