"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./PerformanceSection.module.css";

// A loading waterfall: each asset's bar starts and ends at its own moment (shape only, no figures)
const WATERFALL = [
  { name: "document", s: 0, w: 14 },
  { name: "styles", s: 10, w: 12 },
  { name: "fonts", s: 14, w: 16 },
  { name: "hero image", s: 18, w: 22 },
  { name: "scripts", s: 22, w: 18 },
  { name: "images (lazy)", s: 46, w: 28 },
];

/**
 * Quality under the surface: a build console. As the section scrolls, the checks run one after
 * another and tick green, while a waterfall of page assets draws itself — critical files first,
 * images loading later and lazily. The qualities themselves sit alongside in plain words.
 */
export default function PerformanceSection({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const checks = gsap.utils.toArray("[data-check]", root);
    const items = gsap.utils.toArray("[data-item]", root);
    const mark = (k) => {
      checks.forEach((c, i) => c.classList.toggle(styles.done, i < k));
      items.forEach((c, i) => c.classList.toggle(styles.done, i < k));
    };
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector("[data-console]"), start: "top 80%", end: "bottom 45%", scrub: 0.6,
          onUpdate: (st) => mark(Math.round(st.progress * checks.length)),
        },
      });
      tl.fromTo(root.querySelectorAll("[data-bar]"), { scaleX: 0 }, { scaleX: 1, ease: "power1.out", stagger: 0.12, duration: 0.4 }, 0);
      return () => mark(checks.length);
    });
    mm.add("(prefers-reduced-motion: reduce)", () => mark(checks.length));
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="quality" className={styles.quality} aria-labelledby="quality-title">
      <div className={styles.copy}>
        <SectionHead kicker={data.kicker} title={data.title} id="quality-title" />
        <p className={styles.text}>{data.text}</p>
        <ul className={styles.items}>
          {data.items.map((it) => (
            <li key={it.name} className={styles.item} data-item>
              <span className={styles.tick} aria-hidden="true" />
              <h3>{it.name}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.console} data-console aria-hidden="true">
        <p className={styles.bar}><i /><i /><i /><span>build · yourbrand.com</span></p>
        <div className={styles.body}>
          <ul className={styles.checks}>
            {data.items.map((it) => (
              <li key={it.name} data-check><b>›</b> check <em>{it.name.toLowerCase()}</em><span className={styles.ok}>passed</span></li>
            ))}
          </ul>
          <div className={styles.fall}>
            <p className={styles.fallHead}>page load</p>
            {WATERFALL.map((w) => (
              <div key={w.name} className={styles.row}>
                <span>{w.name}</span>
                <span className={styles.lane}><i data-bar style={{ left: `${w.s}%`, width: `${w.w}%` }} /></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
