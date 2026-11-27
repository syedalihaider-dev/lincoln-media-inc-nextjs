"use client";
import { useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./QA.module.css";

const BROWSERS = ["Chrome", "Safari", "Firefox", "Edge"];

/**
 * Quality assurance as a device lab. Held on desktop, scrolling runs the test plan: each test brings
 * its device onto the bench — desktop, tablet, phone, then four browsers side by side — a scan line
 * passes down the screen while its status reads "Testing", and it flips to "Passed" before the next
 * one starts. The run ends with the build stamped approved, ready for production.
 * Phones: the same run, stepped by the section's position on screen.
 */
export default function QA({ data }) {
  const ref = useRef(null);
  const tests = data.tests;
  // 0…tests.length: which test is running and how far. React only needs its *steps* (which test, and
  // whether it has flipped to "Passed"), so the state holds a quantised value and re-renders only when a
  // status changes; the scan line's continuous sweep is written straight to its style every frame.
  const [p, setP] = useState(0);
  const live = useRef(0);
  const scan = useRef(null);
  const scanTop = (v) => `${Math.min(100, (v - Math.floor(v)) * 166)}%`;
  const scanRef = (el) => { scan.current = el; if (el) el.style.top = scanTop(live.current); };
  const step = (v) => (v >= tests.length - 0.02 ? tests.length : Math.floor(v) + (v - Math.floor(v) > 0.6 ? 0.7 : 0.1));
  useScene(ref, (mm, root) => {
    const run = (st) => ScrollTrigger.create({ ...st, onUpdate: (s) => {
      const v = s.progress * tests.length;
      live.current = v;
      if (scan.current) scan.current.style.top = scanTop(v);
      setP(step(v));
    } });
    mm.add(PIN, () => { run({ trigger: root, start: "top top", end: `+=${tests.length * 45}%`, pin: true, scrub: true, anticipatePin: 1 }); });
    mm.add(SMALL, () => { run({ trigger: root.querySelector("[data-bench]"), start: "top 70%", end: "bottom 10%" }); });
    // reduced motion: show the finished run — every test passed, the build approved
    mm.add("(prefers-reduced-motion: reduce)", () => { setP(tests.length); });
  });

  const at = Math.min(tests.length - 1, Math.floor(p));
  const frac = p - Math.floor(p);
  const status = (i) => (i < at || p >= tests.length - 0.02 ? "Passed" : i === at ? (frac > 0.6 ? "Passed" : "Testing") : "Queued");
  const t = tests[at];
  return (
    <section ref={ref} className={styles.section} aria-labelledby="psd-qa">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="psd-qa" />
        <ol className={styles.plan}>
          {tests.map((x, i) => (
            <li key={x.name} className={styles[status(i).toLowerCase()]}>
              <span className={styles.dot} aria-hidden="true" />
              <p><b>{x.name}</b><small>{x.text}</small></p>
              <em aria-hidden="true">{status(i)}</em>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.bench} data-bench aria-hidden="true">
        <div className={styles.device} key={t.device}>
          {t.device === "browser" && <OnDevice page="home" />}
          {t.device === "tablet" && <div className={styles.tab}><OnDevice device="tablet" page="listing" /></div>}
          {t.device === "phone" && <div className={styles.ph}><OnDevice device="phone" page="listing" /></div>}
          {t.device === "matrix" && <div className={styles.matrix}>{BROWSERS.map((b) => <figure key={b}><OnDevice page="home" url={`${b} · meridian.example`} /><figcaption>{b}</figcaption></figure>)}</div>}
          {t.device === "approve" && <div className={styles.approve}><OnDevice page="landing" /><span className={styles.stamp}>Approved<small>Ready for production</small></span></div>}
          {t.device !== "approve" && <span ref={scanRef} className={styles.scan} style={{ opacity: status(at) === "Testing" ? 1 : 0 }} />}
        </div>
      </div>
    </section>
  );
}
