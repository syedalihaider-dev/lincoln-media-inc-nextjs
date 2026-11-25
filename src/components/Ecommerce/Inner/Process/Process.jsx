"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Process.module.css";

/**
 * The workflow as one line drawn down the page. The line grows with the scroll; each step sits to
 * alternate sides of it, and its node lights and its words step in from the line's side the moment
 * the line reaches it. Phones keep the line on the left.
 */
export default function Process({ data, platform }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const steps = gsap.utils.toArray("[data-step]", root);
    const lit = steps.map((s) => ScrollTrigger.create({ trigger: s, start: "top 60%", onEnter: () => s.classList.add(styles.lit), onLeaveBack: () => s.classList.remove(styles.lit) }));
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-line]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-track]"), start: "top 60%", end: "bottom 60%", scrub: true } });
      steps.forEach((s, i) => gsap.from(s.querySelectorAll("h3, p"), { x: i % 2 ? 40 : -40, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 62%", once: true } }));
    });
    return () => { lit.forEach((t) => t.kill()); mm.revert(); };
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.process} aria-labelledby="eci-process">
      <Head platform={platform} kicker={data.kicker} title={data.title} id="eci-process" align="center" />
      <div className={styles.track} data-track>
        <span className={styles.rail} aria-hidden="true"><span data-line /></span>
        <ol className={styles.steps}>
        {data.steps.map((s) => (
          <li key={s.name} className={styles.step} data-step>
            <span className={styles.node} aria-hidden="true" />
            <div className={styles.copy}>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </section>
  );
}
