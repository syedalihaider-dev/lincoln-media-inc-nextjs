"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import Site from "@/components/DesignKit/Site";
import { OnDevice } from "@/components/DesignKit/Devices";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Pixel.module.css";

/**
 * Design reference ↔ coded website, on one split screen. Held on desktop: the divider sweeps from
 * right to left, turning the design file — artboard, red measurement lines — into the coded page in
 * a browser behind it. Then the design is laid over the build at half opacity, a few pixels out,
 * and slides into register until the two line up exactly; the checks beside it tick off.
 * Phones: the divider is scrubbed as the frame passes.
 */
export default function Pixel({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const sweep = (tl) => tl
      .fromTo(q("[data-design]"), { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 100% 0% 0%)", ease: "none", duration: 1 }, 0)
      .fromTo(q("[data-divider]"), { left: "100%" }, { left: "0%", ease: "none", duration: 1 }, 0);
    mm.add(PIN, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=220%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      sweep(tl);
      tl.to(q("[data-divider]"), { opacity: 0, duration: 0.1 }, 1)
        .fromTo(q("[data-onion]"), { opacity: 0, x: 18, y: -12 }, { opacity: 0.5, duration: 0.3 }, 1.1)
        .to(q("[data-onion]"), { x: 0, y: 0, duration: 0.6, ease: "power3.inOut" }, 1.4)
        .to(q("[data-onion]"), { opacity: 0, duration: 0.3 }, 2.1)
        .fromTo(q("[data-match]"), { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.2, ease: "back.out(2)" }, 2.0);
      gsap.utils.toArray("[data-check]", root).forEach((c, i) => tl.fromTo(c, { "--on": 0 }, { "--on": 1, duration: 0.1 }, 0.3 + i * 0.45));
      tl.to({}, { duration: 0.3 });
    });
    mm.add(SMALL, () => { sweep(gsap.timeline({ scrollTrigger: { trigger: q("[data-frame]"), start: "top 75%", end: "bottom 30%", scrub: 0.5 } })); });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="psd-pixel">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="psd-pixel" />
        <ul className={styles.checks}>{data.checks.map((c) => <li key={c} data-check style={{ "--on": 1 }}>{c}</li>)}</ul>
      </div>
      <div className={styles.frame} data-frame aria-hidden="true">
        <div className={styles.build}><OnDevice page="home" /></div>
        <div className={styles.design} data-design>
          <div className={styles.artboard}>
            <span className={styles.abLabel}>Home — Desktop · 1280</span>
            <ScaledScreen width={1280}><Site /></ScaledScreen>
            <span className={`${styles.red} ${styles.h1}`}><b>48</b></span>
            <span className={`${styles.red} ${styles.v1}`}><b>56</b></span>
            <span className={`${styles.red} ${styles.h2}`}><b>48</b></span>
            <span className={`${styles.red} ${styles.v2}`}><b>40</b></span>
          </div>
        </div>
        <div className={styles.onion} data-onion><ScaledScreen width={1280}><Site /></ScaledScreen></div>
        <span className={styles.divider} data-divider><em>Design</em><em>Code</em></span>
        <span className={styles.match} data-match>✓ Matches design</span>
      </div>
    </section>
  );
}
