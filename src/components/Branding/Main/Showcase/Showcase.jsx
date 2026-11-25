"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SURFACES, BIMG } from "@/data/branding/brands";
import { LogoSheet, TypeSpecimen, Swatches, Card, Letterhead, Label, Site, Social, Poster, Caption } from "../../kit/Identity";
import Head from "../Head";
import styles from "./Showcase.module.css";

// each frame cuts in with its own shape
const CUTS = [
  null,
  ["circle(0% at 50% 50%)", "circle(75% at 50% 50%)"],
  ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
  ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"],
  ["polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)", "polygon(0% 0%, 200% 0%, 0% 200%, 0% 200%)"],
  ["inset(50% 50% 50% 50%)", "inset(0% 0% 0% 0%)"],
  ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"],
];

function Frame({ f, brand }) {
  switch (f.kind) {
    case "logo": return <div className={styles.solo}><LogoSheet brand={brand} /></div>;
    case "type": return <div className={styles.solo}><TypeSpecimen brand={brand} /></div>;
    case "colour": return <div className={styles.solo}><Swatches brand={brand} /></div>;
    case "cards": return (
      <div className={styles.cards}>
        <div className={styles.cLetter}><Letterhead brand={brand} /></div>
        <div className={styles.cFront}><Card brand={brand} side="front" /></div>
        <div className={styles.cBack}><Card brand={brand} side="back" /></div>
      </div>
    );
    case "pack": return (
      <div className={styles.pack}>
        <figure className={styles.packPhoto}><Image src={f.img} alt="" fill sizes="40vw" /></figure>
        <div className={styles.packLabel}><Label brand={brand} /></div>
      </div>
    );
    case "digital": return (
      <div className={styles.digital}>
        <div className={styles.dSite}><Site brand={brand} img={f.img} /></div>
        <div className={styles.dPost}><Social brand={brand} img={BIMG.takeawaySet} /></div>
      </div>
    );
    default: return (
      <div className={styles.campaign}>
        <div className={styles.camA}><OnSurfacePoster s={SURFACES.billboardNight} brand={brand} /></div>
        <div className={styles.camB}><OnSurfacePoster s={SURFACES.billboardCity} brand={brand} wide /></div>
      </div>
    );
  }
}

function OnSurfacePoster({ s, brand, wide }) {
  const [x0, y0, x1, y1] = s.box;
  return (
    <figure className={styles.surface}>
      <Image src={s.img} alt={s.alt} fill sizes="40vw" />
      <div className={styles.face} style={{ left: `${x0}%`, top: `${y0}%`, width: `${x1 - x0}%`, height: `${y1 - y0}%` }}>
        <Poster brand={brand} img={wide ? BIMG.cupsKraft : null} className={styles.faceArt} />
      </div>
    </figure>
  );
}

/**
 * The identity, shown like a portfolio reel. While the section holds (desktop) seven frames play in
 * turn — logo construction, type, colour, stationery, packaging, digital, campaign — each cutting in
 * with a different shape (circle, wipe, rise, diagonal, iris) over the last, its caption sliding in.
 * The campaign frame places the poster on real blank billboards. Phones see the frames stacked.
 */
export default function Showcase({ data, brand }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const frames = gsap.utils.toArray("[data-frame]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root.querySelector("[data-reel]"), start: "top top", end: `+=${frames.length * 75}%`, pin: true, scrub: 0.8, anticipatePin: 1 } });
      frames.forEach((f, i) => {
        if (i === 0) return;
        tl.fromTo(f, { clipPath: CUTS[i][0] }, { clipPath: CUTS[i][1], duration: 1 })
          .fromTo(f.querySelector("[data-art]"), { scale: 1.12 }, { scale: 1, duration: 1 }, "<")
          .from(f.querySelector("[data-cap]"), { x: -40, opacity: 0, duration: 0.4 }, "<0.6");
      });
      tl.to({}, { duration: 0.5 });
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      frames.forEach((f) => gsap.fromTo(f, { clipPath: "inset(12% 8% 12% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: f, start: "top 95%", end: "top 40%", scrub: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.show} aria-labelledby="brand-show">
      <div className={styles.headRow}>
        <Head kicker={data.kicker} title={data.title} id="brand-show" />
        <Caption className={styles.cap0} />
      </div>
      <div className={styles.reel} data-reel>
        {data.frames.map((f, i) => (
          <article key={f.kind} className={`${styles.frame} ${styles[`bg${i % 4}`]}`} data-frame style={{ "--b0": brand.colors[0].hex, "--b1": brand.colors[1].hex, "--b2": brand.colors[2].hex, "--b3": brand.colors[3].hex }}>
            <div className={styles.art} data-art aria-hidden="true"><Frame f={f} brand={brand} /></div>
            <div className={styles.caption} data-cap>
              <h3>{f.name}</h3>
              <p>{f.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
