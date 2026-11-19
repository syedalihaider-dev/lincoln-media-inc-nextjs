"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./ServiceDetails.module.css";

const EASE = [0.77, 0, 0.18, 1];

/**
 * The offering in detail, as a reader: on desktop a sticky visual holds still on one side — the
 * current area's name over its photograph, changing through a sliding mask — while the areas follow
 * one another on the other side as long-form text with their technologies. A slim index of the area
 * names marks where you are. Phones: each area with its own photograph.
 */
export default function ServiceDetails({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const arts = gsap.utils.toArray("[data-area]", root);
    const sts = arts.map((a, i) => ScrollTrigger.create({ trigger: a, start: "top 55%", end: "bottom 55%", onToggle: (s) => { if (s.isActive) { setActive(i); sfx("tick"); } } }));
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      arts.forEach((a) => {
        gsap.fromTo(a.querySelectorAll("[data-t]"), { clipPath: "inset(0% 100% 0% 0%)", x: -16 }, { clipPath: "inset(0% 0% 0% 0%)", x: 0, duration: 1, ease: "expo.inOut", stagger: 0.07, scrollTrigger: { trigger: a, start: "top 75%", once: true } });
        gsap.fromTo(a.querySelectorAll("[data-tag]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "expo.out", scrollTrigger: { trigger: a, start: "top 65%", once: true } });
      });
    });
    return () => { mm.revert(); sts.forEach((s) => s.kill()); };
  }, { dependencies: [ready], scope: ref });

  const cur = data.areas[active];

  return (
    <section ref={ref} id="details" className={styles.details} aria-labelledby="details-title">
      <SectionHead kicker={data.kicker} title={data.title} id="details-title" />

      <div className={styles.reader}>
        <div className={styles.visualCol} aria-hidden="true">
          <div className={styles.visual}>
            <AnimatePresence initial={false}>
              <motion.figure key={active} className={styles.frame} initial={{ clipPath: "inset(0% 0% 100% 0%)" }} animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.9, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.35 } }}>
                <Image src={cur.image} alt="" fill sizes="40vw" />
              </motion.figure>
            </AnimatePresence>
            <p className={styles.vName} key={`v-${active}`}>{cur.name}</p>
            <ul className={styles.index}>
              {data.areas.map((a, i) => <li key={a.name} className={i === active ? styles.on : undefined}>{a.name}</li>)}
            </ul>
          </div>
        </div>

        <div className={styles.articles}>
          {data.areas.map((a) => (
            <article key={a.name} className={styles.area} data-area>
              <figure className={styles.mImg} aria-hidden="true"><Image src={a.image} alt="" fill sizes="90vw" /></figure>
              <h3 className={styles.name} data-t>{a.name}</h3>
              <p className={styles.lead} data-t>{a.lead}</p>
              {a.body.map((b) => <p key={b} className={styles.body} data-t>{b}</p>)}
              <ul className={styles.tags}>{a.tags.map((t) => <li key={t} data-tag>{t}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
