"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import BPHead from "../BPHead";
import View from "@/components/DesignKit/View";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import b from "../blueprint.module.css";
import styles from "./Sheets.module.css";

/**
 * The showcase as a set of drawing sheets, fanned on the table. Held on desktop: the sheets lie in
 * a stack; scrolling deals them out one by one across the table — each sliding off the pile,
 * rotating flat and landing in its place in the grid, its sheet number and title block visible —
 * until the full set is laid out. Phones: the sheets in a column, each sliding in.
 */
export default function Sheets({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const sheets = () => gsap.utils.toArray("[data-sheet]", root);
    mm.add(PIN, () => {
      const ss = sheets();
      const table = root.querySelector("[data-table]");
      // stack every sheet on the centre of the table, then deal them back to their own places
      const offs = ss.map((s) => ({ x: table.offsetWidth / 2 - (s.offsetLeft + s.offsetWidth / 2), y: table.offsetHeight / 2 - (s.offsetTop + s.offsetHeight / 2) }));
      ss.forEach((s, i) => gsap.set(s, { x: offs[i].x, y: offs[i].y, rotation: (i % 2 ? 1 : -1) * (3 + i), zIndex: ss.length - i }));
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.8 }, scrollTrigger: { trigger: root, start: "top top", end: `+=${ss.length * 45}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      ss.forEach((s, i) => tl.to(s, { x: 0, y: 0, rotation: 0 }, i * 0.6));
      tl.to({}, { duration: 0.4 });
      return () => gsap.set(ss, { clearProps: "all" });
    });
    mm.add(SMALL, () => { sheets().forEach((s, i) => gsap.from(s, { x: i % 2 ? 60 : -60, rotation: i % 2 ? 4 : -4, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 88%", once: true } })); });
  });

  return (
    <section ref={ref} className={`${b.bp} ${styles.section}`} aria-labelledby="pi-sheets">
      <BPHead kicker={data.kicker} title={data.title} id="pi-sheets" className={styles.head} />
      <div className={styles.table} data-table>
        {data.items.map((it) => (
          <figure key={it.title} className={styles.sheet} data-sheet>
            <div className={styles.view} aria-hidden="true"><View view={it.view} page={it.page} fid={it.fid} /></div>
            <figcaption className={styles.tb}><span>{it.tag}</span><b>{it.title}</b><small>{it.text}</small></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
