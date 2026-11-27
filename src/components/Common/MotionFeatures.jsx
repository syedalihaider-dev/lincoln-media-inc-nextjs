"use client";
import { LazyMotion, domAnimation } from "framer-motion";

/**
 * framer-motion's animation features for the whole site, loaded once. Components use the lightweight
 * `m` element (m.div, m.a…) instead of `motion`, so pages ship only what the site actually uses
 * (variants, exit animations, springs) rather than the full bundle on every page.
 */
export default function MotionFeatures({ children }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
