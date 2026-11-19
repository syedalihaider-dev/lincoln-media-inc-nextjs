"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery } from "@/lib/motion";
import ServiceButton from "./ServiceButton";
import styles from "./InnerServiceHero.module.css";

const InnerHeroScene = dynamic(() => import("./InnerHeroScene"), { ssr: false, loading: () => null });

/**
 * Inner service hero: the service's name set as two lines of editorial type — the first beside a 3D
 * stack of the service's object and a framed photograph, the second across the full width — the two
 * lines parting in opposite directions as you scroll while the stack fans out. Strap, tagline and the
 * two actions below; a slow band of the service's platforms runs along the foot.
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
      const lines = gsap.utils.toArray("[data-line]", root);
      const split = SplitText.create(lines, { type: "chars", mask: "chars" });
      gsap.timeline({ delay: 0.1 })
        .from(split.chars, { yPercent: 115, duration: 1.3, ease: "expo.out", stagger: 0.035 })
        .fromTo(root.querySelector("[data-photo]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }, 0.2)
        .from(root.querySelector("[data-scene]"), { opacity: 0, scale: 0.85, duration: 2, ease: "expo.out" }, 0.3)
        .fromTo(root.querySelectorAll("[data-wipe]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", stagger: 0.08 }, 0.6);

      const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(lines[0], { xPercent: -10, ease: "none", scrollTrigger: st });
      gsap.to(lines[1], { xPercent: 8, ease: "none", scrollTrigger: st });
      gsap.to(root.querySelector("[data-photo]"), { yPercent: -22, ease: "none", scrollTrigger: st });
      gsap.to(progress, { current: 1, ease: "none", scrollTrigger: st });
      gsap.to(root.querySelector("[data-band]"), { xPercent: -30, ease: "none", scrollTrigger: st });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const band = [...h.marquee, ...h.marquee, ...h.marquee];

  return (
    <section ref={ref} id="service-hero" className={styles.hero} aria-labelledby="service-title">
      <span className={styles.grid} aria-hidden="true" />

      <nav className={styles.crumb} aria-label="Breadcrumb" data-wipe>
        <a href="/">Home</a><i aria-hidden="true">/</i><a href="/services">Services</a><i aria-hidden="true">/</i><span aria-current="page">{s.name}</span>
      </nav>

      <div className={styles.stage}>
        <p className={styles.strap} data-wipe>{h.strap}</p>
        <h1 id="service-title" className={styles.title}>
          <span className={`${styles.line} ${styles.l0}`} data-line>{h.title[0]}</span>{" "}
          <span className={`${styles.line} ${styles.l1}`} data-line>{h.title[1]}</span>
        </h1>
        <div className={styles.visual} aria-hidden="true">
          <figure className={styles.photo} data-photo><Image src={h.image} alt="" fill priority sizes="(min-width: 901px) 18vw, 40vw" /></figure>
          <div className={styles.scene} data-scene>{!reduced && <InnerHeroScene motif={s.motif} progress={progress} pointer={pointer} small={small} />}</div>
          <span className={styles.corner} />
        </div>
      </div>

      <div className={styles.foot}>
        <p className={styles.tagline} data-wipe>{h.tagline}</p>
        <div className={styles.actions} data-wipe>
          <ServiceButton href={h.primary.href} size="lg">{h.primary.label}</ServiceButton>
          <ServiceButton href={h.secondary.href} variant="outline" size="lg" icon="down">{h.secondary.label}</ServiceButton>
        </div>
      </div>

      <div className={styles.bandWrap} aria-hidden="true">
        <div className={styles.band} data-band>{band.map((t, i) => <span key={i}>{t}<i>◆</i></span>)}</div>
      </div>
    </section>
  );
}
