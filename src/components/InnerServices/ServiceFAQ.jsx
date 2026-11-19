"use client";
import { useState } from "react";
import { sfx } from "@/lib/motion";
import { SITE } from "@/data/site";
import ServiceButton from "./ServiceButton";
import SectionHead from "./SectionHead";
import styles from "./ServiceFAQ.module.css";

/**
 * Questions, answered: the heading holds still on one side with a way to ask your own; the questions
 * sit as large rows on the other. Opening one unfolds its answer to its natural height while a cyan
 * line draws beneath it and the question steps in; one answer is open at a time.
 */
export default function ServiceFAQ({ data }) {
  const [open, setOpen] = useState(0);
  const toggle = (i) => { setOpen(open === i ? -1 : i); sfx("tick"); };

  return (
    <section id="faq" className={styles.faq} aria-labelledby="faq-title">
      <div className={styles.side}>
        <SectionHead kicker={data.kicker} title={data.title} id="faq-title" />
        <p className={styles.ask}>Something else on your mind? Speak to an expert.</p>
        <div className={styles.sideActions}>
          <ServiceButton href="/#contact">Ask a question</ServiceButton>
          <ServiceButton href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</ServiceButton>
        </div>
      </div>

      <ul className={styles.list}>
        {data.items.map((f, i) => {
          const isOpen = open === i;
          return (
            <li key={f.q} className={`${styles.item} ${isOpen ? styles.open : ""}`}>
              <h3 className={styles.qWrap}>
                <button type="button" className={styles.q} aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => toggle(i)}>
                  <span>{f.q}</span>
                  <i className={styles.icon} aria-hidden="true" />
                </button>
              </h3>
              <div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className={styles.a}>
                <div className={styles.aInner}><p>{f.a}</p></div>
              </div>
              <span className={styles.line} aria-hidden="true" />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
