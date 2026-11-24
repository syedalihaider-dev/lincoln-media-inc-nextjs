"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Label from "@/components/About/Label";
import VideoBackground from "@/components/Common/VideoBackground";
import { useScene, PIN, MOTION } from "../shared";
import styles from "./VideoStory.module.css";

/**
 * Campaigns in motion. The footage first arrives inside a browser window — address bar and all —
 * as if it were one more interface on the table; as you scroll in, the window opens out until the
 * city fills the screen. Then (desktop: held) the headline's two lines slide in from opposite
 * sides through their masks, the paragraph is wiped in and the footage settles from a slow zoom.
 */
export default function VideoStory({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    mm.add(MOTION, () => {
      const small = matchMedia("(max-width: 900px)").matches;
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top bottom", end: "top top", scrub: 0.6 } })
        .fromTo(q("[data-window]"), { clipPath: small ? "inset(8% 6% 8% 6% round 14px)" : "inset(14% 18% 14% 18% round 18px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)" }, 0)
        .fromTo(q("[data-chrome]"), { opacity: 1, y: 0 }, { opacity: 0, y: -30 }, 0.5)
        .fromTo(q("[data-film]"), { scale: 1.3 }, { scale: 1.12 }, 0);
    });
    mm.add(PIN, () => {
      gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: root, start: "top top", end: "+=110%", pin: true, scrub: 0.8, anticipatePin: 1 } })
        .from(q("[data-l1]"), { yPercent: 110, xPercent: -18, duration: 1 }, 0)
        .from(q("[data-l2]"), { yPercent: 110, xPercent: 22, duration: 1 }, 0.15)
        .fromTo(q("[data-text]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 }, 0.6)
        .to(q("[data-film]"), { scale: 1, duration: 1.6, ease: "none" }, 0)
        // the two lines keep drifting at different speeds (rightward, so nothing leaves its mask)
        .to(q("[data-l1]"), { xPercent: 7, duration: 0.8, ease: "none" }, 1.1)
        .to(q("[data-l2]"), { xPercent: 2, duration: 0.8, ease: "none" }, 1.1)
        .to(q("[data-fade]"), { opacity: 1, duration: 0.6, ease: "none" }, 1.3);
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="video-title" data-phase="Traffic">
      <div className={styles.window} data-window>
        <div className={styles.film} data-film>
          <VideoBackground src={data.src} mobileSrc={data.mobileSrc} poster={data.poster} />
        </div>
        <div className={styles.chrome} data-chrome aria-hidden="true">
          <span className={styles.dots}><i /><i /><i /></span>
          <span className={styles.url}>yourbrand.com/campaigns/autumn-in-the-city</span>
        </div>
        <span className={styles.grade} aria-hidden="true" />
      </div>

      <div className={styles.copy}>
        <Label>{data.kicker}</Label>
        <h2 id="video-title" className={styles.title}>
          <span className={styles.mask}><span data-l1>{data.title[0]}</span></span>
          <span className={styles.mask}><span data-l2 className={styles.em}>{data.title[1]}</span></span>
        </h2>
        <p className={styles.text} data-text>{data.text}</p>
      </div>
      <span className={styles.fade} data-fade aria-hidden="true" />
    </section>
  );
}
