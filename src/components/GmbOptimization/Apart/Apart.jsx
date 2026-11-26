"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import styles from "./Apart.module.css";

/**
 * What sets us apart — an editorial spread. The photograph of a florist at work opens out of a small
 * circle — a pin's head — to the full frame as it crosses the screen, drifting against the scroll;
 * three statements follow, each on a rule that draws across before its words arrive.
 */
export default function Apart({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const fig = root.querySelector("[data-fig]");
      gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 90%", end: "center 45%", scrub: 0.8 } })
        .fromTo(fig, { clipPath: "circle(9% at 50% 46%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "power2.inOut" }, 0);
      gsap.fromTo(fig.querySelector("img"), { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.utils.toArray("[data-point]", root).forEach((p, i) => {
        gsap.timeline({ scrollTrigger: { trigger: p, start: "top 88%", once: true } })
          .from(p.querySelector("[data-rule]"), { scaleX: 0, duration: 1.2, ease: "expo.inOut", delay: i * 0.08 })
          .from(p.querySelectorAll("h3, p"), { y: 24, opacity: 0, stagger: 0.08, duration: 1, ease: "expo.out" }, "-=0.6");
      });
    });
  }, []);

  return (
    <section ref={ref} className={styles.apart} aria-labelledby="gmb-apart">
      <div className={styles.top}>
        <Head kicker={data.kicker} title={data.title} id="gmb-apart" tone="light" />
        <p className={styles.text}>{data.text}</p>
      </div>
      <figure className={styles.fig} data-fig>
        <Image src={data.image} alt={data.imageAlt} fill sizes="100vw" />
      </figure>
      <ul className={styles.points}>
        {data.points.map((p) => (
          <li key={p.name} data-point>
            <span className={styles.rule} data-rule aria-hidden="true" />
            <h3>{p.name}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
