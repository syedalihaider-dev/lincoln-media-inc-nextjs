"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Renders its content at a real device width (e.g. 1280 for a desktop, 390 for a phone) and scales
 * it down to fit the frame — so a page inside a small mockup lays out exactly as it would on that device.
 */
export default function ScaledScreen({ width = 1280, children, className = "" }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={ref} className={className} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width, height: scale ? `${100 / scale}%` : "100%", transform: `scale(${scale || 0.0001})`, transformOrigin: "0 0" }}>
        {children}
      </div>
    </div>
  );
}
