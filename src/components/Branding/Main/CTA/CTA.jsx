"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import VideoBackground from "@/components/Common/VideoBackground";
import styles from "./CTA.module.css";

/**
 * The final scene. Paint folding into paint, seen first through a thin horizontal band that opens to
 * the full screen as you arrive; the invitation's lines lift out of their masks one after another and
 * the five branding services sit beneath it as the last word.
 */
export default function CTA({ data, links }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-band]"), { clipPath: "inset(46% 0% 46% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root, start: "top 90%", end: "top 15%", scrub: 0.6 } });
      const split = SplitText.create(root.querySelector("[data-title]"), { type: "lines", mask: "lines" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 30%", once: true } })
        .from(split.lines, { yPercent: 110, duration: 1.3, stagger: 0.12, ease: "expo.out" })
        .from(root.querySelectorAll("[data-rise]"), { y: 26, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out" }, 0.4);
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.cta} aria-labelledby="brand-cta">
      <div className={styles.band} data-band><VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} /></div>
      <div className={styles.inner}>
        <p className={styles.kicker} data-rise>{data.kicker}</p>
        <h2 id="brand-cta" className={styles.title} data-title>
          {data.title.map((l, i) => <span key={l} className={i === data.title.length - 1 ? styles.accent : undefined}>{l} </span>)}
        </h2>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.actions} data-rise>
          <Button href="/#contact" size="lg">Start your brand</Button>
          <Button href={`mailto:${SITE.email}`} variant="outline" icon="mail">{SITE.email}</Button>
        </div>
        <nav className={styles.links} aria-label="Branding services" data-rise>
          {links.map((l) => <a key={l.path} href={l.path}>{l.name}</a>)}
        </nav>
      </div>
    </section>
  );
}
