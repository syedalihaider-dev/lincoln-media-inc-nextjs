"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Head from "../../kit/Head";
import styles from "./Does.module.css";

/**
 * What the service does — the jobs a film is hired for. Pick a job on the left; the card on the right
 * plays it as a two-shot sequence: the problem (a dim frame), a cut, then how the film answers it,
 * with where it runs. The card changes with a vertical wipe.
 */
export default function Does({ data, tone }) {
  const ref = useRef(null);
  const [on, setOn] = useState(0);
  const { ready } = useSiteMotion();
  const it = data.items[on];

  const pick = (i) => {
    if (i === on) return;
    setOn(i); sfx("tick");
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.timeline({ overwrite: true })
        .fromTo(ref.current.querySelector("[data-card]"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" })
        .from(ref.current.querySelectorAll("[data-shot]"), { y: 20, opacity: 0, duration: 0.7, stagger: 0.12, ease: "expo.out" }, 0.3);
    }
  };

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-desk]"), start: "top 78%", once: true } })
        .from(root.querySelectorAll("[data-tab]"), { x: -30, opacity: 0, stagger: 0.08, duration: 0.9 })
        .fromTo(root.querySelector("[data-card]"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }, 0.1);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.does} aria-labelledby="vs-does">
      <Head kicker={data.kicker} title={data.title} id="vs-does" tone={tone} />
      <div className={styles.desk} data-desk>
        <div className={styles.tabs} role="tablist" aria-label={data.title}>
          {data.items.map((d, i) => (
            <button key={d.name} type="button" role="tab" id={`vs-job-${i}`} aria-selected={i === on} aria-controls="vs-job-panel" className={`${styles.tab} ${i === on ? styles.on : ""}`} onClick={() => pick(i)} data-tab>
              <span>{d.name}</span><i aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className={styles.card} id="vs-job-panel" role="tabpanel" aria-labelledby={`vs-job-${on}`} data-card>
          <div className={`${styles.shot} ${styles.before}`} data-shot>
            <p className={styles.slate}>The problem</p>
            <p className={styles.problem}>{it.problem}</p>
          </div>
          <div className={`${styles.shot} ${styles.after}`} data-shot>
            <p className={styles.slate}>The film</p>
            <p className={styles.answer}>{it.answer}</p>
            <ul className={styles.where} aria-label="Where it runs">{it.where.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
