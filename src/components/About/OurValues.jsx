"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { ABOUT_VALUES, ABOUT_VALUES_HEAD, ABOUT_CREED } from "@/data/about";
import RevealText from "@/components/Common/RevealText";
import Label from "./Label";
import styles from "./OurValues.module.css";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>{}";
const KIND = ["creativity", "technology", "strategy"];

// Letters wrapped twice: the outer span is moved by the scroll, the inner one by the cursor
const Letters = ({ word }) => [...word].map((c, i) => (
  <span key={i} className={styles.ch} data-ch><i data-c={c}>{c}</i></span>
));

function scramble(els, p) {
  els.forEach((el, k) => {
    const settleAt = 0.15 + (k / els.length) * 0.75;
    el.textContent = p >= settleAt ? el.dataset.c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
  });
}

/**
 * Values: the three pillars the studio names, each given a band of its own — the word at a
 * readable scale beside the studio's own line for it, a photograph opposite — and each arriving
 * with its own motion: Creativity assembles from scattered letters, Technology decodes out of noise
 * over a terminal grid, Strategy slides onto a measured baseline. The creed closes the chapter.
 */
export default function OurValues() {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const bands = gsap.utils.toArray("[data-band]", root);
    const mm = gsap.matchMedia();

    mm.add(ANY_MOTION, () => {
      const r = gsap.utils.random;
      bands.forEach((b, i) => {
        const chars = gsap.utils.toArray("[data-ch]", b);
        const inner = gsap.utils.toArray("[data-ch] i", b);
        const enter = { trigger: b, start: "top 82%", end: "top 30%", scrub: 0.7 };

        // The picture opens from the side it sits on, and drifts as the band passes
        const fig = b.querySelector("[data-visual]");
        gsap.fromTo(fig, { clipPath: i % 2 ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: enter });
        gsap.fromTo(fig.querySelector("img"), { yPercent: -8, scale: 1.18 }, { yPercent: 8, scale: 1.04, ease: "none", scrollTrigger: { trigger: b, start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(b.querySelector("[data-line]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", scrollTrigger: { trigger: b, start: "top 60%", once: true } });

        if (KIND[i] === "creativity") {
          gsap.fromTo(chars, { x: () => r(-120, 120), y: () => r(-110, 110), rotate: () => r(-70, 70), scale: () => r(0.5, 1.5), opacity: 0.15 },
            { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, ease: "power3.out", stagger: { each: 0.03, from: "random" }, scrollTrigger: enter });
        } else if (KIND[i] === "technology") {
          const p = { p: 0 };
          gsap.fromTo(b.querySelector("[data-grid]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: enter });
          ScrollTrigger.create({ trigger: b, start: "top 65%", once: true, onEnter: () => gsap.fromTo(p, { p: 0 }, { p: 1, duration: 1.4, ease: "none", onUpdate: () => scramble(inner, p.p), onComplete: () => scramble(inner, 1) }) });
        } else {
          gsap.fromTo(b.querySelector("[data-ruler]"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: enter });
          gsap.fromTo(chars, { xPercent: 180, opacity: 0 }, { xPercent: 0, opacity: 1, ease: "expo.out", stagger: 0.05, scrollTrigger: enter });
        }
      });
      gsap.fromTo(root.querySelectorAll("[data-cw]"), { letterSpacing: "0.3em", opacity: 0.2 }, { letterSpacing: "-0.03em", opacity: 1, ease: "none", stagger: 0.15, scrollTrigger: { trigger: root.querySelector("[data-creed]"), start: "top 90%", end: "top 45%", scrub: 0.7 } });
      return () => scramble(gsap.utils.toArray("[data-band]:nth-of-type(2) [data-ch] i", root), 1);
    });

    // Cursor play on desktop: Creativity's letters jump; Technology scrambles again
    mm.add(DESKTOP_MOTION, () => {
      const offs = [];
      gsap.utils.toArray("[data-ch] i", bands[0]).forEach((el) => {
        const on = () => {
          gsap.to(el, { yPercent: -26, rotate: gsap.utils.random(-14, 14), duration: 0.25, ease: "power2.out" });
          gsap.to(el, { yPercent: 0, rotate: 0, duration: 0.9, delay: 0.25, ease: "elastic.out(1, 0.35)" });
          sfx("tick");
        };
        el.addEventListener("pointerenter", on);
        offs.push(() => el.removeEventListener("pointerenter", on));
      });
      const techWord = bands[1].querySelector("[data-word]");
      const techEls = gsap.utils.toArray("[data-ch] i", bands[1]);
      const again = () => { const p = { p: 0 }; gsap.to(p, { p: 1, duration: 0.7, ease: "none", onUpdate: () => scramble(techEls, p.p), onComplete: () => scramble(techEls, 1) }); };
      techWord.addEventListener("pointerenter", again);
      offs.push(() => techWord.removeEventListener("pointerenter", again));
      return () => offs.forEach((f) => f());
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="values" className={styles.values} aria-labelledby="values-title">
      <header className={styles.head}>
        <Label>Our values</Label>
        <RevealText id="values-title" className={styles.title}>{ABOUT_VALUES_HEAD}</RevealText>
      </header>

      {ABOUT_VALUES.map((v, i) => (
        <article key={v.word} className={`${styles.band} ${styles[KIND[i]]} ${i % 2 ? styles.flip : ""}`} data-band>
          <div className={styles.copy}>
            <h3 className={styles.word} data-word aria-label={v.word}>
              <span aria-hidden="true"><Letters word={v.word} /></span>
            </h3>
            {KIND[i] === "strategy" && (
              <span className={styles.ruler} data-ruler aria-hidden="true">{Array.from({ length: 21 }, (_, k) => <i key={k} />)}</span>
            )}
            <p className={styles.line} data-line>{v.line}</p>
          </div>
          <figure className={styles.visual} data-visual>
            <Image src={v.image} alt={v.alt} fill sizes="(min-width: 901px) 44vw, 100vw" />
            {KIND[i] === "technology" && <span className={styles.grid} data-grid aria-hidden="true" />}
          </figure>
        </article>
      ))}

      <p className={styles.creed} data-creed>
        {ABOUT_CREED.split(". ").map((w, i, a) => (
          <span key={w} data-cw className={i === a.length - 1 ? styles.accent : undefined}>{i < a.length - 1 ? `${w}.` : w}</span>
        ))}
      </p>
    </section>
  );
}
