"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import VideoBackground from "@/components/Common/VideoBackground";
import { Artefact } from "../../kit/Identity";
import styles from "./Experience.module.css";

/**
 * The service in the wider brand: the service's own footage fills the section, and across it a reel of
 * photographs and artefacts drifts sideways with the scroll (and keeps drifting slowly on its own),
 * the way the brand moves through the world — one surface after another.
 */
export default function Experience({ data, brand, service }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelector("[data-reel]"), { xPercent: 0 }, { xPercent: -25, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      gsap.from(root.querySelectorAll("[data-rise]"), { y: 40, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: root, start: "top 60%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const reel = [...data.reel, ...data.reel];
  return (
    <section ref={ref} className={styles.exp} aria-labelledby="bsi-exp">
      <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} />
      <div className={styles.copy}>
        <p className={styles.folio} data-rise><span>{service}</span><i />{data.kicker}</p>
        <h2 id="bsi-exp" className={styles.title} data-rise>{data.title}</h2>
        <p className={styles.text} data-rise>{data.text}</p>
      </div>
      <div className={styles.reelWrap} aria-hidden="true">
        <div className={styles.reel} data-reel>
          {reel.map((r, i) => (
            <div key={i} className={`${styles.tile} ${r.kind ? styles.artTile : ""}`}>
              {r.kind ? <Artefact kind={r.kind} brand={brand} img={r.img} /> : <Image src={r.img} alt="" fill sizes="(max-width: 900px) 50vw, 22vw" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
