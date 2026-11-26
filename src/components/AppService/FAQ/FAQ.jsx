"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Head from "../Head";
import styles from "./FAQ.module.css";

/**
 * Questions as index cards on the blueprint: each card rises into place; opening one unfolds its
 * answer and lights its edge. One open at a time.
 */
export default function FAQ({ data }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(0);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.from(ref.current.querySelectorAll("[data-q]"), { y: 40, rotationX: -20, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: ref.current.querySelector("[data-list]"), start: "top 85%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="faq" className={styles.faq} aria-labelledby="afaq-title">
      <div className={styles.side}>
        <Head kicker={data.kicker} title={data.title} id="afaq-title" />
        <p>Can't see your question?</p>
        <div className={styles.ask}>
          <Button href="/contact-us#contact-form" size="sm">Ask us</Button>
          <Button href={SITE.phoneHref} size="sm" variant="text" icon="phone">{SITE.phone}</Button>
        </div>
      </div>
      <ul className={styles.list} data-list>
        {data.items.map((f, i) => {
          const on = open === i;
          return (
            <li key={f.q} className={`${styles.card} ${on ? styles.on : ""}`} data-q>
              <h3 className={styles.qWrap}>
                <button type="button" className={styles.q} aria-expanded={on} aria-controls={`afaq-${i}`} id={`afaq-q-${i}`} onClick={() => { setOpen(on ? -1 : i); sfx("tick"); }}>
                  <span>{f.q}</span><i aria-hidden="true" />
                </button>
              </h3>
              <div id={`afaq-${i}`} role="region" aria-labelledby={`afaq-q-${i}`} className={styles.a}>
                <div className={styles.aIn}><p>{f.a}</p></div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
