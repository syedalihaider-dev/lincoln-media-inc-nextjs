"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import Visual from "../Visual";
import styles from "./Intro.module.css";

/**
 * What the service is and why it matters, as an editorial spread. The statement's lines travel in
 * from the right — alternate lines from the left — and fill with light as they settle, while the
 * photograph beside the copy drifts the other way and turns slightly in depth.
 */
export default function Intro({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const small = matchMedia("(max-width: 900px)").matches;
      const st = { trigger: root, start: "top 85%", end: "center 45%", scrub: 0.7 };
      gsap.utils.toArray("[data-line]", root).forEach((l, i) => {
        gsap.fromTo(l, { xPercent: (i % 2 ? -1 : 1) * (small ? 12 : 28), "--fill": "0%" }, { xPercent: 0, "--fill": "100%", ease: "power2.out", scrollTrigger: { ...st, start: `top ${85 - i * 6}%` } });
      });
      gsap.fromTo(root.querySelector("[data-photo]"), { xPercent: small ? -6 : -14, rotationY: 14, transformPerspective: 1200 }, { xPercent: small ? 4 : 10, rotationY: -6, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(root.querySelector("[data-photo] img"), { scale: 1.25 }, { scale: 1.05, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(root.querySelectorAll("[data-point]"), { x: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.1, scrollTrigger: { trigger: root.querySelector("[data-points]"), start: "top 85%", once: true } });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ms-intro">
      <Label>{data.kicker}</Label>
      <h2 id="ms-intro" className={styles.statement}>
        {data.lines.map((l) => <span key={l} className={styles.line} data-line>{l}</span>)}
      </h2>
      <div className={styles.grid}>
        <div className={styles.frame} data-photo><Visual item={data} fit="cover" sizes="(max-width: 900px) 90vw, 46vw" /></div>
        <div className={styles.copy}>
          <p className={styles.text}>{data.text}</p>
          <ul className={styles.points} data-points>
            {data.points.map((p) => <li key={p} data-point>{p}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
