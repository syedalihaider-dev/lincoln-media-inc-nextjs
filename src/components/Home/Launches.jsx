"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { m, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { LAUNCHES } from "@/data/work";
import SectionLabel from "@/components/Common/SectionLabel";
import RevealText from "@/components/Common/RevealText";
import { sfx, useSiteMotion } from "@/lib/motion";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import styles from "./Launches.module.css";

/**
 * Chapter 05 — Recent launches, in the guide's own cyan. The chapter opens as a widening circle of
 * signal rising from the bottom edge; rows slide in from the right. A typographic index; on desktop the product's frame follows the
 * pointer on a spring and swaps as you move between rows. Touch devices see the frames inline.
 */
export default function Launches() {
  const section = useRef(null);
  const [hover, setHover] = useState(-1);
  const x = useSpring(useMotionValue(0), { stiffness: 160, damping: 22, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 160, damping: 22, mass: 0.6 });
  const rot = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const lastX = useRef(0);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const q = gsap.utils.selector(section);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(section.current, { clipPath: "circle(8% at 50% 100%)" }, { clipPath: "circle(142% at 50% 100%)", ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "top 15%", scrub: 0.4 } });
      gsap.from(q("[data-row]"), { xPercent: 12, opacity: 0, duration: 1.3, stagger: 0.09, ease: "expo.out", scrollTrigger: { trigger: q("[data-list]")[0], start: "top 80%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: section });

  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = section.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
    rot.set(Math.max(-8, Math.min(8, (e.clientX - lastX.current) * 0.6)));
    lastX.current = e.clientX;
  };

  return (
    <section ref={section} id="launches" className={styles.section} data-chapter="Launches" data-nav="work" aria-labelledby="launches-title">
      <header className={styles.head}>
        <SectionLabel index="05" tone="onAccent">Recent launches</SectionLabel>
        <RevealText id="launches-title" className={styles.title}>
          Five products. <em>Five different problems solved.</em>
        </RevealText>
      </header>

      <ul className={styles.list} data-list onPointerMove={move} onPointerLeave={() => setHover(-1)}>
        {LAUNCHES.map((l, i) => (
          <li key={l.name} data-row>
            <a
              href={l.href}
              target="_blank"
              rel="noopener"
              className={`${styles.row} ${hover > -1 && hover !== i ? styles.dim : ""}`}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") { setHover(i); sfx("tick"); } }}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(-1)}
            >
              <span className={styles.no}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.name}>{l.name}</span>
              <span className={styles.kind}>{l.kind}</span>
              <span className={styles.tags}>{l.tags}</span>
              <span className={styles.go} aria-hidden="true">↗</span>
              <span className={styles.thumb}>
                <Image src={l.image} alt={`${l.name} by Sybrid`} fill sizes="(max-width: 900px) 90vw, 50vw" />
              </span>
              <span className="lm-sr-only">(opens sybrid.com in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Pointer-following preview (decorative; the rows above carry the content) */}
      <m.div className={styles.preview} style={{ x, y, rotate: rot }} aria-hidden="true">
        <AnimatePresence>
          {hover > -1 && (
            <m.figure
              key={hover}
              className={styles.frame}
              initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
              exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.45, ease: [0.77, 0, 0.18, 1] } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image src={LAUNCHES[hover].image} alt="" fill sizes="440px" />
            </m.figure>
          )}
        </AnimatePresence>
      </m.div>
      <p className={styles.foot}>Launched with our partner Sybrid · <a href="https://sybrid.com/" target="_blank" rel="noopener">sybrid.com ↗</a></p>
    </section>
  );
}
