"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { Browser } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import Head from "../Head";
import styles from "./Capabilities.module.css";

/**
 * Capabilities as a deck of full-width cards. Each card sticks under the header a little lower than
 * the last, so they pile up like pages in a file as you scroll; the card being covered sinks back
 * and dims. Every card carries its own proof — a photograph or the working interface.
 * Phones get the same cards as a plain list.
 */
export default function Capabilities({ data, store, platform }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const cards = gsap.utils.toArray("[data-card]", ref.current);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      cards.slice(0, -1).forEach((c, i) => {
        gsap.fromTo(c.querySelector("[data-inner]"), { scale: 1, filter: "brightness(1)" }, { scale: 0.93, filter: "brightness(0.86)", ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top 30%", scrub: true } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.caps} aria-labelledby="eci-caps">
      <Head platform={platform} kicker={data.kicker} title={data.title} id="eci-caps" />
      <ol className={styles.deck}>
        {data.items.map((it, i) => (
          <li key={it.name} className={styles.card} data-card style={{ "--i": i }}>
            <div className={styles.inner} data-inner>
              <div className={styles.copy}>
                <h3>{it.name}</h3>
                <p>{it.text}</p>
              </div>
              <div className={styles.media}>
                {it.img ? (
                  <figure className={styles.photo}><Image src={it.img} alt={it.alt} fill sizes="(max-width: 900px) 90vw, 50vw" /></figure>
                ) : (
                  <div className={styles.screen} aria-hidden="true"><Browser url={store.domain}><Screen kind={it.screen} store={store} data={it.data} /></Browser></div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
