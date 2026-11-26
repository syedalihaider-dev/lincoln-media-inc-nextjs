"use client";
// The service pages' motion helpers — one set for every page built on this kit.
// (Same contract as the Digital Marketing page's helpers, re-exported so both stay in step.)
export { useScene, undraw, PIN, SMALL, MOTION } from "@/components/DigitalMarketing/shared";

/** Clamp a 0–1 progress into a sub-range [a, b] → 0–1 */
export const sub = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));
