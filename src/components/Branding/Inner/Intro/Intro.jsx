"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../Head";
import styles from "./Intro.module.css";

/**
 * The service introduced as a magazine page: a statement, two columns of text with a drop cap, and a
 * photograph that grows from an inset to the full measure as it passes through the screen.
 */
export default function Intro({ data, service }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-fig]"), { clipPath: "inset(14% 18% 14% 18%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: root.querySelector("[data-fig]"), start: "top 95%", end: "center 55%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-fig] img"), { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-fig]"), start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(root.querySelectorAll("[data-col]"), { y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-cols]"), start: "top 82%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.intro} aria-labelledby="bsi-intro">
      <Head service={service} kicker={data.kicker} title={data.statement} id="bsi-intro" />
      <div className={styles.cols} data-cols>
        {data.text.map((t, i) => <p key={i} className={i === 0 ? styles.first : undefined} data-col>{t}</p>)}
      </div>
      <figure className={styles.fig} data-fig><Image src={data.img} alt={data.alt} fill sizes="100vw" /></figure>
    </section>
  );
}
