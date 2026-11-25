"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import styles from "./Intro.module.css";

/**
 * The service in a paragraph. The statement holds in the left column while the right column scrolls:
 * the photograph is uncovered downward from behind a mask (and settles from a slight zoom) and the two
 * paragraphs follow it in, line by line.
 */
export default function Intro({ data, platform }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const fig = root.querySelector("[data-fig]");
      gsap.timeline({ scrollTrigger: { trigger: fig, start: "top 80%", once: true } })
        .fromTo(fig, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" })
        .fromTo(fig.querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 2, ease: "expo.out" }, 0.2);
      const splits = gsap.utils.toArray("[data-para]", root).map((p) => {
        const s = SplitText.create(p, { type: "lines", mask: "lines" });
        gsap.from(s.lines, { yPercent: 100, duration: 1.1, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 85%", once: true } });
        return s;
      });
      return () => splits.forEach((s) => s.revert());
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.intro} aria-labelledby="eci-intro">
      <div className={styles.left}>
        <p className={styles.tab}><b>{platform}</b><span>{data.kicker}</span></p>
        <h2 id="eci-intro" className={styles.statement}>{data.statement}</h2>
      </div>
      <div className={styles.right}>
        <figure className={styles.fig} data-fig>
          <Image src={data.img} alt={data.alt} fill sizes="(max-width: 900px) 90vw, 46vw" />
        </figure>
        {data.text.map((t) => <p key={t.slice(0, 20)} className={styles.para} data-para>{t}</p>)}
      </div>
    </section>
  );
}
