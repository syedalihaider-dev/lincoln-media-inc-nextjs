"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import styles from "./Scale.module.css";

/**
 * Performance & scale — a typographic dial over a data centre. The photograph opens from a slot to
 * full bleed; the seven qualities roll upward through a fixed reading line (scrubbed), the one on
 * the line lit and its practice set beside it. No figures: each quality is described by what we do.
 */
export default function Scale({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const n = data.qualities.length;

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const dial = root.querySelector("[data-dial]");
      const step = () => dial.children[0].offsetHeight;
      // the photograph opens from a slot while the section arrives, so it is full when the dial starts
      gsap.fromTo(root.querySelector("[data-img]"), { clipPath: "inset(22% 30% 22% 30%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", scrollTrigger: { trigger: root, start: "top 85%", end: "top top", scrub: 0.7 } });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true, onUpdate: (st) => setAt(Math.min(n - 1, Math.round(st.progress * (n - 1)))) } })
        .fromTo(root.querySelector("[data-img] img"), { scale: 1.35 }, { scale: 1, duration: 1, ease: "none" }, 0)
        .fromTo(dial, { y: 0 }, { y: () => -step() * (n - 1), duration: 1, ease: "none" }, 0);
    });
  }, []);

  const q = data.qualities[at];
  return (
    <section ref={ref} className={styles.scale} aria-labelledby="ai-scale">
      <div className={styles.sticky}>
        <div className={styles.img} data-img aria-hidden="true">
          <Image src={data.image} alt="" fill sizes="100vw" />
        </div>
        <div className={styles.inner}>
          <Head kicker={data.kicker} title={data.title} text={data.text} id="ai-scale" size="md" className={styles.head} />
          <div className={styles.window}>
            <span className={styles.lineMark} aria-hidden="true" />
            <ul className={styles.dial} data-dial>
              {data.qualities.map((x, i) => <li key={x.name} className={i === at ? styles.on : ""}><h3>{x.name}</h3></li>)}
            </ul>
          </div>
          <div className={styles.detail} aria-live="polite">
            <p key={q.name} className={styles.dText}>{q.text}</p>
          </div>
        </div>
        {/* every practice, for readers and search engines (the dial shows one at a time) */}
        <dl className={styles.sr}>{data.qualities.map((x) => <div key={x.name}><dt>{x.name}</dt><dd>{x.text}</dd></div>)}</dl>
        <p className={styles.sr}>{data.imageAlt}</p>
      </div>
    </section>
  );
}
