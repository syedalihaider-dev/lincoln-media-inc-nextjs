"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Clip from "../../kit/Clip";
import styles from "./CTA.module.css";

/**
 * The service close: a split frame — the title on a solid band that wipes in from the left, the
 * service's footage beside it — then the actions and the way on to the other service and the
 * Video & Animation page.
 */
export default function CTA({ data, siblings }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-line]"), { type: "words,chars", mask: "chars" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 70%", once: true } })
        .fromTo(root.querySelector("[data-band]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" })
        .fromTo(root.querySelector("[data-film]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0.15)
        .from(split.chars, { yPercent: 110, duration: 1.1, stagger: 0.025 }, 0.7)
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 1);
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.cta} aria-labelledby="vs-cta">
      <div className={styles.band} data-band>
        <h2 id="vs-cta" className={styles.title}>
          {data.title.map((l, i) => <span key={l} className={`${styles.tl} ${i === data.title.length - 1 ? styles.accent : ""}`} data-line>{l}</span>)}
        </h2>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.actions} data-rise>
          <Button href="/#contact" size="lg">Start your video</Button>
          <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
        </div>
        <nav className={styles.more} aria-label="More from Video & Animation" data-rise>
          {siblings.map((s) => <a key={s.path} href={s.path}>{s.name} <i aria-hidden="true">→</i></a>)}
          <a href="/services/video-animation">All video & animation <i aria-hidden="true">→</i></a>
        </nav>
      </div>
      <div className={styles.film} data-film><Clip clip={data.video} /></div>
    </section>
  );
}
