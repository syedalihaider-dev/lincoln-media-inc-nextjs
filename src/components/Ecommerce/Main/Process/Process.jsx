"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { Browser } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import Head from "../Head";
import styles from "./Process.module.css";

/**
 * The process as a track you travel sideways (desktop: the section holds while the track moves).
 * Panels change width and material — photograph, working interface, pure type — so the seven steps
 * read as a sequence of spreads. Photographs drift inside their frames against the travel, each
 * step's word slides in as its panel arrives, and the line under the names fills.
 */
export default function Process({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const track = root.querySelector("[data-track]");
    const panels = gsap.utils.toArray("[data-panel]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const distance = () => track.scrollWidth - innerWidth;
      const move = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true } });
      gsap.to(root.querySelector("[data-progress]"), { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${distance()}`, scrub: true, invalidateOnRefresh: true } });
      panels.forEach((p) => {
        const img = p.querySelector("[data-drift]");
        if (img) gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: "none", scrollTrigger: { trigger: p, containerAnimation: move, start: "left right", end: "right left", scrub: true } });
        gsap.from(p.querySelector("[data-word]"), { xPercent: 30, opacity: 0, ease: "power2.out", scrollTrigger: { trigger: p, containerAnimation: move, start: "left 85%", end: "left 40%", scrub: true } });
      });
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      panels.forEach((p) => gsap.from(p, { y: 40, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 88%", once: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.process} aria-labelledby="ecom-process">
      <div className={styles.track} data-track>
        <div className={styles.intro}>
          <Head kicker={data.kicker} title={data.title} id="ecom-process" />
          <p className={styles.hint} aria-hidden="true">Scroll to travel through the work <span>→</span></p>
        </div>
        {data.steps.map((s) => {
          const kind = s.img ? "photo" : s.screen ? "screen" : "type";
          return (
            <article key={s.name} className={`${styles.panel} ${styles[kind]}`} data-panel>
              {kind === "photo" && (
                <figure className={styles.media}><span className={styles.drift} data-drift><Image src={s.img} alt={s.alt} fill sizes="(max-width: 900px) 90vw, 40vw" /></span></figure>
              )}
              {kind === "screen" && (
                <div className={styles.screenWrap} aria-hidden="true"><Browser url={s.store.domain} tone="dark"><Screen kind={s.screen} store={s.store} /></Browser></div>
              )}
              <div className={styles.copy}>
                <h3 className={styles.word} data-word>{s.name}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.line}><span data-progress /></span>
        <ol>{data.steps.map((s) => <li key={s.name}>{s.name}</li>)}</ol>
      </div>
    </section>
  );
}
