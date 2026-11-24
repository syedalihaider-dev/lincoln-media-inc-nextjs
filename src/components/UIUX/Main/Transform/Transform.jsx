"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import { OnDevice } from "@/components/DesignKit/Devices";
import Canvas from "@/components/DesignKit/Canvas";
import Site from "@/components/DesignKit/Site";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Transform.module.css";

// Prototype hotspots over the page (% of the browser): the links a prototype makes clickable
const HOTSPOTS = [[86.5, 9.5, 11, 5], [3.4, 45.5, 11, 5], [84, 73, 12, 7], [3.4, 86, 30, 14]];

/**
 * Wireframe → Interface → Prototype → Experience as one cinematic shot. Held on desktop: the grey
 * wireframe opens into the designed interface through an iris centred on its main button; a diagonal
 * wipe turns that into the clickable prototype, hotspots pulsing over every link; then the finished
 * page pushes in until it fills the screen and the frame disappears. A large caption rolls to name
 * each stage. Phones: the four stages as a short vertical sequence.
 */
export default function Transform({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    mm.add(PIN, () => {
      const L = gsap.utils.toArray("[data-l]", root);
      gsap.set(L[1], { clipPath: "circle(0% at 9% 48%)" });
      gsap.set(L[2], { clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)" });
      gsap.set(L[3], { autoAlpha: 0 });
      gsap.set(root.querySelectorAll("[data-hot]"), { scale: 0, opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root, start: "top top", end: "+=300%", pin: true, scrub: 0.9, anticipatePin: 1 } });
      tl.fromTo(q("[data-shot]"), { scale: 0.86, rotationX: 10 }, { scale: 0.92, rotationX: 0, duration: 1, ease: "none" }, 0)
        .to(L[1], { clipPath: "circle(150% at 9% 48%)", duration: 1 }, 0.3)
        .to(q("[data-reel]"), { yPercent: -25, duration: 0.4 }, 0.6)
        .to(L[2], { clipPath: "polygon(0% 0%, 220% 0%, 0% 220%, 0% 100%)", duration: 1 }, 1.4)
        .to(root.querySelectorAll("[data-hot]"), { scale: 1, opacity: 1, stagger: 0.08, duration: 0.3, ease: "back.out(2)" }, 2.1)
        .to(q("[data-reel]"), { yPercent: -50, duration: 0.4 }, 1.7)
        .to(L[3], { autoAlpha: 1, duration: 0.3 }, 2.8)
        .to(q("[data-shot]"), { scale: 1.34, duration: 1.1 }, 2.9)
        .to(q("[data-label]"), { opacity: 0, duration: 0.3 }, 2.9)
        .to(q("[data-reel]"), { yPercent: -75, duration: 0.4 }, 3.0)
        .to({}, { duration: 0.3 });
    });
    mm.add(SMALL, () => {
      gsap.utils.toArray("[data-m]", root).forEach((m, i) => gsap.fromTo(m, { clipPath: i % 2 ? "circle(0% at 50% 50%)" : "inset(0% 100% 0% 0%)" }, { clipPath: i % 2 ? "circle(80% at 50% 50%)" : "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: m, start: "top 90%", end: "top 45%", scrub: 0.5 } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ux-transform">
      <div className={styles.label} data-label><Label>{data.kicker}</Label></div>
      <h2 id="ux-transform" className={styles.caption}>
        <span className="lm-sr-only">{data.title.join(", then ")}</span>
        <span className={styles.slot} aria-hidden="true"><span className={styles.reel} data-reel>{data.title.map((t) => <span key={t}>{t}</span>)}</span></span>
      </h2>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.shot} data-shot>
          <div className={styles.l} data-l><OnDevice page="home" fid="wire" /></div>
          <div className={styles.l} data-l><Canvas frame="Home — Desktop" redlines select={{ left: 3.6, top: 40, width: 44, height: 20, label: "Hero / Headline" }}><Site /></Canvas></div>
          <div className={styles.l} data-l>
            <OnDevice page="home" />
            {HOTSPOTS.map(([x, y, w, h], i) => <span key={i} className={styles.hot} style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }} data-hot />)}
          </div>
          <div className={styles.l} data-l><div className={styles.final}><ScaledScreen width={1280}><Site page="home" /></ScaledScreen></div></div>
        </div>
      </div>

      <ol className={styles.mobile} aria-hidden="true">
        <li data-m><b>{data.title[0]}</b><OnDevice page="home" fid="wire" /></li>
        <li data-m><b>{data.title[1]}</b><Canvas redlines><Site /></Canvas></li>
        <li data-m><b>{data.title[2]}</b><OnDevice page="home" fid="grey" /></li>
        <li data-m><b>{data.title[3]}</b><OnDevice device="phone" page="home" /></li>
      </ol>
    </section>
  );
}
