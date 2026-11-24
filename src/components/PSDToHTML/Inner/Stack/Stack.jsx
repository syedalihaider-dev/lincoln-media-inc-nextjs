"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import BPHead from "../BPHead";
import Code from "@/components/DesignKit/Code";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import b from "../blueprint.module.css";
import styles from "./Stack.module.css";

/**
 * The technology as a cross-section. The build's layers — markup, styles, behaviour, assets — are
 * drawn as strata in one sectional elevation, the page's surface on top. Held on desktop, scrolling
 * cuts into each stratum in turn: it lifts and slides out, the code that makes it opens beside it
 * and its label lights, before it settles back and the next one opens. Phones: strata with code beneath.
 */
export default function Stack({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(PIN, () => {
      const strata = gsap.utils.toArray("[data-stratum]", root);
      const codes = gsap.utils.toArray("[data-code]", root);
      gsap.set(codes, { autoAlpha: 0, x: 40 });
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.5 }, scrollTrigger: { trigger: root, start: "top top", end: `+=${strata.length * 55}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      strata.forEach((s, i) => {
        tl.to(s, { x: "8%", "--on": 1 }, i)
          .to(codes[i], { autoAlpha: 1, x: 0 }, i + 0.1);
        if (i < strata.length - 1) tl.to(s, { x: "0%", "--on": 0.3 }, i + 0.8).to(codes[i], { autoAlpha: 0, x: -30 }, i + 0.8);
      });
      tl.to({}, { duration: 0.3 });
    });
    mm.add(SMALL, () => { gsap.utils.toArray("[data-stratum]", root).forEach((s) => gsap.from(s, { x: -40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 88%", once: true } })); });
  });

  return (
    <section ref={ref} className={`${b.bp} ${styles.section}`} aria-labelledby="pi-stack">
      <BPHead kicker={data.kicker} title={data.title} text={data.text} id="pi-stack" className={styles.head} />
      <div className={styles.grid}>
        <ol className={styles.section2}>
          {data.layers.map((l) => (
            <li key={l.name} className={styles.stratum} data-stratum style={{ "--on": 0.3 }}>
              <b>{l.name}</b><span>{l.text}</span><small>{l.tools}</small>
              <div className={styles.mobileCode} aria-hidden="true"><Code file={l.file} lines={l.code} /></div>
            </li>
          ))}
        </ol>
        <div className={styles.codes} aria-hidden="true">
          {data.layers.map((l) => <div key={l.name} className={styles.code} data-code><Code file={l.file} lines={l.code} /></div>)}
        </div>
      </div>
    </section>
  );
}
