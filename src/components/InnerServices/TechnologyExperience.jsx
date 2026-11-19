"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./TechnologyExperience.module.css";

const STEP_MS = 4200;

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
 * Technology, as a pipeline in one screen-height: five stations — strategy to performance — that
 * are tabs. While the section is in view they advance on their own (a thin line fills under the
 * current one); choosing a station stops the tour. The current station's line types itself into a
 * terminal. Under it, the stack runs in four bands, moving only while they are on screen.
 */
export default function TechnologyExperience({ data }) {
  const ref = useRef(null);
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const { ready } = useSiteMotion();
  const n = data.flow.length;
  const cur = data.flow[stage];
  const typed = useTyped(cur.text);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  // The tour: advance while visible, until someone picks a station
  useEffect(() => {
    if (!auto || !inView || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setStage((s) => (s + 1) % n), STEP_MS);
    return () => clearTimeout(t);
  }, [auto, inView, stage, n]);

  const pick = (i) => { setAuto(false); setStage(i); sfx("tick"); };
  const onKey = (e) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const i = (stage + d + n) % n;
    pick(i);
    ref.current.querySelectorAll("[role=tab]")[i]?.focus();
  };

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelectorAll("[data-st]"), { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.9, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: root, start: "top 70%", once: true } });
      gsap.fromTo(root.querySelector("[data-term]"), { clipPath: "inset(0% 0% 100% 0% round 14px)" }, { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: root, start: "top 65%", once: true } });
      // The stack bands drift only while on screen
      const tweens = gsap.utils.toArray("[data-band]", root).map((b, i) => gsap.fromTo(b, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 40 + i * 6, ease: "none", repeat: -1, paused: true }));
      const st = ScrollTrigger.create({ trigger: root.querySelector("[data-bands]"), start: "top bottom", end: "bottom top", onToggle: (s) => tweens.forEach((t) => (s.isActive ? t.play() : t.pause())) });
      return () => { st.kill(); tweens.forEach((t) => t.kill()); };
    });
    return () => mm.revert();
  }, { dependencies: [ready, n], scope: ref });

  return (
    <section ref={ref} id="technology" className={styles.tech} aria-labelledby="tech-title">
      <span className={styles.grid} aria-hidden="true" />
      <div className={styles.top}>
        <SectionHead kicker={data.kicker} title={data.title} id="tech-title" />

        <div className={styles.pipe}>
          <div className={styles.stations} role="tablist" aria-label="From strategy to performance" onKeyDown={onKey}>
            {data.flow.map((f, i) => (
              <button
                key={f.name} type="button" role="tab" id={`tech-tab-${i}`} aria-controls="tech-panel" aria-selected={i === stage} tabIndex={i === stage ? 0 : -1}
                className={`${styles.station} ${i < stage ? styles.lit : ""} ${i === stage ? styles.now : ""}`} onClick={() => pick(i)} data-st
              >
                <i aria-hidden="true" />
                <span>{f.name}</span>
                {i === stage && auto && inView && <b key={stage} className={styles.timer} style={{ animationDuration: `${STEP_MS}ms` }} aria-hidden="true" />}
              </button>
            ))}
          </div>

          <div className={styles.terminal} id="tech-panel" role="tabpanel" aria-labelledby={`tech-tab-${stage}`} data-term>
            <p className={styles.bar} aria-hidden="true"><i /><i /><i /><span>studio — {cur.name.toLowerCase()}</span></p>
            <p className={styles.cmd}><span aria-hidden="true">{">"} </span>{cur.name}</p>
            <p className={styles.out} aria-hidden="true">{typed}<b className={styles.caret} /></p>
            <p className="lm-sr-only">{cur.text}</p>
          </div>
        </div>
      </div>

      <div className={styles.bands} aria-label="Technologies" data-bands>
        {data.stack.map(([group, items]) => (
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
    </section>
  );
}
