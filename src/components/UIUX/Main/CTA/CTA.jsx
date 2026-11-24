"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText } from "@/lib/gsap";
import { SITE } from "@/data/site";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import { useScene, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./CTA.module.css";

/**
 * The close, framed like a selected artboard. The studio photograph first sits inside a small frame
 * with selection handles and a size readout; as you arrive it's dragged out to fill the screen — the
 * readout counting up to full width — then the handles fall away and the invitation rises word by
 * word over it. Below: ways to reach the studio and the UI/UX services.
 */
export default function CTA({ data, links = [] }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    mm.add(MOTION, () => {
      const small = matchMedia("(max-width: 900px)").matches;
      const size = { w: small ? 320 : 640, h: small ? 240 : 400 };
      const read = q("[data-size]");
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", end: "top 5%", scrub: 0.6 } })
        .fromTo(q("[data-frame]"), { clipPath: small ? "inset(30% 14% 30% 14% round 4px)" : "inset(28% 30% 28% 30% round 4px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(q("[data-handles]"), { inset: small ? "30% 14% 30% 14%" : "28% 30% 28% 30%" }, { inset: "0% 0% 0% 0%", ease: "power2.inOut", duration: 1 }, 0)
        .to(size, { w: 1440, h: 900, duration: 1, ease: "power2.inOut", onUpdate: () => { read.textContent = `${Math.round(size.w)} × ${Math.round(size.h)}`; } }, 0)
        .to(q("[data-handles]"), { opacity: 0, duration: 0.15 }, 0.9);
      gsap.fromTo(q("[data-frame] img"), { scale: 1.2 }, { scale: 1.02, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } });
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words", mask: "words" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 35%", once: true }, onComplete: () => split.revert() })
        .from(split.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.06 })
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.3);
      return () => split.revert();
    });
  });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="ux-cta">
      <figure className={styles.frame} data-frame aria-hidden="true">
        <Image src={data.image} alt="" fill sizes="100vw" quality={80} className={styles.img} />
        <span className={styles.grade} />
      </figure>
      <span className={styles.handles} data-handles aria-hidden="true"><i /><i /><i /><i /><em data-size>640 × 400</em></span>

      <div className={styles.inner}>
        <div data-rise><Label>{data.kicker}</Label></div>
        <h2 id="ux-cta" className={styles.title}>
          <span data-l>{data.title[0]}</span>
          <span className={styles.em} data-l>{data.title[1]}</span>
        </h2>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.actions} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button>
        </div>
        <address className={styles.contact} data-rise><a href={`mailto:${SITE.email}`}>{SITE.email}</a><span>{SITE.street}, {SITE.locality}</span></address>
      </div>

      {links.length > 0 && (
        <nav className={styles.links} aria-label="UI/UX design services">
          <p>UI/UX services</p>
          <ul>{links.map((l) => <li key={l.path}><a href={l.path}>{l.name}<i aria-hidden="true">→</i></a></li>)}</ul>
        </nav>
      )}
    </section>
  );
}
