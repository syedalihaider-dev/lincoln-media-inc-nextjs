"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText } from "@/lib/gsap";
import { SITE } from "@/data/site";
import { PSD_PATH } from "@/data/psd-to-html/main";
import { UIUX_PATH } from "@/data/ui-ux/main";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./CTA.module.css";

/**
 * The close: the blueprint becomes the photograph. As you arrive, the service's photograph is shown
 * as a cyanotype — washed blue, grid over it — and as you scroll the grid fades and the photograph
 * develops into full colour from the bottom up, the way a print comes out of the tray. The invitation
 * rises word by word. Below: contact, the PSD-to-HTML page and the related services.
 */
export default function CTA({ service: s, siblings = [] }) {
  const ref = useRef(null);
  const c = s.cta;
  useScene(ref, (mm, root) => {
    const q = (x) => root.querySelector(x);
    mm.add(MOTION, () => {
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", end: "top 10%", scrub: 0.6 } })
        .fromTo(q("[data-colour]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
        .fromTo(q("[data-grid]"), { opacity: 1 }, { opacity: 0.15, ease: "none" }, 0);
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words", mask: "words" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 35%", once: true }, onComplete: () => split.revert() })
        .from(split.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.06 })
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.3);
      return () => split.revert();
    });
  });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="pi-cta">
      <figure className={styles.photo} aria-hidden="true">
        <Image src={c.image} alt="" fill sizes="100vw" quality={78} className={`${styles.img} ${styles.cyan}`} />
        <span className={styles.colour} data-colour><Image src={c.image} alt="" fill sizes="100vw" quality={78} className={styles.img} /></span>
        <span className={styles.grid} data-grid />
        <span className={styles.grade} />
      </figure>
      <div className={styles.inner}>
        <div data-rise><Label>{c.kicker}</Label></div>
        <h2 id="pi-cta" className={styles.title}><span data-l>{c.title[0]}</span><span className={styles.em} data-l>{c.title[1]}</span></h2>
        <p className={styles.text} data-rise>{c.text}</p>
        <div className={styles.actions} data-rise>
          <Button href="/#contact" size="lg">{c.button}</Button>
          <Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button>
        </div>
        <address className={styles.contact} data-rise><a href={`mailto:${SITE.email}`}>{SITE.email}</a><span>{SITE.street}, {SITE.locality}</span></address>
      </div>
      <nav className={styles.links} aria-label="Related design and development services">
        <p>Related services</p>
        <ul>
          <li><a href={PSD_PATH} className={styles.parent}>PSD to Responsive HTML<i aria-hidden="true">→</i></a></li>
          <li><a href={UIUX_PATH}>UI/UX Design<i aria-hidden="true">→</i></a></li>
          {siblings.filter((l) => l.slug !== "psd-to-html").map((l) => <li key={l.path}><a href={l.path}>{l.name}<i aria-hidden="true">→</i></a></li>)}
        </ul>
      </nav>
    </section>
  );
}
