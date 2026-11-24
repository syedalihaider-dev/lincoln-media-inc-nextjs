"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import View from "@/components/DesignKit/View";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./Capabilities.module.css";

/**
 * Capabilities as specification sheets dropped onto a pile. Each sheet sticks just below the one
 * before it; as the next arrives it lands at a slight angle and the sheets underneath settle back —
 * scaling down and dimming — so you scroll through a growing stack of the service's deliverables,
 * each with its own artefact. Works by scroll alone; the same on phones, with the sheets stacked.
 */
export default function Capabilities({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const sheets = gsap.utils.toArray("[data-sheet]", root);
      sheets.forEach((s, i) => {
        gsap.fromTo(s, { rotation: i % 2 ? 3 : -3, y: 60 }, { rotation: i % 2 ? 0.8 : -0.8, y: 0, ease: "power2.out", scrollTrigger: { trigger: s, start: "top bottom", end: "top 30%", scrub: 0.6 } });
        if (i < sheets.length - 1) gsap.to(s.querySelector("[data-inner]"), { scale: 0.93, ease: "none", scrollTrigger: { trigger: sheets[i + 1], start: "top bottom", end: "top 30%", scrub: true } });
      });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="uxi-caps">
      <Head kicker={data.kicker} title={data.title} id="uxi-caps" tone="light" className={styles.head} />
      <ul className={styles.stack}>
        {data.items.map((c, i) => (
          <li key={c.name} className={styles.sheet} style={{ "--i": i }} data-sheet>
            <div className={styles.inner} data-inner>
              <div className={styles.copy}>
                <span className={styles.no}>{c.tag || "Capability"}</span>
                <h3>{c.name}</h3>
                <p>{c.text}</p>
                {c.items && <ul className={styles.list}>{c.items.map((x) => <li key={x}>{x}</li>)}</ul>}
              </div>
              <div className={styles.vis} aria-hidden="true"><View view={c.view} page={c.page} fid={c.fid} /></div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
