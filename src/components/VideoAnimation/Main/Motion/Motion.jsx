"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import styles from "./Motion.module.css";

/**
 * The power of motion — an editorial spread on light stock. The statement is set at display size and
 * develops with the scroll, word by word, like a print coming up in the tray; two pictures sit inside
 * the sentence and open out of it. Below, a large still drifts in its frame beside three notes whose
 * rules draw across.
 */
export default function Motion({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-words]"), { type: "words" });
      const st = { trigger: root.querySelector("[data-statement]"), start: "top 78%", end: "bottom 45%", scrub: 0.5 };
      gsap.fromTo(split.words, { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: st });
      gsap.from(root.querySelectorAll("[data-slot]"), { width: 0, marginLeft: 0, marginRight: 0, ease: "power2.inOut", stagger: 0.4, scrollTrigger: st });
      gsap.utils.toArray("[data-note]", root).forEach((n, i) => {
        gsap.timeline({ scrollTrigger: { trigger: n, start: "top 88%", once: true } })
          .from(n.querySelector("[data-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" }, i * 0.08)
          .from(n.querySelectorAll("h3, p"), { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.3 + i * 0.08);
      });
      gsap.fromTo(root.querySelector("[data-pic]"), { clipPath: "inset(12% 8% 12% 8%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root.querySelector("[data-pic]"), start: "top 90%", end: "top 30%", scrub: 0.6 } });
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-pic] img"), { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-pic]"), start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.motion} aria-labelledby="va-motion">
      <p className={styles.kicker}><i aria-hidden="true" />{data.kicker}</p>
      <h2 id="va-motion" className={styles.statement} data-statement>
        {data.statement.map((part, i) => typeof part === "string"
          ? <span key={i} data-words>{part} </span>
          : <span key={i} className={styles.slot} data-slot><Image src={part.img} alt={part.alt} fill sizes="220px" /></span>)}
      </h2>
      <div className={styles.lower}>
        <figure className={styles.pic} data-pic>
          <Image src={data.image} alt={data.imageAlt} fill sizes="(min-width: 901px) 52vw, 92vw" />
        </figure>
        <div className={styles.notes}>
          {data.notes.map((n) => (
            <div key={n.name} className={styles.note} data-note>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <h3>{n.name}</h3>
              <p>{n.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
