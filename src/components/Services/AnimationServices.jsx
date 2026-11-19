"use client";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { SERVICE_CATEGORIES } from "@/data/service-categories";
import VideoBackground from "@/components/Common/VideoBackground";
import Label from "@/components/About/Label";
import styles from "./AnimationServices.module.css";

const SUITE = "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";
const ANIMATION = SERVICE_CATEGORIES.find((c) => c.key === "animation");
const [HEAD, BODY] = ANIMATION.text.split(/(?<=animations\.) /); // the studio's two sentences
// Where each reel sits on the timeline (fractions of the scroll)
const CLIPS = [[0, 0.36], [0.32, 0.7], [0.64, 1]];

/* The three reels, each animating in its own discipline */
const Reel2D = () => (
  <div className={styles.r2d}>
    <span className={styles.arc} />
    <span className={styles.ballWrap}><span className={styles.ball} /></span>
    <span className={styles.shadow} />
    <span className={styles.ground} />
  </div>
);
const Reel3D = () => (
  <div className={styles.r3d}>
    <span className={styles.floor} />
    <div className={styles.cube}>
      {["f", "b", "l", "r", "t", "d"].map((f) => <span key={f} className={styles[`face_${f}`]} />)}
    </div>
  </div>
);
const ReelBoard = () => (
  <div className={styles.board}>
    <svg viewBox="0 0 200 120" className={styles.sketch}>
      <path pathLength="1" d="M88 78c-8-6-14-16-14-27a26 26 0 0 1 52 0c0 11-6 21-14 27v8H88z" />
      <path pathLength="1" d="M90 94h20M92 101h16" />
      <path pathLength="1" d="M100 18V8M70 28l-7-7M130 28l7-7M60 52H50M140 52h10" />
      <path pathLength="1" d="M20 104c22-8 50 6 70-2M120 106c20-6 42 2 62-6" />
    </svg>
  </div>
);
const REELS = [Reel2D, Reel3D, ReelBoard];

/**
 * Animation Services, staged as an editing suite over smoke footage: three monitors play 2D,
 * 3D and whiteboard animation live; below, a timeline with a clip and keyframes for each. On
 * desktop the chapter holds while a playhead scrubs across the timeline with your scroll, and the
 * monitor whose clip is under it goes live. Phones: the three monitors in turn.
 */
export default function AnimationServices() {
  const ref = useRef(null);
  const [live, setLive] = useState(0);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();

    mm.add(SUITE, () => {
      let cur = 0;
      ScrollTrigger.create({
        trigger: root.querySelector("[data-pin]"),
        start: "top top",
        end: "+=160%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (s) => {
          root.style.setProperty("--ph", s.progress.toFixed(4));
          const i = s.progress < 0.34 ? 0 : s.progress < 0.67 ? 1 : 2;
          if (i !== cur) { cur = i; setLive(i); sfx("tick"); }
        },
      });
    });
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelectorAll("[data-monitor]"), { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.inOut", stagger: 0.12, scrollTrigger: { trigger: root, start: "top 65%", once: true } });
      gsap.fromTo(root.querySelectorAll("[data-wipe]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut", stagger: 0.1, scrollTrigger: { trigger: root, start: "top 70%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="animation-services" className={styles.anim} aria-labelledby="anim-title">
      <div className={styles.pin} data-pin>
        <VideoBackground src="/videos/smoke.mp4" mobileSrc="/videos/smoke-mobile.mp4" poster="/videos/smoke-poster.jpg" className={styles.smoke} tint={false} />
        <span className={styles.veil} aria-hidden="true" />

        <header className={styles.head}>
          <Label>{ANIMATION.name}</Label>
          <h2 id="anim-title" className={styles.title} data-wipe>{HEAD}</h2>
          <p className={styles.body} data-wipe>{BODY}</p>
        </header>

        <div className={styles.monitors}>
          {ANIMATION.items.map((it, i) => {
            const Reel = REELS[i];
            return (
              <figure key={it.name} className={`${styles.monitor} ${live === i ? styles.live : ""}`} data-monitor>
                <figcaption className={styles.bar}>
                  <span>{it.name}</span>
                  <i className={styles.rec} aria-hidden="true">{live === i ? "Live" : "Ready"}</i>
                </figcaption>
                <div className={styles.screen} aria-hidden="true"><Reel /></div>
              </figure>
            );
          })}
        </div>

        <div className={styles.timeline} aria-hidden="true">
          <div className={styles.ruler}>{Array.from({ length: 41 }, (_, k) => <i key={k} />)}</div>
          {ANIMATION.items.map((it, i) => (
            <div key={it.name} className={styles.track}>
              <span className={styles.trackName}>{it.name}</span>
              <span className={styles.lane}>
                <span className={`${styles.clip} ${live === i ? styles.clipOn : ""}`} style={{ left: `${CLIPS[i][0] * 100}%`, width: `${(CLIPS[i][1] - CLIPS[i][0]) * 100}%` }}>
                  {[0.15, 0.5, 0.85].map((k) => <b key={k} style={{ left: `${k * 100}%` }} />)}
                </span>
              </span>
            </div>
          ))}
          <span className={styles.playhead} />
        </div>
      </div>
    </section>
  );
}
