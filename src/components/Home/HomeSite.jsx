"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MotionContext } from "@/lib/motion";
import { pauseOffscreenAnimations } from "@/lib/pauseOffscreen";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Chat from "@/components/Common/Chat/Chat";
import Hero from "./Hero";
import Manifesto from "./Manifesto";
import Services from "./Services";
import WorkShowcase from "./WorkShowcase";
import Launches from "./Launches";
import Industries from "./Industries";
import Technology from "./Technology";
import Process from "./Process";
import WhyLincoln from "./WhyLincoln";
import Partners from "./Partners";
import Clients from "./Clients";
import CTA from "./CTA";
import Contact from "./Contact";
import styles from "./HomeSite.module.css";

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * EXPERIENCE B — the homepage.
 *
 * It sits inside #site, which the guided intro (public/app.js) keeps display:none until the visitor
 * skips the intro or reaches their build plan. app.js then calls window.LMSite.init(); only from that
 * moment are smooth scrolling and scroll animations started, because nothing can be measured before.
 *
 * Contract with app.js (kept from the previous site.js):
 *   window.LMSite = { init, scrollTo(target, instant), goTo(target) }
 *   #site (class "site", toggled to "shown visible"), #contactForm (+ its field names), #formNote, #year
 *   window.LM.siteMode / blob / velocity / sfx are provided by app.js
 */
