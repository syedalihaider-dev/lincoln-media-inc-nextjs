"use client";
import { useId, useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import styles from "./Faq.module.css";

/**
 * The e-commerce pages' questions. One answer open at a time; the panel unfolds (grid rows) and its
 * words rise in. variant="paper" — the category page: a held heading beside rules that draw across;
 * variant="inner" — the platform pages: full-width rows on ink, each question sliding in from the left.
 * The heading is passed in (each page family has its own).
 */
export default function Faq({ data, head, variant = "paper", prompt = "Something else on your mind?" }) {
  const ref = useRef(null);
  const uid = useId();
  const [open, setOpen] = useState(0);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-q]", ref.current).forEach((el, i) => {
        gsap.timeline({ scrollTrigger: { trigger: el, start: "top 92%", once: true } })
          .from(el.querySelector("[data-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
          .from(el.querySelector("button"), variant === "inner" ? { xPercent: -6, opacity: 0, duration: 1.1, ease: "expo.out" } : { y: 20, opacity: 0, duration: 1, ease: "expo.out" }, 0.2 + (i % 3) * 0.04);
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  // the newly opened answer's lines rise in
  useGSAP(() => {
    if (!ready || open < 0 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const p = ref.current.querySelector(`[data-a="${open}"] p`);
    if (p) gsap.fromTo(p, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0.1 });
  }, { dependencies: [open, ready], scope: ref });

  return (
    <section ref={ref} id="faq" className={`${styles.faq} ${styles[variant]}`} aria-labelledby={head.props?.id}>
      <div className={styles.side}>
        {head}
        <div className={styles.ask}>
          <p>{prompt}</p>
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
                <button type="button" className={styles.q} aria-expanded={on} aria-controls={`${uid}-a${i}`} id={`${uid}-q${i}`} onClick={() => { setOpen(on ? -1 : i); sfx("tick"); }}>
                  <span>{f.q}</span><i aria-hidden="true" />
                </button>
              </h3>
              <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className={styles.a} data-a={i}>
                <div className={styles.aIn}><p>{f.a}</p></div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
