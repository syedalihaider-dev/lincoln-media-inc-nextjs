"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./ServiceIntro.module.css";

/**
 * The service introduction, as an asymmetric editorial spread: the heading runs large across the top,
 * a tall photograph cuts in from the right and overlaps it, a second sits over its corner and a third
 * drifts low on the left; the lead and the copy sit in a narrow column, and the service's points are
 * drawn onto a line that extends as you read.
 */
export default function ServiceIntro({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const figs = gsap.utils.toArray("[data-fig]", root);
      const masks = ["inset(0% 0% 0% 100%)", "inset(100% 0% 0% 0%)", "inset(0% 100% 0% 0%)"];
      figs.forEach((f, i) => {
        gsap.fromTo(f, { clipPath: masks[i] }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: f, start: "top 92%", end: "top 40%", scrub: 0.6 } });
        gsap.fromTo(f.querySelector("img"), { scale: 1.3, yPercent: -6 }, { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(f, { yPercent: [10, 26, -14][i] }, { yPercent: [-10, -26, 14][i], ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.fromTo(root.querySelector("[data-lead]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", scrollTrigger: { trigger: root.querySelector("[data-lead]"), start: "top 80%", once: true } });
      gsap.fromTo(root.querySelector("[data-rail]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-points]"), start: "top 90%", end: "top 55%", scrub: 0.5 } });
      gsap.fromTo(root.querySelectorAll("[data-point]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-points]"), start: "top 80%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const [a, b, c] = data.images;

  return (
    <section ref={ref} id="intro" className={styles.intro} aria-labelledby="intro-title">
      <SectionHead kicker={data.kicker} title={data.title} id="intro-title" className={styles.head} />

      <div className={styles.spread}>
        <figure className={`${styles.fig} ${styles.fa}`} data-fig aria-hidden="true"><Image src={a} alt="" fill sizes="(min-width: 901px) 40vw, 90vw" /></figure>
        <figure className={`${styles.fig} ${styles.fb}`} data-fig aria-hidden="true"><Image src={b} alt="" fill sizes="(min-width: 901px) 18vw, 40vw" /></figure>
        <figure className={`${styles.fig} ${styles.fc}`} data-fig aria-hidden="true"><Image src={c} alt="" fill sizes="(min-width: 901px) 24vw, 60vw" /></figure>

        <div className={styles.copy}>
          <p className={styles.lead} data-lead>{data.lead}</p>
          {data.paragraphs.map((p) => <p key={p} className={styles.p}>{p}</p>)}
          <div className={styles.points} data-points>
            <span className={styles.rail} data-rail aria-hidden="true" />
            <ul className={styles.plist}>{data.points.map((pt) => <li key={pt} data-point><i aria-hidden="true" />{pt}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}
