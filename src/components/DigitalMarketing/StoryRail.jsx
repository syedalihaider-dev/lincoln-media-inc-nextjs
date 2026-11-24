"use client";
import { useEffect, useState } from "react";
import { useSiteMotion } from "@/lib/motion";
import { DM_STORY } from "@/data/digital-marketing";
import styles from "./StoryRail.module.css";

/**
 * The thread through the page: a small fixed bar naming the chapter of the story you are in —
 * Attention → Strategy → Traffic → Engagement → Conversion → Measurement → Optimization → Growth —
 * with one segment per chapter. Each section declares its chapter with data-phase (a held section
 * may change its own attribute as it plays — see setPhase). On scroll, the section crossing 55% of
 * the viewport wins; a held section is measured by its pin-spacer, so it counts for its whole hold.
 * Hidden over the hero and the footer.
 */
export default function StoryRail() {
  const { ready } = useSiteMotion();
  const [phase, setPhase] = useState(null);

  useEffect(() => {
    if (!ready) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const mid = innerHeight * 0.55;
      let found = null;
      for (const el of document.querySelectorAll("[data-phase]")) {
        const box = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
        const b = box.getBoundingClientRect();
        if (b.top < mid && b.bottom > mid) { found = el.dataset.phase; break; }
      }
      setPhase(found);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    window.addEventListener("dm:phase", queue);
    check();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      window.removeEventListener("dm:phase", queue);
    };
  }, [ready]);

  const at = DM_STORY.indexOf(phase);
  return (
    <div className={`${styles.rail} ${at >= 0 ? styles.show : ""}`} aria-hidden="true">
      <span className={styles.label}>The story</span>
      <ol className={styles.ticks}>
        {DM_STORY.map((p, i) => <li key={p} className={i < at ? styles.past : i === at ? styles.now : ""} />)}
      </ol>
      <span className={styles.name} key={phase}>{phase}</span>
    </div>
  );
}
