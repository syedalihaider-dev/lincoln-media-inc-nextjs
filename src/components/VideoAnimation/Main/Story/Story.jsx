"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../../kit/Head";
import styles from "./Story.module.css";

const OPEN = ["inset(0% 0% 100% 0%)", "inset(0% 100% 0% 0%)", "inset(100% 0% 0% 0%)"];

/**
 * Visual storytelling — the three movements of a film. Each act is a layered composition: the act's
 * word set huge behind, sliding sideways with the scroll; the picture opening out of its own edge with
 * a slower parallax inside; the copy on top, its letters set rising. Acts alternate sides.
 */
export default function Story({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const splits = [];
      gsap.utils.toArray("[data-act]", root).forEach((a, i) => {
        const s = SplitText.create(a.querySelector("[data-word]"), { type: "chars", mask: "chars" });
        splits.push(s);
        gsap.timeline({ scrollTrigger: { trigger: a, start: "top 80%", once: true } })
          .from(s.chars, { yPercent: 105, duration: 1.2, stagger: 0.03, ease: "expo.out" })
          .fromTo(a.querySelector("[data-pic]"), { clipPath: OPEN[i % 3] }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }, 0.1)
          .from(a.querySelector("[data-copy]"), { y: 40, opacity: 0, duration: 1.1 }, 0.6);
      });
      return () => splits.forEach((s) => s.revert());
    });
    mm.add(DESKTOP_MOTION, () => {
      gsap.utils.toArray("[data-act]", root).forEach((a, i) => {
        const st = { trigger: a, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo(a.querySelector("[data-word]"), { xPercent: i % 2 ? 12 : -12 }, { xPercent: i % 2 ? -8 : 8, ease: "none", scrollTrigger: st });
        gsap.fromTo(a.querySelector("[data-pic] img"), { yPercent: -12 }, { yPercent: 12, ease: "none", scrollTrigger: st });
        gsap.fromTo(a.querySelector("[data-copy]"), { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: st });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.story} aria-labelledby="va-story">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="va-story" tone="light" align="center" />
      <div className={styles.acts}>
        {data.acts.map((a, i) => (
          <article key={a.name} className={`${styles.act} ${i % 2 ? styles.flip : ""}`} data-act>
            <p className={styles.word} data-word aria-hidden="true">{a.name}</p>
            <figure className={styles.pic} data-pic><Image src={a.img} alt={a.alt} fill sizes="(min-width: 901px) 46vw, 92vw" /></figure>
            <div className={styles.copy} data-copy>
              <h3>{a.name}</h3>
              <p>{a.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
