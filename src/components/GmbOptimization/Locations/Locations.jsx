"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, PIN } from "@/components/ServicePage/scene";
import VideoBackground from "@/components/Common/VideoBackground";
import Head from "@/components/ServicePage/Head";
import { GMB_BUSINESS as B } from "@/data/services/gmbOptimization";
import { Ic, Stars } from "../ui/Listing";
import styles from "./Locations.module.css";

/**
 * One brand, every neighbourhood. Over aerial footage of city blocks, a row of location profiles —
 * the same brand, each with its own street, hours and local speciality — glides sideways against
 * the scroll while the footage sinks slowly.
 */
export default function Locations({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    mm.add(PIN, () => {
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.8 } })
        .fromTo(root.querySelector("[data-row]"), { xPercent: 12 }, { xPercent: -22, ease: "none" }, 0)
        .fromTo(root.querySelector("[data-media]"), { yPercent: -8, scale: 1.15 }, { yPercent: 8, scale: 1.15, ease: "none" }, 0);
      gsap.from(root.querySelectorAll("[data-place]"), { y: 80, rotate: (i) => (i % 2 ? 3 : -3), opacity: 0, stagger: 0.1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-row]"), start: "top 85%", once: true } });
    });
  }, []);

  return (
    <section ref={ref} className={styles.loc} aria-labelledby="gmb-loc">
      <div className={styles.media} data-media>
        <VideoBackground src={data.video.src} mobileSrc={data.video.mobile} poster={data.video.poster} />
      </div>
      <Head kicker={data.kicker} title={data.title} text={data.text} id="gmb-loc" className={styles.head} />
      <ul className={styles.row} data-row>
        {data.places.map((p) => (
          <li key={p.area} className={styles.place} data-place>
            <span className={styles.pin} aria-hidden="true"><Ic n="pin" /></span>
            <h3>{B.name} <span>· {p.area}</span></h3>
            <p className={styles.rate} aria-hidden="true"><Stars v={4.8} /> {B.category}</p>
            <p>{p.street}</p>
            <p className={styles.open}><b>Open</b> · {p.hours}</p>
            <p className={styles.tag}>{p.note}</p>
          </li>
        ))}
      </ul>
      <p className={styles.note}>{B.note}</p>
    </section>
  );
}
