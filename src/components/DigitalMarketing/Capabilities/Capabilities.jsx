"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "../Head";
import { Ui } from "../ui/Frames";
import { useScene, MOTION } from "../shared";
import styles from "./Capabilities.module.css";

// Each capability's visual arrives its own way: [from, to]
const REVEALS = [
  [{ clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }],
  [{ rotationX: 60, yPercent: 30, transformPerspective: 900, transformOrigin: "50% 100%" }, { rotationX: 0, yPercent: 0 }],
  [{ clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)" }],
  [{ clipPath: "inset(0% 0% 100% 0%)", yPercent: -12 }, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0 }],
  [{ clipPath: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)" }, { clipPath: "polygon(0% 100%, 0% -100%, 200% -100%, 0% 100%)" }],
  [{ rotationY: -70, xPercent: 30, transformPerspective: 900, transformOrigin: "100% 50%" }, { rotationY: 0, xPercent: 0 }],
  [{ clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }],
  [{ scale: 1.5, clipPath: "inset(12% 12% 12% 12% round 30px)" }, { scale: 1, clipPath: "inset(0% 0% 0% 0% round 14px)" }],
];

/**
 * The capabilities as an editorial index, one large row each — no cards, no icons. As each row
 * arrives its rule draws across, its word slides in from the side it was written toward, and its
 * real interface arrives in its own way: a wipe, a hinge, an iris, a drop, a diagonal, a swing, a
 * split, a pull-back. On desktop the interface leans gently toward the pointer.
 */
export default function Capabilities({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      gsap.utils.toArray("[data-cap]", root).forEach((row, i) => {
        const [from, to] = REVEALS[i % REVEALS.length];
        gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: row, start: "top 88%", end: "top 38%", scrub: 0.7 } })
          .fromTo(row.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0)
          .fromTo(row.querySelector("[data-word]"), { xPercent: i % 2 ? 24 : -24, opacity: 0.15 }, { xPercent: 0, opacity: 1 }, 0)
          .fromTo(row.querySelector("[data-vis]"), from, to, 0.1)
          .fromTo(row.querySelector("[data-info]"), { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, 0.2);
      });
    });
  });

  // pointer lean (mouse only; touch never gets a hover-only effect)
  const lean = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget.querySelector("[data-tilt]");
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotationY: x * 10, rotationX: -y * 8, transformPerspective: 900, duration: 0.8, ease: "power3.out", overwrite: "auto" });
  };
  const rest = (e) => gsap.to(e.currentTarget.querySelector("[data-tilt]"), { rotationY: 0, rotationX: 0, duration: 1, ease: "power3.out", overwrite: "auto" });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="cap-title" data-phase="Conversion">
      <Head kicker={data.kicker} title={data.title} id="cap-title" className={styles.head} />
      <ul className={styles.list}>
        {data.items.map((c, i) => (
          <li key={c.word} className={`${styles.row} ${i % 2 ? styles.alt : ""}`} data-cap onPointerMove={lean} onPointerLeave={rest}>
            <span className={styles.rule} data-rule aria-hidden="true" />
            <p className={styles.word} data-word aria-hidden="true">{c.word}</p>
            <div className={styles.info} data-info>
              <h3>{c.href ? <a href={c.href}>{c.name}<i aria-hidden="true">→</i></a> : c.name}</h3>
              <p>{c.text}</p>
            </div>
            <div className={`${styles.vis} ${c.visual === "post" ? styles.phone : ""}`} aria-hidden="true">
              <div data-vis><div data-tilt><Ui kind={c.visual} /></div></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
