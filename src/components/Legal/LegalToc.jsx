"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import s from "./Legal.module.css";

/**
 * "On this page" — the document's own sections. Sticky beside the text on desktop, with the section
 * you're reading highlighted (ScrollTrigger) and a thin progress line; a fold-out list on phones.
 * Links are in-page anchors, so the page's smooth scroller glides to them.
 */
export default function LegalToc({ items }) {
  const { ready } = useSiteMotion();
  const [active, setActive] = useState(items[0]?.id);
  const bar = useRef(null);

  useEffect(() => {
    if (!ready) return;
    const triggers = items.map((it) => {
      const el = document.getElementById(it.id);
      return el && ScrollTrigger.create({
        trigger: el,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (st) => st.isActive && setActive(it.id),
      });
    }).filter(Boolean);
    const doc = document.querySelector("[data-legal-section]")?.parentElement;
    const progress = doc && ScrollTrigger.create({
      trigger: doc,
      start: "top 40%",
      end: "bottom 60%",
      onUpdate: (st) => bar.current && (bar.current.style.transform = `scaleY(${st.progress.toFixed(3)})`),
    });
    return () => { triggers.forEach((t) => t.kill()); progress?.kill(); };
  }, [ready, items]);

  const list = (
    <ol className={s.tocList}>
      {items.map((it) => (
        <li key={it.id}>
          <a href={`#${it.id}`} className={active === it.id ? s.tocOn : undefined} aria-current={active === it.id ? "location" : undefined}>{it.title}</a>
        </li>
      ))}
    </ol>
  );

  return (
    <aside className={s.toc}>
      <nav className={s.tocDesk} aria-label="On this page">
        <p className={s.tocLabel}>On this page</p>
        <div className={s.tocTrack}>
          <span className={s.tocBar} aria-hidden="true"><i ref={bar} /></span>
          {list}
        </div>
      </nav>
      <details className={s.tocMobile}>
        <summary>On this page <span aria-hidden="true">({items.length})</span></summary>
        <nav aria-label="On this page (sections)">{list}</nav>
      </details>
    </aside>
  );
}
