"use client";
import { useState } from "react";
import Image from "next/image";
import { PARTNERS } from "@/data/home";
import SectionLabel from "@/components/Common/SectionLabel";
import RevealText from "@/components/Common/RevealText";
import { sfx } from "@/lib/motion";
import styles from "./Partners.module.css";

/**
 * Chapter X — Partners. Three panels share one row; the one you point at opens wide
 * like a door while the others narrow to a sliver of their name.
 */
export default function Partners() {
  const [open, setOpen] = useState(1);

  return (
    <section id="about" className={styles.section} data-chapter="Partners" data-nav="home" aria-labelledby="partners-title">
      <header className={styles.head}>
        <SectionLabel index="10" tone="dark">Three companies. One ecosystem.</SectionLabel>
        <RevealText id="partners-title" className={styles.title}>
          Our <em>partners.</em>
        </RevealText>
      </header>

      <ul className={styles.row}>
        {PARTNERS.map((p, i) => {
          const Tag = p.href ? "a" : "div";
          const link = p.href ? { href: p.href, target: "_blank", rel: "noopener" } : {};
          return (
            <li key={p.name} className={`${styles.panel} ${open === i ? styles.open : ""}`} onPointerEnter={() => { setOpen(i); sfx("tick"); }}>
              <Tag className={styles.inner} {...link} onFocus={() => setOpen(i)}>
                <Image src={p.image} alt={`${p.name} banner`} fill sizes="(max-width: 900px) 100vw, 60vw" placeholder="blur" className={styles.img} />
                <span className={styles.shade} aria-hidden="true" />
                <span className={styles.no}>0{i + 1}</span>
                <span className={styles.meta}>
                  <b className={styles.name}>{p.name}</b>
                  <small className={styles.role}>{p.role}</small>
                  {p.href && <span className={styles.visit}>Visit <i aria-hidden="true">↗</i><span className="lm-sr-only"> (opens in a new tab)</span></span>}
                </span>
              </Tag>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
