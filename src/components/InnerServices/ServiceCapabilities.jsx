"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import ServiceButton from "./ServiceButton";
import SectionHead from "./SectionHead";
import styles from "./ServiceCapabilities.module.css";

const EASE = [0.77, 0, 0.18, 1];

/**
 * What we build: every capability as a large row. Pointing at a row lights it and changes the sticky
 * preview beside the list (its photograph opening through an iris); clicking, tapping or pressing it
 * opens the row — its description and a way into its page unfold and a line tracks across.
 */
export default function ServiceCapabilities({ data }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(0);       // the expanded row (click / tap / keyboard)
  const [peek, setPeek] = useState(0);       // the row the preview shows (follows the pointer)
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-row]", ref.current).forEach((r, i) => {
        gsap.fromTo(r, { xPercent: i % 2 ? 6 : -6, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: r, start: "top 98%", end: "top 70%", scrub: 0.5 } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  // Pointing only changes the preview; opening is a deliberate click, tap or focus — so rows never
  // resize under a moving cursor
  const choose = (i) => { setOpen(i === open ? -1 : i); setPeek(i); sfx("tick"); };
  const point = (i) => { if (i !== peek) { setPeek(i); sfx("tick"); } };
  const cur = data.items[peek];

  return (
    <section ref={ref} id="capabilities" className={styles.cap} aria-labelledby="cap-title">
      <SectionHead kicker={data.kicker} title={data.title} id="cap-title" />

      <div className={styles.layout}>
        <ul className={styles.list}>
          {data.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.name} className={`${styles.row} ${isOpen ? styles.open : ""} ${peek === i ? styles.peek : ""}`} data-row onPointerEnter={(e) => e.pointerType === "mouse" && point(i)}>
                <button type="button" className={styles.head} aria-expanded={isOpen} aria-controls={`cap-${i}`} onClick={() => choose(i)}>
                  <span className={styles.name}>{it.name}</span>
                  <i className={styles.plus} aria-hidden="true" />
                </button>
                <div id={`cap-${i}`} className={styles.body} role="region" aria-label={it.name}>
                  <div className={styles.bodyInner}>
                    <p className={styles.text}>{it.text}</p>
                    {it.href && <ServiceButton href={it.href} variant="text" size="sm" tabIndex={isOpen ? 0 : -1}>View {it.name}</ServiceButton>}
                    <figure className={styles.thumb} aria-hidden="true"><Image src={it.image} alt="" fill sizes="90vw" /></figure>
                  </div>
                </div>
                <span className={styles.track} aria-hidden="true" />
              </li>
            );
          })}
        </ul>

        <div className={styles.previewCol} aria-hidden="true">
          <div className={styles.preview}>
            <AnimatePresence initial={false}>
              <motion.figure key={peek} className={styles.frame} initial={{ clipPath: "circle(0% at 50% 50%)" }} animate={{ clipPath: "circle(75% at 50% 50%)", transition: { duration: 0.9, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.3 } }}>
                <Image src={cur.image} alt="" fill sizes="36vw" />
              </motion.figure>
            </AnimatePresence>
            <p className={styles.previewName} key={`n-${peek}`}>{cur.name}</p>
            <span className={styles.reg} />
          </div>
        </div>
      </div>
    </section>
  );
}
