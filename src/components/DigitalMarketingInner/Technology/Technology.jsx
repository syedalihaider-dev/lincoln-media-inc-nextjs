"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import { Ui } from "@/components/DigitalMarketing/ui/Frames";
import styles from "./Technology.module.css";

/**
 * How the service is run, as an exploded view. The working interfaces lie stacked in one
 * isometric block; held on desktop, scrolling lifts them apart layer by layer, each one lighting
 * as its name and job light up in the list beside it, and the block turns to face you as the last
 * layer separates. Phones: the layers lie in a column, each tilting flat as it arrives.
 */
export default function Technology({ data }) {
  const ref = useRef(null);
  const layers = data.layers;

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const sheets = gsap.utils.toArray("[data-sheet]", root);
    const rows = gsap.utils.toArray("[data-row]", root);
    mm.add(PIN, () => {
      gsap.set(rows, { "--on": 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 0.7 }, scrollTrigger: { trigger: root, start: "top top", end: `+=${layers.length * 60}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      // top sheet first: each lifts to its own height above the one below
      sheets.forEach((s, i) => {
        tl.to(s, { z: (layers.length - 1 - i) * 115 - 110, duration: 0.7 }, i * 0.8)
          .to(s.querySelector("[data-lit]"), { opacity: 1, duration: 0.3 }, i * 0.8 + 0.3)
          .to(rows[i], { "--on": 1, duration: 0.2 }, i * 0.8 + 0.2);
        if (i) tl.to(rows[i - 1], { "--on": 0.35, duration: 0.2 }, i * 0.8 + 0.2);
      });
      tl.to(q("[data-block]"), { rotationX: 38, rotationZ: -22, duration: 1 }, (layers.length - 1) * 0.8);
      tl.to({}, { duration: 0.3 });
    });
    mm.add(SMALL, () => {
      sheets.forEach((s) => gsap.fromTo(s, { rotationX: 40, y: 50, transformPerspective: 1000 }, { rotationX: 0, y: 0, ease: "none", scrollTrigger: { trigger: s, start: "top 95%", end: "top 55%", scrub: 0.5 } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ms-tech">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="ms-tech" />
        <ol className={styles.rows}>
          {layers.map((l) => <li key={l.name} className={styles.row} data-row><b>{l.name}</b><p>{l.text}</p></li>)}
        </ol>
      </div>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.block} data-block>
          {layers.map((l, i) => (
            <div key={l.name} className={styles.sheet} style={{ zIndex: layers.length - i, transform: `translateZ(${(layers.length - 1 - i) * 8}px)` }} data-sheet>
              <Ui kind={l.screen} />
              <span className={styles.lit} data-lit />
              <span className={styles.tag}>{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
