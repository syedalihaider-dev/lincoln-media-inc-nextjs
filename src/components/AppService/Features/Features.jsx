"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Features.module.css";

/**
 * Built in: two long rows — what the apps include, and who they're for — that slide against each
 * other as the page scrolls, like strips of labels on a drafting table. The lists stay readable as
 * plain lists for assistive technology.
 */
export default function Features({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-strip]", root).forEach((s, i) => {
        const span = () => Math.max(0, s.scrollWidth - innerWidth * 0.85);
        gsap.fromTo(s, { x: () => (i % 2 ? -span() : 0) }, { x: () => (i % 2 ? 0 : -span()), ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.feat} aria-labelledby="feat-title">
      <Head kicker={data.kicker} title={data.title} id="feat-title" tone="ink" className={styles.head} />
      {data.rows.map((r, i) => (
        <div key={r.label} className={styles.row}>
          <h3 className={styles.label}>{r.label}</h3>
          <ul className={`${styles.strip} ${i % 2 ? styles.alt : ""}`} data-strip>
            {r.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}
