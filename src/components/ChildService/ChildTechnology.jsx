"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import Button from "@/components/Common/Button";
import VideoBackground from "@/components/Common/VideoBackground";
import styles from "./ChildTechnology.module.css";

/**
 * The technology behind the service, and why it matters: each row reads technology → what it does →
 * what you get, ending in a call to action. Behind it, a cinematic background — a film when the
 * service has one (data.video), otherwise a real photograph pushing slowly in — held under a dark
 * brand grade so the type stays readable. The headline comes into focus word by word; each row wipes
 * in column by column as it arrives.
 */
export default function ChildTechnology({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-l]"), { type: "words" });
      gsap.fromTo(split.words, { opacity: 0, filter: "blur(12px)", yPercent: 30 }, { opacity: 1, filter: "blur(0px)", yPercent: 0, ease: "power2.out", stagger: 0.1, scrollTrigger: { trigger: root, start: "top 75%", end: "top 25%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-media]"), { scale: 1.22, yPercent: -6 }, { scale: 1.02, yPercent: 6, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray("[data-row]", root).forEach((r) => {
        gsap.fromTo(r.children, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", stagger: 0.12, scrollTrigger: { trigger: r, start: "top 88%", once: true } });
      });
      gsap.from(root.querySelectorAll("[data-cta] > *"), { y: 24, opacity: 0, duration: 1, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-cta]"), start: "top 92%", once: true } });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="technology" className={styles.tech} aria-labelledby="technology-title">
      <div className={styles.media} data-media aria-hidden="true">
        {data.video ? (
          <VideoBackground src={data.video.src} mobileSrc={data.video.srcMobile} poster={data.video.poster} tint={false} className={styles.fill} />
        ) : (
          <Image src={data.image} alt="" fill sizes="100vw" quality={80} className={styles.cover} />
        )}
      </div>
      <span className={styles.grade} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.head}>
          <Label>{data.kicker}</Label>
          <h2 id="technology-title" className={styles.title}>
            <span data-l>{data.title[0]}</span>
            <span className={styles.em} data-l>{data.title[1]}</span>
          </h2>
          <p className={styles.text}>{data.text}</p>
        </header>

        <div className={styles.table}>
          <div className={styles.cols} aria-hidden="true"><span>Technology</span><span>What it does</span><span>What you get</span></div>
          <ul>
            {data.rows.map((r) => (
              <li key={r.tech} className={styles.row} data-row>
                <h3 className={styles.techName}>{r.tech}</h3>
                <p className={styles.does}><span className={styles.mLabel}>What it does</span>{r.does}</p>
                <p className={styles.gets}><span className={styles.mLabel}>What you get</span>{r.gets}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cta} data-cta>
          <p>{data.cta.text}</p>
          <div className={styles.actions}>
            <Button href={data.cta.primary.href} size="lg">{data.cta.primary.label}</Button>
            <Button href={data.cta.secondary.href} variant="outline" size="lg" icon="right">{data.cta.secondary.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
