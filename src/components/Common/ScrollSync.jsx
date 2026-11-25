"use client";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";

/**
 * Keeps scroll triggers measured against the real page. Below-the-fold sections arrive in their own
 * chunks and add pin spacing when they hydrate, which moves every trigger after them; without a
 * re-measure, entrance animations can stall at their start values and scroll-driven states fire in
 * the wrong place. Watches <main>'s height and refreshes (debounced) once it settles.
 */
export default function ScrollSync() {
  const { ready } = useSiteMotion();
  useEffect(() => {
    if (!ready) return;
    const main = document.getElementById("main");
    if (!main || typeof ResizeObserver === "undefined") return;
    let last = main.offsetHeight, timer;
    const ro = new ResizeObserver(() => {
      const h = main.offsetHeight;
      if (Math.abs(h - last) < 2) return;
      last = h;
      clearTimeout(timer);
      timer = setTimeout(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); last = main.offsetHeight; }, 250);
    });
    ro.observe(main);
    return () => { ro.disconnect(); clearTimeout(timer); };
  }, [ready]);
  return null;
}
