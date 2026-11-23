"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import styles from "./ChildIntro.module.css";

/**
 * The story. A statement set large on one side, its words lighting one after another as you read;
 * the detail on the other, with a photograph opening through a widening circle. Behind it all a
 * faded photograph drifts slower than the page and the service's name slides past, very large and
 * very quiet — three depths moving at three speeds.
 */
export default function ChildIntro({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelector("[data-statement]"), { type: "words" });
      gsap.fromTo(split.words, { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: root.querySelector("[data-statement]"), start: "top 80%", end: "bottom 45%", scrub: true } });
      gsap.fromTo(root.querySelector("[data-backdrop]"), { yPercent: -12, scale: 1.15 }, { yPercent: 12, scale: 1.05, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(root.querySelector("[data-marquee]"), { xPercent: 8 }, { xPercent: -28, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(root.querySelector("[data-photo]"), { clipPath: "circle(8% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "none", scrollTrigger: { trigger: root.querySelector("[data-photo]"), start: "top 90%", end: "center 55%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-photo] img"), { yPercent: -8, scale: 1.2 }, { yPercent: 8, scale: 1.05, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-photo]"), start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(root.querySelectorAll("[data-detail] > *"), { y: 28, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: root.querySelector("[data-detail]"), start: "top 82%", once: true } });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="story" className={styles.intro} aria-labelledby="story-title">
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.backdropIn} data-backdrop>
          <Image src={data.backdrop} alt="" fill sizes="100vw" className={styles.backImg} />
        </div>
      </div>
      <p className={styles.marquee} data-marquee aria-hidden="true">{data.marquee}</p>

      <div className={styles.grid}>
        <div className={styles.left}>
          <Label>{data.kicker}</Label>
          <p className={styles.statement} data-statement>{data.statement}</p>
        </div>

        <div className={styles.right} data-detail>
          <h2 id="story-title" className={styles.title}>{data.title}</h2>
          {data.paragraphs.map((p) => <p key={p} className={styles.p}>{p}</p>)}
          <figure className={styles.photo} data-photo>
            <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 900px) 92vw, 40vw" placeholder="blur" className={styles.img} />
          </figure>
        </div>
      </div>
    </section>
  );
}
