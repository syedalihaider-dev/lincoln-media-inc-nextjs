"use client";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery } from "@/lib/motion";
import Head from "../../kit/Head";
import Clip from "../../kit/Clip";
import styles from "./Production.module.css";

/**
 * Video production, stage by stage. Each stage is a card that sticks under the header; the next one
 * slides up over it and the one beneath settles back — scaled down, dimmed — so the stack builds like
 * a pile of call sheets. Every card has its own footage and the deliverables of that stage.
 */
export default function Production({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const stacked = useMediaQuery(DESKTOP_MOTION);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const cards = gsap.utils.toArray("[data-card]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      // only the card on top plays (the ones beneath are covered)
      cards.slice(1).forEach((c, k) => ScrollTrigger.create({ trigger: c, start: "top 60%", onEnter: () => setActive(k + 1), onLeaveBack: () => setActive(k) }));
      cards.slice(0, -1).forEach((c, i) => {
        gsap.fromTo(c.querySelector("[data-inner]"), { scale: 1, filter: "brightness(1)" }, { scale: 0.92, filter: "brightness(0.45)", ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top+=120", scrub: true } });
      });
    });
    mm.add(ANY_MOTION, () => {
      cards.forEach((c) => {
        gsap.timeline({ scrollTrigger: { trigger: c, start: "top 75%", once: true } })
          .from(c.querySelectorAll("[data-li]"), { x: -20, opacity: 0, duration: 0.8, stagger: 0.06 }, 0.2)
          .fromTo(c.querySelector("[data-vid]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0);
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.prod} aria-labelledby="va-prod">
      <Head kicker={data.kicker} title={data.title} id="va-prod" />
      <ol className={styles.stack}>
        {data.stages.map((s, i) => (
          <li key={s.name} className={styles.card} style={{ "--i": i }} data-card>
            <div className={styles.inner} data-inner>
              <div className={styles.copy}>
                <h3 className={styles.name}>{s.name}</h3>
                <p className={styles.text}>{s.text}</p>
                <ul className={styles.items}>
                  {s.items.map((it) => <li key={it} data-li>{it}</li>)}
                </ul>
              </div>
              <div className={styles.vid} data-vid><Clip clip={s.clip} playing={i === active || !stacked} label={`${s.name} — footage`} /></div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
