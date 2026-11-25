"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Clip from "../../kit/Clip";
import styles from "./Showcase.module.css";

/**
 * Visual showcase — the service's footage opened through an iris as you scroll (a circle growing from
 * the centre to the full frame, the old film transition), held while a row of edit markers along the
 * foot lights up one stage at a time.
 */
export default function Showcase({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const marks = gsap.utils.toArray("[data-mark]", root);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.6 } })
        .fromTo(root.querySelector("[data-iris]"), { clipPath: "circle(9% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "power2.inOut", duration: 1 })
        .from(root.querySelectorAll("[data-copy] > *"), { y: 40, opacity: 0, stagger: 0.1, duration: 0.4 }, 0.55);
      // the markers light in turn while the shot holds
      marks.forEach((m, i) => tl.fromTo(m, { opacity: 0.35, "--fill": 0 }, { opacity: 1, "--fill": 1, duration: 0.22, ease: "none" }, 1.05 + i * 0.25));
      tl.to({}, { duration: 0.2 });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.show} aria-labelledby="vs-show">
      <div className={styles.stage}>
        <div className={styles.iris} data-iris>
          <Clip clip={data.video} label={data.text} />
          <span className={styles.shade} aria-hidden="true" />
        </div>
        <div className={styles.copy} data-copy>
          <p className={styles.kicker}><i aria-hidden="true" />{data.kicker}</p>
          <h2 id="vs-show" className={styles.title}>{data.title}</h2>
          <p className={styles.text}>{data.text}</p>
        </div>
        <ol className={styles.marks} aria-label="Stages shown">
          {data.captions.map((c) => <li key={c} data-mark><span />{c}</li>)}
        </ol>
      </div>
    </section>
  );
}
