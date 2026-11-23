"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import styles from "./Intro.module.css";

/**
 * The brief. A statement whose words light up one by one as you read down the page, the service's
 * own copy beneath it, and a photograph that opens from a thin slit beside a sheet of plain facts.
 */
export default function Intro({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const words = data.statement.split(" ");

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelectorAll("[data-w]"), { opacity: 0.14 }, { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: root.querySelector("[data-statement]"), start: "top 80%", end: "bottom 45%", scrub: true } });
      gsap.fromTo(root.querySelector("[data-plate]"), { clipPath: "inset(0% 48% 0% 48% round 20px)" }, { clipPath: "inset(0% 0% 0% 0% round 20px)", ease: "power2.inOut", scrollTrigger: { trigger: root.querySelector("[data-plate]"), start: "top 85%", end: "center 55%", scrub: 0.6 } });
      gsap.fromTo(root.querySelector("[data-plate] img"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-plate]"), start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(root.querySelectorAll("[data-fact]"), { y: 24, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: root.querySelector("[data-facts]"), start: "top 90%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.intro} aria-labelledby="intro-title">
      <div className={styles.text}>
        <Label>{data.kicker}</Label>
        <h2 id="intro-title" className={styles.statement} data-statement>
          {words.map((w, i) => <span key={i} data-w>{w} </span>)}
        </h2>
        {data.text.map((p) => <p key={p.slice(0, 24)} className={styles.p}>{p}</p>)}
      </div>
      <div className={styles.side}>
        <figure className={styles.plate} data-plate>
          <Image src={data.image} alt={data.imageAlt} fill sizes="(max-width: 900px) 92vw, 40vw" className={styles.img} />
        </figure>
        <dl className={styles.facts} data-facts>
          {data.facts.map(([k, v]) => <div key={k} data-fact><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
