"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Process.module.css";

/**
 * How we deliver, as one line drawn down the page. The line grows with the scroll; each stage's
 * marker lights as the line reaches it and its words slide out from the line, alternating sides.
 */
export default function Process({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-line]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-steps]"), start: "top 60%", end: "bottom 60%", scrub: 0.5 } });
      gsap.utils.toArray("[data-step]", root).forEach((s, i) => {
        gsap.timeline({ scrollTrigger: { trigger: s, start: "top 60%", toggleActions: "play none none reverse", onToggle: (st) => s.toggleAttribute("data-on", st.isActive || st.progress > 0) } })
          .from(s.querySelector("[data-body]"), { x: i % 2 ? 40 : -40, opacity: 0, duration: 0.9, ease: "expo.out" });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.process} aria-labelledby="process-title">
      <Head kicker={data.kicker} title={data.title} id="process-title" className={styles.head} />
      <div className={styles.wrap}>
      <span className={styles.track} aria-hidden="true"><span className={styles.line} data-line /></span>
      <ol className={styles.steps} data-steps>
        {data.steps.map((s) => (
          <li key={s.name} className={styles.step} data-step>
            <i className={styles.dot} aria-hidden="true" />
            <div className={styles.body} data-body>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      </div>
    </section>
  );
}
