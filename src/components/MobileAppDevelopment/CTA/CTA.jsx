"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import styles from "./CTA.module.css";

/**
 * The close. The photograph — an app in someone's hand — first appears through a window the shape
 * of a phone screen, then opens to fill the screen as you arrive, drifting slower than the page.
 * The invitation rises letter by letter, then the ways to answer and the six mobile services.
 */
export default function CTA({ data, links = [] }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const phone = matchMedia("(max-width: 900px)").matches ? "inset(14% 22% 14% 22% round 40px)" : "inset(8% 40% 8% 40% round 48px)";
      gsap.fromTo(root.querySelector("[data-frame]"), { clipPath: phone }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", scrollTrigger: { trigger: root, start: "top 80%", end: "top 5%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-frame] img"), { scale: 1.3, yPercent: -6 }, { scale: 1.05, yPercent: 6, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words,chars", mask: "words" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 35%", once: true }, onComplete: () => split.revert() })
        .from(split.chars, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.018 })
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.4);
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="cta-title">
      <figure className={styles.frame} data-frame aria-hidden="true">
        <Image src={data.image} alt="" fill sizes="100vw" quality={80} className={styles.img} />
        <span className={styles.grade} />
      </figure>

      <div className={styles.inner}>
        <div data-rise><Label>{data.kicker}</Label></div>
        <h2 id="cta-title" className={styles.title}>
          <span data-l>{data.title[0]}</span>
          <span className={styles.em} data-l>{data.title[1]}</span>
        </h2>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.actions} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button>
        </div>
        <p className={styles.mail} data-rise>or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
      </div>

      {links.length > 0 && (
        <nav className={styles.links} aria-label="Mobile app development services">
          <p>Explore our mobile services</p>
          <ul>{links.map((l) => <li key={l.slug}><a href={l.path}>{l.name}<i aria-hidden="true">→</i></a></li>)}</ul>
        </nav>
      )}
    </section>
  );
}
