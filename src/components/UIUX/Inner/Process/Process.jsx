"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import View from "@/components/DesignKit/View";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Process.module.css";

/**
 * Before and after on one screen, the process laid along the bottom. Held on desktop: a divider
 * travels across the frame from left to right — behind it the "before", ahead of it the "after" —
 * and as it passes each step on the rail below, that step lights and its note appears.
 * Phones: the same divider, scrubbed as the frame passes; the steps listed beneath.
 */
export default function Process({ data }) {
  const ref = useRef(null);
  const n = data.steps.length;
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const sweep = (tl) => {
      tl.fromTo(q("[data-after]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }, 0)
        .fromTo(q("[data-divider]"), { left: "0%" }, { left: "100%", ease: "none", duration: 1 }, 0);
      gsap.utils.toArray("[data-step]", root).forEach((s, i) => tl.fromTo(s, { "--on": 0 }, { "--on": 1, duration: 0.08 }, (i + 0.5) / n - 0.04));
      return tl;
    };
    mm.add(PIN, () => { sweep(gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=180%", pin: true, scrub: 0.8, anticipatePin: 1 } })).to({}, { duration: 0.15 }); });
    mm.add(SMALL, () => { sweep(gsap.timeline({ scrollTrigger: { trigger: q("[data-frame]"), start: "top 75%", end: "bottom 25%", scrub: 0.6 } })); });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="uxi-proc">
      <Head kicker={data.kicker} title={data.title} id="uxi-proc" tone="light" className={styles.head} />
      <div className={styles.frame} data-frame aria-hidden="true">
        <div className={styles.before}><View view={data.before.view} page={data.before.page} fid={data.before.fid} /><span className={styles.tag}>{data.before.label}</span></div>
        <div className={styles.after} data-after><View view={data.after.view} page={data.after.page} fid={data.after.fid} /><span className={`${styles.tag} ${styles.tagR}`}>{data.after.label}</span></div>
        <span className={styles.divider} data-divider><i /></span>
      </div>
      <ol className={styles.rail} style={{ "--n": n }}>
        {data.steps.map((s) => <li key={s.name} className={styles.step} data-step style={{ "--on": 1 }}><b>{s.name}</b><p>{s.text}</p></li>)}
      </ol>
    </section>
  );
}
