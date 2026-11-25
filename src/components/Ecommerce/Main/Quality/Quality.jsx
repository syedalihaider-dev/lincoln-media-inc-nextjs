"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Quality.module.css";

/**
 * Quality and scale, over a long warehouse aisle. The photograph sits behind the whole section and
 * moves slower than the page while it deepens; the six commitments read like a specification — each
 * rule draws across and its words wipe in from behind a mask, one row after another.
 */
export default function Quality({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-bg]"), { yPercent: -12, scale: 1.15 }, { yPercent: 12, scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(root.querySelector("[data-veil]"), { opacity: 0.55 }, { opacity: 0.88, ease: "none", scrollTrigger: { trigger: root, start: "top 60%", end: "center center", scrub: true } });
      gsap.utils.toArray("[data-spec]", root).forEach((row) => {
        gsap.timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
          .from(row.querySelector("[data-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
          .fromTo(row.querySelectorAll("h3, p"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, stagger: 0.12, ease: "expo.out" }, 0.45);
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.quality} aria-labelledby="ecom-quality">
      <div className={styles.bgWrap} aria-hidden="true">
        <div className={styles.bg} data-bg>
          <span className={styles.desk}><Image src={data.img} alt="" fill sizes="100vw" /></span>
          <span className={styles.mob}><Image src={data.imgMobile} alt="" fill sizes="100vw" /></span>
        </div>
        <span className={styles.veil} data-veil />
      </div>
      <div className={styles.inner}>
        <Head kicker={data.kicker} title={data.title} id="ecom-quality" className={styles.head} />
        <ul className={styles.specs}>
          {data.items.map((it) => (
            <li key={it.name} className={styles.spec} data-spec>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <h3>{it.name}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
