"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery } from "@/lib/motion";
import { SERVICES_PAGE } from "@/data/service-categories";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Label from "@/components/About/Label";
import styles from "./ServicesHero.module.css";

const ServicesOrbit = dynamic(() => import("./ServicesOrbit"), { ssr: false, loading: () => null });

/**
 * The Services opening: "SERVICES" set as large as the screen allows, with the eight service
 * objects orbiting it in 3D. On desktop the hero holds while you scroll — the word swells and
 * opens up, the orbit widens and the camera pushes through it into the next chapter.
 */
export default function ServicesHero() {
  const ref = useRef(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const { ready } = useSiteMotion();
  const small = useMediaQuery("(max-width: 900px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

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
      const giant = SplitText.create(root.querySelector("[data-giant]"), { type: "chars", mask: "chars" });
      const head = SplitText.create(root.querySelector("[data-title]"), { type: "words", mask: "words" });
      gsap.timeline({ delay: 0.1 })
        .from(giant.chars, { yPercent: 120, rotate: 8, transformOrigin: "50% 100%", duration: 1.4, ease: "expo.out", stagger: { each: 0.05, from: "center" } })
        .from(head.words, { yPercent: 120, duration: 1.1, ease: "expo.out", stagger: 0.03 }, 0.45)
        .fromTo(root.querySelectorAll("[data-wipe]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", stagger: 0.08 }, 0.6)
        .from(root.querySelector("[data-scene]"), { opacity: 0, scale: 0.8, duration: 2.2, ease: "expo.out" }, 0.1);
      return () => { giant.revert(); head.revert(); };
    });
    mm.add(DESKTOP_MOTION, () => {
      // No holding the page: the exit plays out as the hero scrolls away
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 } });
      tl.to(progress, { current: 1, ease: "none", duration: 1 }, 0)
        .to(root.querySelector("[data-giant]"), { scale: 1.7, letterSpacing: "0.04em", opacity: 0, ease: "power2.in", duration: 1 }, 0)
        .to(root.querySelector("[data-top]"), { yPercent: -120, opacity: 0, ease: "power2.in", duration: 0.6 }, 0)
        .to(root.querySelector("[data-bottom]"), { yPercent: 60, opacity: 0, ease: "power2.in", duration: 0.7 }, 0.1)
        .to(root.querySelector("[data-veil]"), { opacity: 1, ease: "none", duration: 0.5 }, 0.55);
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(progress, { current: 0.6, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="services-hero" className={styles.hero} aria-labelledby="services-title">
      <div className={styles.pin} data-pin>
        <div className={styles.scene} data-scene aria-hidden="true">
          {!reduced && <ServicesOrbit progress={progress} pointer={pointer} small={small} />}
        </div>
        <span className={styles.grid} aria-hidden="true" />

        <div className={styles.top} data-top>
          <Label>{SERVICES_PAGE.eyebrow}</Label>
          <p className={styles.rfp} data-wipe>
            {SERVICES_PAGE.rfp} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </div>

        <p className={styles.giant} data-giant aria-hidden="true">Services</p>

        <div className={styles.bottom} data-bottom>
          <h1 id="services-title" className={styles.title} data-title>{SERVICES_PAGE.headline}</h1>
          <div className={styles.actions} data-wipe>
            <Button href="/#contact" size="lg">{SERVICES_PAGE.expert}</Button>
            <Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button>
          </div>
        </div>
        <span className={styles.veil} data-veil aria-hidden="true" />
      </div>
    </section>
  );
}
