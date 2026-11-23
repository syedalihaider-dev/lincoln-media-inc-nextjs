"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import styles from "./ChildVisual.module.css";

/**
 * A visual break. The photograph starts as a small framed window in the dark and opens to the full
 * width of the screen as you scroll, settling from a close crop to the whole picture; a line set
 * across it arrives from both sides at once. On desktop the frame holds while it opens.
 */
export default function ChildVisual({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", end: "bottom bottom", scrub: 0.7 } });
      tl.fromTo(root.querySelector("[data-frame]"), { clipPath: "inset(26% 34% 26% 34% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(root.querySelector("[data-frame] img"), { scale: 1.45 }, { scale: 1, ease: "power2.out", duration: 1 }, 0)
        .fromTo(root.querySelector("[data-a]"), { xPercent: -40, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "power3.out", duration: 0.6 }, 0.35)
        .fromTo(root.querySelector("[data-b]"), { xPercent: 40, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "power3.out", duration: 0.6 }, 0.4)
        .fromTo(root.querySelector("[data-note]"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 0.6);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.visual} aria-label={data.caption.join(" ")}>
      <div className={styles.sticky}>
        <figure className={styles.frame} data-frame>
          <Image src={data.image} alt={data.imageAlt} fill sizes="100vw" quality={80} placeholder="blur" className={styles.img} />
          <span className={styles.shade} aria-hidden="true" />
        </figure>
        <div className={styles.caption}>
          <p className={styles.line}><span data-a>{data.caption[0]}</span></p>
          <p className={`${styles.line} ${styles.em}`}><span data-b>{data.caption[1]}</span></p>
          <p className={styles.note} data-note>{data.note}</p>
        </div>
      </div>
    </section>
  );
}
