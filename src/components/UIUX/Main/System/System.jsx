"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { OnDevice } from "@/components/DesignKit/Devices";
import { Tokens } from "@/components/DesignKit/Artefacts";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./System.module.css";

// Where each part of the page starts before it's assembled: x/y (% of its own size), rotation, scale
const SCATTER = { nav: [-30, -260, -8, 0.8], hero: [40, -40, 6, 0.86], search: [-70, 180, -10, 0.9], cards: [60, 220, 7, 0.84], footer: [-40, 380, -5, 0.9] };

/**
 * A design system becoming a page. On the left, the system's sheet — colour, type, spacing,
 * buttons, inputs, card and states. On the right, held on desktop: the page's own components lie
 * scattered and tilted across the screen, each labelled with its component name; scrolling pulls them
 * one by one into place until they lock together as the finished home page and the labels fall away.
 */
export default function System({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const parts = () => gsap.utils.toArray("[data-build] [data-part]", root);
    mm.add(PIN, () => {
      const ps = parts();
      ps.forEach((p) => { const [x, y, r, s] = SCATTER[p.dataset.part] || [0, 0, 0, 1]; gsap.set(p, { xPercent: x, yPercent: y, rotation: r, scale: s, opacity: 0.85 }); });
      gsap.set(root.querySelectorAll("[data-piece]"), { opacity: 0.25 });
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut", duration: 0.8 }, scrollTrigger: { trigger: root, start: "top top", end: "+=200%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.to(root.querySelectorAll("[data-piece]"), { opacity: 1, stagger: 0.1, duration: 0.3 }, 0);
      ps.forEach((p, i) => tl.to(p, { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, opacity: 1 }, 0.3 + i * 0.35));
      tl.to(root.querySelector("[data-build]"), { "--label": 0, duration: 0.3 }, 0.3 + ps.length * 0.35 + 0.5)
        .fromTo(root.querySelector("[data-done]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, "<");
      return () => gsap.set(ps, { clearProps: "all" });
    });
    mm.add(SMALL, () => {
      parts().forEach((p, i) => gsap.from(p, { x: i % 2 ? 40 : -40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-build]"), start: `top ${80 - i * 4}%`, once: true } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ux-system">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="ux-system" className={styles.head} />
      <div className={styles.grid} aria-hidden="true">
        <div className={styles.sheet}><Tokens /></div>
        <div className={styles.build} data-build>
          <OnDevice page="home" />
          <p className={styles.done} data-done>Assembled from the system</p>
        </div>
      </div>
    </section>
  );
}
