"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Perception.module.css";

/**
 * Perception, set as a page of a type specimen. Five words run down the page at full size; each one
 * starts as a pale proof and is inked from left to right as it crosses the screen (a gradient swept
 * through the letterforms), its definition settling beneath it. Beside them two photographs of the
 * raw material of a brand — type and colour — are held and slide past one another.
 */
export default function Perception({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-word]", root).forEach((w) => {
        gsap.fromTo(w, { backgroundPositionX: "100%" }, { backgroundPositionX: "0%", ease: "none", scrollTrigger: { trigger: w, start: "top 85%", end: "top 40%", scrub: 0.5 } });
        gsap.from(w.nextElementSibling, { y: 20, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: w, start: "top 60%", once: true } });
      });
    });
    mm.add(DESKTOP_MOTION, () => {
      const st = { trigger: root.querySelector("[data-list]"), start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(root.querySelector("[data-img='0']"), { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: st });
      gsap.fromTo(root.querySelector("[data-img='1']"), { yPercent: 40 }, { yPercent: -40, ease: "none", scrollTrigger: st });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.perc} aria-labelledby="brand-perc">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="brand-perc" tone="paper" />
      <div className={styles.body}>
        <div className={styles.media} aria-hidden="true">
          <div className={styles.sticky}>
            {data.images.map((m, i) => (
              <figure key={i} className={`${styles.fig} ${styles[`f${i}`]}`} data-img={i}><Image src={m.img} alt="" fill sizes="(max-width: 900px) 80vw, 30vw" /></figure>
            ))}
          </div>
        </div>
        <dl className={styles.list} data-list>
          {data.words.map((w) => (
            <div key={w.word} className={styles.row}>
              <dt className={styles.word} data-word>{w.word}</dt>
              <dd className={styles.def}>{w.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
