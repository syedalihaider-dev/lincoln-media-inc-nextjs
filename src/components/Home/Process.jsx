"use client";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { PROCESS } from "@/data/home";
import SectionLabel from "@/components/Common/SectionLabel";
import RevealText from "@/components/Common/RevealText";
import styles from "./Process.module.css";

const pad = (n) => String(n).padStart(2, "0");

/**
 * Chapter VIII — How we work. Pinned: a giant numeral rolls from one step to the next, the step
 * swaps in place and the timeline fills. Phones and reduced motion: the five moves in order.
 */
export default function Process() {
  const ref = useRef(null);
  const st = useRef(null);
  const [active, setActive] = useState(0);
  const { ready, scrollTo } = useSiteMotion();
  const n = PROCESS.length;

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      let cur = 0;
      st.current = ScrollTrigger.create({
        trigger: ref.current.querySelector("[data-pin]"),
        start: "top top",
        end: `+=${n * 70}%`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          ref.current.style.setProperty("--pp", self.progress.toFixed(4));
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          if (i !== cur) { cur = i; setActive(i); sfx("tick"); }
        },
      });
      return () => { st.current = null; };
    });
    return () => mm.revert();
  }, { dependencies: [ready, n], scope: ref });

  const go = (i) => {
    const s = st.current;
    if (s) scrollTo(s.start + ((i + 0.5) / n) * (s.end - s.start));
    else setActive(i);
  };

  return (
    <section ref={ref} id="process" className={styles.section} data-chapter="Process" data-nav="home" aria-labelledby="process-title">
      <div className={styles.pin} data-pin>
        <header className={styles.head}>
          <SectionLabel index="08" tone="light">How we work</SectionLabel>
          <RevealText id="process-title" className={styles.title}>
            Five moves. <em>No wasted ones.</em>
          </RevealText>
        </header>

        <div className={styles.stage}>
          <div className={styles.numeral} aria-hidden="true">
            <span className={styles.strip} style={{ transform: `translateY(${-active * 20}%)` }}>
              {PROCESS.map((_, i) => <span key={i}>{pad(i + 1)}</span>)}
            </span>
          </div>

          <ol className={styles.steps}>
            {PROCESS.map((p, i) => (
              <li key={p.title} className={`${styles.step} ${i === active ? styles.on : ""}`}>
                <p className={styles.stepNo}>Step {i + 1} of {n}</p>
                <h3 className={styles.stepTitle}>{p.title}</h3>
                <p className={styles.stepText}>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.timeline} aria-hidden="true">
          <span className={styles.track}><i /></span>
          {PROCESS.map((p, i) => (
            <button key={p.title} type="button" tabIndex={-1} className={`${styles.node} ${i <= active ? styles.passed : ""}`} style={{ left: `${(i / (n - 1)) * 100}%` }} onClick={() => go(i)}>
              <i />
              <span>{p.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
