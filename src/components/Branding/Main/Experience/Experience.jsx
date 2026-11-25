"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { BIMG } from "@/data/branding/brands";
import { Site, Social, Label, Poster, Slide, Card, Caption } from "../../kit/Identity";
import Head from "../Head";
import styles from "./Experience.module.css";

// each touchpoint's depth: how far it travels against the scroll (desktop)
const LAYERS = [
  { k: "site", depth: -18, rot: -3 },
  { k: "social", depth: 34, rot: 6 },
  { k: "pack", depth: -40, rot: -5 },
  { k: "poster", depth: 22, rot: 4 },
  { k: "slide", depth: -10, rot: 2 },
  { k: "card", depth: 48, rot: -9 },
];

function Piece({ k, brand }) {
  if (k === "site") return <Site brand={brand} img={BIMG.cupsKraft} />;
  if (k === "social") return <Social brand={brand} img={BIMG.takeawaySet} />;
  if (k === "pack") return <div className={styles.packPair}><figure><Image src={BIMG.pouchKraft} alt="" fill sizes="20vw" /></figure><Label brand={brand} product="House Espresso" /></div>;
  if (k === "poster") return <Poster brand={brand} img={BIMG.coffeeBag} />;
  if (k === "slide") return <Slide brand={brand} />;
  return <Card brand={brand} side="back" />;
}

/**
 * Brand experience: the same brand across six touchpoints — website, social, packaging, campaign,
 * presentation, stationery — laid out on kraft paper like a review table. Each piece sits at its own
 * depth and travels at its own speed as you pass, straightening as it settles, so the collage reads
 * in layers around the headline. Phones get a two-column collage without depth.
 */
export default function Experience({ data, brand }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      gsap.utils.toArray("[data-layer]", root).forEach((el, i) => {
        const L = LAYERS[i];
        gsap.fromTo(el, { yPercent: L.depth, rotation: L.rot * 2 }, { yPercent: -L.depth, rotation: L.rot * 0.4, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });
    mm.add(ANY_MOTION, () => {
      gsap.from(root.querySelectorAll("[data-layer]"), { scale: 0.8, opacity: 0, duration: 1.2, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: root, start: "top 65%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.exp} aria-labelledby="brand-exp">
      <div className={styles.bg} aria-hidden="true"><Image src={data.bg} alt="" fill sizes="100vw" /></div>
      <div className={styles.head}><Head kicker={data.kicker} title={data.title} text={data.text} id="brand-exp" tone="paper" align="center" /></div>
      <div className={styles.collage} aria-hidden="true">
        {LAYERS.map((L) => <div key={L.k} className={`${styles.layer} ${styles[L.k]}`} data-layer><Piece k={L.k} brand={brand} /></div>)}
      </div>
      <Caption className={styles.caption} />
    </section>
  );
}
