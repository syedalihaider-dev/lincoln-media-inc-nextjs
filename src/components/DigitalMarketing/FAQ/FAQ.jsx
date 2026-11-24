"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sfx } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Head from "../Head";
import { useScene, MOTION } from "../shared";
import styles from "./FAQ.module.css";

/**
 * Questions beside a held heading. Each question is wiped in from the left as it arrives, its rule
 * drawing across. Opening one tweens its answer open (GSAP height to auto), lifts the answer's
 * lines into place and turns the marker into a minus; the previous answer folds away.
 */
export default function FAQ({ data }) {
  const ref = useRef(null);
  const panels = useRef([]);
  const [open, setOpen] = useState(0);
  const first = useRef(true);
  const prev = useRef(0);

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      gsap.utils.toArray("[data-q]", root).forEach((el) => {
        gsap.timeline({ scrollTrigger: { trigger: el, start: "top 92%", once: true } })
          .fromTo(el.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "expo.inOut" })
          .fromTo(el.querySelector("button"), { clipPath: "inset(0% 100% 0% 0%)", x: -24 }, { clipPath: "inset(0% 0% 0% 0%)", x: 0, duration: 1, ease: "expo.out" }, 0.2);
      });
    });
  });

  useEffect(() => {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    panels.current.forEach((p, i) => {
      if (!p) return;
      const on = i === open;
      if (first.current) { gsap.set(p, { height: on ? "auto" : 0 }); return; }
      // the page below moves when an answer opens or closes, so re-measure the CTA's triggers after
      gsap.to(p, { height: on ? "auto" : 0, duration: still ? 0 : on ? 0.8 : 0.55, ease: on ? "expo.out" : "power3.inOut", overwrite: true, onComplete: on || (open === -1 && i === prev.current) ? () => ScrollTrigger.refresh() : undefined });
      if (on && !still) gsap.fromTo(p.querySelector("p"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0.1 });
    });
    first.current = false;
    prev.current = open;
  }, [open]);

  return (
    <section ref={ref} id="faq" className={styles.faq} aria-labelledby="faq-title" data-phase="Growth">
      <div className={styles.side}>
        <Head kicker={data.kicker} title={data.title} id="faq-title" />
        <div className={styles.ask}>
          <p>Something else about your marketing?</p>
          <Button href="/#contact" size="sm">Ask a question</Button>
          <Button href={SITE.phoneHref} size="sm" variant="text" icon="phone">{SITE.phone}</Button>
        </div>
      </div>
      <ul className={styles.list}>
        {data.items.map((f, i) => {
          const on = open === i;
          return (
            <li key={f.q} className={`${styles.item} ${on ? styles.on : ""}`} data-q>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <h3 className={styles.qWrap}>
                <button type="button" className={styles.q} aria-expanded={on} aria-controls={`dmfaq-${i}`} id={`dmfaq-q-${i}`} onClick={() => { setOpen(on ? -1 : i); sfx("tick"); }}>
                  <span>{f.q}</span><i aria-hidden="true" />
                </button>
              </h3>
              <div id={`dmfaq-${i}`} role="region" aria-labelledby={`dmfaq-q-${i}`} className={styles.a} ref={(el) => (panels.current[i] = el)}>
                <p>{f.a}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
