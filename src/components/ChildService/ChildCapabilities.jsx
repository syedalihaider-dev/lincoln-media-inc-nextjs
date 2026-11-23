"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import SectionHead from "@/components/InnerServices/SectionHead";
import styles from "./ChildCapabilities.module.css";

/**
 * Capabilities, opened by the scroll. On desktop the row of tall photographs holds and each capability
 * opens in turn as you scroll — the picture widening into colour, its name and detail rising — then
 * closes up as the next one takes its place. Choosing a closed panel scrolls to it. Phones: the panels
 * stack and each one opens as it reaches the middle of the screen. No hover anywhere.
 */
export default function ChildCapabilities({ data }) {
  const ref = useRef(null);
  const st = useRef(null);
  const [active, setActive] = useState(0);
  const { ready, scrollTo } = useSiteMotion();
  const n = data.items.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    let last = 0;
    const set = (k) => { if (k !== last) { last = k; setActive(k); sfx("tick"); } };
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelectorAll("[data-panel]"), { clipPath: "inset(100% 0% 0% 0% round 16px)" }, { clipPath: "inset(0% 0% 0% 0% round 16px)", duration: 1.3, ease: "expo.inOut", stagger: 0.07, scrollTrigger: { trigger: root.querySelector("[data-row]"), start: "top 85%", once: true } });
    });
    mm.add(DESKTOP_MOTION, () => {
      st.current = gsap.timeline({
        scrollTrigger: {
          trigger: root, start: "top top", end: () => `+=${n * innerHeight * 0.55}`, pin: true, scrub: true, anticipatePin: 1, invalidateOnRefresh: true,
          snap: { snapTo: (v) => Math.round(v * (n - 1)) / (n - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.08 },
          onUpdate: (self) => {
            set(Math.min(n - 1, Math.round(self.progress * (n - 1))));
            root.style.setProperty("--p", self.progress.toFixed(3));
          },
        },
      }).scrollTrigger;
      return () => { st.current = null; set(0); };
    });
    // Phones / reduced motion: each panel opens as it crosses the middle of the screen
    mm.add("(max-width: 900px), (prefers-reduced-motion: reduce)", () => {
      const sts = gsap.utils.toArray("[data-panel]", root).map((el, i) => gsap.timeline({ scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 40%", onToggle: (s) => s.isActive && set(i) } }));
      return () => sts.forEach((t) => t.kill());
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  // keyboard / click: scroll to that capability's place in the hold
  const go = (i) => {
    const s = st.current;
    if (s) scrollTo(s.start + (i / (n - 1)) * (s.end - s.start));
    else setActive(i);
  };

  return (
    <section ref={ref} id="capabilities" className={styles.caps} aria-labelledby="capabilities-title">
      <SectionHead kicker={data.kicker} title={data.title} id="capabilities-title" className={styles.head} />

      <ul className={styles.row} data-row>
        {data.items.map((it, i) => {
          const on = i === active;
          return (
            <li key={it.name} className={`${styles.panel} ${on ? styles.on : ""}`} data-panel>
              <button type="button" className={styles.hit} aria-expanded={on} aria-controls={`cap-${i}`} onClick={() => go(i)}>
                <span className="lm-sr-only">{it.name}</span>
              </button>
              <Image src={it.image} alt={it.imageAlt} fill sizes="(max-width: 900px) 92vw, 50vw" className={styles.img} />
              <span className={styles.shade} aria-hidden="true" />
              <span className={styles.vert} aria-hidden="true">{it.name}</span>
              <div id={`cap-${i}`} className={styles.body}>
                <h3 className={styles.name}>{it.name}</h3>
                <p className={styles.text}>{it.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.progress} aria-hidden="true"><span /></div>
    </section>
  );
}
