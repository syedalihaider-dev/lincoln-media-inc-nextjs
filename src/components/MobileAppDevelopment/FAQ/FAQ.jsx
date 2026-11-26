"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Head from "../Head";
import styles from "./FAQ.module.css";

/**
 * Questions in one column beside a held heading. Each rule draws itself across as the question
 * arrives; opening one unfolds its answer and turns the marker. One answer open at a time.
 */
export default function FAQ({ data }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(0);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-q]", ref.current).forEach((el) => {
        gsap.timeline({ scrollTrigger: { trigger: el, start: "top 92%", once: true } })
          .from(el.querySelector("[data-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
          .from(el.querySelector("button"), { x: -30, opacity: 0, duration: 1, ease: "expo.out" }, 0.25);
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="faq" className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.side}>
        <Head kicker={data.kicker} title={data.title} id="faq-title" />
        <div className={styles.ask}>
          <p>Something else about your app?</p>
          <Button href="/contact-us#contact-form" size="sm">Ask a question</Button>
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
                <button type="button" className={styles.q} aria-expanded={on} aria-controls={`mfaq-${i}`} id={`mfaq-q-${i}`} onClick={() => { setOpen(on ? -1 : i); sfx("tick"); }}>
                  <span>{f.q}</span><i aria-hidden="true" />
                </button>
              </h3>
              <div id={`mfaq-${i}`} role="region" aria-labelledby={`mfaq-q-${i}`} className={styles.a}>
                <div className={styles.aIn}><p>{f.a}</p></div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
