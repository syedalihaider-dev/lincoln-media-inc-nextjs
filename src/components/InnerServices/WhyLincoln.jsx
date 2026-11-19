"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from "framer-motion";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./WhyLincoln.module.css";

const EASE = [0.77, 0, 0.18, 1];

/**
 * Why The Lincoln Media: a manifesto on deep teal. Each reason is a large statement that rises out of
 * its own mask as you scroll; pointing at one lights it and brings up its explanation, while a
 * photograph follows the cursor, leaning with its speed. Phones: each reason with its photograph.
 */
export default function WhyLincoln({ data }) {
  const ref = useRef(null);
  const list = useRef(null);
  const [hover, setHover] = useState(-1);
  const { ready } = useSiteMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 20 }), sy = useSpring(y, { stiffness: 160, damping: 20 });
  const rotate = useTransform(useVelocity(sx), [-1400, 0, 1400], [-12, 0, 12], { clamp: true });

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-reason]", ref.current).forEach((r) => {
        gsap.fromTo(r.querySelector("[data-title]"), { yPercent: 100, clipPath: "inset(0% 0% 100% 0%)" }, { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: r, start: "top 95%", end: "top 62%", scrub: 0.6 } });
        gsap.fromTo(r.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: r, start: "top 92%", end: "top 55%", scrub: 0.6 } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const move = (e) => { const b = list.current.getBoundingClientRect(); x.set(e.clientX - b.left); y.set(e.clientY - b.top); };

  return (
    <section ref={ref} id="why" className={styles.why} aria-labelledby="why-title">
      <SectionHead kicker={data.kicker} title={data.title} id="why-title" />

      <div ref={list} className={styles.listWrap} onPointerMove={move} onPointerLeave={() => setHover(-1)}>
        <ul className={styles.list}>
          {data.reasons.map((r, i) => (
            <li key={r.title} className={`${styles.reason} ${hover === i ? styles.on : ""} ${hover > -1 && hover !== i ? styles.off : ""}`} data-reason onPointerEnter={(e) => { if (e.pointerType === "mouse") { setHover(i); sfx("tick"); } }}>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <div className={styles.titleMask}><h3 className={styles.title} data-title>{r.title}</h3></div>
              <p className={styles.text}>{r.text}</p>
              <figure className={styles.mImg} aria-hidden="true"><Image src={r.image} alt="" fill sizes="90vw" /></figure>
            </li>
          ))}
        </ul>
        <motion.div className={styles.follow} style={{ x: sx, y: sy, rotate }} aria-hidden="true">
          <AnimatePresence>
            {hover > -1 && (
              <motion.figure key={hover} className={styles.frame} initial={{ clipPath: "inset(50% 50% 50% 50%)", scale: 1.2 }} animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1, transition: { duration: 0.7, ease: EASE } }} exit={{ clipPath: "inset(50% 50% 50% 50%)", transition: { duration: 0.4, ease: EASE } }}>
                <Image src={data.reasons[hover].image} alt="" fill sizes="320px" />
              </motion.figure>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
