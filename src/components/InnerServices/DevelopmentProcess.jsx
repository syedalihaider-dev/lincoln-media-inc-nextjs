"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./DevelopmentProcess.module.css";

/**
 * How a build moves: the steps in one row, no holding the page. A line of light runs along the top
 * of the row as the section passes through the screen, and each step's marker lights and its
 * photograph opens as the line reaches it. On phones the steps stack along a vertical line.
 */
export default function DevelopmentProcess({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const steps = gsap.utils.toArray("[data-step]", root);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-row]"), start: "top 85%", end: "top 30%", scrub: 0.6 } });
      tl.fromTo(root.querySelector("[data-line]"), { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", duration: steps.length }, 0);
      steps.forEach((st, i) => {
        tl.fromTo(st.querySelector("[data-dot]"), { scale: 0.4, backgroundColor: "rgba(54,228,208,0)" }, { scale: 1, backgroundColor: "rgba(54,228,208,1)", duration: 0.3, ease: "none" }, i + 0.2)
          .fromTo(st.querySelector("[data-img]"), { clipPath: "inset(100% 0% 0% 0% round 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 12px)", duration: 0.8, ease: "none" }, i)
          .fromTo(st.querySelector("[data-copy]"), { opacity: 0.25, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: "none" }, i + 0.2);
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="process" className={styles.process} aria-labelledby="process-title">
      <SectionHead kicker={data.kicker} title={data.title} id="process-title" />

      <div className={styles.row} data-row>
        <span className={styles.line} aria-hidden="true"><i data-line /></span>
        <ol className={styles.steps}>
        {data.steps.map((s) => (
          <li key={s.name} className={styles.step} data-step>
            <i className={styles.dot} data-dot aria-hidden="true" />
            <figure className={styles.img} data-img aria-hidden="true"><Image src={s.image} alt="" fill sizes="(min-width: 1001px) 18vw, 30vw" loading="lazy" /></figure>
            <div className={styles.copy} data-copy>
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.text}>{s.text}</p>
            </div>
          </li>
        ))}
        </ol>
      </div>
    </section>
  );
}
