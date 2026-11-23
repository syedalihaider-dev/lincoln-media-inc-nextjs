"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import SectionHead from "./SectionHead";
import PanelCanvas from "./PanelCanvas";
import styles from "./ServiceCapabilities.module.css";

/**
 * Capabilities, in detail. A workbench holds still on one side: a deck of interface panels — site
 * map, wireframe, code, integrations, a growth chart — over a photograph. As each capability's
 * copy scrolls past on the other side, its panel is dealt to the front, the rest fan back in depth,
 * and the photograph changes beneath. Phones: each capability carries its own panel inline.
 */
export default function ServiceCapabilities({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const n = data.items.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const blocks = gsap.utils.toArray("[data-cap]", root);
    const sts = blocks.map((b, i) => gsap.timeline({ scrollTrigger: { trigger: b, start: "top 55%", end: "bottom 55%", onToggle: (st) => st.isActive && setActive(i) } }));
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      blocks.forEach((b) => {
        gsap.from(b.querySelectorAll("[data-in]"), { x: 40, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: b, start: "top 80%", once: true } });
        gsap.fromTo(b.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: b, start: "top 75%", end: "top 40%", scrub: true } });
      });
    });
    return () => { mm.revert(); sts.forEach((t) => t.kill()); };
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="capabilities" className={styles.caps} aria-labelledby="capabilities-title">
      <SectionHead kicker={data.kicker} title={data.title} id="capabilities-title" className={styles.head} />

      <div className={styles.grid}>
        <div className={styles.bench} aria-hidden="true">
          <div className={styles.photos}>
            {data.items.map((it, i) => (
              <Image key={it.name} src={it.image} alt="" fill sizes="(max-width: 900px) 1px, 44vw" className={`${styles.photo} ${i === active ? styles.shown : ""}`} />
            ))}
          </div>
          <div className={styles.deck}>
            {data.items.map((it, i) => {
              const d = (i - active + n) % n; // 0 = front
              return (
                <div key={it.name} className={styles.card} style={{ "--d": d, zIndex: n - d }}>
                  <PanelCanvas kind={it.visual} label={it.name.toLowerCase()} width={560} height={380} />
                </div>
              );
            })}
          </div>
          <p className={styles.readout}><i />{data.items[active].name}</p>
        </div>

        <div className={styles.list}>
          {data.items.map((it, i) => (
            <article key={it.name} className={`${styles.cap} ${i === active ? styles.on : ""}`} data-cap>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <div className={styles.inline} aria-hidden="true"><PanelCanvas kind={it.visual} label={it.name.toLowerCase()} width={560} height={380} /></div>
              <h3 className={styles.name} data-in>{it.name}</h3>
              <p className={styles.lead} data-in>{it.lead}</p>
              <p className={styles.text} data-in>{it.text}</p>
              <ul className={styles.tags} data-in>{it.tags.map((t) => <li key={t}>{t}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
