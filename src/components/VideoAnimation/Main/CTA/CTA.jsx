"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Social from "@/components/Common/Social";
import Clip from "../../kit/Clip";
import styles from "./CTA.module.css";

/**
 * The final frame. The section fades up from black over the projector's beam, the title rises letter
 * by letter, and an end-credits block rolls up beneath it — studio, address, the line to call, the
 * address to write to, where to follow. Links to the service pages close the reel.
 */
export default function CTA({ data, links = [], kicker }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-line]"), { type: "words,chars", mask: "chars" });
      gsap.fromTo(root.querySelector("[data-black]"), { opacity: 1 }, { opacity: 0, ease: "none", scrollTrigger: { trigger: root, start: "top 90%", end: "top 20%", scrub: 0.5 } });
      gsap.fromTo(root.querySelector("video"), { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 45%", once: true } })
        .from(split.chars, { yPercent: 110, duration: 1.2, stagger: 0.03, ease: "expo.out" })
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.4)
        .from(root.querySelectorAll("[data-credit]"), { yPercent: 60, opacity: 0, duration: 1.2, stagger: 0.09, ease: "expo.out" }, 0.6);
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.cta} aria-labelledby="va-cta">
      <div className={styles.bg} aria-hidden="true"><Clip clip={data.video} /></div>
      <span className={styles.shade} aria-hidden="true" />
      <span className={styles.black} data-black aria-hidden="true" />

      <div className={styles.inner}>
        {kicker && <p className={styles.kicker} data-rise><i aria-hidden="true" />{kicker}</p>}
        <h2 id="va-cta" className={styles.title}>
          {data.title.map((l, i) => <span key={l} className={`${styles.tl} ${i === data.title.length - 1 ? styles.accent : ""}`} data-line>{l}</span>)}
        </h2>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.actions} data-rise>
          <Button href="/contact-us#contact-form" size="lg">Start your film</Button>
          <Button href={SITE.phoneHref} variant="outline" icon="phone">{SITE.phone}</Button>
        </div>

        <dl className={styles.credits}>
          <div data-credit><dt>Studio</dt><dd>{SITE.name}</dd></div>
          <div data-credit><dt>Location</dt><dd><address>{SITE.street}, {SITE.locality}</address></dd></div>
          <div data-credit><dt>Write</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></div>
          <div data-credit><dt>Follow</dt><dd><Social size="sm" /></dd></div>
        </dl>

        {links.length > 0 && (
          <nav className={styles.links} aria-label="Video & Animation services" data-rise>
            {links.map((l) => <a key={l.path} href={l.path}><span>{l.name}</span><i aria-hidden="true">→</i></a>)}
          </nav>
        )}
      </div>
    </section>
  );
}
