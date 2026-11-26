"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Button from "@/components/Common/Button";
import VideoBackground from "@/components/Common/VideoBackground";
import { Card, Swatches, Wordmark, Caption } from "../../kit/Identity";
import styles from "./Hero.module.css";

/**
 * The opening, art-directed like a poster. A calligrapher's pen moves inside a tall window that opens
 * from a single vertical stroke; the headline is set over it in difference blend, so the letters invert
 * where they cross the film. The demo brand's card and colour strip lean in from the edges, and the four
 * disciplines run along the foot. On scroll the headline's lines slide apart in opposite directions,
 * the card turns and lifts and the discipline line travels.
 */
export default function Hero({ data, brand }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const lines = gsap.utils.toArray("[data-hl]", root);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      // words keep their letters together, so a narrow screen wraps between words, never inside one
      const split = SplitText.create(lines, { type: "words,chars", mask: "chars" });
      gsap.timeline({ delay: 0.1 })
        .fromTo(q("[data-window]"), { clipPath: "inset(0% 49.6% 0% 49.6%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" })
        .from(split.chars, { yPercent: 110, duration: 1.2, stagger: 0.022, ease: "expo.out" }, 0.5)
        .from(q("[data-card]"), { y: 160, rotation: 22, opacity: 0, duration: 1.6, ease: "expo.out" }, 0.9)
        .from(q("[data-strip]"), { x: -80, opacity: 0, duration: 1.4, ease: "expo.out" }, 1)
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, 1.1);
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 };
      lines.forEach((l, i) => gsap.to(l, { xPercent: i % 2 ? 14 : -10, ease: "none", scrollTrigger: st }));
      gsap.to(q("[data-card]"), { yPercent: -60, rotation: -14, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-strip]"), { yPercent: 40, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-window] video"), { scale: 1.15, ease: "none", scrollTrigger: st });
    });
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(q("[data-ticker]"), { xPercent: 0 }, { xPercent: -30, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.4 } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="brand-title">
      <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
        <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><span aria-current="page">{data.kicker}</span></li>
        </ol>
      </nav>

      <div className={styles.window} data-window>
        <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} tint={false} />
      </div>

      <h1 id="brand-title" className={styles.title}>
        {data.title.map((l) => <span key={l} className={styles.hl} data-hl>{l}</span>)}
        <span className={styles.srOnly}> — {data.kicker}</span>
      </h1>

      <div className={styles.strip} data-strip aria-hidden="true"><Swatches brand={brand} /></div>
      <div className={styles.card} data-card aria-hidden="true"><Card brand={brand} side="front" /></div>
      <div className={styles.tag} data-rise aria-hidden="true"><Wordmark brand={brand} tone="paper" /><Caption /></div>

      <div className={styles.foot}>
        <p className={styles.lead} data-rise>{data.lead}</p>
        <div className={styles.actions} data-rise>
          <Button href="/contact-us#contact-form" size="lg">Start your brand</Button>
          <Button href="#brand-capabilities" variant="text" icon="down">What we do</Button>
        </div>
      </div>

      <div className={styles.tickerWrap} aria-hidden="true">
        <p className={styles.ticker} data-ticker>{[...data.words, ...data.words, ...data.words].map((w, i) => <span key={i}>{w}</span>)}</p>
      </div>
    </section>
  );
}
