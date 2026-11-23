"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Performance.module.css";

/* Each quality has its own instrument — the real measure engineers watch, not an icon */
const FRAMES = [9, 11, 8, 12, 10, 9, 13, 8, 11, 10, 9, 12, 8, 10, 11, 9, 12, 10, 8, 11, 9, 10, 12, 9];
const INSTRUMENTS = {
  frames: () => (
    <div className={styles.frames}>
      <span className={styles.budget}><small>16.7 ms</small></span>
      {FRAMES.map((h, i) => <i key={i} style={{ "--h": `${(h / 20) * 100}%` }} data-grow />)}
    </div>
  ),
  motion: () => (
    <svg viewBox="0 0 200 90" className={styles.curve}>
      <path d="M0 80 H200" className={styles.axis} />
      <path d="M0 80 C 30 80, 40 4, 80 8 S 120 22, 140 14 S 180 12, 200 12" className={styles.spring} pathLength="1" data-draw />
    </svg>
  ),
  scale: () => <div className={styles.grid}>{Array.from({ length: 18 }, (_, i) => <i key={i} data-cell />)}</div>,
  security: () => (
    <ul className={styles.lines}>
      {["TLS 1.3 in transit", "Keychain · Keystore at rest", "Short-lived tokens", "Certificate pinning"].map((t) => <li key={t}><i>●</i>{t}</li>)}
    </ul>
  ),
  api: () => (
    <ul className={`${styles.lines} ${styles.log}`}>
      {[["200", "GET /v1/catalogue", "42 ms"], ["201", "POST /v1/orders", "84 ms"], ["304", "GET /v1/profile", "12 ms"], ["503", "retry 1 · /v1/track", "—"], ["200", "GET /v1/track", "61 ms"]].map(([c, p, t]) => <li key={p}><b data-c={c[0]}>{c}</b><span>{p}</span><small>{t}</small></li>)}
    </ul>
  ),
  responsive: () => (
    <div className={styles.devices}>
      <i className={styles.dPhone} data-grow /><i className={styles.dFold} data-grow /><i className={styles.dTab} data-grow />
    </div>
  ),
  code: () => (
    <pre className={styles.diff}>
      <span className={styles.rm}>- let user = try! decode(data)</span>{"\n"}
      <span className={styles.add}>+ guard let user = try? decode(data)</span>{"\n"}
      <span className={styles.add}>+ else {"{"} return .failure(.invalid) {"}"}</span>{"\n"}
      <span className={styles.ctx}>  render(user)</span>
    </pre>
  ),
  tests: () => (
    <ul className={styles.lines}>
      {["Unit", "UI", "Snapshot", "Accessibility", "Device farm"].map((t) => <li key={t}><i className={styles.ok}>✓</i>{t}</li>)}
    </ul>
  ),
  release: () => (
    <div className={styles.rollout}>
      <div className={styles.rollBar}><s data-roll /></div>
      <p>{["1%", "10%", "50%", "100%"].map((s) => <small key={s}>{s}</small>)}</p>
      <small className={styles.rollNote}>Staged rollout · crash reporting · monitoring</small>
    </div>
  ),
};

/**
 * Performance & quality as an instrument panel. Nine tiles, each a real measure — frame times under
 * the 16.7 ms line, a spring curve, instances scaling out, a request log, a code fix, a staged
 * rollout. They sweep in on a diagonal wave, then each instrument is driven by the scroll itself as
 * the panel passes: bars grow, the curve draws, servers light up, the rollout fills.
 */
export default function Performance({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const grid = root.querySelector("[data-tiles]");
      const cols = matchMedia("(min-width: 1101px)").matches ? 3 : matchMedia("(min-width: 641px)").matches ? 2 : 1;
      gsap.from(root.querySelectorAll("[data-tile]"), { clipPath: "inset(0% 0% 100% 0% round 22px)", y: 40, duration: 1.2, ease: "expo.out", stagger: { each: 0.09, grid: [Math.ceil(9 / cols), cols], from: "start", axis: null }, scrollTrigger: { trigger: grid, start: "top 80%", once: true } });
      const st = { trigger: grid, start: "top 75%", end: "bottom 60%", scrub: 0.6 };
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });
      tl.from(root.querySelectorAll("[data-grow]"), { scaleY: 0, stagger: 0.02, duration: 0.5 }, 0)
        .fromTo(root.querySelectorAll("[data-draw]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6 }, 0.1)
        .from(root.querySelectorAll("[data-cell]"), { opacity: 0.08, stagger: 0.03, duration: 0.1 }, 0.1)
        .fromTo(root.querySelectorAll("[data-roll]"), { scaleX: 0.01 }, { scaleX: 1, duration: 0.8, ease: "steps(4)" }, 0.2);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.perf} aria-labelledby="perf-title">
      <div className={styles.top}>
        <Head kicker={data.kicker} title={data.title} id="perf-title" />
        <p className={styles.lead}>{data.text}</p>
      </div>
      <ul className={styles.tiles} data-tiles>
        {data.items.map((it) => {
          const Inst = INSTRUMENTS[it.key];
          return (
            <li key={it.key} className={styles.tile} data-tile>
              <div className={styles.inst} aria-hidden="true"><Inst /></div>
              <h3>{it.name}</h3>
              <p>{it.text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
