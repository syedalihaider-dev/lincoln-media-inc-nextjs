"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { useScene, PIN } from "@/components/DigitalMarketing/shared";
import Visual from "../Visual";
import styles from "./Does.module.css";

const num = (i) => String(i + 1).padStart(2, "0");

/**
 * What the service does, as four panels side by side. Held on desktop: one panel at a time opens
 * wide — its interface sliding into view, its description rising — while the others fold down to
 * narrow strips with their names set vertically. Scrolling hands the width from each panel to the
 * next. Phones and reduced motion: the four stack, each open.
 */
export default function Does({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    mm.add(PIN, () => {
      const panels = gsap.utils.toArray("[data-panel]", root);
      const open = (p, on) => ({ flexGrow: on ? 5 : 1, "--open": on ? 1 : 0 });
      panels.forEach((p, i) => gsap.set(p, open(p, i === 0)));
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 0.6 }, scrollTrigger: { trigger: root, start: "top top", end: `+=${panels.length * 70}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      panels.forEach((p, i) => {
        if (!i) return;
        tl.to(panels[i - 1], open(panels[i - 1], false), i)
          .to(p, open(p, true), i)
          .fromTo(p.querySelector("[data-vis]"), { xPercent: 30, rotationY: -18, transformPerspective: 1400 }, { xPercent: 0, rotationY: 0 }, i);
      });
      tl.to({}, { duration: 0.4 });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ms-does">
      <Head kicker={data.kicker} title={data.title} id="ms-does" className={styles.head} />
      <ol className={styles.panels}>
        {data.items.map((it, i) => (
          <li key={it.name} className={styles.panel} data-panel>
            <p className={styles.spine} aria-hidden="true"><span>{num(i)}</span>{it.name}</p>
            <div className={styles.body}>
              <h3 className={styles.name}><span>{num(i)} —</span> {it.name}</h3>
              <p className={styles.text}>{it.text}</p>
              <div className={styles.vis} data-vis><Visual item={it} sizes="(max-width: 900px) 90vw, 44vw" /></div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
