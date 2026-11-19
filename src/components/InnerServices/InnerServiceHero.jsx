"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery } from "@/lib/motion";
import ServiceButton from "./ServiceButton";
import styles from "./InnerServiceHero.module.css";

const InnerHeroField = dynamic(() => import("./InnerHeroField"), { ssr: false, loading: () => null });

/**
 * Inner service hero: a digital world being built behind the type — a rippling field of points,
 * wireframe blocks rising out of it, light running along its grid (Three.js) — with glass fragments
 * of an interface floating in front at different depths. The name, tagline and actions sit over a
 * readable veil. The fragments drift with the cursor and lift away at their own speeds on scroll.
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
      const split = SplitText.create(root.querySelectorAll("[data-line]"), { type: "chars", mask: "chars" });
      // the masks clip the title glow, so the split is undone once the letters have landed
      gsap.timeline({ delay: 0.1, onComplete: () => split.revert() })
        .from(split.chars, { yPercent: 115, duration: 1.2, ease: "expo.out", stagger: 0.03 })
        .fromTo(root.querySelectorAll("[data-wipe]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", stagger: 0.08 }, 0.4)
        .fromTo(root.querySelectorAll("[data-frag]"), { opacity: 0, y: 40, rotationX: -25 }, { opacity: 1, y: 0, rotationX: 0, duration: 1.4, ease: "expo.out", stagger: 0.15 }, 0.6);
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(progress, { current: 1, ease: "none", scrollTrigger: st });
      gsap.to(root.querySelector("[data-copy]"), { yPercent: -10, ease: "none", scrollTrigger: st });
      root.querySelectorAll("[data-frag]").forEach((f, i) => gsap.to(f, { y: -60 - i * 50, ease: "none", scrollTrigger: st }));
      gsap.to(root.querySelector("[data-band]"), { xPercent: -30, ease: "none", scrollTrigger: st });
      return () => split.revert();
    });
    // The fragments lean with the cursor at their own depths
    mm.add(DESKTOP_MOTION, () => {
      const frags = gsap.utils.toArray("[data-frag]", root).map((f, i) => ({ x: gsap.quickTo(f, "x", { duration: 1.2, ease: "power3.out" }), r: gsap.quickTo(f, "rotationY", { duration: 1.2, ease: "power3.out" }), k: (i + 1) * 14 }));
      const move = (e) => { const px = e.clientX / innerWidth - 0.5; frags.forEach((f) => { f.x(px * f.k); f.r(px * 8); }); };
      addEventListener("pointermove", move, { passive: true });
      return () => removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const band = [...h.marquee, ...h.marquee, ...h.marquee];

  return (
    <section ref={ref} id="service-hero" className={styles.hero} aria-labelledby="service-title">
      <div className={styles.field} aria-hidden="true">{!reduced && <InnerHeroField pointer={pointer} progress={progress} small={small} />}</div>
      <span className={styles.veil} aria-hidden="true" />

      <nav className={styles.crumb} aria-label="Breadcrumb" data-wipe>
        <a href="/">Home</a><i aria-hidden="true">/</i><a href="/services">Services</a><i aria-hidden="true">/</i><span aria-current="page">{s.name}</span>
      </nav>

      <div className={styles.body}>
        <div className={styles.copy} data-copy>
          <p className={styles.strap} data-wipe>{h.strap}</p>
          <h1 id="service-title" className={styles.title}>
            <span className={styles.line} data-line>{h.title[0]}</span>{" "}
            <span className={`${styles.line} ${styles.accent}`} data-line>{h.title[1]}</span>
          </h1>
          <p className={styles.tagline} data-wipe>{h.tagline}</p>
          <div className={styles.actions} data-wipe>
            <ServiceButton href={h.primary.href} size="lg">{h.primary.label}</ServiceButton>
            <ServiceButton href={h.secondary.href} variant="outline" size="lg" icon="down">{h.secondary.label}</ServiceButton>
          </div>
        </div>

        {/* Glass fragments of an interface, floating in front of the field */}
        <div className={styles.frags} aria-hidden="true">
          <div className={`${styles.frag} ${styles.browser}`} data-frag>
            <p className={styles.chrome}><i /><i /><i /><span>{h.fragments?.url}</span></p>
            <div className={styles.skeleton}><b /><b /><b /><span /><span /><span /></div>
          </div>
          <div className={`${styles.frag} ${styles.code}`} data-frag>
            {(h.fragments?.code || []).map((line, i) => <p key={i} style={{ "--d": `${i * 0.25}s` }}>{line}</p>)}
          </div>
          <div className={`${styles.frag} ${styles.status}`} data-frag>
            <i /><span>{h.fragments?.status}</span>
          </div>
        </div>
      </div>

      <div className={styles.bandWrap} aria-hidden="true">
        <div className={styles.band} data-band>{band.map((t, i) => <span key={i}>{t}<i>◆</i></span>)}</div>
      </div>
    </section>
  );
}
