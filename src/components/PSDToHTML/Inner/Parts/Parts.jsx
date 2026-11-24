"use client";
import { useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import BPHead from "../BPHead";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import b from "../blueprint.module.css";
import styles from "./Parts.module.css";

/**
 * Capabilities as a drawing's parts list. One drawing of the page with numbered callouts; beside it,
 * the parts list. As you scroll (held on desktop), the list steps down row by row: the active row
 * highlights and its callout on the drawing rings and draws its outline around the part it names.
 * Phones: the drawing holds at the top, the active row changes as each passes the middle.
 */
export default function Parts({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const items = data.items;
  useScene(ref, (mm, root) => {
    mm.add(PIN, () => { ScrollTrigger.create({ trigger: root, start: "top top", end: `+=${items.length * 40}%`, pin: true, scrub: true, anticipatePin: 1, onUpdate: (s) => setAt(Math.min(items.length - 1, Math.floor(s.progress * items.length))) }); });
    mm.add(SMALL, () => {
      const ts = [...root.querySelectorAll("[data-row]")].map((el, i) => ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setAt(i) }));
      return () => ts.forEach((t) => t.kill());
    });
  });

  return (
    <section ref={ref} className={`${b.bp} ${b.deep} ${styles.section}`} aria-labelledby="pi-parts">
      <BPHead kicker={data.kicker} title={data.title} id="pi-parts" className={styles.head} />
      <div className={styles.grid}>
        <div className={styles.drawing} aria-hidden="true">
          <OnDevice page={data.page} />
          {items.map((it, i) => (
            <span key={it.name} className={`${styles.area} ${i === at ? styles.on : ""}`} style={{ left: `${it.box[0]}%`, top: `${it.box[1]}%`, width: `${it.box[2]}%`, height: `${it.box[3]}%` }}>
              <em>{it.tag}</em>
            </span>
          ))}
        </div>
        <ol className={styles.list}>
          {items.map((it, i) => (
            <li key={it.name} className={i === at ? styles.active : ""} data-row>
              <span className={styles.tag}>{it.tag}</span>
              <span className={styles.lead} aria-hidden="true" />
              <div><h3>{it.name}</h3><p>{it.text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
