"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import { WebGLProvider, useWebGLBackground } from "./WebGLContext";
import { CartProvider } from "./CartContext";

const WebGLBackground = dynamic(() => import("./components/WebGLBackground"), {
  ssr: false,
});

function LayoutInner({ children }: { children: React.ReactNode }) {
  const bgRef = useWebGLBackground();
  return (
    <>
      <WebGLBackground handleRef={bgRef!} />
      <Navbar />
      <main className="relative z-10">{children}</main>
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
