"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import BPHead from "../BPHead";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import b from "../blueprint.module.css";
import styles from "./Notes.module.css";

/**
 * The service introduction as a drawing's general notes. A photograph sits in a drafting frame with
 * corner crop-marks that slide in to lock it; the notes are numbered callouts in a ruled list —
 * each one's leader line draws across to its text, which types in letter-spaced and then settles.
 */
export default function Notes({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      gsap.from(root.querySelectorAll("[data-crop]"), { x: (i) => (i % 2 ? 40 : -40), y: (i) => (i < 2 ? -40 : 40), opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-photo]"), start: "top 80%", once: true } });
      gsap.fromTo(root.querySelector("[data-photo] img"), { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray("[data-note]", root).forEach((n) => {
        gsap.timeline({ scrollTrigger: { trigger: n, start: "top 88%", once: true } })
          .from(n.querySelector("[data-leader]"), { scaleX: 0, duration: 0.8, ease: "expo.inOut" })
          .from(n.querySelector("p"), { letterSpacing: "0.2em", opacity: 0, duration: 1, ease: "expo.out" }, 0.4);
      });
    });
  });

  return (
    <section ref={ref} className={`${b.bp} ${styles.section}`} aria-labelledby="pi-notes">
      <BPHead kicker={data.kicker} title={data.title} text={data.text} id="pi-notes" />
      <div className={styles.grid}>
        <figure className={styles.photo} data-photo>
          <Image src={data.image} alt={data.alt} fill sizes="(max-width: 900px) 90vw, 40vw" quality={78} className={styles.img} />
          {["tl", "tr", "bl", "br"].map((c) => <i key={c} className={`${styles.crop} ${styles[c]}`} data-crop aria-hidden="true" />)}
        </figure>
        <ul className={styles.notes}>
          {data.points.map((p) => (
            <li key={p} data-note><span className={styles.leader} data-leader aria-hidden="true" /><p>{p}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
