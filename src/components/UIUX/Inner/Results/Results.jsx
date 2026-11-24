"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, undraw, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Results.module.css";

// The recorded path a test participant's cursor took through the finished page (% of the browser)
const PATH = [[52, 22], [30, 40], [12, 76], [44, 77], [91, 76], [60, 88], [18, 95]];
const CLICKS = [2, 4, 6];
const d = PATH.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");

/**
 * The experience, replayed. A usability session on the finished page: held on desktop, the
 * participant's cursor path draws itself across the interface as you scroll — the cursor following
 * it, rings marking each click — while the task completes and the outcomes tick off beside it.
 * No invented numbers: what changed is told in words. Phones: the replay scrubs as the screen passes.
 */
export default function Results({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const replay = (tl) => {
      const trail = q("[data-trail]");
      const cursor = q("[data-cursor]");
      const len = trail.getTotalLength();
      undraw(trail);
      gsap.set(root.querySelectorAll("[data-click]"), { scale: 0, opacity: 0 });
      const pos = { t: 0 };
      tl.to(trail, { strokeDashoffset: 0, ease: "none", duration: 1 }, 0)
        .to(pos, { t: 1, ease: "none", duration: 1, onUpdate: () => { const p = trail.getPointAtLength(pos.t * len); gsap.set(cursor, { left: `${p.x}%`, top: `${p.y}%` }); } }, 0);
      CLICKS.forEach((k, i) => tl.to(root.querySelectorAll("[data-click]")[i], { scale: 1, opacity: 1, duration: 0.06 }, k / (PATH.length - 1)));
      gsap.utils.toArray("[data-out]", root).forEach((o, i, all) => tl.from(o, { x: 30, opacity: 0, duration: 0.1 }, 0.2 + (i * 0.8) / all.length));
      tl.from(q("[data-done]"), { scale: 0.8, opacity: 0, duration: 0.1 }, 0.95);
      return tl;
    };
    mm.add(PIN, () => { replay(gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=160%", pin: true, scrub: 0.8, anticipatePin: 1 } })).to({}, { duration: 0.15 }); });
    mm.add(SMALL, () => { replay(gsap.timeline({ scrollTrigger: { trigger: q("[data-screen]"), start: "top 75%", end: "bottom 30%", scrub: 0.6 } })); });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="uxi-res">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="uxi-res" />
        <p className={styles.task}><small>Task</small>{data.task}</p>
        <ul className={styles.outs}>{data.items.map((x) => <li key={x} data-out>{x}</li>)}</ul>
      </div>
      <div className={styles.screen} data-screen aria-hidden="true">
        <OnDevice page="home" />
        <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none"><path d={d} pathLength="1" data-trail /></svg>
        {CLICKS.map((k) => <span key={k} className={styles.click} style={{ left: `${PATH[k][0]}%`, top: `${PATH[k][1]}%` }} data-click />)}
        <span className={styles.cursor} data-cursor style={{ left: `${PATH[0][0]}%`, top: `${PATH[0][1]}%` }} />
        <span className={styles.done} data-done>Task completed</span>
        <span className={styles.rec}><i />Session replay</span>
      </div>
    </section>
  );
}
