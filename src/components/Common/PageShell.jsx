"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MotionContext } from "@/lib/motion";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Chat from "@/components/Common/Chat/Chat";
import styles from "./PageShell.module.css";
import { FONT_CSS } from "./fonts";

// The heading typeface (React hoists this into <head>); body text is Poppins via next/font
const FONTS = FONT_CSS;
// The base the homepage gets from the intro stylesheet (public/styles.css), so shared parts render the same
const BASE_CSS = [
  "*{box-sizing:border-box;margin:0;padding:0}",
  "html,body{background:#03050b}",
  "body{color:#eef1f7;overflow-x:hidden;-webkit-font-smoothing:antialiased}",
  "a{color:inherit;text-decoration:none}",
  "button{font:inherit;color:inherit;background:none;border:0;cursor:pointer}",
].join("");

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * The frame for pages other than the homepage: the same header, footer, smooth scroll and motion
 * context the homepage uses (there it lives in HomeSite, wired to the guided intro). One Lenis
 * instance per page; sections read `ready`, `lenis` and `scrollTo` from MotionContext as on the homepage.
 */
export default function PageShell({ current, children }) {
  const [ready, setReady] = useState(false);
  const [lenis, setLenis] = useState(null);
  const lenisRef = useRef(null);

  const scrollTo = useCallback((target, instant = false) => {
    const el = typeof target === "string" ? (target === "#top" ? 0 : document.querySelector(target)) : target;
    if (el == null) return;
    const l = lenisRef.current;
    if (l) l.scrollTo(el, instant ? { immediate: true, force: true } : { duration: 1.5, force: true });
    else if (typeof el === "number") window.scrollTo({ top: el, behavior: instant ? "auto" : "smooth" });
    else el.scrollIntoView({ behavior: instant ? "auto" : "smooth" });
  }, []);

  // Start once the brand typefaces are in, so split headlines measure the real letters
  useEffect(() => {
    const go = () => setReady(true);
    if (document.fonts?.status === "loaded") go();
    else Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(go);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const cleanups = [];
    if (!matchMedia(REDUCED).matches) {
      const l = new Lenis({ duration: 1.15, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      l.on("scroll", ScrollTrigger.update);
      const raf = (t) => l.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      const onRefresh = () => l.resize();
      ScrollTrigger.addEventListener("refresh", onRefresh);
      lenisRef.current = l;
      setLenis(l);
      cleanups.push(() => { gsap.ticker.remove(raf); ScrollTrigger.removeEventListener("refresh", onRefresh); l.destroy(); lenisRef.current = null; });
    }
    // Sections create their triggers before this runs; measure them in document order
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    cleanups.push(() => window.removeEventListener("load", refresh));
    // Arriving with a hash (e.g. /about-us#values) — jump there once the layout has settled
    if (location.hash.length > 1) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) setTimeout(() => scrollTo(el, true), 350);
    }
    return () => cleanups.forEach((f) => f());
  }, [ready, scrollTo]);

  // In-page anchors glide through the smooth scroller
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = id === "#top" ? 0 : document.querySelector(id);
      if (el == null) return;
      e.preventDefault();
      scrollTo(el);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  const ctx = useMemo(() => ({ ready, lenis, skipped: false, entranceDelay: 0.2, scrollTo }), [ready, lenis, scrollTo]);

  return (
    <MotionContext.Provider value={ctx}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={FONTS} precedence="default" />
      <style dangerouslySetInnerHTML={{ __html: BASE_CSS }} />
      <div id="site" className={styles.page}>
        <a className="lm-skip" href="#main">Skip to content</a>
        <Header inSite base="/" current={current} />
        <main id="main">{children}</main>
        <Footer />
        <Chat />
        <span className={styles.grain} aria-hidden="true" />
      </div>
    </MotionContext.Provider>
  );
}
