"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Solves.module.css";

/**
 * Problem → solution, on ink. While the section holds (desktop) each problem in turn is struck
 * through, dims, and its solution rises out of a mask below it, the marker turning from a cross to
 * a tick. Phones see every pair resolved, with the strike drawing as each arrives.
 */
export default function Solves({ data, platform }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const pairs = gsap.utils.toArray("[data-pair]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root, start: "top top", end: `+=${pairs.length * 45}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      pairs.forEach((p) => {
        tl.fromTo(p.querySelector("[data-strike]"), { scaleX: 0 }, { scaleX: 1, duration: 0.5 })
          .to(p.querySelector("[data-problem]"), { opacity: 0.35, duration: 0.3 }, "<0.2")
          .fromTo(p.querySelector("[data-solution]"), { yPercent: 110 }, { yPercent: 0, duration: 0.5 }, "<")
          .to(p, { "--done": 1, duration: 0.2 }, "<0.2");
      });
      tl.to({}, { duration: 0.4 });
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      pairs.forEach((p) => gsap.fromTo(p.querySelector("[data-strike]"), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "expo.inOut", scrollTrigger: { trigger: p, start: "top 80%", once: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.solves} aria-labelledby="eci-solves">
      <Head platform={platform} kicker={data.kicker} title={data.title} id="eci-solves" tone="ink" className={styles.head} />
      <ol className={styles.pairs}>
        {data.pairs.map((p) => (
          <li key={p.problem} className={styles.pair} data-pair>
            <span className={styles.mark} aria-hidden="true" />
            <p className={styles.problem} data-problem><span className={styles.srOnly}>Problem: </span>{p.problem}<i className={styles.strike} data-strike aria-hidden="true" /></p>
            <p className={styles.solWrap}><span className={styles.solution} data-solution><span className={styles.srOnly}>Solution: </span>{p.solution}</span></p>
          </li>
        ))}
      </ol>
    </section>
  );
}
