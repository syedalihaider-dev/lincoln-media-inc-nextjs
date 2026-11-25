"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./Animatic.module.css";

/**
 * An explainer animatic, running live: four scenes (problem → turn → how → close) animated with one
 * GSAP timeline, each with its voice line set as a subtitle. The scene bar shows where the cut is and
 * jumps to any scene. Plays only while on screen; reduced motion shows the closing frame.
 * compact: the small monitor version (no scene bar).
 */
export default function Animatic({ data, compact = false }) {
  const ref = useRef(null);
  const tlRef = useRef(null);
  const [scene, setScene] = useState(0);
  const scenes = data.scenes;
  const how = scenes.find((s) => s.steps) || { steps: ["One", "Two", "Three"] };
  const close = scenes.find((s) => s.word) || { word: "Done." };

  useEffect(() => {
    const root = ref.current;
    const q = (s) => root.querySelectorAll(s);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3, defaults: { ease: "expo.out" } });
      tl.set(q("[data-l]"), { autoAlpha: 0 })
        .set(q("[data-tick]"), { strokeDashoffset: 60 })
        // problem: the pages pile up
        .addLabel("s0").call(() => setScene(0))
        .fromTo(q("[data-doc]"), { autoAlpha: 0, y: 60, rotate: 0 }, { autoAlpha: 1, y: 0, rotate: (i) => [-9, 4, 12][i], stagger: 0.18, duration: 0.8 })
        .fromTo(q("[data-q]"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2)" }, "+=0.1")
        .to({}, { duration: 1.2 })
        // turn: the pages go, the picture arrives
        .addLabel("s1").call(() => setScene(1))
        .to(q("[data-doc], [data-q]"), { xPercent: -160, autoAlpha: 0, stagger: 0.06, duration: 0.6, ease: "power3.in" })
        .fromTo(q("[data-play]"), { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(1.6)" }, "-=0.1")
        .fromTo(q("[data-ring]"), { autoAlpha: 0.8, scale: 1 }, { autoAlpha: 0, scale: 2.2, duration: 1.2, ease: "power2.out" }, "-=0.4")
        .to({}, { duration: 0.8 })
        // how: three steps, joined
        .addLabel("s2").call(() => setScene(2))
        .to(q("[data-play]"), { scale: 0, autoAlpha: 0, duration: 0.45, ease: "power3.in" })
        .fromTo(q("[data-step]"), { autoAlpha: 0, y: 30, scale: 0.8 }, { autoAlpha: 1, y: 0, scale: 1, stagger: 0.35, duration: 0.7, ease: "back.out(1.7)" })
        .fromTo(q("[data-join]"), { scaleX: 0 }, { scaleX: 1, stagger: 0.35, duration: 0.5, ease: "power2.inOut" }, "<0.35")
        .to({}, { duration: 1.1 })
        // close: everything resolves to one word
        .addLabel("s3").call(() => setScene(3))
        .to(q("[data-step], [data-join]"), { x: 0, scale: 0.2, autoAlpha: 0, duration: 0.5, stagger: 0.04, ease: "power3.in" })
        .fromTo(q("[data-done]"), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "back.out(1.8)" })
        .to(q("[data-tick]"), { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
        .fromTo(q("[data-word]"), { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, duration: 0.8 }, "-=0.3")
        .addLabel("hold")
        .to({}, { duration: 1.4 })
        .to(q("[data-done], [data-word]"), { autoAlpha: 0, duration: 0.4 });
      tlRef.current = tl;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { tl.pause("hold"); setScene(3); return; }
      tl.pause();
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()), { threshold: 0.25 });
      io.observe(root);
      return () => io.disconnect();
    }, root);
    return () => ctx.revert();
  }, []);

  const jump = (i) => { const tl = tlRef.current; if (!tl) return; tl.seek(`s${i}`).play(); setScene(i); };

  return (
    <div className={`${styles.animatic} ${compact ? styles.compact : ""}`}>
      <div ref={ref} className={styles.stage} role="img" aria-label={`Animatic: ${scenes.map((s) => s.line).join(" ")}`}>
        <span className={styles.safe} aria-hidden="true" />
        <div className={styles.docs}>
          {[0, 1, 2].map((i) => <span key={i} className={styles.doc} data-doc data-l><i /><i /><i /><i /></span>)}
          <span className={styles.qmark} data-q data-l>?</span>
        </div>
        <span className={styles.play} data-play data-l><span className={styles.ring} data-ring /><i /></span>
        <div className={styles.steps}>
          {how.steps.map((s, i) => (
            <span key={s} className={styles.stepWrap}>
              {i > 0 && <span className={styles.join} data-join data-l />}
              <span className={styles.step} data-step data-l>{s}</span>
            </span>
          ))}
        </div>
        <div className={styles.close}>
          <svg className={styles.done} data-done data-l viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" /><path data-tick d="M14 25l7 7 13-15" /></svg>
          <span className={styles.word} data-word data-l>{close.word}</span>
        </div>
        <p className={styles.sub} aria-hidden="true">{scenes[scene].line}</p>
      </div>
      {!compact && (
        <ol className={styles.bar} aria-label="Animatic scenes">
          {scenes.map((s, i) => (
            <li key={s.name}>
              <button type="button" onClick={() => jump(i)} aria-current={i === scene ? "step" : undefined}>
                <span className={styles.barTrack}><span className={styles.barFill} /></span>
                <span>{s.name}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
