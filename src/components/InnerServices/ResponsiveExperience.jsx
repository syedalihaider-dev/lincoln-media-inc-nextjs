"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import MockSite from "./MockSite";
import ScaledScreen from "./ScaledScreen";
import styles from "./ResponsiveExperience.module.css";

// Each device renders the same page at its real width, so each shows its own genuine layout
const DEVICES = [
  { key: "monitor", width: 1440 },
  { key: "laptop", width: 1280 },
  { key: "tablet", width: 820 },
  { key: "phone", width: 390 },
];

/**
 * "One digital experience. Every screen." A monitor, a laptop, a tablet and a phone all show the
 * same website — really rendered at each device's width, so the layout reflows from four columns to
 * one. They arrive stacked as a single screen in the middle and fan out into the composition as the
 * section scrolls in, then drift at their own depths as it scrolls on.
 */
export default function ResponsiveExperience({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const stage = root.querySelector("[data-stage]");
    const devices = gsap.utils.toArray("[data-device]", root);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-head]"), { type: "words,chars", mask: "chars" });
      gsap.from(split.chars, { yPercent: 110, duration: 1, ease: "expo.out", stagger: 0.015, scrollTrigger: { trigger: root, start: "top 75%", once: true } });
      gsap.from(root.querySelectorAll("[data-point]"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, scrollTrigger: { trigger: root.querySelector("[data-points]"), start: "top 90%", once: true } });
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      // from one stacked screen in the middle to the composition
      // layout offsets, not screen rects: they ignore the transforms this timeline applies
      const toCenter = (el, axis) => axis === "x" ? stage.offsetWidth / 2 - (el.offsetLeft + el.offsetWidth / 2) : stage.offsetHeight / 2 - (el.offsetTop + el.offsetHeight / 2);
      const tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top 90%", end: "center 55%", scrub: 0.8, invalidateOnRefresh: true } });
      tl.fromTo(stage, { rotationX: 18 }, { rotationX: 0, ease: "none" }, 0);
      devices.forEach((d, i) => tl.fromTo(d, { x: () => toCenter(d, "x"), y: () => toCenter(d, "y"), scale: 0.7, rotationY: (i % 2 ? 1 : -1) * 20 }, { x: 0, y: 0, scale: 1, rotationY: 0, ease: "power2.out" }, 0));
      // then each drifts at its own depth
      devices.forEach((d, i) => gsap.to(d.firstElementChild, { yPercent: [-3, -5, -8, -12][i], ease: "none", scrollTrigger: { trigger: stage, start: "center 55%", end: "bottom top", scrub: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="responsive" className={styles.resp} aria-labelledby="responsive-title">
      <div className={styles.copy}>
        <div className={styles.headCol}>
          <Label>{data.kicker}</Label>
          <h2 id="responsive-title" className={styles.title}>
            <span data-head>{data.title[0]}</span>
            <span className={styles.em} data-head>{data.title[1]}</span>
          </h2>
        </div>
        <div className={styles.textCol}>
          <p className={styles.text}>{data.text}</p>
          <ul className={styles.points} data-points>
            {data.points.map((p) => <li key={p.name} data-point><h3>{p.name}</h3><p>{p.text}</p></li>)}
          </ul>
        </div>
      </div>

      <div className={styles.stageWrap} aria-hidden="true">
        <div className={styles.stage} data-stage>
          {DEVICES.map((d) => (
            <div key={d.key} className={`${styles.device} ${styles[d.key]}`} data-device>
              <div className={styles.body}>
                <div className={styles.screen}>
                  <ScaledScreen width={d.width}><MockSite image={data.image} url={data.url} chrome={d.key !== "phone"} sizes="30vw" /></ScaledScreen>
                </div>
                {d.key === "laptop" && <span className={styles.base} />}
                {d.key === "monitor" && <span className={styles.stand} />}
                <span className={styles.label}>{d.key}</span>
              </div>
            </div>
          ))}
        </div>
        <span className={styles.floor} />
      </div>
    </section>
  );
}
