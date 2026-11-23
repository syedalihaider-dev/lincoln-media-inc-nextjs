"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import styles from "./CTA.module.css";

/**
 * The close. The phone that lay on the blueprint all page long finally stands up — rising off the
 * plane as you arrive, its store listing ready — while the invitation rises out of its mask. Below,
 * the parent page and the other mobile services, one step away.
 */
export default function CTA({ data, ui, parent, siblings = [] }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-phone]"), { rotationX: 62, rotationZ: -34, y: 80 }, { rotationX: 8, rotationZ: -6, y: 0, ease: "power2.out", scrollTrigger: { trigger: root, start: "top 85%", end: "center 55%", scrub: 0.8 } });
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words", mask: "words" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 60%", once: true }, onComplete: () => split.revert() })
        .from(split.words, { yPercent: 110, duration: 1.2, ease: "expo.out", stagger: 0.06 })
        .from(root.querySelectorAll("[data-rise]"), { y: 26, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08 }, 0.35);
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="start" className={styles.cta} aria-labelledby="acta-title">
      <div className={styles.main}>
        <div className={styles.copy}>
          <p className={styles.tag} data-rise>{data.kicker}</p>
          <h2 id="acta-title" className={styles.title}>
            <span data-l>{data.title[0]}</span>
            <span data-l className={styles.em}>{data.title[1]}</span>
          </h2>
          <p className={styles.text} data-rise>{data.text}</p>
          <div className={styles.actions} data-rise>
            <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
            <Button href={SITE.phoneHref} variant="outline" size="lg" icon="phone">{SITE.phone}</Button>
          </div>
          <p className={styles.mail} data-rise>or write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        </div>
        <div className={styles.scene} aria-hidden="true">
          <span className={styles.floor} />
          <div className={styles.phone} data-phone>
            <Device platform={ui.platform} depth={14}><Screen><AppScreen kind="store" platform={ui.platform} accent={ui.accent} /></Screen></Device>
          </div>
        </div>
      </div>

      <nav className={styles.sibs} aria-label={`More in ${parent.name}`}>
        <a className={styles.parent} href={parent.href}>All of {parent.name}<i aria-hidden="true">→</i></a>
        <ul>{siblings.map((s) => <li key={s.slug}><a href={s.path}>{s.name}</a></li>)}</ul>
      </nav>
    </section>
  );
}
