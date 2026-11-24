"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import { Ui } from "../ui/Frames";
import { useScene, PIN, SMALL } from "../shared";
import styles from "./CinematicImage.module.css";

/**
 * The people behind the work, at full scale. The photograph arrives as a narrow vertical slit and
 * opens to fill the screen (held on desktop) while it settles from a slow push-in. In front, the
 * two lines of the headline drift apart in opposite directions, and a page of the strategy
 * document rises past faster than everything else — three planes, three speeds.
 */
export default function CinematicImage({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const scene = (tl) => tl
      .fromTo(q("[data-mask]"), { clipPath: "inset(6% 42% 6% 42% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1, ease: "power2.inOut" }, 0)
      .fromTo(q("[data-mask] img"), { scale: 1.35 }, { scale: 1.02, duration: 1.6, ease: "none" }, 0)
      // the lines arrive from opposite sides and keep drifting apart — but never past the gutter
      .fromTo(q("[data-l1]"), { xPercent: 28, opacity: 0 }, { xPercent: -2, opacity: 1, duration: 1.4, ease: "power2.out" }, 0.3)
      .fromTo(q("[data-l2]"), { xPercent: -28, opacity: 0 }, { xPercent: 6, opacity: 1, duration: 1.4, ease: "power2.out" }, 0.4)
      .fromTo(q("[data-front]"), { yPercent: 120, rotationZ: 6 }, { yPercent: -60, rotationZ: -3, duration: 1.6, ease: "none" }, 0.1)
      .fromTo(q("[data-text]"), { clipPath: "inset(0% 0% 100% 0%)", y: 30 }, { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.5 }, 0.9);

    mm.add(PIN, () => { scene(gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=140%", pin: true, scrub: 0.9, anticipatePin: 1 } })); });
    mm.add(SMALL, () => { scene(gsap.timeline({ scrollTrigger: { trigger: root, start: "top 85%", end: "bottom 30%", scrub: 0.6 } })); });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="cine-title" data-phase="Growth">
      <figure className={styles.mask} data-mask>
        <Image src={data.image} alt={data.alt} fill sizes="100vw" quality={80} className={styles.img} />
        <span className={styles.grade} aria-hidden="true" />
      </figure>

      <div className={styles.front} data-front aria-hidden="true"><Ui kind="brief" /></div>

      <div className={styles.copy}>
        <Label>{data.kicker}</Label>
        <h2 id="cine-title" className={styles.title}>
          <span data-l1>{data.title[0]}</span>
          <span data-l2 className={styles.em}>{data.title[1]}</span>
        </h2>
        <p className={styles.text} data-text>{data.text}</p>
      </div>
    </section>
  );
}
