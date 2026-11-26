"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, undraw, MOTION, PIN } from "@/components/ServicePage/scene";
import Button from "@/components/Common/Button";
import { GMB_BUSINESS as B } from "@/data/services/gmbOptimization";
import Map from "../ui/Map";
import { Ic, Stars } from "../ui/Listing";
import styles from "./Hero.module.css";

/**
 * Opening: a neighbourhood map laid on a tilted plane fills the frame. The streets draw themselves,
 * a search types "florist near me", competitors' pins drop across the grid — then one pin lands,
 * pulses, and its profile unfolds beside it. Scrolling on leans the map further and moves in on
 * that pin while the type drifts away.
 */
export default function Hero({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const roads = root.querySelectorAll("[data-road]");
      undraw(roads);
      const typed = root.querySelector("[data-typed]");
      const q = { n: 0 };
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(root.querySelectorAll("[data-area]"), { opacity: 0, duration: 1.4, ease: "power2.out" }, 0)
        .to(roads, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: { each: 0.03, from: "random" } }, 0)
        .from(root.querySelectorAll("[data-label]"), { opacity: 0, duration: 1 }, 1)
        .from(root.querySelectorAll("[data-line]"), { yPercent: 110, duration: 1.3, stagger: 0.1, ease: "expo.out" }, 0.25)
        .from(root.querySelectorAll("[data-rise]"), { y: 26, opacity: 0, duration: 1, stagger: 0.08 }, 0.8)
        .from(root.querySelector("[data-search]"), { y: -24, opacity: 0, duration: 0.8 }, 1)
        .fromTo(q, { n: 0 }, { n: B.query.length, duration: 1.1, ease: "none", onUpdate: () => { typed.textContent = B.query.slice(0, Math.round(q.n)); } }, 1.4)
        .from(root.querySelectorAll("[data-pin]:not([data-pin='you']) [data-drop]"), { y: -90, opacity: 0, duration: 0.7, ease: "bounce.out", stagger: 0.09 }, 2.4)
        .from(root.querySelector("[data-pin='you'] [data-drop]"), { y: -140, scale: 1.3, opacity: 0, transformOrigin: "50% 100%", duration: 1, ease: "bounce.out" }, 3)
        .from(root.querySelector("[data-pin='you'] [data-pulse]"), { opacity: 0, duration: 0.4 }, 3.6)
        .fromTo(root.querySelector("[data-card]"), { clipPath: "inset(0 0 100% 0 round 22px)", y: 30 }, { clipPath: "inset(0 0 0% 0 round 22px)", y: 0, duration: 1.1, ease: "expo.out" }, 3.6);
    });
    mm.add(PIN, () => {
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 } })
        .to(root.querySelector("[data-plane]"), { rotateX: 52, scale: 1.55, yPercent: 8, ease: "none" }, 0)
        .to(root.querySelector("[data-copy]"), { yPercent: -25, opacity: 0, ease: "none" }, 0)
        .to(root.querySelector("[data-card]"), { yPercent: -30, ease: "none" }, 0);
    });
  }, []);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="gmb-hero-title">
      <div className={styles.world} aria-hidden="true">
        <div className={styles.plane} data-plane><Map /></div>
      </div>
      <div className={styles.veil} aria-hidden="true" />

      <div className={styles.copy} data-copy>
        <p className={styles.kicker} data-rise><Ic n="pin" />{data.kicker}</p>
        <h1 id="gmb-hero-title" className={styles.title}>
          <span className={styles.lead} data-rise>{data.lead}</span>
          {data.title.map((l) => <span key={l} className={styles.mask}><span data-line>{l}</span></span>)}
        </h1>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.ctas} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={data.secondary.href} variant="text" icon="down">{data.secondary.label}</Button>
        </div>
      </div>

      <div className={styles.ui} aria-hidden="true">
        <div className={styles.search} data-search><Ic n="search" /><span data-typed>{B.query}</span><i className={styles.caret} /></div>
        <div className={styles.card} data-card>
          <div className={styles.cardTop}><b>{B.name}</b><span className={styles.badge}>Open</span></div>
          <p className={styles.rate}><b>4.8</b><Stars v={4.8} /> <span>{B.category} · 0.2 mi</span></p>
          <p className={styles.addr}>{B.street} · {B.area}</p>
          <div className={styles.acts}><span className={styles.pri}><Ic n="dir" />Directions</span><span><Ic n="call" />Call</span><span><Ic n="web" />Website</span></div>
          <p className={styles.note}>{B.note}</p>
        </div>
      </div>
    </section>
  );
}