export default function HomeSite() {
  const [ready, setReady] = useState(false);
  const [lenis, setLenis] = useState(null);
  const [inSite, setInSite] = useState(false);
  const [active, setActive] = useState("home");
  const [skipped, setSkipped] = useState(false);
  const root = useRef(null);
  const curtain = useRef(null);
  const readyRef = useRef(false);
  const lenisRef = useRef(null);
  const pending = useRef(null);

  const scrollTo = useCallback((target, instant = false) => {
    const el = typeof target === "string" ? (target === "#top" ? 0 : document.querySelector(target)) : target;
    if (el == null) return;
    const l = lenisRef.current;
    if (l) {
      l.resize();
      l.scrollTo(el, instant ? { immediate: true, force: true } : { duration: 1.5, force: true });
    } else if (typeof el === "number") window.scrollTo({ top: el, behavior: instant ? "auto" : "smooth" });
    else el.scrollIntoView({ behavior: instant ? "auto" : "smooth" });
  }, []);

  /* ---------- Bridge for the guided intro ---------- */
  useEffect(() => {
    window.ScrollTrigger = ScrollTrigger; // app.js refreshes it after "Skip intro"
    const init = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      setSkipped(document.body.classList.contains("skipped"));
      // Line-split headlines must measure the real typefaces, not the fallback
      const go = () => setReady(true);
      if (document.fonts?.status === "loaded") go();
      else Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1200))]).then(go);
    };
    window.LMSite = {
      init,
      scrollTo,
      goTo: (t) => (readyRef.current ? scrollTo(t, true) : (pending.current = t)),
    };
    // A deep link (e.g. /#work from another page) unlocks the site while the page is still parsing,
    // before React is running — catch up here.
    if (document.getElementById("site")?.classList.contains("shown")) {
      const id = location.hash.slice(1);
      if (id) pending.current = document.getElementById(id === "manifesto" ? "stories" : id);
      init();
    }
    const body = document.body;
    const sync = () => setInSite(body.classList.contains("in-site"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(body, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, [scrollTo]);

  /* ---------- Smooth scroll, section tracking, curtain — once the homepage is visible ---------- */
  useEffect(() => {
    if (!ready) return;
    const reduced = matchMedia(REDUCED).matches;
    const cleanups = [];

    if (!reduced) {
      const l = new Lenis({ duration: 1.15, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      l.on("scroll", (e) => { ScrollTrigger.update(); window.LM?.velocity?.(e.velocity); });
      const raf = (t) => l.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      const onRefresh = () => l.resize();
      ScrollTrigger.addEventListener("refresh", onRefresh);
      lenisRef.current = l;
      setLenis(l);
      cleanups.push(() => { gsap.ticker.remove(raf); ScrollTrigger.removeEventListener("refresh", onRefresh); l.destroy(); lenisRef.current = null; });
    } else lenisRef.current = null;

    // Scrolling down out of the guided experience switches the 3D scene to its "site" mode
    const exp = document.getElementById("experience");
    if (exp && !document.body.classList.contains("skipped")) {
      const st = ScrollTrigger.create({ trigger: exp, start: "bottom 60%", onEnter: () => window.LM?.siteMode(true), onLeaveBack: () => window.LM?.siteMode(false) });
      cleanups.push(() => st.kill());
    } else window.LM?.siteMode(true);

    // Each chapter: highlight its nav item, update the chapter index, park the orb where it belongs
    const secs = [...root.current.querySelectorAll("[data-chapter]")];
    const index = root.current.querySelector("[data-index]");
    secs.forEach((sec, i) => {
      const st = ScrollTrigger.create({
        trigger: sec,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (!self.isActive) return;
          setActive(sec.dataset.nav || sec.id);
          if (index) index.innerHTML = `<b>${String(i + 1).padStart(2, "0")}</b> / ${sec.dataset.chapter}`;
          const [x, y, s] = (sec.dataset.orb || "0,-3.2,0.4").split(",").map(Number);
          window.LM?.blob(x, y, s);
        },
      });
      cleanups.push(() => st.kill());
    });
    const rail = root.current.querySelector("[data-rail]");
    const railST = ScrollTrigger.create({ trigger: root.current, start: "top top", end: "bottom bottom", onUpdate: (s) => rail && (rail.style.transform = `scaleY(${s.progress})`) });
    cleanups.push(() => railST.kill());

    // Curtain: after "Skip intro", the homepage opens like a stage
    const c = curtain.current;
    if (document.body.classList.contains("skipped") && !reduced) {
      const tl = gsap.timeline({ delay: 0.45, onComplete: () => gsap.set(c, { display: "none" }) });
      tl.fromTo(c.querySelector("[data-hair]"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "expo.inOut" })
        .fromTo(c.querySelectorAll("[data-word]"), { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.06, ease: "expo.out" }, "-=0.4")
        .to(c.querySelectorAll("[data-word]"), { yPercent: -110, duration: 0.45, stagger: 0.04, ease: "expo.in" }, "+=0.25")
        .to(c.querySelector("[data-top]"), { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.1")
        .to(c.querySelector("[data-bottom]"), { yPercent: 100, duration: 1.1, ease: "expo.inOut" }, "<")
        .to(c.querySelector("[data-hair]"), { opacity: 0, duration: 0.3 }, "<");
      cleanups.push(() => tl.kill());
    } else gsap.set(c, { display: "none" });

    // Looping CSS animations in chapters far off screen (the guided experience above included) wait
    // until the visitor gets near them
    cleanups.push(pauseOffscreenAnimations(document.getElementById("top")));

    // Section animations (set up by the children before this effect runs) measure in document order
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    cleanups.push(() => window.removeEventListener("load", refresh));

    // A deep link waits for the layout to settle, then jumps
    if (pending.current) {
      const t = pending.current;
      pending.current = null;
      setTimeout(() => scrollTo(t, true), 350);
    }
    return () => cleanups.forEach((f) => f());
  }, [ready, scrollTo]);

  /* ---------- In-page anchors glide through the smooth scroller ---------- */
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const el = id === "#top" ? document.body : document.querySelector(id);
      if (!el) return;
      // While the intro is still running, the homepage isn't reachable yet
      if (document.body.classList.contains("locked") && el.closest("#site")) return;
      e.preventDefault();
      scrollTo(id === "#top" ? 0 : el);
      if (id !== "#top") history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  const ctx = useMemo(() => ({ ready, lenis, skipped, entranceDelay: skipped ? 2.35 : 0.2, scrollTo }), [ready, lenis, skipped, scrollTo]);

  return (
    <MotionContext.Provider value={ctx}>
      {/* app.js toggles this element's classes and aria-hidden — keep them static here */}
      <div className="site" id="site" aria-hidden="true" ref={root} suppressHydrationWarning>
        <a className="lm-skip" href="#home">Skip to content</a>
        <Header inSite={inSite} active={active} />

        <div className={styles.chrome} aria-hidden="true">
          <span className={styles.rail}><i data-rail /></span>
          <p className={styles.index} data-index><b>01</b> / Home</p>
        </div>

        <Hero />
        <Manifesto />
        <Services />
        <WorkShowcase />
        <Launches />
        <Industries />
        <Technology />
        <Process />
        <WhyLincoln />
        <Partners />
        <Clients />
        <CTA />
        <Contact />
        <Footer />
        {/* the contact desk appears once the guided intro has handed over to the homepage */}
        {inSite && <Chat />}

        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.curtain} ref={curtain} aria-hidden="true">
          <span className={styles.curtainTop} data-top />
          <span className={styles.curtainBottom} data-bottom />
          <span className={styles.hair} data-hair />
          <p className={styles.curtainWords}>
            <span><span data-word>The</span></span> <span><span data-word>Lincoln</span></span> <span><span data-word><em>Media</em></span></span>
          </p>
        </div>
      </div>
    </MotionContext.Provider>
  );
}
