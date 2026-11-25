"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { Phone } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import Head from "../Head";
import styles from "./Showcase.module.css";

// where each tile starts in depth before the mosaic settles (desktop)
const SCATTER = [
  { z: -520, rotationY: 16, rotationX: 10, x: -80, y: 120 },
  { z: -380, rotationY: -18, rotationX: 14, x: 90, y: 60 },
  { z: -640, rotationY: -12, rotationX: -8, x: 120, y: 160 },
  { z: -460, rotationY: 20, rotationX: 12, x: -110, y: 180 },
  { z: -700, rotationY: -6, rotationX: 18, x: 0, y: 240 },
  { z: -420, rotationY: -20, rotationX: 10, x: 100, y: 200 },
];

/**
 * Six models of selling as one editorial mosaic. Each tile pairs a photograph of the category with
 * the interface that category needs (lookbook, product page, filtered collection, quick order, seller
 * offers, subscription). On desktop the tiles begin scattered in depth and settle into the grid with
 * the scroll; phones get a swipeable rail.
 */
export default function Showcase({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const tiles = gsap.utils.toArray("[data-tile]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      tiles.forEach((t, i) => {
        gsap.fromTo(t, { ...SCATTER[i], opacity: 0 }, { z: 0, x: 0, y: 0, rotationX: 0, rotationY: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: t, start: "top 105%", end: "top 45%", scrub: 0.9 } });
        gsap.fromTo(t.querySelector("[data-device]"), { yPercent: 18 }, { yPercent: -10, ease: "none", scrollTrigger: { trigger: t, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.show} aria-labelledby="ecom-show">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="ecom-show" />
      <ul className={styles.mosaic}>
        {data.items.map((it, i) => (
          <li key={it.name} className={`${styles.tile} ${styles[`t${i}`]}`} data-tile>
            <figure className={styles.photo}>
              <Image src={it.img} alt={it.alt} fill sizes="(max-width: 900px) 80vw, 45vw" />
            </figure>
            <div className={styles.device} data-device aria-hidden="true">
              <Phone><Screen kind={it.screen} store={it.store} device="phone" data={it.data} /></Phone>
            </div>
            <div className={styles.caption}>
              <h3>{it.name}</h3>
              <p>{it.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
