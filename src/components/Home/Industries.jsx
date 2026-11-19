"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { INDUSTRIES } from "@/data/home";
import SectionLabel from "@/components/Common/SectionLabel";
import RevealText from "@/components/Common/RevealText";
import styles from "./Industries.module.css";

/**
 * Chapter VI — Industries. Paper again: six sheets stack on top of each other as you scroll,
 * each one pushing the last back into the pile.
 */
export default function Industries() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const cards = gsap.utils.toArray("[data-card]", ref.current);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const st = { trigger: next, start: "top bottom", end: "top 20%", scrub: true };
        gsap.to(card.querySelector("[data-sheet]"), { scale: 0.9, yPercent: -4, ease: "none", scrollTrigger: st });
        gsap.to(card.querySelector("[data-shade]"), { opacity: 0.55, ease: "none", scrollTrigger: { ...st } });
      });
      // Each sheet's line drawing inks itself in as the sheet arrives
      cards.forEach((card) => {
        gsap.fromTo(card.querySelectorAll("[data-icon] path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: 0.15, ease: "none", scrollTrigger: { trigger: card, start: "top 85%", end: "top 25%", scrub: 0.6 } });
      });
      gsap.from(gsap.utils.toArray("[data-num]", ref.current), {
        yPercent: 40, opacity: 0, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: cards[0], start: "top bottom", end: "top 40%", scrub: true },
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="industries" className={styles.section} data-chapter="Industries" data-nav="work" aria-labelledby="industries-title">
      <header className={styles.head}>
        <SectionLabel index="06" tone="light">Industries we serve</SectionLabel>
        <RevealText id="industries-title" className={styles.title}>
          Built for <em>your world.</em>
        </RevealText>
        <p className={styles.count}>(0{INDUSTRIES.length})</p>
      </header>

      <div className={styles.stack}>
        {INDUSTRIES.map((ind, i) => (
          <article key={ind.name} className={styles.card} data-card style={{ "--i": i }}>
            <div className={`${styles.sheet} ${[styles.light, styles.dark, styles.violet][i % 3]}`} data-sheet>
              <span className={styles.num} data-num aria-hidden="true">0{i + 1}</span>
              <div className={styles.copy}>
                <h3 className={styles.name}>{ind.name}</h3>
                <p className={styles.text}>{ind.text}</p>
                <ul className={styles.chips}>
                  {ind.chips.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </div>
              <span className={styles.shade} data-shade aria-hidden="true" />
              <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true" data-icon>
                {ind.icon.map((d) => <path key={d} d={d} pathLength="1" />)}
              </svg>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
