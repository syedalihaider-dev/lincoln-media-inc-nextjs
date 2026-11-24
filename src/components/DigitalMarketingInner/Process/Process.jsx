"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import Visual from "../Visual";
import styles from "./Process.module.css";

/**
 * How the work runs, held while you scroll. The stage name sits in a slot and rolls up to the next
 * one like a counter; its description is replaced beneath it; the progress line along the top
 * runs from stage to stage; and the screen on the right flips over, top edge first, to the next
 * stage's interface. Phones: a vertical timeline whose line draws as you pass.
 */
export default function Process({ data }) {
  const ref = useRef(null);
  const stages = data.stages;

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    mm.add(PIN, () => {
      const cards = gsap.utils.toArray("[data-card]", root);
      const texts = gsap.utils.toArray("[data-copy]", root);
      const marks = gsap.utils.toArray("[data-mark]", root);
      gsap.set(cards.slice(1), { rotationX: -100, opacity: 0, transformOrigin: "50% 0%", transformPerspective: 1600 });
      gsap.set(texts.slice(1), { yPercent: 40, opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.5 }, scrollTrigger: { trigger: root, start: "top top", end: `+=${stages.length * 65}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.fromTo(q("[data-fill]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: stages.length - 1 }, 0);
      stages.forEach((_, i) => {
        if (!i) return;
        tl.to(q("[data-reel]"), { yPercent: (-100 * i) / stages.length }, i - 0.5)
          .to(texts[i - 1], { yPercent: -40, opacity: 0, duration: 0.3 }, i - 0.5)
          .to(texts[i], { yPercent: 0, opacity: 1, duration: 0.35 }, i - 0.3)
          .to(cards[i - 1], { rotationX: 70, opacity: 0, y: 40, transformOrigin: "50% 100%" }, i - 0.5)
          .to(cards[i], { rotationX: 0, opacity: 1 }, i - 0.45)
          .to(marks[i], { "--on": 1, duration: 0.2 }, i - 0.2);
      });
      tl.to({}, { duration: 0.4 });
    });
    mm.add(SMALL, () => {
      gsap.fromTo(q("[data-spine]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: q("[data-list]"), start: "top 70%", end: "bottom 60%", scrub: 0.5 } });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ms-process">
      <div className={styles.top}>
        <Head kicker={data.kicker} title={data.title} id="ms-process" />
        <ol className={styles.bar} aria-hidden="true">
          {stages.map((s, i) => <li key={s.name} data-mark style={{ "--on": i ? 0 : 1 }}>{s.name}</li>)}
          <span className={styles.rail}><i data-fill /></span>
        </ol>
      </div>

      {/* desktop: the held stage */}
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.left}>
          <div className={styles.slot}><div className={styles.reel} data-reel>{stages.map((s) => <p key={s.name}>{s.name}</p>)}</div></div>
          <div className={styles.copies}>{stages.map((s) => <p key={s.name} className={styles.copy} data-copy>{s.text}</p>)}</div>
        </div>
        <div className={styles.deck}>
          {stages.map((s) => <div key={s.name} className={styles.card} data-card><Visual item={s} sizes="(max-width: 900px) 90vw, 46vw" /></div>)}
        </div>
      </div>

      {/* phones and reduced motion: a timeline (also the readable version for assistive tech) */}
      <ol className={styles.list} data-list>
        <span className={styles.spine} data-spine aria-hidden="true" />
        {stages.map((s) => (
          <li key={s.name}><h3>{s.name}</h3><p>{s.text}</p></li>
        ))}
      </ol>
    </section>
  );
}
