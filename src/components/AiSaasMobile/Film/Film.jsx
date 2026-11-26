"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import VideoBackground from "@/components/Common/VideoBackground";
import styles from "./Film.module.css";

/**
 * Where it gets made. Footage of the studio opens from a small framed window into full bleed as you
 * scroll (clip-path, scrubbed), drifting slowly in scale; the lines rise one after another, each
 * out of its own mask, once the frame has opened.
 */
export default function Film({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.9 } });
      tl.fromTo(root.querySelector("[data-frame]"), { clipPath: "inset(18% 26% 18% 26% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(root.querySelector("[data-media]"), { scale: 1.3 }, { scale: 1.05, ease: "none", duration: 2 }, 0)
        .from(root.querySelectorAll("[data-l] span"), { yPercent: 110, stagger: 0.12, duration: 0.5, ease: "power3.out" }, 0.75)
        .from(root.querySelector("[data-t]"), { opacity: 0, y: 20, duration: 0.4 }, 1.2)
        .to({}, { duration: 0.4 });
    });
  }, []);

  return (
    <section ref={ref} className={styles.film} aria-labelledby="ai-film">
      <div className={styles.sticky}>
        <div className={styles.frame} data-frame>
          <div className={styles.media} data-media>
            <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} />
          </div>
        </div>
        <div className={styles.copy}>
          <p className={styles.kicker}>{data.kicker}</p>
          <h2 id="ai-film" className={styles.title}>
            {data.lines.map((l) => <span key={l} className={styles.l} data-l><span>{l}</span></span>)}
          </h2>
          <p className={styles.text} data-t>{data.text}</p>
        </div>
      </div>
    </section>
  );
}
