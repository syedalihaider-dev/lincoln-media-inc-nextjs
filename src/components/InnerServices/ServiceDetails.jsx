"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./ServiceDetails.module.css";

/**
 * In detail: every area of the service in one band of fixed height. On desktop the areas stand side
 * by side as narrow panels with their names running upright; the open one widens to show its
 * picture, its lead, the detail and the platforms involved. Pointing at a panel (or choosing it)
 * opens it. On phones the same areas stack as an accordion. All of the detail is in the page,
 * none of it adds length.
 */
export default function ServiceDetails({ data }) {
  const ref = useRef(null);
  const timer = useRef(0);
  const [open, setOpen] = useState(0);
  const { ready } = useSiteMotion();
  const hover = useMediaQuery("(hover: hover) and (min-width: 1001px)");

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      // The panels deal out from the left like cards
      gsap.fromTo(root.querySelectorAll("[data-panel]"), { opacity: 0, x: -60, rotationY: 30 }, { opacity: 1, x: 0, rotationY: 0, duration: 1.1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: root.querySelector("[data-panels]"), start: "top 78%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const choose = (i) => { if (i !== open) { setOpen(i); sfx("tick"); } };
  const intent = (i) => { if (!hover) return; clearTimeout(timer.current); timer.current = setTimeout(() => choose(i), 140); };

  return (
    <section ref={ref} id="details" className={styles.details} aria-labelledby="details-title">
      <SectionHead kicker={data.kicker} title={data.title} id="details-title" />

      <div className={styles.panels} data-panels onPointerLeave={() => clearTimeout(timer.current)}>
        {data.areas.map((a, i) => {
          const on = i === open;
          return (
            <article key={a.name} className={`${styles.panel} ${on ? styles.open : ""}`} data-panel onPointerEnter={() => intent(i)}>
              <figure className={styles.bg} aria-hidden="true"><Image src={a.image} alt="" fill sizes="(min-width: 1001px) 50vw, 100vw" loading="lazy" /></figure>
              <h3 className={styles.head}>
                <button type="button" className={styles.trigger} aria-expanded={on} aria-controls={`detail-${i}`} id={`detail-btn-${i}`} onClick={() => choose(i)}>
                  <span className={styles.name}>{a.name}</span>
                  <i className={styles.plus} aria-hidden="true" />
                </button>
              </h3>
              <div className={styles.body} id={`detail-${i}`} role="region" aria-labelledby={`detail-btn-${i}`} hidden={!on && !hover ? true : undefined} aria-hidden={hover && !on ? "true" : undefined}>
                <div className={styles.inner}>
                  <p className={styles.lead}>{a.lead}</p>
                  {a.body.map((p) => <p key={p} className={styles.text}>{p}</p>)}
                  <ul className={styles.tags} aria-label="Platforms and tools">
                    {a.tags.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
