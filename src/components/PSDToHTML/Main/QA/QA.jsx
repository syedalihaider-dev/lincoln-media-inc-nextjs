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
  const [p, setP] = useState(0); // 0…tests.length: which test is running and how far
  useScene(ref, (mm, root) => {
    const run = (st) => ScrollTrigger.create({ ...st, onUpdate: (s) => setP(s.progress * tests.length) });
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
          {t.device !== "approve" && <span className={styles.scan} style={{ top: `${Math.min(100, frac * 166)}%`, opacity: status(at) === "Testing" ? 1 : 0 }} />}
        </div>
      </div>
    </section>
  );
}
