"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { PROCESS } from "@/data/home";
import RevealText from "@/components/Common/RevealText";
import Label from "@/components/About/Label";
import imgDiscover from "@public/images/services/it-outsourcing.jpg";
import imgStrategy from "@public/images/about/concept-strategy.webp";
import imgDesign from "@public/images/services/ui-ux-design.jpg";
import imgBuild from "@public/images/services/web-development.jpg";
import imgLaunch from "@public/images/services/digital-marketing.jpg";
import styles from "./ProcessPath.module.css";

const PIN = "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";
const IMAGES = [imgDiscover, imgStrategy, imgDesign, imgBuild, imgLaunch];
const EASE = [0.77, 0, 0.18, 1];
// The path the work travels: a long wave across the screen (viewBox 1000 × 300)
const D = "M10 230 C 120 230, 150 90, 250 90 S 380 220, 500 210 S 640 70, 750 80 S 880 210, 990 120";
const AT = [0.05, 0.27, 0.5, 0.73, 0.95]; // where each step sits along it

/**
 * How we work: the studio's five steps on a path. On desktop a cyan path
 * draws itself across the screen and a light travels along it; each step's node lights as the light
 * reaches it, its picture opens above it, and the step's name and line take the stage. Phones: a
 * vertical line through the five. Nothing holds the page; the path draws as the section scrolls by.
 */
export default function ProcessPath() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(PIN, () => {
      const path = root.querySelector("[data-path]");
      const dot = root.querySelector("[data-dot]");
      const nodes = gsap.utils.toArray("[data-node]", root);
      const pin = root.querySelector("[data-pin]");
      const len = path.getTotalLength();
      // place the nodes on the path
      nodes.forEach((n, i) => { const p = path.getPointAtLength(AT[i] * len); n.style.left = `${p.x / 10}%`; n.style.top = `${p.y / 3}%`; });
      let cur = 0;
      ScrollTrigger.create({
        // no pin: the path draws as the section passes through the screen
        trigger: root.querySelector("[data-map]"),
        start: "top 85%",
        end: "bottom 62%",
        scrub: 0.5,
        onUpdate: (s) => {
          const p = s.progress;
          path.style.strokeDashoffset = String(1 - p);
          const pt = path.getPointAtLength(p * len);
          dot.style.left = `${pt.x / 10}%`; dot.style.top = `${pt.y / 3}%`;
          // the travelling glow lives on the .pin background: a non-inheriting property set right there, so
          // the scroll restyles that one background instead of everything inside the section
          pin?.style.setProperty("--path-glow", p.toFixed(4));
          let i = 0;
          AT.forEach((a, k) => { if (p >= a - 0.02) i = k; });
          nodes.forEach((n, k) => n.classList.toggle(styles.reached, k <= i));
          if (i !== cur) { cur = i; setStep(i); sfx("tick"); }
        },
      });
    });
    mm.add("(max-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(root.querySelector("[data-vline]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-list]"), start: "top 70%", end: "bottom 70%", scrub: 0.5 } });
      gsap.utils.toArray("[data-item]", root).forEach((it) => {
        gsap.fromTo(it.querySelectorAll("[data-t]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", stagger: 0.08, scrollTrigger: { trigger: it, start: "top 75%", once: true } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const s = PROCESS[step];

  return (
    <section ref={ref} id="process" className={styles.process} aria-labelledby="process-title">
      <div className={styles.pin} data-pin>
        <div className={styles.topRow}>
        <header className={styles.head}>
          <Label>How we work</Label>
          <RevealText id="process-title" className={styles.title}>Five moves. <em>No wasted ones.</em></RevealText>
        </header>
        <div className={styles.now} aria-live="polite">
            <m.div key={s.title} initial={{ opacity: 0, y: 30, clipPath: "inset(0% 0% 100% 0%)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.7, ease: EASE } }}>
              <h3 className={styles.stepName}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </m.div>
        </div>

        </div>

        {/* Desktop stage */}
        <div className={styles.stage}>
          <div className={styles.map} data-map aria-hidden="true">
            <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className={styles.svg}>
              <path d={D} className={styles.ghostPath} />
              <path d={D} pathLength="1" className={styles.path} data-path />
            </svg>
            <span className={styles.dot} data-dot />
            {PROCESS.map((p, i) => (
              <div key={p.title} className={styles.node} data-node>
                <figure className={styles.thumb}><Image src={IMAGES[i]} alt="" fill sizes="180px" /></figure>
                <i className={styles.diamond} />
                <span className={styles.nodeName}>{p.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet & phone */}
        <div className={styles.list} data-list>
          <span className={styles.vline} aria-hidden="true"><i data-vline /></span>
          <ol className={styles.items}>
          {PROCESS.map((p, i) => (
            <li key={p.title} className={styles.item} data-item>
              <figure className={styles.itemImg} aria-hidden="true"><Image src={IMAGES[i]} alt="" fill sizes="(max-width: 640px) 120px, 200px" /></figure>
              <h3 className={styles.stepName} data-t>{p.title}</h3>
              <p className={styles.stepText} data-t>{p.text}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
