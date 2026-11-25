"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import VideoBackground from "@/components/Common/VideoBackground";
import { Phone } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import styles from "./Experience.module.css";

/**
 * The service in the world: the service's own footage fills the section, and in front of it a phone
 * with the demo store and three photographs travel at different speeds — the far ones slow, the near
 * ones fast — so the frame reads in layers as you pass through it.
 */
export default function Experience({ data, store, platform }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const st = { trigger: root, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(root.querySelector("[data-video]"), { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: st });
      gsap.from(root.querySelectorAll("[data-rise]"), { y: 40, opacity: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: { trigger: root, start: "top 55%", once: true } });
    });
    mm.add(DESKTOP_MOTION, () => {
      const st = { trigger: root, start: "top bottom", end: "bottom top", scrub: true };
      [[-20, 30], [40, -50], [10, -90]].forEach(([a, b], i) => gsap.fromTo(root.querySelector(`[data-layer="${i}"]`), { yPercent: a }, { yPercent: b, ease: "none", scrollTrigger: st }));
      gsap.fromTo(root.querySelector("[data-phone]"), { yPercent: 30, rotation: -4 }, { yPercent: -30, rotation: 3, ease: "none", scrollTrigger: st });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.exp} aria-labelledby="eci-exp">
      <div className={styles.bg} data-video>
        <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} />
      </div>
      <div className={styles.copy}>
        <p className={styles.tab} data-rise><b>{platform}</b><span>{data.kicker}</span></p>
        <h2 id="eci-exp" className={styles.title} data-rise>{data.title}</h2>
        <p className={styles.text} data-rise>{data.text}</p>
      </div>
      <div className={styles.layers} aria-hidden="true">
        {data.gallery.map((g, i) => (
          <figure key={i} className={`${styles.shot} ${styles[`s${i}`]}`} data-layer={i}>
            <Image src={g.img} alt="" fill sizes="(max-width: 900px) 40vw, 18vw" />
          </figure>
        ))}
        <div className={styles.phone} data-phone><Phone><Screen kind={data.screen} store={store} device="phone" /></Phone></div>
      </div>
    </section>
  );
}
