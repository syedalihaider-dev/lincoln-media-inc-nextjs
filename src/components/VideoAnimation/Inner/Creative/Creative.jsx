"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../../kit/Head";
import Clip from "../../kit/Clip";
import Artefact from "../Artefact";
import styles from "./Creative.module.css";

/**
 * Creative showcase — the service's artefact at full size on a monitor (live and interactive), beside
 * a tall frame of the hands that make it. The monitor slides in from one side, the footage from the
 * other, and they drift apart in depth as the page moves.
 */
export default function Creative({ data, page, tone }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-pair]"), start: "top 80%", once: true } })
        .from(root.querySelector("[data-screen]"), { xPercent: -8, opacity: 0, duration: 1.4, ease: "expo.out" })
        .fromTo(root.querySelector("[data-tall]"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }, 0.1);
    });
    mm.add(DESKTOP_MOTION, () => {
      const st = { trigger: root, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(root.querySelector("[data-tall]"), { yPercent: 10 }, { yPercent: -10, ease: "none", scrollTrigger: st });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.creative} aria-labelledby="vs-creative">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="vs-creative" tone={tone} />
      <div className={styles.pair} data-pair>
        <div className={styles.screen} data-screen>
          <Artefact kind={data.artefact} page={page} />
        </div>
        <div className={styles.tall} data-tall><Clip clip={data.video} label={data.videoAlt} /></div>
      </div>
    </section>
  );
}
