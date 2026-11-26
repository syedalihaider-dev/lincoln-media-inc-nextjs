"use client";
import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { SITE } from "@/data/site";
import { DM_PATH } from "@/data/digital-marketing";
import Button from "@/components/Common/Button";
import { useScene, MOTION, SMALL } from "@/components/DigitalMarketing/shared";
import Visual from "../Visual";
import styles from "./Hero.module.css";

/**
 * The service's opening. The name is set large; below it the service's own lead interface lies
 * tilted back on a lit plinth like a screen on a desk, with two supporting screens beside it.
 * Scrolling stands the screen up to face you while the side screens pull apart and come forward,
 * the name drifts up and loosens, and the light behind moves — no hold, the page keeps flowing.
 */
export default function Hero({ service }) {
  const ref = useRef(null);
  const h = service.hero;

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    mm.add(MOTION, () => {
      const split = SplitText.create(q("[data-title]"), { type: "lines", mask: "lines" });
      gsap.timeline({ delay: 0.1 })
        .from(split.lines, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.1 })
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07 }, 0.3)
        .from(q("[data-plinth]"), { rotationX: 70, y: 120, opacity: 0, duration: 1.8, ease: "expo.out" }, 0.15)
        .from(root.querySelectorAll("[data-side]"), { z: -300, opacity: 0, duration: 1.6, ease: "expo.out", stagger: 0.1 }, 0.4);
      return () => split.revert();
    });

    const scroll = (far) => gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top top", end: "bottom 35%", scrub: 0.8 } })
      .to(q("[data-plinth]"), { rotationX: 3, scale: 1, y: far ? -40 : -10, duration: 1 }, 0)
      .to(q("[data-side='l']"), { xPercent: -26 * far, z: 160 * far, rotationY: 24, duration: 1 }, 0)
      .to(q("[data-side='r']"), { xPercent: 26 * far, z: 160 * far, rotationY: -24, duration: 1 }, 0)
      .to(q("[data-title]"), { yPercent: -18 * far, letterSpacing: "-0.03em", opacity: 0.35, duration: 1 }, 0)
      .to(q("[data-glow]"), { yPercent: 30, scale: 1.4, opacity: 1, duration: 1 }, 0);

    mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => { scroll(1); });
    mm.add(SMALL, () => { scroll(0.4); });
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="ms-title">
      <span className={styles.glow} data-glow aria-hidden="true" />
      <div className={styles.copy}>
        <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href={DM_PATH}>Digital Marketing</a></li>
            <li><span aria-current="page">{service.short}</span></li>
          </ol>
        </nav>
        <h1 id="ms-title" className={styles.title} data-title>{service.name}</h1>
        <div className={styles.row}>
          <p className={styles.headline} data-rise>{h.headline}</p>
          <div className={styles.side}>
            <p className={styles.text} data-rise>{h.text}</p>
            <div className={styles.actions} data-rise>
              <Button href="/contact-us#contact-form" size="lg">{h.cta || "Get a proposal"}</Button>
              <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
            </div>
          </div>
        </div>
        <ul className={styles.tags} data-rise aria-label={`${service.short} services`}>
          {h.tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.plinth} data-plinth>
          <div className={styles.main}><Visual item={{ screen: h.screens[0] }} /></div>
          <div className={`${styles.panel} ${styles.l}`} data-side="l"><Visual item={{ screen: h.screens[1] }} /></div>
          <div className={`${styles.panel} ${styles.r}`} data-side="r"><Visual item={{ screen: h.screens[2] }} /></div>
          <span className={styles.floor} />
        </div>
      </div>
    </section>
  );
}
