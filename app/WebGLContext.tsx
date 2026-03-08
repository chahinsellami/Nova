"use client";

import {
  createContext,
  useContext,
  useRef,
  type MutableRefObject,
} from "react";
import type { WebGLBackgroundHandle } from "./components/WebGLBackground";

const WebGLContext =
  createContext<MutableRefObject<WebGLBackgroundHandle | null> | null>(null);

export function useWebGLBackground() {
  return useContext(WebGLContext);
}

export function WebGLProvider({ children }: { children: React.ReactNode }) {
  const bgRef = useRef<WebGLBackgroundHandle | null>(null);
  return (
    <WebGLContext.Provider value={bgRef}>{children}</WebGLContext.Provider>
  );
}

export { WebGLContext };
