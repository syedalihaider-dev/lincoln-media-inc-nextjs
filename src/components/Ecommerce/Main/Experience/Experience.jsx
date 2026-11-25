"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import styles from "./Experience.module.css";

/**
 * The introduction, set like a magazine spread on paper. The statement starts as a pale proof and
 * inks in word by word with the scroll; the tall photograph is uncovered from the bottom while the
 * small one drifts the other way; the three principles draw their rules as they arrive.
 */
export default function Experience({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelector("[data-statement]"), { type: "words" });
      gsap.fromTo(split.words, { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: root.querySelector("[data-statement]"), start: "top 80%", end: "bottom 45%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-tall]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "expo.inOut", duration: 1.8, scrollTrigger: { trigger: root.querySelector("[data-tall]"), start: "top 85%", once: true } });
      gsap.fromTo(root.querySelector("[data-tall] img"), { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-tall]"), start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(root.querySelector("[data-small]"), { yPercent: 30 }, { yPercent: -30, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-small]"), start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray("[data-col]", root).forEach((c, i) => {
        gsap.timeline({ scrollTrigger: { trigger: c, start: "top 88%", once: true } })
          .from(c.querySelector("[data-rule]"), { scaleX: 0, duration: 1.3, ease: "expo.inOut", delay: i * 0.1 })
          .from(c.querySelectorAll("h3, p"), { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, "-=0.8");
      });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const [tall, small] = data.images;
  return (
    <section ref={ref} className={styles.exp} aria-labelledby="ecom-exp">
      <p className={styles.kicker}>{data.kicker}</p>
      <h2 className={styles.statement} id="ecom-exp" data-statement>{data.statement}</h2>
      <div className={styles.media}>
        <figure className={styles.tall} data-tall>
          <Image src={tall.img} alt={tall.alt} fill sizes="(max-width: 900px) 90vw, 38vw" />
        </figure>
        <figure className={styles.small} data-small>
          <Image src={small.img} alt={small.alt} fill sizes="(max-width: 900px) 45vw, 20vw" />
        </figure>
        <div className={styles.cols}>
          {data.columns.map((c) => (
            <div key={c.title} className={styles.col} data-col>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
