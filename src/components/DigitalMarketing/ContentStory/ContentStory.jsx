"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import { useScene, MOTION } from "../shared";
import styles from "./ContentStory.module.css";

const Photo = ({ w, sizes = "(max-width: 900px) 90vw, 50vw" }) => (
  <Image src={w.image} alt={w.alt} fill sizes={sizes} quality={78} style={{ objectFit: "cover" }} />
);

/**
 * CREATE · CAPTURE · CONNECT · CONVERT — four words, four ways in.
 * Create:  the photograph lives inside the letters and pans through them as you scroll.
 * Capture: the word and its photograph pull from blur into focus inside a viewfinder's corners.
 * Connect: the word's two halves slide in from opposite edges and meet; the photograph opens
 *          from a slit between them.
 * Convert: a diagonal wipe reveals the photograph, and the word rises letter by letter over it.
 */
export default function ContentStory({ data }) {
  const ref = useRef(null);
  const [create, capture, connect, convert] = data.words;

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const row = (n) => root.querySelector(`[data-row="${n}"]`);
      const st = (el, extra = {}) => ({ trigger: el, start: "top 85%", end: "bottom 35%", scrub: 0.7, ...extra });

      const r0 = row(0);
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st(r0) })
        .fromTo(r0.querySelector("[data-fill]"), { backgroundPosition: "50% 0%", backgroundSize: "130%", letterSpacing: "-0.02em" }, { backgroundPosition: "50% 100%", backgroundSize: "100%", letterSpacing: "-0.07em" }, 0)
        .fromTo(r0.querySelector("[data-text]"), { y: 60 }, { y: -20 }, 0);

      const r1 = row(1);
      gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: st(r1, { end: "center 50%" }) })
        .fromTo(r1.querySelector("[data-word]"), { filter: "blur(22px)", scale: 1.25, opacity: 0.2 }, { filter: "blur(0px)", scale: 1, opacity: 1 }, 0)
        .fromTo(r1.querySelector("[data-photo]"), { filter: "blur(16px) brightness(0.6)", scale: 1.15 }, { filter: "blur(0px) brightness(1)", scale: 1 }, 0)
        .fromTo(r1.querySelectorAll("[data-corner]"), { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.04 }, 0.2);

      const r2 = row(2);
      gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: st(r2, { end: "center 45%" }) })
        .fromTo(r2.querySelector("[data-half-a]"), { xPercent: -70 }, { xPercent: 0 }, 0)
        .fromTo(r2.querySelector("[data-half-b]"), { xPercent: 70 }, { xPercent: 0 }, 0)
        .fromTo(r2.querySelector("[data-photo]"), { clipPath: "inset(0% 49% 0% 49%)" }, { clipPath: "inset(0% 0% 0% 0%)" }, 0.15);

      const r3 = row(3);
      gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: st(r3, { end: "center 45%" }) })
        .fromTo(r3.querySelector("[data-photo]"), { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }, 0)
        .fromTo(r3.querySelector("[data-photo] img"), { scale: 1.3 }, { scale: 1 }, 0)
        .fromTo(r3.querySelectorAll("[data-ch]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.05 }, 0.2);
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="content-title" data-phase="Engagement">
      <header className={styles.head}>
        <Label>{data.kicker}</Label>
        <h2 id="content-title" className="lm-sr-only">{data.words.map((w) => w.word).join(", ")}</h2>
      </header>

      {/* Create — the image inside the letters */}
      <div className={`${styles.row} ${styles.create}`} data-row="0">
        <p className={styles.fill} data-fill style={{ backgroundImage: `url(${create.image.src})` }} role="img" aria-label={`${create.word}: ${create.alt}`}>{create.word}</p>
        <p className={styles.text} data-text><b>{create.word}.</b> {create.text}</p>
      </div>

      {/* Capture — blur to focus */}
      <div className={`${styles.row} ${styles.capture}`} data-row="1">
        <figure className={styles.frame}>
          <div className={styles.photo} data-photo><Photo w={capture} /></div>
          {["tl", "tr", "bl", "br"].map((c) => <i key={c} className={`${styles.corner} ${styles[c]}`} data-corner aria-hidden="true" />)}
        </figure>
        <div className={styles.side}>
          <p className={styles.big} data-word aria-hidden="true">{capture.word}</p>
          <p className={styles.text}><b>{capture.word}.</b> {capture.text}</p>
        </div>
      </div>

      {/* Connect — two halves meet */}
      <div className={`${styles.row} ${styles.connect}`} data-row="2">
        <p className={styles.split} aria-hidden="true">
          <span data-half-a>{connect.word.slice(0, 3)}</span>
          <span className={styles.slit}><span className={styles.photo} data-photo><Photo w={connect} sizes="(max-width: 900px) 40vw, 24vw" /></span></span>
          <span data-half-b>{connect.word.slice(3)}</span>
        </p>
        <p className={`${styles.text} ${styles.center}`}><b>{connect.word}.</b> {connect.text}</p>
      </div>

      {/* Convert — diagonal wipe, letters rise */}
      <div className={`${styles.row} ${styles.convert}`} data-row="3">
        <div className={styles.band}>
          <div className={styles.photo} data-photo><Photo w={convert} sizes="100vw" /></div>
          <p className={styles.over} aria-hidden="true">{[...convert.word].map((c, i) => <span key={i} className={styles.chMask}><span data-ch>{c}</span></span>)}</p>
        </div>
        <p className={styles.text}><b>{convert.word}.</b> {convert.text}</p>
      </div>
    </section>
  );
}
