"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText } from "@/lib/gsap";
import { SITE } from "@/data/site";
import { UIUX_PATH } from "@/data/ui-ux/main";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import View from "@/components/DesignKit/View";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./CTA.module.css";

const TILES = ["research", "wire", "phone", "sitemap", "PHOTO", "ui", "tokens", "dashboard", "grey"];

/**
 * The close: zooming out of the design file. As you arrive, the frame starts tight on one artboard
 * — the service's photograph — and pulls back until it's one of nine on the canvas, the research
 * board, wireframes, prototype and finished screens all around it. The invitation rises word by
 * word over a darkened edge. Below: ways to reach the studio and the other UI/UX services.
 */
export default function CTA({ service: s, siblings = [] }) {
  const ref = useRef(null);
  const c = s.cta;
  useScene(ref, (mm, root) => {
    const q = (x) => root.querySelector(x);
    mm.add(MOTION, () => {
      gsap.fromTo(q("[data-plane]"), { scale: 3.1 }, { scale: 1, ease: "power2.inOut", scrollTrigger: { trigger: root, start: "top 85%", end: "top 5%", scrub: 0.7 } });
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words", mask: "words" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 30%", once: true }, onComplete: () => split.revert() })
        .from(split.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.06 })
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.3);
      return () => split.revert();
    });
  });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="uxi-cta">
      <div className={styles.canvas} aria-hidden="true">
        <div className={styles.plane} data-plane>
          {TILES.map((t, i) => (
            <div key={i} className={`${styles.tile} ${t === "phone" ? styles.tall : ""}`}>
              {t === "PHOTO" ? <span className={styles.photo}><Image src={c.image} alt="" fill sizes="40vw" quality={78} style={{ objectFit: "cover" }} /></span> : <View view={t} />}
            </div>
          ))}
        </div>
        <span className={styles.shade} />
      </div>

      <div className={styles.inner}>
        <div data-rise><Label>{c.kicker}</Label></div>
        <h2 id="uxi-cta" className={styles.title}><span data-l>{c.title[0]}</span><span className={styles.em} data-l>{c.title[1]}</span></h2>
        <p className={styles.text} data-rise>{c.text}</p>
        <div className={styles.actions} data-rise>
          <Button href="/contact-us#contact-form" size="lg">{c.button}</Button>
          <Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button>
        </div>
        <address className={styles.contact} data-rise><a href={`mailto:${SITE.email}`}>{SITE.email}</a><span>{SITE.street}, {SITE.locality}</span></address>
      </div>

      <nav className={styles.links} aria-label="More UI/UX design services">
        <p>More UI/UX design</p>
        <ul>
          <li><a href={UIUX_PATH} className={styles.parent}>All UI/UX design<i aria-hidden="true">→</i></a></li>
          {siblings.map((l) => <li key={l.path}><a href={l.path}>{l.name}<i aria-hidden="true">→</i></a></li>)}
        </ul>
      </nav>
    </section>
  );
}
