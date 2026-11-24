"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText } from "@/lib/gsap";
import { SITE } from "@/data/site";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import { Ui } from "../ui/Frames";
import { useScene, MOTION, PIN } from "../shared";
import styles from "./CTA.module.css";

/**
 * The close. The photograph — a laptop glowing in the dark — opens out of a small iris as you
 * arrive and sinks slowly back, the growth plan travels forward out of the dark in perspective,
 * the invitation rises letter by letter and the button and contact details follow. Below it,
 * every marketing service, at its own page.
 */
export default function CTA({ data, links = [] }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    mm.add(MOTION, () => {
      gsap.fromTo(q("[data-frame]"), { clipPath: "circle(12% at 70% 60%)" }, { clipPath: "circle(120% at 70% 60%)", ease: "power2.inOut", scrollTrigger: { trigger: root, start: "top 85%", end: "top 10%", scrub: 0.6 } });
      gsap.fromTo(q("[data-frame] img"), { scale: 1.3 }, { scale: 1.04, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } });
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words,chars", mask: "words" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 40%", once: true }, onComplete: () => split.revert() })
        .from(split.chars, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.016 })
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.4)
        .from(q("[data-button]"), { y: 40, scale: 0.9, opacity: 0, duration: 1.1, ease: "back.out(1.6)" }, 0.6);
      return () => split.revert();
    });
    mm.add(PIN, () => {
      gsap.fromTo(q("[data-device]"), { z: -500, rotationX: 28, rotationY: -30, opacity: 0 }, { z: 0, rotationX: 6, rotationY: -14, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: root, start: "top 70%", end: "top top", scrub: 0.8 } });
    });
  });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="cta-title" data-phase="Growth">
      <figure className={styles.frame} data-frame aria-hidden="true">
        <Image src={data.image} alt="" fill sizes="100vw" quality={80} className={styles.img} />
        <span className={styles.grade} />
      </figure>

      <div className={styles.body}>
        <div className={styles.inner}>
          <div data-rise><Label>{data.kicker}</Label></div>
          <h2 id="cta-title" className={styles.title}>
            <span data-l>{data.title[0]}</span>
            <span className={styles.em} data-l>{data.title[1]}</span>
          </h2>
          <p className={styles.text} data-rise>{data.text}</p>
          <div className={styles.actions}>
            <div data-button><Button href={data.primary.href} size="lg">{data.primary.label}</Button></div>
            <div data-rise><Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button></div>
          </div>
          <address className={styles.contact} data-rise>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <span>{SITE.street}, {SITE.locality}</span>
          </address>
        </div>
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.device} data-device><Ui kind="brief" /></div>
        </div>
      </div>

      {links.length > 0 && (
        <nav className={styles.links} aria-label="Digital marketing services">
          <p>Explore our marketing services</p>
          <ul>{links.map((l) => <li key={l.href}><a href={l.href}>{l.name}<i aria-hidden="true">→</i></a></li>)}</ul>
        </nav>
      )}
    </section>
  );
}
