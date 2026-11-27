"use client";
import { useState } from "react";
import { PerformanceMonitor } from "@react-three/drei";

/**
 * Adaptive pixel ratio for a <Canvas>. Starts exactly where `dpr={[1, max]}` would (the screen's
 * density, capped at `max`); if the device can't hold the frame rate, it steps the density down
 * toward 1x — never below, so standard-density screens are never softened — and back up when there
 * is room again. Returns [dpr, monitor]: pass `dpr` to <Canvas> and render `monitor` inside it.
 */
export function useAdaptiveDpr(max) {
  const [cap] = useState(() => (typeof window === "undefined" ? 1 : Math.max(1, Math.min(window.devicePixelRatio || 1, max))));
  const [dpr, setDpr] = useState(cap);
  const step = (d) => Math.round(d * 4) / 4;
  const monitor = cap > 1 ? (
    <PerformanceMonitor
      onDecline={() => setDpr((d) => Math.max(1, step(d - 0.25)))}
      onIncline={() => setDpr((d) => Math.min(cap, step(d + 0.25)))}
    />
  ) : null;
  return [dpr, monitor];
}
