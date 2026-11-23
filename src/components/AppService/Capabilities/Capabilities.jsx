"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import AppScreen from "@/components/MobileApp/AppScreen";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import Head from "../Head";
import styles from "./Capabilities.module.css";

/**
 * Capabilities as screens on a table. Each card's interface lies flat, seen at the blueprint angle;
 * as the card travels up the page it lifts and turns to face you, its shadow falling away beneath it,
 * and the capability's name and line open below. No hover — the scroll opens each one.
 */
export default function Capabilities({ data, ui }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-card]", ref.current).forEach((c) => {
        const st = { trigger: c, start: "top 95%", end: "center 55%", scrub: 0.7 };
        gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: st })
          .fromTo(c.querySelector("[data-screen]"), { rotationX: 62, rotationZ: -24, y: 50, scale: 0.82 }, { rotationX: 8, rotationZ: 0, y: 0, scale: 1, duration: 1 }, 0)
          .fromTo(c.querySelector("[data-shadow]"), { opacity: 0.9, scale: 1 }, { opacity: 0.25, scale: 0.7, duration: 1 }, 0)
          .from(c.querySelectorAll("[data-copy] > *"), { y: 24, opacity: 0, stagger: 0.12, duration: 0.5 }, 0.45);
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.caps} aria-labelledby="caps-title">
      <Head kicker={data.kicker} title={data.title} id="caps-title" />
      <ul className={styles.grid}>
        {data.items.map((c) => (
          <li key={c.name} className={styles.card} data-card>
            <div className={styles.table} aria-hidden="true">
              <span className={styles.shadow} data-shadow />
              <div className={styles.screen} data-screen><ScaledScreen width={390}><AppScreen kind={c.screen} platform={ui.platform} accent={ui.accent} /></ScaledScreen></div>
            </div>
            <div className={styles.copy} data-copy>
              <h3>{c.name}</h3>
              <p>{c.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
