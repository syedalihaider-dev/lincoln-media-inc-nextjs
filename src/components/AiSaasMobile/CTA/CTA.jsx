"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import VideoBackground from "@/components/Common/VideoBackground";
import Button from "@/components/Common/Button";
import { SITE } from "@/data/site";
import styles from "./CTA.module.css";

/**
 * Final frame — a city at night. The footage settles from a slow push-in as you arrive; the two lines
 * of the title travel in from opposite edges and meet; then the studio's button and direct lines.
 */
export default function CTA({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const [a, b] = root.querySelectorAll("[data-l]");
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 90%", end: "center 55%", scrub: 0.9 } })
        .fromTo(root.querySelector("[data-media]"), { scale: 1.25 }, { scale: 1, ease: "none" }, 0)
        .fromTo(a, { xPercent: -18, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "power2.out" }, 0)
        .fromTo(b, { xPercent: 18, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "power2.out" }, 0.05);
      gsap.from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: root, start: "center 75%", once: true } });
    });
  }, []);

  return (
    <section ref={ref} className={styles.cta} aria-labelledby="ai-cta">
      <div className={styles.media} data-media>
        <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} />
      </div>
      <div className={styles.inner}>
        <p className={styles.kicker} data-rise>{data.kicker}</p>
        <h2 id="ai-cta" className={styles.title}>
          {data.title.map((l) => <span key={l} data-l>{l}</span>)}
        </h2>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.actions} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
          <Button href={`mailto:${SITE.email}`} variant="text" icon="mail">{SITE.email}</Button>
        </div>
      </div>
    </section>
  );
}
