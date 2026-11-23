"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./TechnologyArchitecture.module.css";

const ArchitectureScene = dynamic(() => import("./ArchitectureScene"), { ssr: false, loading: () => null });

/**
 * Technology as a digital architecture: the stack drawn as four lit platforms on a core (Three.js).
 * On desktop the stage holds while you scroll through it; each layer in turn lifts and lights in 3D
 * while its technologies set themselves out beside it. Choosing a layer jumps there. Phones: a
 * smaller scene above the four layers, each lighting as it scrolls into view.
 */
export default function TechnologyArchitecture({ data }) {
  const ref = useRef(null);
  const progress = useRef(0);
  const activeRef = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const st = useRef(null);
  const [active, setActive] = useState(0);
  const { ready, scrollTo } = useSiteMotion();
  const small = useMediaQuery("(max-width: 900px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const n = data.layers.length;

  const choose = (i) => { activeRef.current = i; setActive(i); };

  useEffect(() => {
    const move = (e) => { pointer.current = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 }; };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      st.current = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector("[data-track]"), start: "top top", end: "bottom bottom", scrub: true,
          onUpdate: (s) => {
            progress.current = s.progress;
            const k = Math.min(n - 1, Math.floor(s.progress * n));
            if (k !== activeRef.current) { choose(k); sfx("tick"); }
          },
        },
      }).scrollTrigger;
      return () => { st.current = null; };
    });
    mm.add("(max-width: 900px), (prefers-reduced-motion: reduce)", () => {
      const sts = gsap.utils.toArray("[data-layer]", root).map((el, i) => gsap.timeline({ scrollTrigger: { trigger: el, start: "top 65%", end: "bottom 65%", onToggle: (s) => s.isActive && choose(i) } }));
      return () => sts.forEach((t) => t.kill());
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  // Desktop: choosing a layer scrolls to its part of the track
  const jump = (i) => {
    const s = st.current;
    if (!s) return choose(i);
    scrollTo(s.start + ((i + 0.5) / n) * (s.end - s.start));
  };

  return (
    <section ref={ref} id="architecture" className={styles.arch} aria-labelledby="architecture-title">
      <div className={styles.track} data-track>
        <div className={styles.stage}>
          <div className={styles.scene} aria-hidden="true">
            {!reduced && <ArchitectureScene layers={data.layers} active={activeRef} progress={progress} pointer={pointer} small={small} />}
            <span className={styles.halo} />
          </div>

          <div className={styles.copy}>
            <SectionHead kicker={data.kicker} title={data.title} id="architecture-title" />
            <p className={styles.text}>{data.text}</p>
          </div>

          <ol className={styles.layers}>
            {data.layers.map((l, i) => (
              <li key={l.name} className={`${styles.layer} ${i === active ? styles.on : ""}`} data-layer>
                <h3 className={styles.layerTitle}>
                  <button type="button" className={styles.layerHead} onClick={() => jump(i)} aria-expanded={i === active}>
                    <span className={styles.dot} aria-hidden="true" />
                    <span className={styles.nm}>{l.name}</span>
                  </button>
                </h3>
                <ul className={styles.items}>
                  {l.items.map((t, k) => <li key={t} style={{ "--k": k }}>{t}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
