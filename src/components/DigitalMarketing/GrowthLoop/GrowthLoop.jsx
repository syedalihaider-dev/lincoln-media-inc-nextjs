"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Head from "../Head";
import { Ui } from "../ui/Frames";
import { useScene, setPhase, PIN, SMALL } from "../shared";
import styles from "./GrowthLoop.module.css";

// What each stage hands to the next one
const FEEDS = ["Visitors who match the plan", "Readers who know the brand", "Bookings, traced to their source", "What worked, and what didn't", "A page that converts better", "Budget where it works — back to Attract"];
// The story rail's chapter while each stage faces you
const CHAPTER = ["Measurement", "Measurement", "Measurement", "Measurement", "Optimization", "Growth"];

/**
 * The growth loop, made of the work rather than drawn as a diagram: the six stages' real screens
 * stand in a ring, seen slightly from above. Scrolling (held on desktop) turns the ring one full
 * revolution; each stage swings to the front, lights, and names what it hands on to the next.
 * As the turn completes, the first screen returns to the front and the whole ring lights — the
 * loop closed, ready to run again. Phones: a smaller ring turning as it passes.
 */
export default function GrowthLoop({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const [closed, setClosed] = useState(false);
  const n = data.stages.length;

  useScene(ref, (mm, root) => {
    const ring = root.querySelector("[data-ring]");
    const panels = gsap.utils.toArray("[data-panel]", root);
    let last = -1;

    const update = (self) => {
      const turn = self.progress * 360;
      panels.forEach((p, i) => {
        const a = ((((i * 360) / n - turn) % 360) + 540) % 360 - 180; // −180…180, 0 = front
        const f = Math.cos((a * Math.PI) / 180);
        gsap.set(p, { opacity: 0.18 + Math.max(0, f) * 0.82 });
      });
      const k = Math.round(self.progress * n) % n;
      setClosed(self.progress > 0.96);
      if (k !== last) { last = k; setAt(k); }
      setPhase(root, self.progress > 0.92 ? "Growth" : CHAPTER[k]); // back at the start = the loop closed
    };

    const spin = (st) => gsap.fromTo(ring, { rotationY: 0 }, { rotationY: -360, ease: "none", scrollTrigger: { ...st, onUpdate: update, onRefresh: update } });

    mm.add(PIN, () => { spin({ trigger: root, start: "top top", end: "+=300%", pin: true, scrub: 1, anticipatePin: 1 }); });
    mm.add(SMALL, () => { spin({ trigger: root.querySelector("[data-stage]"), start: "top 85%", end: "bottom 15%", scrub: 0.8 }); });
  });

  const s = data.stages[at];
  return (
    <section ref={ref} className={`${styles.section} ${closed ? styles.closed : ""}`} aria-labelledby="loop-title" data-phase="Measurement">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="loop-title" />
        <ol className={styles.ticks} aria-hidden="true">
          {data.stages.map((x, i) => <li key={x.name} className={i === at ? styles.now : i < at || closed ? styles.past : ""}>{x.name}</li>)}
        </ol>
        <div className={styles.current} aria-hidden="true">
          <p className={styles.name} key={s.name}>{s.name}</p>
          <p className={styles.text}>{s.text}</p>
          <p className={styles.feeds}><span>Feeds the next stage</span>{FEEDS[at]}</p>
        </div>
        {/* the whole loop for screen readers, independent of the ring's position */}
        <ol className="lm-sr-only">{data.stages.map((x, i) => <li key={x.name}>{x.name}: {x.text} It feeds the next stage: {FEEDS[i]}.</li>)}</ol>
      </div>

      <div className={styles.stage} data-stage aria-hidden="true">
        <div className={styles.orbit}>
          <div className={styles.ring} data-ring>
            {data.stages.map((x, i) => (
              <div key={x.name} className={`${styles.panel} ${i === at ? styles.front : ""}`} style={{ "--a": `${(i * 360) / n}deg` }} data-panel>
                <Ui kind={x.screen} />
                <span className={styles.tag}>{x.name}</span>
              </div>
            ))}
          </div>
        </div>
        <span className={styles.floor} />
      </div>
    </section>
  );
}
