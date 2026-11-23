"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery } from "@/lib/motion";
import { SERVICES_PAGE, SERVICE_CATEGORIES } from "@/data/service-categories";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Label from "@/components/About/Label";
import styles from "./ServicesHero.module.css";

const EcosystemScene = dynamic(() => import("./EcosystemScene"), { ssr: false, loading: () => null });
const DISCIPLINES = SERVICE_CATEGORIES.filter((c) => c.short);

/**
 * The Services opening: a digital services ecosystem. A lit core with one interface panel per
 * discipline — web, mobile, UI/UX, marketing, branding, e-commerce, video, animation — orbiting it
 * in 3D, each wired to the core by light. Whichever discipline swings nearest the viewer is named
 * in the readout and lit in the row of disciplines below. Scrolling widens and tips the orbit and
 * pushes the camera in while the headline lifts away.
 */
export default function ServicesHero() {
  const ref = useRef(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [front, setFront] = useState(0);
  const { ready } = useSiteMotion();
  const small = useMediaQuery("(max-width: 900px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const onFront = useCallback((i) => setFront(i), []);

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
      const head = SplitText.create(root.querySelectorAll("[data-line]"), { type: "words", mask: "words" });
      gsap.timeline({ delay: 0.1, onComplete: () => head.revert() })
        .from(root.querySelector("[data-scene]"), { opacity: 0, scale: 0.85, duration: 2.4, ease: "expo.out" }, 0)
        .from(head.words, { yPercent: 115, duration: 1.2, ease: "expo.out", stagger: 0.06 }, 0.25)
        .fromTo(root.querySelectorAll("[data-wipe]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", stagger: 0.08 }, 0.6)
        .from(root.querySelectorAll("[data-disc]"), { yPercent: 100, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.04 }, 0.9);
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(progress, { current: 1, ease: "none", scrollTrigger: st });
      gsap.to(root.querySelector("[data-copy]"), { yPercent: -16, opacity: 0.1, ease: "none", scrollTrigger: st });
      return () => head.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="services-hero" className={styles.hero} aria-labelledby="services-title">
      <div className={styles.scene} data-scene aria-hidden="true">
        {!reduced && <EcosystemScene items={DISCIPLINES} progress={progress} pointer={pointer} small={small} onFront={onFront} />}
      </div>
      <span className={styles.veil} aria-hidden="true" />

      <div className={styles.top}>
        <div data-wipe><Label>{SERVICES_PAGE.eyebrow}</Label></div>
        <p className={styles.rfp} data-wipe>
          {SERVICES_PAGE.rfp} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </p>
      </div>

      <div className={styles.copy} data-copy>
        <h1 id="services-title" className={styles.title}>
          {SERVICES_PAGE.heroTitle.map((l, i) => <span key={l} className={`${styles.line} ${i === 2 ? styles.em : ""}`} data-line>{l}</span>)}
        </h1>
        <div className={styles.foot}>
          <p className={styles.text} data-wipe>{SERVICES_PAGE.headline}</p>
          <div className={styles.actions} data-wipe>
            <Button href="#index" size="lg" icon="down">{SERVICES_PAGE.explore}</Button>
            <Button href="/#contact" variant="outline" size="lg">{SERVICES_PAGE.expert}</Button>
          </div>
        </div>
      </div>

      <div className={styles.readout} aria-hidden="true" data-wipe>
        <span className={styles.readLabel}>{SERVICES_PAGE.ecosystem}</span>
        <span className={styles.readName} key={front}>{DISCIPLINES[front]?.name}</span>
      </div>

      <nav className={styles.disciplines} aria-label="Service disciplines">
        <ul>
          {DISCIPLINES.map((c, i) => (
            <li key={c.key} data-disc>
              <a href={c.href || `/services#index-${c.key}`} className={i === front ? styles.lit : ""}>{c.short}</a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
