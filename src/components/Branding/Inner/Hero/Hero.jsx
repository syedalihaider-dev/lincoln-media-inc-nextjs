"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import { Artefact, Caption, brandVars } from "../../kit/Identity";
import styles from "./Hero.module.css";

/**
 * The service page's opening, set as a spread: paper on the left with the service name; the service's
 * photograph full-height on the right, revealed from the fold outward; and the demo brand's artefact
 * laid across the fold, as if dropped on the open book. On scroll the photograph drifts, the artefact
 * slides further across the fold and turns, and the fold line draws down the page.
 */
export default function Hero({ data, brand }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(q("[data-title]"), { type: "words", mask: "words" });
      gsap.timeline({ delay: 0.1 })
        .fromTo(q("[data-photo]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
        .from(split.words, { yPercent: 110, duration: 1.2, stagger: 0.08, ease: "expo.out" }, 0.3)
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, 0.6)
        .from(q("[data-art]"), { y: 120, rotation: 14, opacity: 0, duration: 1.5, ease: "expo.out" }, 0.9);
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(q("[data-photo] img"), { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-art]"), { xPercent: -30, yPercent: -18, rotation: -10, ease: "none", scrollTrigger: st });
      gsap.fromTo(q("[data-fold]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom 40%", scrub: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.hero} style={brandVars(brand)} aria-labelledby="bsi-title">
      <div className={styles.left}>
        <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/services/branding-communication-agency">Branding</a></li>
            <li><span aria-current="page">{data.kicker}</span></li>
          </ol>
        </nav>
        <h1 id="bsi-title" className={styles.title} data-title>{data.title}</h1>
        <p className={styles.sub} data-rise>{data.sub}</p>
        <p className={styles.lead} data-rise>{data.lead}</p>
        <div className={styles.actions} data-rise>
          <Button href="/contact-us#contact-form" size="lg">Start a project</Button>
          <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
        </div>
      </div>
      <figure className={styles.photo} data-photo>
        <Image src={data.img} alt={data.alt} fill sizes="(max-width: 900px) 100vw, 50vw" priority />
      </figure>
      <span className={styles.fold} data-fold aria-hidden="true" />
      <div className={`${styles.art} ${styles[`a_${data.artefact}`] || ""}`} data-art aria-hidden="true">
        <Artefact kind={data.artefact} brand={brand} img={data.img} />
      </div>
      <Caption className={styles.caption} />
    </section>
  );
}
