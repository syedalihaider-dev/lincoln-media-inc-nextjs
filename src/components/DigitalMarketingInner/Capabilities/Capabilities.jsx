"use client";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "@/components/DigitalMarketing/Head";
import Visual from "../Visual";
import styles from "./Capabilities.module.css";

// Where the section's light sits for each capability — the background shifts as the list moves on
const LIGHT = [["20%", "30%", "54,228,208"], ["80%", "20%", "59,91,255"], ["70%", "80%", "123,91,255"], ["15%", "75%", "54,228,208"], ["50%", "50%", "59,91,255"], ["85%", "60%", "54,228,208"], ["30%", "10%", "123,91,255"]];

/**
 * The service's capabilities as a long editorial list beside one held picture. As each name crosses
 * the middle of the screen it lights up and steps forward, the picture beside it is replaced
 * through an opening iris, and the section's light moves. Driven by scroll position only (no hover);
 * on phones the picture holds at the top while the list runs beneath it.
 */
export default function Capabilities({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const { ready } = useSiteMotion();

  useEffect(() => {
    if (!ready) return;
    const triggers = [...ref.current.querySelectorAll("[data-cap]")].map((el, i) =>
      ScrollTrigger.create({ trigger: el, start: "top 62%", end: "bottom 62%", onToggle: (self) => self.isActive && setAt(i) })
    );
    return () => triggers.forEach((t) => t.kill());
  }, [ready]);

  const [x, y, rgb] = LIGHT[at % LIGHT.length];
  return (
    <section ref={ref} className={styles.section} style={{ "--lx": x, "--ly": y, "--lc": rgb }} aria-labelledby="ms-caps">
      <span className={styles.light} aria-hidden="true" />
      <Head kicker={data.kicker} title={data.title} id="ms-caps" className={styles.head} />
      <div className={styles.split}>
        <div className={styles.picture} aria-hidden="true">
          {data.items.map((it, i) => (
            <div key={it.name} className={`${styles.vis} ${i === at ? styles.on : ""}`}><Visual item={it} fit={it.image ? "cover" : "frame"} sizes="(max-width: 900px) 90vw, 46vw" /></div>
          ))}
          <p className={styles.count}><b>{data.items[at].name}</b></p>
        </div>
        <ul className={styles.list}>
          {data.items.map((it, i) => (
            <li key={it.name} className={`${styles.item} ${i === at ? styles.active : ""}`} data-cap>
              <h3 className={styles.word}>{it.name}</h3>
              <p className={styles.text}>{it.text}</p>
              {it.href && <a className={styles.link} href={it.href}>{it.linkLabel || "Explore"}<i aria-hidden="true">→</i></a>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
