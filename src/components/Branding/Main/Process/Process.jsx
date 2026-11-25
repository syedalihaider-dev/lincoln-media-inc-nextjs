"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { LogoSheet, Card } from "../../kit/Identity";
import Head from "../Head";
import styles from "./Process.module.css";

/**
 * The process as a pinboard you walk along. While the section holds (desktop) the board slides
 * sideways; the seven steps are sheets pinned at slight angles — photographs, identity work, plain
 * type — and each sheet straightens as it reaches the middle of the screen, while a huge word for the
 * current step drifts behind the board. Phones read the sheets top to bottom.
 */
export default function Process({ data, brand }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const track = root.querySelector("[data-track]");
    const sheets = gsap.utils.toArray("[data-sheet]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const dist = () => track.scrollWidth - innerWidth;
      const move = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true } });
      gsap.to(root.querySelector("[data-back]"), { xPercent: -45, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true } });
      sheets.forEach((sh, i) => {
        gsap.fromTo(sh, { rotation: i % 2 ? 5 : -5, y: i % 2 ? 40 : -20 }, { rotation: 0, y: 0, ease: "none", scrollTrigger: { trigger: sh, containerAnimation: move, start: "left 95%", end: "center 55%", scrub: true } });
      });
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      sheets.forEach((sh, i) => gsap.from(sh, { rotation: i % 2 ? 3 : -3, y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: sh, start: "top 90%", once: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.process} aria-labelledby="brand-process">
      <p className={styles.back} data-back aria-hidden="true">{data.steps.map((s) => s.name).join(" — ")}</p>
      <div className={styles.track} data-track>
        <div className={styles.intro}><Head kicker={data.kicker} title={data.title} id="brand-process" tone="paper" /></div>
        {data.steps.map((st) => (
          <article key={st.name} className={`${styles.sheet} ${st.img ? styles.photo : st.art ? styles.work : styles.type}`} data-sheet>
            <span className={styles.tape} aria-hidden="true" />
            {st.img && <figure className={styles.media}><Image src={st.img} alt="" fill sizes="(max-width: 900px) 90vw, 30vw" /></figure>}
            {st.art === "logo" && <div className={styles.artWrap} aria-hidden="true"><LogoSheet brand={brand} /></div>}
            {st.art === "cards" && <div className={`${styles.artWrap} ${styles.cardsArt}`} aria-hidden="true"><Card brand={brand} side="front" /><Card brand={brand} side="back" /></div>}
            <h3>{st.name}</h3>
            <p>{st.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
