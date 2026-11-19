"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { CASE_STUDIES } from "@/data/work";
import Button from "@/components/Common/Button";
import RevealText from "@/components/Common/RevealText";
import Label from "@/components/About/Label";
import styles from "./WorkPreview.module.css";

// Four of the studio's case studies, chosen to cover different services
const PICK = ["belgravia-london", "cryptosouk", "bike-store", "aureum"];
const WORK = PICK.map((slug) => CASE_STUDIES.find((c) => c.slug === slug)).filter(Boolean);

/**
 * Selected work: four case studies, each opening as a large photograph that grows from a framed
 * inset to the full width as it reaches the middle of the screen, the project's name set over it.
 * Hovering zooms the picture and a "View case study" label follows the cursor.
 */
export default function WorkPreview() {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const { ready } = useSiteMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-proj]", root).forEach((p) => {
        gsap.fromTo(p.querySelector("[data-frame]"), { clipPath: "inset(12% 16% 12% 16%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: p, start: "top 95%", end: "center 55%", scrub: 0.6 } });
        gsap.fromTo(p.querySelector("[data-frame] img"), { scale: 1.35 }, { scale: 1.02, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(p.querySelector("[data-name]"), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: p, start: "top 70%", end: "center 60%", scrub: 0.6 } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const move = (e) => { x.set(e.clientX); y.set(e.clientY); };

  return (
    <section ref={ref} id="work" className={styles.work} aria-labelledby="work-title">
      <header className={styles.head}>
        <Label>Selected work</Label>
        <RevealText id="work-title" className={styles.title}>Brands we&apos;ve <em>moved.</em></RevealText>
        <Button href="/#work" variant="outline">All case studies</Button>
      </header>

      <div className={styles.list} onPointerMove={move} onPointerLeave={() => setHover(false)}>
        {WORK.map((w) => (
          <a key={w.slug} href={`/work/${w.slug}`} className={styles.proj} data-proj onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}>
            <figure className={styles.frame} data-frame>
              <Image src={w.image} alt={w.alt} fill sizes="100vw" />
            </figure>
            <div className={styles.meta}>
              <h3 className={styles.name} data-name>{w.name}</h3>
              <dl className={styles.facts}>
                <div><dt>Sector</dt><dd>{w.sector}</dd></div>
                <div><dt>Services</dt><dd>{w.services}</dd></div>
              </dl>
              <p className={styles.brief}>{w.brief}</p>
            </div>
          </a>
        ))}
      </div>

      <AnimatePresence>
        {hover && (
          <motion.span className={styles.cursor} style={{ x, y }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} aria-hidden="true">
            View case study
          </motion.span>
        )}
      </AnimatePresence>
    </section>
  );
}
