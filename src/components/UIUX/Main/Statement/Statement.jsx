"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import imgSketch from "@public/images/services/ui-ux-design.jpg";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./Statement.module.css";

// Real interface fragments from the product — each drifts at its own speed
const BITS = [
  { cls: "b1", speed: -160, el: <span className={styles.btn}>Book a viewing</span> },
  { cls: "b2", speed: 120, el: <span className={styles.input}><small>Neighbourhood</small>Midtown<i /></span> },
  { cls: "b3", speed: -90, el: <span className={styles.toggle}>Saved homes <i /></span> },
  { cls: "b4", speed: 200, el: <span className={styles.chip}>2 bed · 2 bath · 1,240 sq ft</span> },
  { cls: "b5", speed: -220, el: <span className={styles.toast}><b>✓</b>Viewing confirmed · Sat 10:00</span> },
];

/**
 * An editorial statement on a paper-white spread. The four lines are set very large and slide in
 * from alternating sides; a photograph of a designer at work opens from a narrow rounded slot behind
 * them; and fragments of the product's interface — a button, an input, a toggle, a confirmation —
 * drift past at their own speeds, so text, image and interface move as three separate layers.
 */
export default function Statement({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const st = { trigger: root, start: "top bottom", end: "bottom top", scrub: true };
      gsap.utils.toArray("[data-line]", root).forEach((l, i) => gsap.fromTo(l, { xPercent: i % 2 ? 14 : -14 }, { xPercent: i % 2 ? -6 : 6, ease: "none", scrollTrigger: st }));
      gsap.fromTo(root.querySelector("[data-mask]"), { clipPath: "inset(30% 38% 30% 38% round 200px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px)", ease: "power2.out", scrollTrigger: { trigger: root, start: "top 75%", end: "center 45%", scrub: 0.7 } });
      gsap.fromTo(root.querySelector("[data-mask] img"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: st });
      gsap.utils.toArray("[data-bit]", root).forEach((b, i) => gsap.fromTo(b, { y: -BITS[i].speed }, { y: BITS[i].speed, ease: "none", scrollTrigger: st }));
      gsap.from(root.querySelector("[data-text]"), { clipPath: "inset(0% 0% 100% 0%)", y: 30, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-text]"), start: "top 85%", once: true } });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ux-statement">
      <div className={styles.kicker}><Label className={styles.label}>{data.kicker}</Label></div>
      <figure className={styles.mask} data-mask aria-hidden="true"><Image src={imgSketch} alt="" fill sizes="(max-width: 900px) 92vw, 60vw" quality={78} className={styles.img} /></figure>
      <h2 id="ux-statement" className={styles.lines}>
        {data.lines.map((l, i) => <span key={l} className={`${styles.line} ${i % 2 ? styles.em : ""}`} data-line>{l}</span>)}
      </h2>
      <div className={styles.bits} aria-hidden="true">
        {BITS.map((b) => <span key={b.cls} className={`${styles.bit} ${styles[b.cls]}`} data-bit>{b.el}</span>)}
      </div>
      <p className={styles.text} data-text>{data.text}</p>
    </section>
  );
}
