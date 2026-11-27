"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useMediaQuery, useReducedMotion, useSiteMotion } from "@/lib/motion";
import { HERO } from "@/data/home";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import { gatesOpened } from "@/components/Common/HydrateGate";
import styles from "./Hero.module.css";

// WebGL corridor is client-only and loaded after the page is interactive
const loadHeroScene = () => import("./HeroScene");
const HeroScene = dynamic(loadHeroScene, { ssr: false, loading: () => null });
// The homepage (and this scene) opens only after the visitor acts on the intro (enter, skip, a deep link),
// so the visitor's first interaction warms the 3D chunks (three.js + R3F) — downloaded while the intro
// plays or the curtain opens, never during page load.
const WARM = ["pointerdown", "keydown", "touchstart"];

const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Chapter 01 — Entering. The AI guide's orb from the intro stays on stage; around it hangs a corridor
 * of the studio's own work in 3D. Scrolling pins the stage and flies the camera down the corridor
 * toward the orb while the headline breaks apart — the visitor literally travels into the work.
 */
export default function Hero() {
  const ref = useRef(null);
  const counter = useRef(null);
  const scene = useRef({ progress: 0, arrive: 1, px: 0, py: 0 });
  const { ready, entranceDelay } = useSiteMotion();
  const reduced = useReducedMotion();
  const compact = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    if (reduced) return;
    if (ready || gatesOpened()) { loadHeroScene(); return; }
    const opts = { capture: true, passive: true };
    const warm = () => { WARM.forEach((t) => removeEventListener(t, warm, opts)); loadHeroScene(); };
    WARM.forEach((t) => addEventListener(t, warm, opts));
    return () => WARM.forEach((t) => removeEventListener(t, warm, opts));
  }, [ready, reduced]);

  useGSAP(() => {
    if (!ready) return;
    const q = gsap.utils.selector(ref);
    const s = scene.current;
    const mm = gsap.matchMedia();

    mm.add(ANY_MOTION, () => {
      // Entrance: the camera flies in from behind while the headline rises out of its masks
      const tl = gsap.timeline({ delay: entranceDelay });
      tl.fromTo(s, { arrive: 1 }, { arrive: 0, duration: 3.2, ease: "expo.out" }, 0)
        .from(q("[data-line] > span"), { yPercent: 118, duration: 1.6, stagger: 0.1, ease: "expo.out" }, 0.1)
        .from(q("[data-hair]"), { scaleX: 0, duration: 1.8, ease: "expo.inOut" }, 0.3)
        .from(q("[data-fade]"), { y: 20, opacity: 0, duration: 1.1, stagger: 0.07, ease: "expo.out" }, 0.6);
    });

    // Desktop: pin the stage and travel down the corridor
    mm.add(DESKTOP_MOTION, () => {
      const orb = (p) => window.LM?.blob(lerp(2.45, 0, p), lerp(0.12, -0.1, p), lerp(1.55, 3.6, p));
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=190%",
          pin: true,
          scrub: 0.9,
          onUpdate: (self) => {
            if (counter.current) counter.current.textContent = String(Math.round(self.progress * 100)).padStart(3, "0");
            if (self.isActive) orb(self.progress);
          },
        },
      });
      tl.to(s, { progress: 1, duration: 1 }, 0)
        .to(q("[data-line='1']"), { xPercent: -40, opacity: 0, duration: 0.3 }, 0)
        .to(q("[data-line='2']"), { xPercent: -28, opacity: 0, duration: 0.34 }, 0)
        .to(q("[data-line='3']"), { xPercent: 22, letterSpacing: "0.12em", opacity: 0, duration: 0.38 }, 0)
        .to(q("[data-line='4']"), { yPercent: -80, opacity: 0, duration: 0.3 }, 0.04)
        .to(q("[data-foot] > *:not([data-keep])"), { y: 40, opacity: 0, duration: 0.18, stagger: 0.02 }, 0)
        .fromTo(q("[data-word]"), { yPercent: 105, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.12, stagger: 0.025 }, 0.42)
        .to(q("[data-statement]"), { scale: 1.08, duration: 0.3 }, 0.6)
        .to(q("[data-statement]"), { opacity: 0, filter: "blur(6px)", duration: 0.12 }, 0.88);

      const move = (e) => { s.px = e.clientX / innerWidth - 0.5; s.py = e.clientY / innerHeight - 0.5; };
      addEventListener("pointermove", move);
      return () => { removeEventListener("pointermove", move); s.progress = 0; };
    });

    // Phones and tablets: no pin — the corridor drifts as the hero scrolls away
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(s, { progress: 0.32, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.6 } });
      gsap.to(q("[data-title]"), { yPercent: -14, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const words = "Built to be felt, not just seen.".split(" ");

  return (
    <section ref={ref} id="home" className={styles.hero} data-chapter="Home" data-nav="home" data-orb="2.45,0.12,1.55" aria-labelledby="hero-title">
      <div className={styles.scene} aria-hidden="true">
        {ready && !reduced && <HeroScene state={scene} compact={compact} />}
      </div>
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.meta} data-fade>
        <span>{SITE.city}</span>
        <span className={styles.avail}><i aria-hidden="true" />Available for new projects</span>
      </div>

      <h1 id="hero-title" className={styles.title} data-title>
        <span className={`${styles.line} ${styles.kicker}`} data-line="1"><span>We create</span></span>
        <span className={styles.line} data-line="2"><span>Digital</span></span>
        <span className={`${styles.line} ${styles.accent}`} data-line="3"><span>Experiences</span></span>
        <span className={`${styles.line} ${styles.soft}`} data-line="4"><span>that move people.</span></span>
      </h1>

      {/* Revealed mid-flight, at the heart of the corridor */}
      <p className={styles.statement} data-statement aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className={styles.wordMask}><span data-word>{w}</span></span>
        ))}
      </p>

      <div className={styles.foot} data-foot>
        <span className={styles.hair} data-hair data-keep aria-hidden="true" />
        <p className={styles.lede} data-fade>{HERO.lede}</p>
        <div className={styles.ctas} data-fade>
          <Button href="/contact-us#contact-form">Start a project</Button>
          <Button href="#work" variant="outline" icon="down">View work</Button>
        </div>
        <div className={styles.hud} data-fade aria-hidden="true">
          <span className={styles.depth}>Scroll to enter <b ref={counter}>000</b></span>
        </div>
      </div>
    </section>
  );
}
