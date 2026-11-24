"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import { Ui } from "../ui/Frames";
import { useScene, PIN, SMALL } from "../shared";
import styles from "./AttentionToConversion.module.css";

// The interfaces behind each word: where attention is won, held and turned into action
const SCENES = [
  [{ kind: "serp", cls: "a1" }, { kind: "reel", cls: "a2" }, { kind: "post", cls: "a3" }],
  [{ kind: "article", cls: "b1" }, { kind: "story", cls: "b2" }, { kind: "editor", cls: "b3" }],
  [{ kind: "landing", cls: "c1" }, { kind: "checkout", cls: "c2" }, { kind: "analytics", cls: "c3" }],
];

/**
 * Editorial typography that changes its mind. One giant word holds the screen — ATTENTION — and as
 * you scroll its letters tip over backwards and ENGAGEMENT rolls up out of them, then CONVERSION.
 * Behind each word, the interfaces where that moment happens wipe in from the right and slide past
 * at their own speeds. Phones: the three moments stack, each word rising letter by letter.
 */
export default function AttentionToConversion({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const blocks = gsap.utils.toArray("[data-block]", root);
    const chars = (b) => b.querySelectorAll("[data-ch]");
    const n = blocks.length;

    mm.add(PIN, () => {
      blocks.forEach((b, i) => {
        if (!i) return;
        gsap.set(chars(b), { yPercent: 105, rotationX: -85 });
        gsap.set(b.querySelector("[data-scene]"), { clipPath: "inset(0% 0% 0% 100%)" });
        gsap.set(b.querySelector("[data-text]"), { y: 40, opacity: 0 });
      });
      gsap.set(root.querySelectorAll("[data-step] i"), { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root, start: "top top", end: `+=${n * 110}%`, pin: true, scrub: 0.8, anticipatePin: 1,
        },
      });
      blocks.forEach((b, i) => {
        const at = i * 1.4;
        // the scene drifts left while the word is held; each interface at its own speed
        b.querySelectorAll("[data-item]").forEach((it, k) => tl.to(it, { xPercent: -14 - k * 10, duration: 1.4 }, at));
        tl.to(b.querySelector("[data-word]"), { scale: 1.06, duration: 1.4 }, at)
          .to(root.querySelectorAll("[data-step] i")[i], { scaleX: 1, duration: 1.4 }, at);
        if (i === n - 1) return;
        const next = blocks[i + 1];
        const t = at + 1;
        tl.to(chars(b), { yPercent: -105, rotationX: 85, ease: "power2.in", duration: 0.35, stagger: 0.02 }, t)
          .to(chars(next), { yPercent: 0, rotationX: 0, ease: "power3.out", duration: 0.4, stagger: 0.02 }, t + 0.12)
          .to(b.querySelector("[data-text]"), { y: -40, opacity: 0, duration: 0.2 }, t)
          .to(next.querySelector("[data-text]"), { y: 0, opacity: 1, duration: 0.25 }, t + 0.25)
          .to(b.querySelector("[data-scene]"), { xPercent: -12, opacity: 0, duration: 0.4 }, t)
          .to(next.querySelector("[data-scene]"), { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.inOut", duration: 0.45 }, t);
      });
    });

    mm.add(SMALL, () => {
      blocks.forEach((b) => {
        gsap.from(chars(b), { yPercent: 105, rotationX: -85, duration: 1.1, ease: "expo.out", stagger: 0.03, scrollTrigger: { trigger: b, start: "top 75%", once: true } });
        gsap.fromTo(b.querySelector("[data-scene]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: b, start: "top 85%", end: "top 30%", scrub: 0.5 } });
      });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="atc-title" data-phase="Attention">
      <h2 id="atc-title" className="lm-sr-only">{data.words.map((w) => w.word).join(", then ")}</h2>
      <div className={styles.kicker}><Label>{data.kicker}</Label></div>

      {data.words.map((w, i) => (
        <div key={w.word} className={styles.block} data-block>
          <div className={styles.scene} data-scene aria-hidden="true">
            {SCENES[i].map((s) => (
              <div key={s.kind} className={`${styles.item} ${styles[s.cls]}`} data-item><Ui kind={s.kind} /></div>
            ))}
            <span className={styles.shade} />
          </div>
          <p className={styles.word} data-word aria-hidden="true">
            {[...w.word].map((c, k) => <span key={k} className={styles.ch} data-ch>{c}</span>)}
          </p>
          <p className={styles.text} data-text><b>{w.word}.</b> {w.text}</p>
        </div>
      ))}

      <ol className={styles.steps} aria-hidden="true">
        {data.words.map((w) => <li key={w.word} data-step>{w.word}<i /></li>)}
      </ol>
    </section>
  );
}
