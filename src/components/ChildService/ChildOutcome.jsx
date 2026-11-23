"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import RevealText from "@/components/Common/RevealText";
import styles from "./ChildOutcome.module.css";

/**
 * What the service achieves, over a full-bleed photograph. The picture is revealed from the top down
 * as the section arrives and then drifts slower than the page; a frosted band holds the outcomes,
 * each sliding in from alternate sides; the sectors run past along the bottom.
 */
export default function ChildOutcome({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-bg]"), { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root, start: "top 95%", end: "top 30%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-bg] img"), { yPercent: -10, scale: 1.25 }, { yPercent: 10, scale: 1.1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray("[data-row]", root).forEach((r, i) => gsap.from(r, { xPercent: i % 2 ? 12 : -12, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: r, start: "top 88%", once: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const band = [...data.sectors, ...data.sectors];

  return (
    <section ref={ref} id="outcome" className={styles.outcome} aria-labelledby="outcome-title">
      <div className={styles.bg} data-bg aria-hidden="true">
        <Image src={data.image} alt="" fill sizes="100vw" quality={80} placeholder="blur" className={styles.img} />
        <span className={styles.shade} />
      </div>

      <div className={styles.grid}>
        <div className={styles.head}>
          <Label>{data.kicker}</Label>
          <RevealText id="outcome-title" className={styles.title}>{data.title}</RevealText>
        </div>
        <ul className={styles.rows}>
          {data.items.map((it) => (
            <li key={it.name} className={styles.row} data-row>
              <h3 className={styles.name}>{it.name}</h3>
              <p className={styles.text}>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.sectors}>
        <p className={styles.sectorsLabel}>{data.sectorsLabel}</p>
        <div className={styles.mask}>
          <ul className={styles.band}>
            {band.map((s, i) => <li key={i} aria-hidden={i >= data.sectors.length || undefined}>{s}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
