"use client";
import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import VideoBackground from "@/components/Common/VideoBackground";
import styles from "./Open.module.css";

/**
 * Local search — a shop window. The statement is set large on paper; below it, an arched window shows
 * a door sign turning from Closed to Open. Scrolling widens the arch until the footage fills the
 * frame, and the copy that follows sits on the street.
 */
export default function Open({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const split = SplitText.create(root.querySelector("h2"), { type: "words" });
      const small = () => innerWidth <= 900;
      const sticky = root.firstElementChild;
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true } });
      tl.from(split.words, { opacity: 0.12, stagger: 0.04, duration: 0.3, ease: "none" }, 0)
        .fromTo(root.querySelector("[data-arch]"),
          { width: () => (small() ? innerWidth * 0.7 : Math.min(innerWidth * 0.34, 420)), height: () => sticky.offsetHeight * (small() ? 0.4 : 0.46), borderRadius: "999px 999px 18px 18px", bottom: () => sticky.offsetHeight * 0.06 },
          { width: () => innerWidth, height: () => sticky.offsetHeight, borderRadius: "0px 0px 0px 0px", bottom: 0, ease: "power2.inOut", duration: 1 }, 0.55)
        .fromTo(root.querySelector("[data-arch] [data-zoom]"), { scale: 1.25 }, { scale: 1, ease: "none", duration: 1.2 }, 0.55)
        .from(root.querySelectorAll("[data-after]"), { y: 40, opacity: 0, stagger: 0.1, duration: 0.3 }, 1.45)
        .to({}, { duration: 0.3 });
      return () => split.revert();
    });
  }, []);

  return (
    <section ref={ref} className={styles.open} aria-labelledby="gmb-open">
      <div className={styles.sticky}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{data.kicker}</p>
          <h2 id="gmb-open" className={styles.title}>{data.title}</h2>
        </div>
        <div className={styles.arch} data-arch>
          <div className={styles.zoom} data-zoom><VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} tint={false} /></div>
          <div className={styles.grade} aria-hidden="true" />
          <p className={styles.after} data-after>{data.text}</p>
        </div>
      </div>
    </section>
  );
}
