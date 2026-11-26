"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, PIN } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import Map from "../ui/Map";
import styles from "./Route.module.css";

// the route (viewBox 1600 × 800) and its four stops — each stop is a segment end of the path
const PATH = "M140 620 C380 640 380 240 620 250 S900 600 1090 560 S1320 200 1470 210";
const STOPS = [[140, 620], [620, 250], [1090, 560], [1470, 210]];
const AT = [0, 0.36, 0.7, 1]; // where along the route each stop sits
const CARD = ["below", "above", "below", "above"];

/**
 * Our process — a route across the neighbourhood. Held on screen, the route draws itself as you
 * scroll and a marker travels it; each of the four stops lights as the marker arrives and its card
 * opens with that stage's work.
 */
export default function Route({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(-1);

  useScene(ref, (mm, root) => {
    mm.add(PIN, () => {
      const path = root.querySelector("[data-path]"), marker = root.querySelector("[data-marker]");
      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      const place = (p) => { const pt = path.getPointAtLength(p * len); marker.setAttribute("transform", `translate(${pt.x} ${pt.y})`); };
      place(0);
      const o = { p: 0 };
      gsap.to(o, {
        p: 1, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "+=200%", pin: true, scrub: 0.7 },
        onUpdate: () => {
          path.style.strokeDashoffset = len * (1 - o.p);
          place(o.p);
          let k = -1; AT.forEach((a, i) => { if (o.p >= a - 0.02) k = i; });
          setAt(k);
        },
      });
      return () => setAt(-1);
    });
    mm.add("(max-width: 900px), (prefers-reduced-motion: reduce)", () => setAt(STOPS.length - 1));
  }, []);

  return (
    <section ref={ref} className={styles.route} aria-labelledby="gmb-route">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="gmb-route" tone="light" size="md" className={styles.head} />
      <div className={styles.board}>
        <div className={styles.bg} aria-hidden="true"><Map pins={[]} labels={false} /></div>
        <svg viewBox="0 0 1600 800" className={styles.svg} aria-hidden="true">
          <path d={PATH} className={styles.ghost} />
          <path d={PATH} className={styles.path} data-path />
          {STOPS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="14" className={`${styles.stop} ${i <= at ? styles.stopOn : ""}`} />)}
          <g data-marker className={styles.marker} transform={`translate(${STOPS[3][0]} ${STOPS[3][1]})`}><circle r="22" /><circle r="8" /></g>
        </svg>
        <ol className={styles.cards}>
          {data.stops.map((s, i) => (
            <li key={s.name} className={`${styles.card} ${styles[CARD[i]]} ${i <= at ? styles.on : ""}`} style={{ "--x": `${(STOPS[i][0] / 1600) * 100}%`, "--y": `${(STOPS[i][1] / 800) * 100}%` }}>
              <h3>{s.name}</h3>
              <ul>{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
