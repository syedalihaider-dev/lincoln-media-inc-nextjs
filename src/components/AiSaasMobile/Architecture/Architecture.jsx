"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/motion";
import { useScene } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import SceneBoundary from "@/components/Common/SceneBoundary";
import styles from "./Architecture.module.css";

const StackScene = dynamic(() => import("./StackScene"), { ssr: false });

/**
 * Product architecture: a product is built in layers. The stage list holds on the left while, on the
 * right, a 3D stack assembles — each stage lands as a flat interface layer on the one below it
 * (wireframes on the idea, services on the wireframes …), the camera turning as it grows.
 */
export default function Architecture({ data }) {
  const ref = useRef(null);
  const progress = useRef(0);
  const active = useRef(0);
  const [at, setAt] = useState(0);
  const small = useMediaQuery("(max-width: 900px)");
  const n = data.steps.length;

  useScene(ref, (mm, root) => {
    mm.add("(prefers-reduced-motion: reduce)", () => { progress.current = 1; active.current = n - 1; setAt(n - 1); });
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: root.querySelector("[data-track]"), start: "top 70%", end: "bottom 70%",
        onUpdate: (st) => {
          progress.current = st.progress;
          const i = Math.min(n - 1, Math.floor(st.progress * n));
          if (i !== active.current) { active.current = i; setAt(i); }
        },
      });
    });
  }, []);

  return (
    <section ref={ref} className={styles.arch} aria-labelledby="ai-arch">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="ai-arch" size="md" className={styles.head} />
      <div className={styles.grid}>
        <div className={styles.track} data-track>
          <ol className={styles.steps}>
            {data.steps.map((s, i) => (
              <li key={s.name} className={`${styles.step} ${i === at ? styles.on : ""} ${i < at ? styles.past : ""}`}>
                <span className={styles.layer} aria-hidden="true">{s.label}</span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.sticky} aria-hidden="true">
          <div className={styles.scene}>
            <SceneBoundary><StackScene steps={data.steps} progress={progress} active={active} small={small} /></SceneBoundary>
          </div>
          <p className={styles.caption}><span>Layer</span> · {data.steps[at].label}</p>
        </div>
      </div>
    </section>
  );
}
