"use client";
import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import VideoBackground from "@/components/Common/VideoBackground";
import Button from "@/components/Common/Button";
import { SITE } from "@/data/site";
import styles from "./CTA.module.css";

/**
 * Final frame — a street corner in the evening. As it arrives the title switches on word by word,
 * like a shop sign at dusk (a short flicker, then a warm, steady glow), over café tables filling up.
 */
export default function CTA({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const split = SplitText.create(root.querySelector("h2"), { type: "words", wordsClass: styles.word });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 55%", once: true } });
      split.words.forEach((w, i) => {
        tl.fromTo(w, { opacity: 0.08 }, { keyframes: [{ opacity: 0.9, duration: 0.05 }, { opacity: 0.2, duration: 0.06 }, { opacity: 1, duration: 0.08 }], ease: "none" }, 0.2 + i * 0.16)
          .call(() => w.classList.add(styles.lit), null, 0.2 + i * 0.16 + 0.19);
      });
      tl.from(root.querySelectorAll("[data-rise]"), { y: 26, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out" }, "-=0.2");
      gsap.fromTo(root.querySelector("[data-media]"), { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } });
      return () => split.revert();
    });
  }, []);

  return (
    <section ref={ref} className={styles.cta} aria-labelledby="gmb-cta">
      <div className={styles.media} data-media><VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} /></div>
      <div className={styles.inner}>
        <p className={styles.kicker} data-rise>{data.kicker}</p>
        <h2 id="gmb-cta" className={styles.title}>{data.title.map((l) => <span key={l}>{l} </span>)}</h2>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.actions} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
        </div>
      </div>
    </section>
  );
}
