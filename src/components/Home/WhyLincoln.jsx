"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { STATS } from "@/data/home";
import { SITE } from "@/data/site";
import SectionLabel from "@/components/Common/SectionLabel";
import RevealText from "@/components/Common/RevealText";
import ParallaxImage from "@/components/Common/ParallaxImage";
import Clock from "@/components/Common/Clock";
import dusk from "@public/images/home/nyc-dusk.jpg";
import styles from "./WhyLincoln.module.css";

// One rolling column per digit; the server renders the final value, the animation rolls up to it
function Odometer({ value, suffix }) {
  const text = value.toLocaleString("en-US");
  return (
    <span className={styles.odo} aria-label={`${text}${suffix}`} role="img" data-odo>
      {[...text].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className={styles.col} aria-hidden="true">
            <span className={styles.strip} data-digit={ch} style={{ transform: `translateY(${-ch * 10}%)` }}>
              {"0123456789".split("").map((d) => <span key={d}>{d}</span>)}
            </span>
          </span>
        ) : (
          <span key={i} className={styles.sep} aria-hidden="true">{ch}</span>
        )
      )}
      {suffix && <em aria-hidden="true">{suffix}</em>}
    </span>
  );
}

/**
 * Chapter 09 — Why The Lincoln Media, in electric violet. Typography is the design: each figure is a
 * full-width line that stretches up from the baseline as it enters while its digits roll into place,
 * then New York is layered underneath with the studio's address and live clock.
 */
export default function WhyLincoln() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const q = gsap.utils.selector(ref);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      q("[data-stat]").forEach((stat, s) => {
        const strips = stat.querySelectorAll("[data-digit]");
        // The server renders each strip at its final digit (inline transform); clear that and roll from 0
        gsap.fromTo(strips, { y: 0, yPercent: 0 }, {
          y: 0, yPercent: (i, el) => -Number(el.dataset.digit) * 10,
          duration: 2.4, ease: "expo.out", stagger: 0.09, delay: s * 0.12,
          scrollTrigger: { trigger: stat, start: "top 88%", once: true },
        });
      });
      q("[data-stat]").forEach((stat, s) => {
        // Kinetic type: the figure rises from a flattened sliver to full height, the label slides along the rule
        gsap.fromTo(stat.querySelector("[data-odo]"), { scaleY: 0.12, xPercent: s % 2 ? 6 : -6 }, { scaleY: 1, xPercent: 0, ease: "none", scrollTrigger: { trigger: stat, start: "top bottom", end: "top 50%", scrub: 0.5 } });
        gsap.fromTo(stat.querySelector("dt"), { xPercent: -30, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: stat, start: "top 95%", end: "top 60%", scrub: 0.5 } });
        gsap.fromTo(stat, { "--rule": 0 }, { "--rule": 1, ease: "none", scrollTrigger: { trigger: stat, start: "top 95%", end: "top 55%", scrub: 0.5 } });
      });
      gsap.fromTo(q("[data-card]"), { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="numbers" className={styles.section} data-chapter="Why us" data-nav="home" aria-labelledby="why-title">
      <div className={styles.top}>
        <SectionLabel index="09" tone="dark">Why The Lincoln Media</SectionLabel>
        <RevealText id="why-title" className={styles.statement} stagger={0.12}>
          Twelve years. Twelve hundred projects. <em>One standard.</em>
        </RevealText>
      </div>

      <div className={styles.grid}>
        <dl className={styles.stats} data-stats>
          {STATS.map((s, i) => (
            <div key={s.label} className={`${styles.stat} ${styles["s" + i]}`} data-stat>
              <dt>{s.label}</dt>
              <dd><Odometer value={s.value} suffix={s.suffix} /></dd>
            </div>
          ))}
        </dl>

        <div className={styles.visual}>
          <ParallaxImage src={dusk} alt="Lower Manhattan's skyline at dusk across the Hudson" sizes="(max-width: 900px) 100vw, 76vw" className={styles.photo} amount={12} />
          <div className={styles.card} data-card>
            <p className={styles.cardK}>Studio</p>
            <p className={styles.cardT}>{SITE.street}<br />{SITE.locality}</p>
            <p className={styles.cardClock}><Clock /></p>
          </div>
        </div>
      </div>
    </section>
  );
}
