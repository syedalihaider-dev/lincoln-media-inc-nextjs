"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import Canvas from "@/components/DesignKit/Canvas";
import Site from "@/components/DesignKit/Site";
import Code, { HTML } from "@/components/DesignKit/Code";
import { Browser } from "@/components/DesignKit/Devices";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Live.module.css";

/**
 * Design file → Code → Browser → Live website as one held shot. The design file opens into its code
 * through an iris; a diagonal wipe turns the code into the page in a browser; then the browser's
 * frame falls away as the page grows to fill the whole screen — live. A caption track along the
 * bottom slides sideways to name each stage. Phones: the four stages, each masked in as it arrives.
 */
export default function Live({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    mm.add(PIN, () => {
      const L = gsap.utils.toArray("[data-l]", root);
      gsap.set(L[1], { clipPath: "circle(0% at 50% 50%)" });
      gsap.set(L[2], { clipPath: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)" });
      gsap.set(L[3], { autoAlpha: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root, start: "top top", end: "+=280%", pin: true, scrub: 0.9, anticipatePin: 1 } });
      tl.fromTo(q("[data-shot]"), { rotationX: 16, scale: 0.84 }, { rotationX: 0, scale: 0.9, duration: 0.8, ease: "none" }, 0)
        .to(L[1], { clipPath: "circle(110% at 50% 50%)", duration: 0.9 }, 0.3)
        .to(q("[data-track]"), { xPercent: -25, duration: 0.4 }, 0.6)
        .to(L[2], { clipPath: "polygon(100% 0%, -100% 0%, 100% 200%, 100% 100%)", duration: 0.9 }, 1.4)
        .to(q("[data-track]"), { xPercent: -50, duration: 0.4 }, 1.8)
        .to(L[3], { autoAlpha: 1, duration: 0.2 }, 2.5)
        .to(q("[data-shot]"), { scale: 1, width: "100vw", height: "100svh", borderRadius: 0, duration: 1 }, 2.6)
        .to(q("[data-track]"), { xPercent: -75, duration: 0.4 }, 2.8)
        .to({}, { duration: 0.3 });
    });
    mm.add(SMALL, () => {
      gsap.utils.toArray("[data-m]", root).forEach((m, i) => gsap.fromTo(m, { clipPath: ["circle(0% at 50% 50%)", "inset(0% 100% 0% 0%)", "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)", "inset(50% 0% 50% 0%)"][i] }, { clipPath: ["circle(80% at 50% 50%)", "inset(0% 0% 0% 0%)", "polygon(100% 0%, -100% 0%, 100% 200%, 100% 100%)", "inset(0% 0% 0% 0%)"][i], ease: "none", scrollTrigger: { trigger: m, start: "top 90%", end: "top 45%", scrub: 0.5 } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="psd-live">
      <div className={styles.label}><Label>{data.kicker}</Label></div>
      <h2 id="psd-live" className="lm-sr-only">{data.stages.join(", then ")}</h2>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.shot} data-shot>
          <div className={styles.l} data-l><Canvas frame="Home — Desktop" redlines><Site /></Canvas></div>
          <div className={`${styles.l} ${styles.codeL}`} data-l><Code file="index.html" lines={HTML} /></div>
          <div className={styles.l} data-l><Browser url="meridian.example"><Site /></Browser></div>
          <div className={`${styles.l} ${styles.live}`} data-l><ScaledScreen width={1440}><Site /></ScaledScreen></div>
        </div>
      </div>
      <div className={styles.caption} aria-hidden="true"><div className={styles.track} data-track>{data.stages.map((s) => <span key={s}>{s}</span>)}</div></div>
      <ol className={styles.mobile} aria-hidden="true">
        <li data-m><b>{data.stages[0]}</b><Canvas redlines><Site /></Canvas></li>
        <li data-m><b>{data.stages[1]}</b><Code file="index.html" lines={HTML.slice(0, 14)} /></li>
        <li data-m><b>{data.stages[2]}</b><Browser><Site /></Browser></li>
        <li data-m><b>{data.stages[3]}</b><Browser url="meridian.example · live"><Site page="listing" /></Browser></li>
      </ol>
    </section>
  );
}
