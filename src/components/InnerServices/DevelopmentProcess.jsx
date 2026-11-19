"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./DevelopmentProcess.module.css";

const FILM = "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";

/**
 * How a build moves: the studio's steps as a horizontal journey. On desktop the chapter holds and the
 * steps slide past — each a panel with the step's name set large, its line, and a photograph that
 * drifts against the motion — while a rail of the step names fills and lights as you go. Phones: the
 * steps down the page along a line.
 */
export default function DevelopmentProcess({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const n = data.steps.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(FILM, () => {
      const track = root.querySelector("[data-track]");
      const distance = () => track.scrollWidth - innerWidth;
      let cur = 0;
      const film = gsap.to(track, {
        x: () => -distance(), ease: "none",
        scrollTrigger: {
          trigger: root.querySelector("[data-pin]"), start: "top top", end: () => `+=${distance()}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (s) => {
            root.style.setProperty("--pp", s.progress.toFixed(4));
            const i = Math.min(n - 1, Math.round(s.progress * (n - 1)));
            if (i !== cur) { cur = i; setActive(i); sfx("tick"); }
          },
        },
      });
      gsap.utils.toArray("[data-step]", root).forEach((st) => {
        gsap.fromTo(st.querySelector("[data-img] img"), { xPercent: -12 }, { xPercent: 12, ease: "none", scrollTrigger: { trigger: st, containerAnimation: film, start: "left right", end: "right left", scrub: true } });
        gsap.fromTo(st.querySelector("[data-img]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: st, containerAnimation: film, start: "left 90%", end: "left 40%", scrub: 0.6 } });
        gsap.fromTo(st.querySelector("[data-name]"), { yPercent: 40, opacity: 0.2 }, { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: st, containerAnimation: film, start: "left 85%", end: "left 45%", scrub: 0.6 } });
      });
    });
    mm.add("(max-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(root.querySelector("[data-vline]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-track]"), start: "top 70%", end: "bottom 70%", scrub: 0.5 } });
    });
    return () => mm.revert();
  }, { dependencies: [ready, n], scope: ref });

  return (
    <section ref={ref} id="process" className={styles.process} aria-labelledby="process-title">
      <div className={styles.pin} data-pin>
        <div className={styles.top}>
          <SectionHead kicker={data.kicker} title={data.title} id="process-title" />
          <div className={styles.rail} aria-hidden="true">
            <i className={styles.railFill} />
            <ol>{data.steps.map((s, i) => <li key={s.name} className={i <= active ? styles.railOn : undefined}><span>{s.name}</span></li>)}</ol>
          </div>
        </div>

        <div className={styles.track} data-track>
          <span className={styles.vline} aria-hidden="true"><i data-vline /></span>
          {data.steps.map((s) => (
            <article key={s.name} className={styles.step} data-step>
              <figure className={styles.img} data-img aria-hidden="true"><Image src={s.image} alt="" fill sizes="(min-width: 1101px) 30vw, 90vw" /></figure>
              <div className={styles.copy}>
                <h3 className={styles.name} data-name>{s.name}</h3>
                <p className={styles.text}>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
