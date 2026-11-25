"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../../kit/Head";
import styles from "./Quality.module.css";

/**
 * Quality / production approach — the QC sheet a film has to clear before delivery. Each check's box
 * is ticked (the stroke drawn) in turn as the sheet scrolls in, and the sheet is signed off at the end.
 * Beside it a still from the studio, opening from a narrow slot with a slow parallax.
 */
export default function Quality({ data, page, tone }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const rows = gsap.utils.toArray("[data-check]", root);
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-sheet]"), start: "top 70%", once: true } });
      rows.forEach((r, i) => {
        tl.from(r, { x: 24, opacity: 0, duration: 0.6, ease: "expo.out" }, i * 0.14)
          .fromTo(r.querySelector("path"), { strokeDashoffset: 24 }, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, i * 0.14 + 0.35);
      });
      tl.from(root.querySelector("[data-sign]"), { scale: 1.6, rotate: -14, opacity: 0, duration: 0.7, ease: "back.out(2)" }, "+=0.1");
      gsap.fromTo(root.querySelector("[data-pic]"), { clipPath: "inset(0% 38% 0% 38%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root.querySelector("[data-pic]"), start: "top 90%", end: "center 50%", scrub: 0.6 } });
    });
    mm.add(DESKTOP_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-pic] img"), { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.quality} aria-labelledby="vs-quality">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="vs-quality" tone={tone} />
        <figure className={styles.pic} data-pic><Image src={data.img} alt={data.alt} fill sizes="(min-width: 901px) 40vw, 92vw" /></figure>
      </div>
      <div className={styles.sheet} data-sheet>
        <p className={styles.sheetHead}><span>Quality check</span><span>{page.short}</span></p>
        <ul className={styles.checks}>
          {data.checks.map((c) => (
            <li key={c} className={styles.check} data-check>
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M7 12.5l3.2 3.2L17 8.6" /></svg>
              <span>{c}</span>
            </li>
          ))}
        </ul>
        <p className={styles.sign} data-sign>Cleared for delivery</p>
      </div>
    </section>
  );
}
