"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { Artefact, Caption } from "../../kit/Identity";
import Head from "../Head";
import styles from "./Showcase.module.css";

/**
 * The work, shown as three plates — each the demo brand's artefact laid on a real surface (paper,
 * material, a pouch, a billboard at dusk). They start stacked like a deck on the table and fan out
 * across the width as you scroll in, each settling at its own angle. Phones see them in a row.
 */
export default function Showcase({ data, brand, service }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const plates = gsap.utils.toArray("[data-plate]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: root.querySelector("[data-deck]"), start: "top 85%", end: "center 55%", scrub: 0.8 } });
      plates.forEach((p, i) => tl.fromTo(p, { xPercent: (1 - i) * 100, yPercent: 10 + i * 4, rotation: (i - 1) * 3 }, { xPercent: 0, yPercent: 0, rotation: (i - 1) * -2.5, duration: 1 }, 0));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.show} aria-labelledby="bsi-show">
      <div className={styles.head}>
        <Head service={service} kicker={data.kicker} title={data.title} text={data.text} id="bsi-show" />
        <Caption className={styles.cap} />
      </div>
      <div className={styles.deck} data-deck>
        {data.plates.map((p, i) => (
          <figure key={i} className={styles.plate} data-plate style={{ zIndex: i === 1 ? 3 : 2 - i }}>
            <span className={styles.bg}><Image src={p.bg} alt="" fill sizes="(max-width: 900px) 80vw, 34vw" /></span>
            <span className={`${styles.art} ${styles[`k_${p.kind}`] || ""}`} aria-hidden="true"><Artefact kind={p.kind} brand={brand} img={p.img} finish={p.finish} /></span>
            <figcaption>{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
