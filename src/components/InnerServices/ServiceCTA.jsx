"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { SITE } from "@/data/site";
import ServiceButton from "./ServiceButton";
import styles from "./ServiceCTA.module.css";

/* The orb: a large round call to action, its words turning around its edge, leaning to the cursor */
function Orb({ href, label }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 15 }), y = useSpring(useMotionValue(0), { stiffness: 180, damping: 15 });
  const move = (e) => { const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.35); y.set((e.clientY - r.top - r.height / 2) * 0.35); };
  const ring = `${label} ✦ ${label} ✦ `;
  return (
    <motion.a ref={ref} href={href} className={styles.orb} style={{ x, y }} onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }} onPointerEnter={() => sfx("tick")} aria-label={label}>
      <svg viewBox="0 0 200 200" className={styles.orbText} aria-hidden="true">
        <defs><path id="lm-orb-path" d="M100 100m-80 0a80 80 0 1 1 160 0a80 80 0 1 1-160 0" /></defs>
        <text><textPath href="#lm-orb-path">{ring}</textPath></text>
      </svg>
      <span className={styles.orbCore} aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M6 18 18 6M9 6h9v9" /></svg>
      </span>
    </motion.a>
  );
}

/**
 * The close: the photograph turned to night with a light that follows the cursor; the invitation in
 * two lines rising one after the other — a question, then the answer as large as the page allows —
 * and the orb beside it. Phone and email for anyone who would rather talk now.
 */
export default function ServiceCTA({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words", mask: "words" });
      gsap.from(split.words, { yPercent: 120, duration: 1.2, ease: "expo.out", stagger: 0.06, onComplete: () => split.revert(), scrollTrigger: { trigger: root, start: "top 60%", once: true } });
      gsap.fromTo(root.querySelector("[data-bg] img"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } });
      gsap.fromTo(root.querySelector("[data-orbwrap]"), { scale: 0.4, rotate: -90, opacity: 0 }, { scale: 1, rotate: 0, opacity: 1, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: root, start: "top 55%", once: true } });
      gsap.fromTo(root.querySelectorAll("[data-rise]"), { clipPath: "inset(0% 0% 100% 0%)", yPercent: 30 }, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: root, start: "top 45%", once: true } });
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      const move = (e) => { const b = root.getBoundingClientRect(); root.style.setProperty("--sx", `${((e.clientX - b.left) / b.width) * 100}%`); root.style.setProperty("--sy", `${((e.clientY - b.top) / b.height) * 100}%`); };
      root.addEventListener("pointermove", move);
      return () => root.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="cta-title">
      <figure className={styles.bg} data-bg aria-hidden="true"><Image src={data.image} alt="" fill sizes="100vw" /></figure>
      <span className={styles.light} aria-hidden="true" />

      <div className={styles.inner}>
        <h2 id="cta-title" className={styles.title}>
          <span className={styles.ask} data-l>{data.title[0]}</span>
          <span className={styles.answer} data-l>{data.title[1]}</span>
        </h2>
        <div className={styles.orbWrap} data-orbwrap><Orb href={data.primary.href} label={data.primary.label} /></div>

        <div className={styles.foot}>
          <div className={styles.say}>
            <p className={styles.text} data-rise>{data.text}</p>
            {data.points && (
              <ul className={styles.points} aria-label="Working with us">
                {data.points.map((t) => <li key={t} data-rise>{t}</li>)}
              </ul>
            )}
          </div>
          <div className={styles.actions} data-rise>
            <ServiceButton href={data.primary.href} size="lg">{data.primary.label}</ServiceButton>
            <ServiceButton href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</ServiceButton>
            <ServiceButton href={`mailto:${SITE.email}`} variant="text" icon="mail">{SITE.email}</ServiceButton>
          </div>
        </div>
      </div>
    </section>
  );
}
