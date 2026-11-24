"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Words.module.css";

/**
 * DESIGN → CODE → EXPERIENCE, one word at a time, each in the medium it belongs to. First the word
 * is a selected text layer in a design tool — bounding box, handles, font readout. Held on desktop,
 * a scan line sweeps it into markup: <h1>Code</h1>, with line numbers. Then a browser window opens
 * around the last word and a cursor clicks it — EXPERIENCE, live. A caption under each says what it is.
 * Phones: the three stack, each revealed as it arrives.
 */
export default function Words({ data }) {
  const ref = useRef(null);
  const [d, c, e] = data.words;
  useScene(ref, (mm, root) => {
    const layers = () => gsap.utils.toArray("[data-w]", root);
    mm.add(PIN, () => {
      const L = layers();
      gsap.set(L.slice(1), { clipPath: "inset(0% 100% 0% 0%)" });
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: { trigger: root, start: "top top", end: "+=200%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.from(root.querySelector("[data-handles]"), { scale: 1.2, opacity: 0, duration: 0.3 }, 0)
        .to(L[1], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 }, 0.5)
        .fromTo(root.querySelector("[data-scan]"), { left: "0%", opacity: 1 }, { left: "100%", duration: 0.8 }, 0.5)
        .to(L[0], { opacity: 0, duration: 0.2 }, 1.2)
        .to(L[2], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 }, 1.8)
        .fromTo(root.querySelector("[data-win]"), { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8 }, 1.8)
        .to(L[1], { opacity: 0, duration: 0.2 }, 2.5)
        .fromTo(root.querySelector("[data-click]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: "back.out(2)" }, 2.7)
        .to({}, { duration: 0.3 });
    });
    mm.add(SMALL, () => {
      layers().forEach((l) => gsap.fromTo(l, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: l, start: "top 85%", end: "top 45%", scrub: 0.5 } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="psd-words">
      <div className={styles.label}><Label>{data.kicker}</Label></div>
      <h2 id="psd-words" className="lm-sr-only">{data.words.join(", then ")}</h2>
      <div className={styles.stage} aria-hidden="true">
        <div className={`${styles.w} ${styles.design}`} data-w>
          <p className={styles.word}>{d}<span className={styles.handles} data-handles><i /><i /><i /><i /><em>Text · Unbounded 800 · 180</em></span></p>
          <small>{data.text[0]}</small>
        </div>
        <div className={`${styles.w} ${styles.code}`} data-w>
          <p className={styles.word}><b>1</b><i>&lt;</i><span className={styles.tag}>h1</span><i>&gt;</i>{c}<i>&lt;/</i><span className={styles.tag}>h1</span><i>&gt;</i></p>
          <small>{data.text[1]}</small>
          <span className={styles.scan} data-scan />
        </div>
        <div className={`${styles.w} ${styles.exp}`} data-w>
          <div className={styles.win} data-win>
            <span className={styles.bar}><i /><i /><i /><em>meridian.example</em></span>
            <p className={styles.word}>{e}<span className={styles.click} data-click /></p>
          </div>
          <small>{data.text[2]}</small>
        </div>
      </div>
    </section>
  );
}
