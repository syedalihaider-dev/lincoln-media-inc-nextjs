"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import empire from "@public/images/home/empire.jpg";
import nyc from "@public/images/home/nyc-dusk.jpg";
import glow from "@public/images/home/laptop-glow.jpg";
import towers from "@public/images/home/towers.jpg";
import imgUx from "@public/images/services/ui-ux-design.jpg";
import imgBrand from "@public/images/services/branding.jpg";
import imgTeam from "@public/images/services/it-outsourcing.jpg";
import imgWeb from "@public/images/services/web-development.jpg";
import studio from "@public/images/about/concept-strategy.webp";
import imgMarketing from "@public/images/services/digital-marketing.jpg";
import styles from "./WhyLincoln.module.css";

// What the studio says about itself on lincolnmediainc.com — quoted, not invented
const STATEMENTS = [
  { text: "Connecting brands with global audiences.", lit: ["global", "audiences."], images: [empire, nyc] },
  { text: "Elevating brands through ground-breaking user experience.", lit: ["ground-breaking"], images: [glow, imgUx] },
  { text: "A synonym of quality, trust and distinction.", lit: ["quality,", "trust", "distinction."], images: [towers, imgBrand] },
  { text: "We strive to set new quality benchmarks and exceed the expectations of our clients.", lit: ["benchmarks", "exceed"], images: [imgTeam, imgWeb] },
  { text: "We bring unique ideas to the table.", lit: ["unique", "ideas"], images: [studio, imgMarketing] },
];

/**
 * Why The Lincoln Media: five things the studio says about itself, each given a screen of its own.
 * The words rise out of a slant and settle as you scroll; two photographs drift past at different
 * speeds — one behind the words, one crossing in front — and the light shifts with each statement.
 */
export default function WhyLincoln() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-st]", root).forEach((st, i) => {
        const words = st.querySelectorAll("[data-w]");
        gsap.fromTo(words, { yPercent: 70, skewY: 8, opacity: 0.08 }, { yPercent: 0, skewY: 0, opacity: 1, ease: "power3.out", stagger: 0.04, scrollTrigger: { trigger: st, start: "top 80%", end: "center 55%", scrub: 0.7 } });
        const [back, front] = st.querySelectorAll("[data-layer]");
        gsap.fromTo(back, { yPercent: 30, xPercent: i % 2 ? -10 : 10 }, { yPercent: -30, xPercent: 0, ease: "none", scrollTrigger: { trigger: st, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(front, { yPercent: 70, rotate: i % 2 ? 4 : -4 }, { yPercent: -70, rotate: i % 2 ? -3 : 3, ease: "none", scrollTrigger: { trigger: st, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(back, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: st, start: "top 90%", end: "top 30%", scrub: 0.6 } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="why" className={styles.why} aria-labelledby="why-title">
      <header className={styles.head}>
        <Label>Why The Lincoln Media</Label>
        <h2 id="why-title" className="lm-sr-only">Why The Lincoln Media</h2>
      </header>
      {STATEMENTS.map((s, i) => (
        <article key={s.text} className={`${styles.statement} ${styles[`s${i}`]}`} data-st>
          <figure className={`${styles.layer} ${styles.back}`} data-layer aria-hidden="true"><Image src={s.images[0]} alt="" fill sizes="(min-width: 901px) 34vw, 70vw" /></figure>
          <p className={styles.text}>
            {s.text.split(" ").map((w, k) => <span key={k} data-w className={s.lit.includes(w) ? styles.lit : undefined}>{w} </span>)}
          </p>
          <figure className={`${styles.layer} ${styles.front}`} data-layer aria-hidden="true"><Image src={s.images[1]} alt="" fill sizes="(min-width: 901px) 20vw, 40vw" /></figure>
        </article>
      ))}
    </section>
  );
}
