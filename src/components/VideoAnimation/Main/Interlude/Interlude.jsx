"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Clip from "../../kit/Clip";
import styles from "./Interlude.module.css";

/**
 * A scene from the reel: a projector's film held full screen (CSS sticky) while the copy plays out
 * as subtitles — one line at a time, each arriving and leaving with the scroll, the picture slowly
 * pushing in and the letterbox easing open. Reduced motion: the lines sit together over the still.
 */
export default function Interlude({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const lines = gsap.utils.toArray("[data-line]", root);
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6 } });
      tl.fromTo(root.querySelector("video"), { scale: 1.18 }, { scale: 1, ease: "none", duration: lines.length * 2 }, 0)
        .fromTo(root.querySelectorAll("[data-bar]"), { scaleY: 1 }, { scaleY: 0.35, ease: "none", duration: lines.length * 2 }, 0);
      lines.forEach((l, i) => {
        tl.fromTo(l, { autoAlpha: 0, y: 30, filter: "blur(8px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out" }, i * 2 + 0.2);
        if (i < lines.length - 1) tl.to(l, { autoAlpha: 0, y: -24, filter: "blur(6px)", duration: 0.6, ease: "power2.in" }, i * 2 + 1.5);
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.inter} style={{ "--n": data.lines.length }} aria-labelledby="va-inter">
      <div className={styles.stage}>
        <Clip clip={data.video} />
        <span className={styles.shade} aria-hidden="true" />
        <span className={`${styles.bar} ${styles.top}`} data-bar aria-hidden="true" />
        <span className={`${styles.bar} ${styles.bottom}`} data-bar aria-hidden="true" />
        <h2 id="va-inter" className={styles.srOnly}>{data.title}</h2>
        <div className={styles.subs}>
          {data.lines.map((l) => <p key={l} className={styles.line} data-line>{l}</p>)}
        </div>
      </div>
    </section>
  );
}
