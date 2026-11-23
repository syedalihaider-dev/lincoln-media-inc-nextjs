"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import styles from "./ChildCTA.module.css";

/**
 * The closing scene. A real photograph of the work being done opens from a framed window to the full
 * screen as you arrive, settling from a close crop and drifting slower than the page under a dark
 * grade; the invitation arrives letter by letter out of focus; then the ways to answer. Underneath,
 * the parent service's other pages, one step away.
 */
export default function ChildCTA({ data, siblings = [], parent }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-frame]"), { clipPath: "inset(18% 24% 18% 24% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", scrollTrigger: { trigger: root, start: "top 85%", end: "top 15%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-frame] img"), { scale: 1.35, yPercent: -6 }, { scale: 1.04, yPercent: 6, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words,chars" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 45%", once: true }, onComplete: () => split.revert() })
        .from(split.chars, { opacity: 0, filter: "blur(12px)", yPercent: 40, duration: 1.4, ease: "expo.out", stagger: { each: 0.02, from: "start" } })
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.5);
      gsap.from(root.querySelectorAll("[data-sib]"), { y: 16, opacity: 0, duration: 0.8, stagger: 0.03, scrollTrigger: { trigger: root.querySelector("[data-sibs]"), start: "top 95%", once: true } });
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

      {siblings.length > 0 && (
        <nav className={styles.sibs} data-sibs aria-label={`More in ${parent.name}`}>
          <a className={styles.sibsHead} href={parent.href}>More in {parent.name}<i aria-hidden="true">→</i></a>
          <ul>
            {siblings.map((s) => <li key={s.slug} data-sib><a href={s.path}>{s.name}</a></li>)}
          </ul>
        </nav>
      )}
    </section>
  );
}
