"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import RevealText from "@/components/Common/RevealText";
import styles from "./ServiceIntro.module.css";

/**
 * "Solid digital presence": the words and the work side by side, at one screen-height. The visual is
 * a browser window with the studio's work inside it, a phone showing the same idea on a small screen,
 * and a small panel listing what every build includes, layered at three depths. On scroll the
 * browser settles from a tilt to flat while the phone slides up past it.
 */
export default function ServiceIntro({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const [a, b, c] = data.images;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelectorAll("[data-t]"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: root, start: "top 72%", once: true } });
      gsap.fromTo(root.querySelectorAll("[data-pt]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut", stagger: 0.08, scrollTrigger: { trigger: root.querySelector("[data-pts]"), start: "top 90%", once: true } });
      gsap.fromTo(root.querySelector("[data-browser]"), { rotationX: 18, rotationY: -14, y: 60, opacity: 0.4 }, { rotationX: 0, rotationY: 0, y: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: root, start: "top 90%", end: "center 55%", scrub: 0.6 } });
    });
    mm.add(DESKTOP_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-phone]"), { yPercent: 30 }, { yPercent: -12, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(root.querySelector("[data-panel]"), { yPercent: -20 }, { yPercent: 20, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="overview" className={styles.intro} aria-labelledby="intro-title">
      <div className={styles.copy}>
        <Label>{data.kicker}</Label>
        <RevealText id="intro-title" className={styles.title}>{data.title}</RevealText>
        <p className={styles.lead} data-t>{data.lead}</p>
        {data.paragraphs.map((p) => <p key={p} className={styles.para} data-t>{p}</p>)}
      </div>

      <div className={styles.stage}>
        <figure className={styles.browser} data-browser>
          <p className={styles.chrome} aria-hidden="true"><i /><i /><i /><span>www.yourbrand.com</span></p>
          <div className={styles.screen}><Image src={a} alt="Web development work on screen" fill sizes="(min-width: 901px) 44vw, 92vw" loading="lazy" /></div>
        </figure>

        <figure className={styles.phone} data-phone aria-hidden="true">
          <span className={styles.notch} />
          <div className={styles.phoneScreen}><Image src={b} alt="" fill sizes="(min-width: 901px) 12vw, 30vw" loading="lazy" /></div>
        </figure>

        <div className={styles.panel} data-panel>
          {c && <span className={styles.thumb} aria-hidden="true"><Image src={c} alt="" fill sizes="80px" loading="lazy" /></span>}
          <ul className={styles.points} data-pts aria-label="Every build includes">
            {data.points.map((p) => <li key={p} data-pt>{p}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
