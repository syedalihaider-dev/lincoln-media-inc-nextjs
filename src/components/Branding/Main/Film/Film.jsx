"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import VideoBackground from "@/components/Common/VideoBackground";
import styles from "./Film.module.css";

/**
 * Storytelling, over a photo shoot in progress. The footage drifts slower than the page; each line of
 * the statement is wiped open from the left by the scroll itself (no hold), and the paragraph fades up
 * once the last line lands.
 */
export default function Film({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-bg]"), { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray("[data-line]", root).forEach((l, i) => {
        gsap.fromTo(l, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root, start: `top ${70 - i * 12}%`, end: `top ${30 - i * 12}%`, scrub: 0.5 } });
      });
      gsap.from(root.querySelector("[data-text]"), { y: 30, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: root, start: "top 10%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.film} aria-labelledby="brand-film">
      <div className={styles.bg} data-bg><VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} /></div>
      <div className={styles.copy}>
        <h2 id="brand-film" className={styles.title}>{data.lines.map((l) => <span key={l} data-line>{l}</span>)}</h2>
        <p className={styles.text} data-text>{data.text}</p>
      </div>
    </section>
  );
}
