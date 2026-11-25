"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Capabilities.module.css";

/**
 * Capabilities as a two-column definition list, like the contents page of a brand book. Each entry's
 * rule draws across, its name wipes on from the left and its description follows word by word.
 */
export default function Capabilities({ data, service }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const splits = gsap.utils.toArray("[data-cap]", ref.current).map((el) => {
        const sp = SplitText.create(el.querySelector("dd"), { type: "words" });
        gsap.timeline({ scrollTrigger: { trigger: el, start: "top 88%", once: true } })
          .from(el.querySelector("[data-rule]"), { scaleX: 0, duration: 1.1, ease: "expo.inOut" })
          .fromTo(el.querySelector("dt"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.out" }, 0.3)
          .from(sp.words, { opacity: 0, y: 8, duration: 0.6, stagger: 0.02, ease: "power2.out" }, 0.5);
        return sp;
      });
      return () => splits.forEach((s) => s.revert());
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.caps} aria-labelledby="bsi-caps">
      <Head service={service} kicker={data.kicker} title={data.title} id="bsi-caps" />
      <dl className={styles.list}>
        {data.items.map((it) => (
          <div key={it.name} className={styles.item} data-cap>
            <span className={styles.rule} data-rule aria-hidden="true" />
            <dt>{it.name}</dt>
            <dd>{it.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
