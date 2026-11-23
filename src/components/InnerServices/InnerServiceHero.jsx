"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery } from "@/lib/motion";
import Label from "@/components/About/Label";
import ServiceButton from "./ServiceButton";
import styles from "./InnerServiceHero.module.css";

const WebArchitectureScene = dynamic(() => import("./WebArchitectureScene"), { ssr: false, loading: () => null });

/**
 * Inner service hero. Behind the type, a website is assembled in 3D space — wireframe, layout grid
 * and finished page lock together in layers, with code, a phone, a site map and components wired to
 * it by light, over a grid floor flowing toward you. The name sets in letter by letter; scrolling
 * pulls the layers apart and lifts the copy away. Phones get a lighter scene above the copy.
 */
export default function InnerServiceHero({ service: s }) {
  const ref = useRef(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const { ready } = useSiteMotion();
  const small = useMediaQuery("(max-width: 900px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const h = s.hero;

  useEffect(() => {
    const move = (e) => { pointer.current = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 }; };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-line]"), { type: "words,chars", mask: "chars" });
      gsap.timeline({ delay: 0.15, onComplete: () => split.revert() })
        .from(split.chars, { yPercent: 118, rotate: 6, transformOrigin: "0% 100%", duration: 1.3, ease: "expo.out", stagger: 0.035 })
        .fromTo(root.querySelectorAll("[data-wipe]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut", stagger: 0.09 }, 0.35)
        .from(root.querySelector("[data-band]"), { yPercent: 100, duration: 1.2, ease: "expo.out" }, 0.8);
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(progress, { current: 1, ease: "none", scrollTrigger: st });
      gsap.to(root.querySelector("[data-copy]"), { yPercent: -18, opacity: 0.15, ease: "none", scrollTrigger: st });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const band = [...h.marquee, ...h.marquee];

  return (
    <section ref={ref} id="service-hero" className={styles.hero} aria-labelledby="service-title">
      <div className={styles.scene} aria-hidden="true">
        {!reduced && <WebArchitectureScene pointer={pointer} progress={progress} small={small} code={h.code} />}
      </div>
      <span className={styles.veil} aria-hidden="true" />

      <nav className={styles.crumb} aria-label="Breadcrumb" data-wipe>
        <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li aria-current="page">{s.name}</li>
        </ol>
      </nav>

      <div className={styles.copy} data-copy>
        <div data-wipe><Label>{h.strap}</Label></div>
        <h1 id="service-title" className={styles.title}>
          <span className={styles.line} data-line>{h.title[0]}</span>
          <span className={`${styles.line} ${styles.accent}`} data-line>{h.title[1]}</span>
        </h1>
        <div className={styles.foot}>
          <div className={styles.text}>
            <p className={styles.tagline} data-wipe>{h.tagline}</p>
            <p className={styles.lead} data-wipe>{h.lead}</p>
          </div>
          <div className={styles.actions} data-wipe>
            <ServiceButton href={h.primary.href} size="lg">{h.primary.label}</ServiceButton>
            <ServiceButton href={h.secondary.href} variant="outline" size="lg" icon="down">{h.secondary.label}</ServiceButton>
          </div>
        </div>
      </div>

      <div className={styles.bandWrap} data-band>
        <p className={styles.bandLabel}>Platforms</p>
        <div className={styles.bandMask}>
          <ul className={styles.band}>
            {band.map((t, i) => <li key={i} aria-hidden={i >= h.marquee.length || undefined}>{t}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
