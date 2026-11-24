"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./Performance.module.css";

/**
 * Quality as a test run. Each standard the build is held to is a row in a report; as the report
 * scrolls into view its rows slide in one by one, a progress bar runs along the top and the checks
 * tick across the browsers column by column — the way a test suite reports, but in plain words and
 * without scores. Each row says what the check means.
 */
export default function Performance({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const rows = gsap.utils.toArray("[data-row]", root);
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: root.querySelector("[data-report]"), start: "top 80%", end: "bottom 60%", scrub: 0.6 } });
      tl.fromTo(root.querySelector("[data-bar]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: rows.length }, 0);
      rows.forEach((r, i) => {
        tl.from(r, { x: 60, opacity: 0, duration: 0.6 }, i)
          .from(r.querySelectorAll("[data-tick]"), { scale: 0, opacity: 0, duration: 0.25, stagger: 0.1, ease: "back.out(2.5)" }, i + 0.3)
          .from(r.querySelector("[data-pass]"), { opacity: 0, x: -10, duration: 0.2 }, i + 0.7);
      });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="psd-perf">
      <Head kicker={data.kicker} title={data.title} id="psd-perf" className={styles.head} />
      <div className={styles.report} data-report>
        <header className={styles.top}>
          <span className={styles.run}><i />Test run · meridian.example</span>
          <span className={styles.barTrack} aria-hidden="true"><i data-bar /></span>
        </header>
        <div className={`${styles.row} ${styles.headRow}`} aria-hidden="true">
          <span>Check</span>{data.browsers.map((b) => <span key={b} className={styles.br}>{b}</span>)}<span>Status</span>
        </div>
        <ul className={styles.rows}>
          {data.rows.map((r) => (
            <li key={r.name} className={styles.row} data-row>
              <span className={styles.name}><b>{r.name}</b><small>{r.text}</small></span>
              {data.browsers.map((b) => <i key={b} className={styles.tick} data-tick aria-hidden="true">✓</i>)}
              <em className={styles.pass} data-pass>Passed</em>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
