"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText } from "@/lib/gsap";
import { SITE } from "@/data/site";
import { DM_PATH } from "@/data/digital-marketing";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import Visual from "../Visual";
import { useScene, MOTION, PIN } from "@/components/DigitalMarketing/shared";
import styles from "./CTA.module.css";

/**
 * The close, as a letterbox opening. The service's photograph first shows as a thin band across the
 * dark and opens to the full frame as you arrive, sinking slowly behind the page. The invitation
 * rises word by word, and on desktop one of the service's screens floats in from depth beside it.
 * Below: the ways to reach the studio, and the other marketing services.
 */
export default function CTA({ service, siblings = [] }) {
  const ref = useRef(null);
  const c = service.cta;

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    mm.add(MOTION, () => {
      gsap.fromTo(q("[data-frame]"), { clipPath: "inset(47% 0% 47% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", scrollTrigger: { trigger: root, start: "top 85%", end: "top 15%", scrub: 0.6 } });
      gsap.fromTo(q("[data-frame] img"), { scale: 1.25, yPercent: -6 }, { scale: 1.04, yPercent: 6, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words", mask: "words" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 40%", once: true }, onComplete: () => split.revert() })
        .from(split.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.05 })
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.3);
      return () => split.revert();
    });
    mm.add(PIN, () => {
      gsap.fromTo(q("[data-float]"), { z: -600, rotationY: -34, rotationX: 16, opacity: 0 }, { z: 0, rotationY: -16, rotationX: 6, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: root, start: "top 70%", end: "top 5%", scrub: 0.8 } });
    });
  });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="ms-cta">
      <figure className={styles.frame} data-frame aria-hidden="true">
        <Image src={c.image} alt="" fill sizes="100vw" quality={80} className={styles.img} />
        <span className={styles.grade} />
      </figure>

      <div className={styles.body}>
        <div className={styles.inner}>
          <div data-rise><Label>{c.kicker || "Start your project"}</Label></div>
          <h2 id="ms-cta" className={styles.title}>
            <span data-l>{c.title[0]}</span>
            <span className={styles.em} data-l>{c.title[1]}</span>
          </h2>
          <p className={styles.text} data-rise>{c.text}</p>
          <div className={styles.actions} data-rise>
            <Button href="/contact-us#contact-form" size="lg">{c.button || "Start a project"}</Button>
            <Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button>
          </div>
          <address className={styles.contact} data-rise>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>{SITE.street}, {SITE.locality}</span>
          </address>
        </div>
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.float} data-float><Visual item={{ screen: c.screen }} /></div>
        </div>
      </div>

      <nav className={styles.links} aria-label="More digital marketing services">
        <p>More digital marketing</p>
        <ul>
          <li><a href={DM_PATH} className={styles.parent}>All digital marketing<i aria-hidden="true">→</i></a></li>
          {siblings.map((l) => <li key={l.path}><a href={l.path}>{l.name}<i aria-hidden="true">→</i></a></li>)}
        </ul>
      </nav>
    </section>
  );
}
