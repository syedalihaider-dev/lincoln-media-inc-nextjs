"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import SectionHead from "@/components/InnerServices/SectionHead";
import styles from "./ChildFAQ.module.css";

/**
 * Questions in two compact columns. Each row fills with light from the left as you point at it;
 * opening one unfolds its answer to its natural height while the marker turns, and only one answer is
 * open at a time, so the section never grows long.
 */
export default function ChildFAQ({ data }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(0);
  const { ready } = useSiteMotion();
  const half = Math.ceil(data.items.length / 2);
  const cols = [data.items.slice(0, half), data.items.slice(half)];

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.from(ref.current.querySelectorAll("[data-q]"), { y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: ref.current.querySelector("[data-cols]"), start: "top 85%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const toggle = (i) => { setOpen(open === i ? -1 : i); sfx("tick"); };

  return (
    <section ref={ref} id="faq" className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.top}>
        <SectionHead kicker={data.kicker} title={data.title} id="faq-title" />
        <div className={styles.ask}>
          <p>Something else on your mind?</p>
          <Button href="/contact-us#contact-form" size="sm">Ask a question</Button>
          <Button href={SITE.phoneHref} size="sm" variant="text" icon="phone">{SITE.phone}</Button>
        </div>
      </div>

      <div className={styles.cols} data-cols>
        {cols.map((col, c) => (
          <ul key={c} className={styles.list}>
            {col.map((f, j) => {
              const i = c * half + j, on = open === i;
              return (
                <li key={f.q} className={`${styles.item} ${on ? styles.on : ""}`} data-q>
                  <h3 className={styles.qWrap}>
                    <button type="button" className={styles.q} aria-expanded={on} aria-controls={`cfaq-${i}`} id={`cfaq-q-${i}`} onClick={() => toggle(i)}>
                      <span>{f.q}</span>
                      <i aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={`cfaq-${i}`} role="region" aria-labelledby={`cfaq-q-${i}`} className={styles.a}>
                    <div className={styles.aIn}><p>{f.a}</p></div>
                  </div>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}
