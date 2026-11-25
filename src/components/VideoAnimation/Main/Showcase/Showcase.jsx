"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../../kit/Head";
import Clip from "../../kit/Clip";
import { Kinetic, Bounce, LowerThird, Product } from "../../kit/Anim";
import { VIMG } from "@/data/video-animation/media";
import styles from "./Showcase.module.css";

const CUTS = ["inset(0% 100% 0% 0%)", "inset(100% 0% 0% 0%)", "inset(0% 0% 0% 100%)", "inset(0% 0% 100% 0%)", "inset(50% 50% 50% 50%)", "inset(0% 100% 0% 0%)"];

function Piece({ p }) {
  if (p.kind === "kinetic") return <Kinetic words={p.words} />;
  if (p.kind === "bounce") return <Bounce />;
  if (p.kind === "lower") return <LowerThird lines={p.lines} image={VIMG.set} />;
  if (p.kind === "product") return <Product app={p.app} />;
  return <Clip clip={p.clip} label={p.text} />;
}

/**
 * Animation showcase — a cutting room of pieces. The animations are live (GSAP, running in the page
 * while on screen); the footage shows the crafts behind them. Each tile opens with its own cut
 * (a wipe from a different edge, or an iris), and on desktop the columns drift at different speeds.
 */
export default function Showcase({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.utils.toArray("[data-piece]", root).forEach((el, i) => {
        gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } })
          .fromTo(el.querySelector("[data-media]"), { clipPath: CUTS[i % CUTS.length] }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
          .from(el.querySelectorAll("figcaption > *"), { y: 16, opacity: 0, duration: 0.9, stagger: 0.06 }, 0.6);
      });
    });
    mm.add(DESKTOP_MOTION, () => {
      gsap.utils.toArray("[data-drift]", root).forEach((el) => gsap.to(el, { yPercent: +el.dataset.drift, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.show} aria-labelledby="va-show">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="va-show" tone="light" />
      <div className={styles.grid}>
        {data.pieces.map((p, i) => (
          <figure key={p.name} className={`${styles.piece} ${styles[`p${i}`]}`} data-piece data-drift={[-4, 6, -2, 8, 3, -5][i]}>
            <div className={styles.media} data-media><Piece p={p} /></div>
            <figcaption>
              <span className={styles.pname}>{p.name}</span>
              <span className={styles.ptext}>{p.text}</span>
              <span className={styles.kind}>{p.kind === "clip" ? "Footage" : "Live in page"}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
