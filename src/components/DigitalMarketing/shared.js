"use client";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";

/**
 * Builds a section's GSAP once the page shell is ready (fonts in, Lenis running), inside one
 * matchMedia so every trigger is reverted on unmount or when the breakpoint/motion setting changes.
 * build(mm, root) registers its contexts with mm.add(query, fn).
 */
export function useScene(ref, build) {
  const { ready } = useSiteMotion();
  useGSAP(() => {
    if (!ready || !ref.current) return;
    const mm = gsap.matchMedia();
    build(mm, ref.current);
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });
}

// SVG strokes drawn with pathLength="1": hide them, then tween strokeDashoffset to 0
export const undraw = (els) => gsap.set(els, { strokeDasharray: 1, strokeDashoffset: 1 });

// A held section moving through chapters updates its own data-phase and nudges the story rail
export const setPhase = (el, phase) => {
  if (el.dataset.phase === phase) return;
  el.dataset.phase = phase;
  window.dispatchEvent(new Event("dm:phase"));
};

export const PIN = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";
export const SMALL = "(max-width: 900px) and (prefers-reduced-motion: no-preference)";
export const MOTION = "(prefers-reduced-motion: no-preference)";
