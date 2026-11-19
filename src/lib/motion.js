"use client";
import { createContext, useContext, useEffect, useState } from "react";

// `ready` flips to true once the guided intro hands over to the homepage (public/app.js → LMSite.init).
// Until then the homepage is display:none, so no scroll animation may measure or pin anything.
export const MotionContext = createContext({ ready: false, lenis: null });
export const useSiteMotion = () => useContext(MotionContext);

export function useMediaQuery(query, initial = false) {
  const [match, setMatch] = useState(initial);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

// The guided experience's bridge (public/app.js): orb position, sound effects
export const lm = () => (typeof window !== "undefined" ? window.LM : undefined);
export const sfx = (k) => lm()?.sfx?.(k);
