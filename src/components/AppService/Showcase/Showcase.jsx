"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import Head from "../Head";
import styles from "./Showcase.module.css";

/**
 * The interfaces as a filmstrip of phones lying on the blueprint. Desktop: the section holds and the
 * strip slides past; each phone stands up to face you as it reaches the centre and lies back down as
 * it leaves. Phones: the same strip as a swipeable row, the phones already standing.
 */
export default function Showcase({ data, ui }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const track = root.querySelector("[data-track]");
      const dist = () => track.scrollWidth - innerWidth;
      const move = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true } });
      gsap.utils.toArray("[data-phone]", root).forEach((p) => {
        gsap.timeline({ scrollTrigger: { trigger: p, containerAnimation: move, start: "left 95%", end: "right 5%", scrub: true } })
          .fromTo(p, { rotationX: 58, rotationZ: -30, y: 40 }, { rotationX: 6, rotationZ: 0, y: 0, ease: "power2.out", duration: 1 })
          .to(p, { rotationX: 58, rotationZ: 30, y: 40, ease: "power2.in", duration: 1 });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.show} aria-labelledby="screens-title">
      <Head kicker={data.kicker} title={data.title} id="screens-title" className={styles.head} />
      <ol className={styles.track} data-track>
        {data.items.map((it) => (
          <li key={it.caption} className={styles.frame}>
            <div className={styles.stage} aria-hidden="true">
              <div className={styles.phone} data-phone>
                <Device platform={ui.platform} depth={12}><Screen><AppScreen kind={it.screen} platform={ui.platform} accent={ui.accent} /></Screen></Device>
              </div>
            </div>
            <p className={styles.cap}><i aria-hidden="true" />{it.caption}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
