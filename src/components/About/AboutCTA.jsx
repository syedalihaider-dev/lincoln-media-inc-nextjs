"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { ABOUT_CTA } from "@/data/about";
import { SITE } from "@/data/site";
import MagneticButton from "@/components/Common/MagneticButton";
import Label from "./Label";
import styles from "./AboutCTA.module.css";

/**
 * 07 — The close. The studio's invitation set across the screen in the dark; the cursor carries a
 * beam that lights the words in paper and cyan wherever it passes. The lines slide in from
 * alternating sides; a horizon glow at the foot hands over to the footer.
 */
export default function AboutCTA() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      // Both copies (dim and lit) of each line move together, alternating sides
      gsap.utils.toArray("[data-row]", root).forEach((row) => {
        const i = Number(row.dataset.row);
        gsap.fromTo(row, { xPercent: i % 2 ? 22 : -22 }, { xPercent: 0, ease: "none", scrollTrigger: { trigger: root, start: "top 90%", end: "top 15%", scrub: 0.6 } });
      });
      gsap.fromTo(root.querySelectorAll("[data-rise]"), { clipPath: "inset(0% 0% 100% 0%)", yPercent: 30 }, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: root.querySelector("[data-actions]"), start: "top 92%", once: true } });

      // The beam follows the cursor (eased), so the light trails a little behind the hand
      const beam = root.querySelector("[data-beam]");
      const pos = { x: 50, y: 40 };
      const qx = gsap.quickTo(pos, "x", { duration: 0.6, ease: "power3.out", onUpdate: () => beam.style.setProperty("--x", `${pos.x}%`) });
      const qy = gsap.quickTo(pos, "y", { duration: 0.6, ease: "power3.out", onUpdate: () => beam.style.setProperty("--y", `${pos.y}%`) });
      const move = (e) => {
        const r = beam.getBoundingClientRect();
        qx(((e.clientX - r.left) / r.width) * 100);
        qy(((e.clientY - r.top) / r.height) * 100);
      };
      root.addEventListener("pointermove", move);
      return () => root.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const rows = (lit) => ABOUT_CTA.title.map((t, i) => (
    <span key={t} className={`${styles.row} ${i === ABOUT_CTA.title.length - 1 && lit ? styles.accent : ""}`} data-row={i}>{t}{i < ABOUT_CTA.title.length - 1 && " "}</span>
  ));

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="cta-title">
      <div className={styles.top}>
        <Label>Start a project</Label>
        <p className={styles.promise} data-rise>{ABOUT_CTA.promise}</p>
      </div>

      <div className={styles.beamWrap} data-beam>
        <h2 id="cta-title" className={styles.title}>{rows(false)}</h2>
        {/* The lit copy, revealed only inside the beam */}
        <p className={`${styles.title} ${styles.lit}`} aria-hidden="true">{rows(true)}</p>
      </div>

      <div className={styles.actions} data-actions>
        <p className={styles.text} data-rise>{ABOUT_CTA.text}</p>
        <div className={styles.buttons} data-rise>
          <MagneticButton href="/#contact" size="lg" className={styles.btn}>Start a project</MagneticButton>
          <MagneticButton href="/" variant="ghost" size="lg" className={styles.btn}>Get your AI build plan</MagneticButton>
        </div>
        <ul className={styles.direct} data-rise>
          <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          <li><a href={SITE.phoneHref}>{SITE.phone}</a></li>
        </ul>
      </div>
      <span className={styles.horizon} aria-hidden="true" />
    </section>
  );
}
