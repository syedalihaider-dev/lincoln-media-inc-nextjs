"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../../kit/Head";
import styles from "./Process.module.css";

/**
 * The process as a strip of film. A sprocketed strip runs down beside the steps and exposes (fills)
 * as you scroll; each step is a frame that comes into the gate — its name lights, its deliverable is
 * stamped beside it — as it reaches the middle of the screen. The heading holds while the strip runs.
 */
export default function Process({ data, tone }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-exposure]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-steps]"), start: "top 55%", end: "bottom 55%", scrub: 0.4 } });
      gsap.utils.toArray("[data-step]", root).forEach((s) => {
        gsap.timeline({ scrollTrigger: { trigger: s, start: "top 60%", toggleActions: "play none none reverse", toggleClass: { targets: s, className: styles.on } } })
          .from(s.querySelector("[data-out]"), { scale: 0.6, rotate: -8, opacity: 0, duration: 0.6, ease: "back.out(2)" });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="vs-process" className={styles.proc} aria-labelledby="vs-proc">
      <div className={styles.side}>
        <Head kicker={data.kicker} title={data.title} id="vs-proc" tone={tone} />
      </div>
      <div className={styles.reel}>
        <span className={styles.strip} aria-hidden="true"><span className={styles.exposure} data-exposure /></span>
        <ol className={styles.steps} data-steps>
          {data.steps.map((s) => (
            <li key={s.name} className={styles.step} data-step>
              <span className={styles.gate} aria-hidden="true" />
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.text}>{s.text}</p>
              <p className={styles.out} data-out><span>You approve</span>{s.out}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
