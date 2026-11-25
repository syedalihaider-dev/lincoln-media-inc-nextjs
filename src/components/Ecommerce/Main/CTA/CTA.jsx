"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import VideoBackground from "@/components/Common/VideoBackground";
import styles from "./CTA.module.css";

/**
 * The close. Footage of a jewelled bracelet turning in low light is seen through a circular aperture
 * that opens to the full screen as you arrive; the headline's letters fall into place and the six
 * platform pages sit in a line beneath the call to action.
 */
export default function CTA({ data, links }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-aperture]"), { clipPath: "circle(16% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "none", scrollTrigger: { trigger: root, start: "top 85%", end: "top 10%", scrub: 0.6 } });
      const split = SplitText.create(root.querySelector("[data-title]"), { type: "lines,chars", mask: "lines" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 35%", once: true } })
        .from(split.chars, { yPercent: -110, duration: 1.1, stagger: 0.025, ease: "expo.out" })
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out" }, 0.4);
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.cta} aria-labelledby="ecom-cta">
      <div className={styles.aperture} data-aperture>
        <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} />
      </div>
      <div className={styles.inner}>
        <p className={styles.kicker} data-rise>{data.kicker}</p>
        <h2 id="ecom-cta" className={styles.title} data-title>{data.title.map((l, i) => <span key={l} className={i === data.title.length - 1 ? styles.accent : undefined}>{l} </span>)}</h2>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.actions} data-rise>
          <Button href="/#contact" size="lg">Start a project</Button>
          <Button href={`mailto:${SITE.email}`} variant="outline" icon="mail">{SITE.email}</Button>
        </div>
        <nav className={styles.links} aria-label="E-commerce platforms" data-rise>
          {links.map((l) => <a key={l.path} href={l.path}>{l.name}</a>)}
        </nav>
      </div>
    </section>
  );
}
