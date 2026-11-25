"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import styles from "./Story.module.css";

/**
 * The service story — an editorial opener. The statement rises line by line behind a hairline that
 * draws across; the picture grows out of a small window to its full frame while the image inside
 * settles; two columns of copy follow.
 */
export default function Story({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelector("[data-statement]"), { type: "lines", mask: "lines" });
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top 72%", once: true } })
        .from(root.querySelector("[data-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut" })
        .from(split.lines, { yPercent: 105, duration: 1.2, stagger: 0.1 }, 0.3)
        .from(root.querySelectorAll("[data-col]"), { y: 30, opacity: 0, duration: 1, stagger: 0.1 }, 0.8);
      gsap.fromTo(root.querySelector("[data-pic]"), { clipPath: "inset(25% 30% 25% 30%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root.querySelector("[data-pic]"), start: "top 95%", end: "center 55%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-pic] img"), { scale: 1.4 }, { scale: 1.08, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-pic]"), start: "top 95%", end: "bottom top", scrub: true } });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.story} aria-labelledby="vs-story">
      <p className={styles.kicker}><i aria-hidden="true" />{data.kicker}</p>
      <span className={styles.rule} data-rule aria-hidden="true" />
      <h2 id="vs-story" className={styles.statement} data-statement>{data.statement}</h2>
      <div className={styles.body}>
        <figure className={styles.pic} data-pic><Image src={data.img} alt={data.alt} fill sizes="(min-width: 901px) 50vw, 92vw" /></figure>
        <div className={styles.cols}>
          {data.text.map((t) => <p key={t} data-col>{t}</p>)}
        </div>
      </div>
    </section>
  );
}
