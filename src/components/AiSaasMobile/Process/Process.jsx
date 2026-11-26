"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import styles from "./Process.module.css";

// What each stage leaves on the table
const ART = {
  brief: () => <div className={styles.doc}><b>Product brief</b><i style={{ width: "92%" }} /><i style={{ width: "70%" }} /><em>Problem — dispatchers lose mornings to triage.</em><i style={{ width: "84%" }} /><i style={{ width: "56%" }} /></div>,
  roadmap: () => <div className={styles.road}>{[["Now", 0.1, 0.5], ["Next", 0.35, 0.45], ["Later", 0.6, 0.38]].map(([l, x, w]) => <p key={l}><span>{l}</span><i style={{ marginLeft: `${x * 100}%`, width: `${w * 100}%` }} /></p>)}</div>,
  screens: () => <div className={styles.screens}>{[0, 1, 2].map((k) => <span key={k}><i /><i /><i /><b /></span>)}</div>,
  code: () => <pre className={styles.code}>{`export async function assign(job) {
  const tech = await nearest(job, {
    licence: job.trade,
  });
  return jobs.update(job.id, { tech });
}`}</pre>,
  flow: () => <div className={styles.flow}><span>Portal</span><i /><span className={styles.acc}>Assistant</span><i /><span>Jobs API</span><i /><span>Calendar</span></div>,
  tests: () => <ul className={styles.tests}>{["Unit", "End-to-end", "Device lab", "AI evaluations", "Accessibility"].map((t) => <li key={t}><span>✓</span>{t}</li>)}</ul>,
  release: () => <div className={styles.release}>{[["iOS", "Ready for sale"], ["Android", "Rolled out"], ["Web", "Live"]].map(([a, b]) => <p key={a}><b>{a}</b><span>{b}</span></p>)}</div>,
  growth: () => <svg className={styles.growth} viewBox="0 0 220 110"><path d="M0 100 H220 M0 70 H220 M0 40 H220" className={styles.grid} /><path d="M4 92 C40 88 60 80 84 70 S130 60 150 44 S190 24 216 10" className={styles.lineG} /></svg>,
};

/**
 * How we work — eight stages laid out as a horizontal film strip that the page scrolls sideways
 * (pinned). A rail above names the stages and lights the current one; each stage carries the
 * artefact it leaves behind, which assembles as its panel reaches the centre.
 */
export default function Process({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const track = root.querySelector("[data-track]");
    const panels = gsap.utils.toArray("[data-panel]", root);
    const marks = root.querySelectorAll("[data-mark]");
    mm.add(PIN, () => {
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: root, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true,
          onUpdate: (st) => { const i = Math.round(st.progress * (panels.length - 1)); marks.forEach((m, k) => m.classList.toggle(styles.on, k <= i)); },
        },
      });
      // panels already in view when the strip arrives enter with the section; the rest as they slide in
      panels.forEach((p, i) => {
        const inView = p.offsetLeft < innerWidth * 0.8;
        const st = (start) => (inView ? { trigger: root, start: "top 65%", once: true } : { trigger: p, containerAnimation: tween, start, toggleActions: "play none none reverse" });
        gsap.from(p.querySelector("[data-art]"), { y: 60, rotate: -3, opacity: 0, duration: 1, delay: inView ? i * 0.08 : 0, ease: "expo.out", scrollTrigger: st("left 75%") });
        gsap.from(p.querySelector("h3"), { xPercent: 20, opacity: 0, duration: 1, delay: inView ? 0.1 + i * 0.08 : 0, ease: "expo.out", scrollTrigger: st("left 85%") });
      });
    });
    mm.add(SMALL, () => {
      panels.forEach((p) => gsap.from(p, { y: 50, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 85%", once: true } }));
    });
  }, []);

  return (
    <section ref={ref} className={styles.process} aria-labelledby="ai-process">
      <div className={styles.top}>
        <Head kicker={data.kicker} title={data.title} id="ai-process" size="md" />
        <ol className={styles.rail} aria-hidden="true">
          {data.steps.map((s) => <li key={s.name} data-mark>{s.name}</li>)}
        </ol>
      </div>
      <ol className={styles.track} data-track>
        {data.steps.map((s) => {
          const A = ART[s.artefact];
          return (
            <li key={s.name} className={styles.panel} data-panel>
              <div className={styles.art} data-art aria-hidden="true"><A /></div>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
