"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Method.module.css";

const COLOURS = ["y", "p", "b", "g", "y", "p"];
// a repeatable scatter: where each note starts, as a fraction of the board
const spot = (i) => [((i * 37) % 80) - 40, ((i * 53) % 70) - 35, ((i * 29) % 30) - 15];

/**
 * The method, the way a workshop actually does it — affinity mapping. Held on desktop: the notes
 * start scattered across the board at odd angles; scrolling sorts them, step by step, into labelled
 * columns — each column's heading and explanation appearing as its notes land and straighten.
 * Phones: the columns in order, notes settling as they arrive.
 */
export default function Method({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const cols = () => gsap.utils.toArray("[data-col]", root);
    mm.add(PIN, () => {
      const notes = gsap.utils.toArray("[data-note]", root);
      notes.forEach((n, i) => { const [x, y, r] = spot(i); gsap.set(n, { x: `${x}vw`, y: `${y}vh`, rotation: r, scale: 0.9 }); });
      gsap.set(root.querySelectorAll("[data-colhead]"), { opacity: 0, y: 20 });
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, scrollTrigger: { trigger: root, start: "top top", end: `+=${data.steps.length * 55}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      cols().forEach((c, i) => {
        tl.to(c.querySelector("[data-colhead]"), { opacity: 1, y: 0, duration: 0.3 }, i)
          .to(c.querySelectorAll("[data-note]"), { x: 0, y: 0, rotation: (k) => (k % 2 ? 1.5 : -1.5), scale: 1, duration: 0.7, stagger: 0.08 }, i + 0.1);
      });
      tl.to({}, { duration: 0.4 });
      return () => gsap.set(notes, { clearProps: "all" });
    });
    mm.add(SMALL, () => {
      cols().forEach((c) => gsap.from(c.querySelectorAll("[data-note]"), { y: 40, rotation: (i) => (i % 2 ? 8 : -8), opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: c, start: "top 80%", once: true } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="uxi-method">
      <Head kicker={data.kicker} title={data.title} id="uxi-method" tone="light" className={styles.head} />
      <ol className={styles.board} style={{ "--n": data.steps.length }}>
        {data.steps.map((s, i) => (
          <li key={s.name} className={styles.col} data-col>
            <div className={styles.colHead} data-colhead><b>{s.name}</b><p>{s.text}</p></div>
            {s.notes.map((n, k) => <p key={n} className={`${styles.note} ${styles[COLOURS[(i + k) % COLOURS.length]]}`} data-note>{n}</p>)}
          </li>
        ))}
      </ol>
    </section>
  );
}
