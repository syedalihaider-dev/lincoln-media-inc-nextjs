"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import BPHead from "../BPHead";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import b from "../blueprint.module.css";
import styles from "./Signoff.module.css";

/**
 * The results as an inspection sign-off. The finished page on three devices is drawn on the sheet;
 * beside it, the inspection checklist. Held on desktop, each outcome is stamped in turn — the box
 * ticking with a press — and when the list is complete a round "inspected" seal drops onto the drawing.
 * Phones: the stamps land as the checklist scrolls in.
 */
export default function Signoff({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const stamp = (tl) => {
      gsap.utils.toArray("[data-check]", root).forEach((c, i) => tl.fromTo(c.querySelector("i"), { scale: 2, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: "power4.in" }, i * 0.35).fromTo(c, { opacity: 0.45 }, { opacity: 1, duration: 0.15 }, i * 0.35));
      tl.fromTo(root.querySelector("[data-seal]"), { scale: 2.4, rotation: -30, opacity: 0 }, { scale: 1, rotation: -12, opacity: 1, duration: 0.3, ease: "power4.in" }, "+=0.1");
      return tl;
    };
    mm.add(PIN, () => { stamp(gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=150%", pin: true, scrub: 0.6, anticipatePin: 1 } })).to({}, { duration: 0.3 }); });
    mm.add(SMALL, () => { stamp(gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-list]"), start: "top 75%", end: "bottom 50%", scrub: 0.5 } })); });
  });

  return (
    <section ref={ref} className={`${b.bp} ${styles.section}`} aria-labelledby="pi-sign">
      <div className={styles.copy}>
        <BPHead kicker={data.kicker} title={data.title} id="pi-sign" />
        <ul className={styles.list} data-list>
          {data.items.map((x) => <li key={x} data-check><i aria-hidden="true">✓</i>{x}</li>)}
        </ul>
      </div>
      <div className={styles.drawing} aria-hidden="true">
        <div className={styles.desk}><OnDevice page={data.page} /></div>
        <div className={styles.tab}><OnDevice device="tablet" page={data.page} /></div>
        <div className={styles.phone}><OnDevice device="phone" page={data.page} /></div>
        <span className={styles.seal} data-seal>Inspected<small>Ready to launch</small></span>
      </div>
    </section>
  );
}
