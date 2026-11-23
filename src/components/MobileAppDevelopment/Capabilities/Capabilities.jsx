"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import Head from "../Head";
import styles from "./Capabilities.module.css";

const ACCENT = "#1f6feb";

/**
 * Capabilities as a stack of cards the scroll deals out. On desktop each card holds near the top of
 * the screen and the next one rises over it, while the one underneath sinks back, dims and its phone
 * turns away — so every capability opens in turn with its description, deliverables and the app at
 * that stage. Phones: the cards simply follow one another, each opening as it arrives.
 */
export default function Capabilities({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const cards = gsap.utils.toArray("[data-card]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        if (next) {
          const st = { trigger: next, start: "top bottom", end: "top 20%", scrub: true };
          gsap.fromTo(c, { scale: 1, "--dim": 0 }, { scale: 0.92, "--dim": 0.6, ease: "none", immediateRender: false, scrollTrigger: st });
          // explicit start values: the entrance tween below must not become this one's starting angle
          gsap.fromTo(c.querySelector("[data-turn]"), { rotationY: -16, y: 0 }, { rotationY: 38, y: -30, ease: "none", immediateRender: false, scrollTrigger: { ...st } });
        }
        gsap.from(c.querySelectorAll("[data-in]"), { y: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: c, start: "top 60%", once: true } });
        gsap.from(c.querySelector("[data-turn]"), { rotationY: -50, x: 60, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 65%", once: true } });
      });
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      cards.forEach((c) => gsap.from(c, { clipPath: "inset(12% 0% 0% 0% round 24px)", y: 50, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: c, start: "top 88%", once: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.caps} aria-labelledby="caps-title">
      <Head kicker={data.kicker} title={data.title} id="caps-title" className={styles.head} />
      <ol className={styles.stack}>
        {data.items.map((c, i) => (
          <li key={c.name} className={styles.card} data-card style={{ "--i": i }}>
            <div className={styles.copy}>
              <h3 data-in>{c.name}</h3>
              <p data-in>{c.text}</p>
              <ul data-in>{c.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
            <div className={styles.visual} aria-hidden="true">
              <div className={styles.turn} data-turn>
                <Device depth={13}><Screen><AppScreen kind={c.screen} mode={c.mode} accent={ACCENT} /></Screen></Device>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
