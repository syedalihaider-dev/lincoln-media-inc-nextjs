"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import VideoBackground from "@/components/Common/VideoBackground";
import styles from "./Film.module.css";

/**
 * The film. Footage of a parcel moving down a conveyor opens from an inset card to the full screen
 * while the section holds (desktop), then the three lines lift out of their masks one at a time and
 * the explanation settles beneath them. Phones play the same reveal without the hold.
 */
export default function Film({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const lines = gsap.utils.toArray("[data-line]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top top", end: "+=150%", pin: true, scrub: 0.8, anticipatePin: 1 } })
        .fromTo(q("[data-frame]"), { clipPath: "inset(16% 18% 16% 18% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 }, 0)
        .fromTo(q("[data-frame] video"), { scale: 1.25 }, { scale: 1, duration: 1 }, 0)
        .from(lines, { yPercent: 110, duration: 0.35, stagger: 0.22, ease: "power3.out" }, 0.55)
        .from(q("[data-text]"), { opacity: 0, y: 30, duration: 0.3 }, 1.1)
        .to({}, { duration: 0.3 });
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 60%", once: true } })
        .from(lines, { yPercent: 110, duration: 1.2, stagger: 0.12, ease: "expo.out" })
        .from(q("[data-text]"), { opacity: 0, y: 20, duration: 1 }, 0.5);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.film} aria-labelledby="ecom-film">
      <div className={styles.frame} data-frame>
        <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} />
      </div>
      <div className={styles.copy}>
        <h2 id="ecom-film" className={styles.title}>
          {data.lines.map((l) => <span key={l} className={styles.mask}><span data-line>{l}</span></span>)}
        </h2>
        <p className={styles.text} data-text>{data.text}</p>
      </div>
    </section>
  );
}
