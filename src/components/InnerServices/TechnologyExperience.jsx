"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./TechnologyExperience.module.css";

const PIN = "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";

// Types a line out character by character whenever it changes
function useTyped(text, speed = 16) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setOut(text); return; }
    let i = 0;
    setOut("");
    const t = setInterval(() => { i += 2; setOut(text.slice(0, i)); if (i >= text.length) clearInterval(t); }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return out;
}

/**
 * Technology, as a pipeline. On desktop the chapter holds while you scroll: five stations —
 * strategy to performance — light along a line that fills, and the current station's command and
 * line type themselves into a terminal. Under it, the service's stack runs in four bands that move in
 * alternate directions and speed up with your scroll, over a slowly travelling grid.
 */
export default function TechnologyExperience({ data }) {
  const ref = useRef(null);
  const [stage, setStage] = useState(0);
  const { ready } = useSiteMotion();
  const n = data.flow.length;
  const cur = data.flow[stage];
  const typed = useTyped(cur.text);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(PIN, () => {
      let last = 0;
      ScrollTrigger.create({
        trigger: root.querySelector("[data-pin]"), start: "top top", end: "+=180%", pin: true, scrub: true, anticipatePin: 1,
        onUpdate: (s) => {
          root.style.setProperty("--tp", s.progress.toFixed(4));
          const i = Math.min(n - 1, Math.floor(s.progress * n));
          if (i !== last) { last = i; setStage(i); sfx("tick"); }
        },
      });
    });
    mm.add(ANY_MOTION, () => {
      // The stack bands drift on their own and surge with scroll speed
      const bands = gsap.utils.toArray("[data-band]", root);
      const tweens = bands.map((b, i) => gsap.fromTo(b, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 40 + i * 6, ease: "none", repeat: -1 }));
      const st = ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onUpdate: (s) => { const v = Math.min(6, 1 + Math.abs(s.getVelocity()) / 400); tweens.forEach((t) => gsap.to(t, { timeScale: v, duration: 0.3, overwrite: true })); } });
      const settle = setInterval(() => tweens.forEach((t) => gsap.to(t, { timeScale: 1, duration: 1.2, overwrite: true })), 900);
      return () => { clearInterval(settle); st.kill(); tweens.forEach((t) => t.kill()); };
    });
    return () => mm.revert();
  }, { dependencies: [ready, n], scope: ref });

  return (
    <section ref={ref} id="technology" className={styles.tech} aria-labelledby="tech-title">
      <div className={styles.pin} data-pin>
        <span className={styles.grid} aria-hidden="true" />
        <SectionHead kicker={data.kicker} title={data.title} id="tech-title" />

        <div className={styles.pipe}>
          <ol className={styles.stations}>
            {data.flow.map((f, i) => (
              <li key={f.name} className={`${styles.station} ${i <= stage ? styles.lit : ""} ${i === stage ? styles.now : ""}`}>
                <i aria-hidden="true" />
                <span>{f.name}</span>
              </li>
            ))}
          </ol>
          <span className={styles.line} aria-hidden="true"><i /></span>

          <div className={styles.terminal} aria-live="polite">
            <p className={styles.bar} aria-hidden="true"><i /><i /><i /><span>studio — {cur.name.toLowerCase()}</span></p>
            <p className={styles.cmd}><span aria-hidden="true">{">"} </span>{cur.name}</p>
            <p className={styles.out}>{typed}<b className={styles.caret} aria-hidden="true" /></p>
            <p className="lm-sr-only">{cur.text}</p>
          </div>
        </div>

        {/* Mobile: the whole flow, in order */}
        <ol className={styles.flowList}>
          {data.flow.map((f) => <li key={f.name}><b>{f.name}</b><span>{f.text}</span></li>)}
        </ol>

        <div className={styles.bands} aria-label="Technologies">
          {data.stack.map(([group, items], i) => (
            <div key={group} className={styles.bandRow}>
              <p className={styles.group}>{group}</p>
              <div className={styles.bandMask}>
                <div className={styles.band} data-band>
                  {[...items, ...items].map((t, k) => <span key={k} aria-hidden={k >= items.length ? "true" : undefined}>{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
