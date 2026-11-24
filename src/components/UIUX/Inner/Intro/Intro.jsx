"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./Intro.module.css";

/**
 * The brief, set like the first page of a case study: a statement, then three columns — the
 * challenge, the approach, the outcome — each drawn in by a rule that runs across before its words
 * are wiped in line by line. The photograph beside it is framed like a pinned print and drifts
 * slower than the page, turning a few degrees as it goes.
 */
export default function Intro({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      gsap.from(root.querySelector("[data-say]"), { clipPath: "inset(0% 100% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: root, start: "top 75%", once: true } });
      gsap.utils.toArray("[data-col]", root).forEach((c, i) => {
        gsap.timeline({ scrollTrigger: { trigger: c, start: "top 85%", once: true }, delay: i * 0.12 })
          .from(c.querySelector("[data-rule]"), { scaleX: 0, duration: 1, ease: "expo.inOut" })
          .from(c.querySelectorAll("[data-wipe]"), { clipPath: "inset(0% 0% 100% 0%)", y: 20, duration: 0.9, ease: "expo.out", stagger: 0.1 }, 0.3);
      });
      gsap.fromTo(root.querySelector("[data-print]"), { yPercent: 10, rotation: -4 }, { yPercent: -10, rotation: 2, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="uxi-intro">
      <Label className={styles.label}>{data.kicker}</Label>
      <div className={styles.top}>
        <h2 id="uxi-intro" className={styles.say} data-say>{data.title}</h2>
        <figure className={styles.print} data-print><Image src={data.image} alt={data.alt} fill sizes="(max-width: 900px) 80vw, 30vw" quality={78} className={styles.img} /></figure>
      </div>
      <div className={styles.cols}>
        {[["The challenge", data.challenge], ["Our approach", data.approach], ["The outcome", data.outcome]].map(([h, t]) => (
          <div key={h} className={styles.col} data-col>
            <span className={styles.rule} data-rule aria-hidden="true" />
            <h3 data-wipe>{h}</h3>
            <p data-wipe>{t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
