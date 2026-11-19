"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { CLIENTS } from "@/data/home";
import SectionLabel from "@/components/Common/SectionLabel";
import styles from "./Clients.module.css";

function Row({ names, outline, dir }) {
  // Two identical halves make the loop seamless
  const half = (h) => names.flatMap((n) => [<span key={`${h}${n}`}>{n}</span>, <b key={`${h}${n}*`}>✦</b>]);
  return (
    <div className={`${styles.marquee} ${outline ? styles.outline : ""}`} data-dir={dir} aria-hidden="true">
      <div className={styles.track} data-track>{half("a")}{half("b")}</div>
    </div>
  );
}

/**
 * Chapter XI — Brands we've moved. Two rows run against each other; scrolling fast pushes them
 * faster and leans the letters, then they settle back to a drift.
 */
export default function Clients() {
  const ref = useRef(null);
  const { ready, lenis } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rows = gsap.utils.toArray("[data-dir]", ref.current).map((m) => ({ track: m.querySelector("[data-track]"), dir: +m.dataset.dir, x: 0 }));
    let boost = 0, skew = 0, visible = false;
    const onScroll = (e) => { boost = Math.min(40, Math.abs(e.velocity)); skew = Math.max(-10, Math.min(10, e.velocity * 0.35)); };
    lenis?.on("scroll", onScroll);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(ref.current);
    const tick = (t, dt) => {
      boost *= 0.93; skew *= 0.9;
      if (!visible) return;
      rows.forEach((r) => {
        const half = r.track.scrollWidth / 2;
        r.x -= r.dir * (0.05 + boost * 0.018) * dt;
        if (r.x <= -half) r.x += half;
        if (r.x > 0) r.x -= half;
        r.track.style.transform = `translate3d(${r.x}px,0,0) skewX(${(-skew * r.dir).toFixed(2)}deg)`;
      });
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); io.disconnect(); lenis?.off?.("scroll", onScroll); };
  }, { dependencies: [ready, lenis], scope: ref });

  return (
    <section ref={ref} id="clients" className={styles.section} data-chapter="Clients" data-nav="home" aria-labelledby="clients-title">
      <div className={styles.head}>
        <SectionLabel index="11" tone="light">Brands we&apos;ve moved</SectionLabel>
        <h2 id="clients-title" className="lm-sr-only">Brands we&apos;ve moved</h2>
        <ul className="lm-sr-only">{CLIENTS.map((c) => <li key={c}>{c}</li>)}</ul>
      </div>
      <Row names={CLIENTS} dir={1} />
      <Row names={[...CLIENTS].reverse()} outline dir={-1} />
    </section>
  );
}
