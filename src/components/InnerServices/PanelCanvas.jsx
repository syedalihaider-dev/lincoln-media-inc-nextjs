"use client";
import { useEffect, useRef } from "react";
import { drawPanel } from "@/lib/uiCanvas";

/** One of the drawn interface panels (src/lib/uiCanvas.js) as a plain 2D canvas, sharp on any screen. */
export default function PanelCanvas({ kind, width = 640, height = 420, label, lines, className }) {
  const ref = useRef(null);
  useEffect(() => {
    let live = true;
    const paint = () => {
      if (!live || !ref.current) return;
      const dpr = Math.min(2, devicePixelRatio || 1);
      const src = drawPanel(kind, { width: width * dpr, height: height * dpr, label, lines });
      const c = ref.current;
      c.width = src.width;
      c.height = src.height;
      c.getContext("2d").drawImage(src, 0, 0);
    };
    paint();
    document.fonts?.ready.then(paint);
    return () => { live = false; };
  }, [kind, width, height, label, lines]);
  return <canvas ref={ref} className={className} style={{ width: "100%", height: "auto", aspectRatio: `${width} / ${height}`, display: "block" }} aria-hidden="true" />;
}
