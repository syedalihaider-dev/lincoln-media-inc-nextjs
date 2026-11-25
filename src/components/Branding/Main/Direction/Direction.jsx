"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import VideoBackground from "@/components/Common/VideoBackground";
import styles from "./Direction.module.css";

/**
 * Creative direction, on set. A tall section with a sticky stage (CSS, not a GSAP pin): the footage of
 * a product shoot grows from a small inset to the full frame as you scroll through, while three huge
 * words — Light. Frame. Tone. — drift at different speeds, one in front of the film and two behind it. The note on direction settles in once the frame is full.
 */
export default function Direction({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      tl.fromTo(q("[data-frame]"), { clipPath: "inset(30% 34% 30% 34% round 18px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }, 0)
        .fromTo(q("[data-frame] video"), { scale: 1.4 }, { scale: 1, duration: 1 }, 0);
      gsap.utils.toArray("[data-word]", root).forEach((w, i) => tl.fromTo(w, { xPercent: [30, -40, 50][i] }, { xPercent: [-50, 30, -30][i], duration: 1 }, 0));
      tl.fromTo(q("[data-note]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.2 }, 0.75);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.dir} aria-labelledby="brand-dir">
      <div className={styles.sticky}>
        <p className={`${styles.word} ${styles.w0}`} data-word aria-hidden="true">{data.words[0]}</p>
        <p className={`${styles.word} ${styles.w2}`} data-word aria-hidden="true">{data.words[2]}</p>
        <div className={styles.frame} data-frame>
          <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} />
        </div>
        <p className={`${styles.word} ${styles.w1}`} data-word aria-hidden="true">{data.words[1]}</p>
        <div className={styles.note} data-note>
          <p className={styles.kicker}>{data.kicker}</p>
          <h2 id="brand-dir">{data.title}</h2>
          <p>{data.text}</p>
        </div>
      </div>
    </section>
  );
}
