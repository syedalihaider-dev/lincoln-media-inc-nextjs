"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Challenge.module.css";

// where each problem note starts on the desk before order arrives (desktop)
const MESS = [
  { x: -30, y: 60, r: -14 }, { x: 40, y: -40, r: 11 }, { x: -60, y: -20, r: 7 },
  { x: 50, y: 70, r: -9 }, { x: -20, y: -70, r: 16 }, { x: 70, y: 20, r: -6 },
];

/**
 * The problem as a mess on the desk. The six symptoms start as scattered notes — rotated, overlapping,
 * off the grid — and are pulled into a neat, aligned grid as you scroll through, before the line that
 * resolves them lands underneath. Order out of disorder is the service.
 */
export default function Challenge({ data, service }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const notes = gsap.utils.toArray("[data-note]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      notes.forEach((n, i) => gsap.fromTo(n, { xPercent: MESS[i % 6].x, yPercent: MESS[i % 6].y, rotation: MESS[i % 6].r }, { xPercent: 0, yPercent: 0, rotation: 0, ease: "power2.out", scrollTrigger: { trigger: root.querySelector("[data-grid]"), start: "top 85%", end: "bottom 60%", scrub: 0.8 } }));
    });
    mm.add(ANY_MOTION, () => {
      gsap.from(root.querySelector("[data-resolve]"), { y: 30, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-resolve]"), start: "top 85%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.ch} aria-labelledby="bsi-ch">
      <Head service={service} kicker={data.kicker} title={data.title} id="bsi-ch" tone="ink" />
      <ul className={styles.grid} data-grid>
        {data.items.map((t) => <li key={t} className={styles.note} data-note><span aria-hidden="true">✕</span>{t}</li>)}
      </ul>
      <p className={styles.resolve} data-resolve>{data.resolve}</p>
    </section>
  );
}
