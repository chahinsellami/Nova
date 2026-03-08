"use client";

import Navbar from "./components/Navbar";
import WebGLBackground from "./components/WebGLBackground";
import { WebGLProvider, useWebGLBackground } from "./WebGLContext";

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
    <WebGLProvider>
      <LayoutInner>{children}</LayoutInner>
    </WebGLProvider>
  );
}
