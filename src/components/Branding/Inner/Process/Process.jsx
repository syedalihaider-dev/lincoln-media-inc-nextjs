"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Process.module.css";

/**
 * The process as a shuffled stack of index cards. While the section holds (desktop) the steps sit in a
 * neat pile; each scroll step lifts the top card up and away to reveal the next, the pile behind
 * rising a little each time, and the step marker beside the stack moves on. Phones list the cards.
 */
export default function Process({ data, service }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const cards = gsap.utils.toArray("[data-card]", root);
    const dots = gsap.utils.toArray("[data-dot]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      cards.forEach((c, i) => gsap.set(c, { y: i * 14, scale: 1 - i * 0.04, zIndex: cards.length - i }));
      const mark = (i) => dots.forEach((d, j) => d.classList.toggle(styles.on, j === i));
      mark(0);
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root, start: "top top", end: `+=${(cards.length - 1) * 60}%`, pin: true, scrub: 0.7, anticipatePin: 1, onUpdate: (s) => mark(Math.min(cards.length - 1, Math.round(s.progress * (cards.length - 1)))) } });
      cards.slice(0, -1).forEach((c, i) => {
        tl.to(c, { yPercent: -130, rotation: i % 2 ? 8 : -8, opacity: 0, duration: 1 }, i);
        cards.slice(i + 1).forEach((n, k) => tl.to(n, { y: k * 14, scale: 1 - k * 0.04, duration: 1 }, i));
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.process} aria-labelledby="bsi-process">
      <div className={styles.side}>
        <Head service={service} kicker={data.kicker} title={data.title} id="bsi-process" tone="ink" />
        <ol className={styles.dots} aria-hidden="true">{data.steps.map((s) => <li key={s.name} data-dot>{s.name}</li>)}</ol>
      </div>
      <ol className={styles.stack}>
        {data.steps.map((s) => (
          <li key={s.name} className={styles.card} data-card>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
