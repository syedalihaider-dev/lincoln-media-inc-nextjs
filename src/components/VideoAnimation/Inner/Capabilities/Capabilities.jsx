"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../../kit/Head";
import styles from "./Capabilities.module.css";

/**
 * Capabilities as a rack focus: the list scrolls past the middle of the screen like a lens pulling
 * focus — the row at the centre is sharp and bright, the ones before and after it soft and dim.
 */
export default function Capabilities({ data, tone }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-cap]", root).forEach((row) => {
        gsap.timeline({ scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true } })
          .fromTo(row, { filter: "blur(6px)", opacity: 0.25 }, { filter: "blur(0px)", opacity: 1, ease: "power1.out", duration: 1 })
          .to(row, { filter: "blur(6px)", opacity: 0.25, ease: "power1.in", duration: 1 });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.caps} aria-labelledby="vs-caps">
      <Head kicker={data.kicker} title={data.title} id="vs-caps" tone={tone} />
      <dl className={styles.list}>
        {data.items.map((c) => (
          <div key={c.name} className={styles.row} data-cap>
            <dt>{c.name}</dt>
            <dd>{c.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
