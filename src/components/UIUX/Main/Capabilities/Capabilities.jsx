"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import View from "@/components/DesignKit/View";
import { useScene, PIN } from "@/components/DigitalMarketing/shared";
import styles from "./Capabilities.module.css";

/**
 * Capabilities as a typographic index that breathes. Held on desktop: all eight names stand in one
 * column in small type; the active one swells to display size and takes the accent while the one
 * before shrinks back, its description opening beneath it — and in the lens beside, the matching
 * interface rises up from the bottom edge over the previous one.
 * Phones: each capability with its interface, in order.
 */
export default function Capabilities({ data }) {
  const ref = useRef(null);
  const items = data.items;
  useScene(ref, (mm, root) => {
    mm.add(PIN, () => {
      const rows = gsap.utils.toArray("[data-row]", root);
      const lens = gsap.utils.toArray("[data-lens]", root);
      gsap.set(rows, { "--on": 0 });
      gsap.set(rows[0], { "--on": 1 });
      gsap.set(lens.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 0.6 }, scrollTrigger: { trigger: root, start: "top top", end: `+=${items.length * 50}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      items.forEach((_, i) => {
        if (!i) return;
        tl.to(rows[i - 1], { "--on": 0 }, i).to(rows[i], { "--on": 1 }, i)
          .to(lens[i], { clipPath: "inset(0% 0% 0% 0%)" }, i)
          .fromTo(lens[i], { yPercent: 8 }, { yPercent: 0 }, i)
          .to(lens[i - 1], { yPercent: -6, opacity: 0 }, i);
      });
      tl.to({}, { duration: 0.4 });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ux-caps">
      <div className={styles.left}>
        <Head kicker={data.kicker} title={data.title} id="ux-caps" className={styles.head} />
        <ul className={styles.rows}>
          {items.map((c) => (
            <li key={c.name} className={styles.row} data-row>
              <h3 className={styles.name}>{c.name}</h3>
              <div className={styles.more}>
                <p>{c.text}</p>
                {c.href && <a href={c.href}>Explore<i aria-hidden="true">→</i></a>}
              </div>
              <div className={styles.mobileView} aria-hidden="true"><View view={c.view} /></div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.lens} aria-hidden="true">
        {items.map((c) => <div key={c.name} className={`${styles.layer} ${c.view === "phone" ? styles.tall : ""}`} data-lens><View view={c.view} /></div>)}
      </div>
    </section>
  );
}
