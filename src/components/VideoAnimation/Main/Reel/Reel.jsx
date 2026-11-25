"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Clip from "../../kit/Clip";
import Timecode from "../../kit/Timecode";
import styles from "./Reel.module.css";

/**
 * The showreel. A screening-room frame sits under the title; as you scroll it opens out to the full
 * screen (a clip-path mask) and the title steps back. The reel plays its chapters in order, each cut
 * to the next when it ends; the chapter bar fills with real playback progress and takes you to any
 * chapter. Play/pause and full-screen controls; on phones it is a plain 16:9 player.
 */
export default function Reel({ data }) {
  const ref = useRef(null);
  const frame = useRef(null);
  const video = useRef(null);
  const fills = useRef([]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const { ready } = useSiteMotion();
  const ch = data.chapters[idx];

  // the active chapter's bar follows the clip
  useEffect(() => {
    let raf;
    const tick = () => {
      const v = video.current;
      fills.current.forEach((f, i) => { if (f) f.style.transform = `scaleX(${i < idx ? 1 : i > idx ? 0 : v && v.duration ? v.currentTime / v.duration : 0})`; });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idx]);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "55% bottom", scrub: 0.6 } })
        .fromTo(frame.current, { clipPath: "inset(30% 24% 8% 24% round 14px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut" })
        .fromTo(frame.current.querySelector("video"), { scale: 1.2 }, { scale: 1, ease: "power2.inOut" }, 0)
        .to(root.querySelector("[data-head]"), { yPercent: -60, opacity: 0, ease: "power2.in" }, 0)
        .from(root.querySelectorAll("[data-ui]"), { opacity: 0, y: 20, stagger: 0.05, ease: "power2.out" }, 0.55);
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(frame.current, { clipPath: "inset(10% 10% 10% 10%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: frame.current, start: "top 95%", end: "top 45%", scrub: 0.5 } });
    });
    mm.add(ANY_MOTION, () => {
      gsap.from(root.querySelectorAll("[data-head] > *"), { y: 30, opacity: 0, stagger: 0.08, duration: 1.1, scrollTrigger: { trigger: root, start: "top 75%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const full = () => {
    const el = frame.current;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  };

  return (
    <section ref={ref} id="va-reel" className={styles.reel} aria-labelledby="va-reel-title">
      <div className={styles.pin}>
        <header className={styles.head} data-head>
          <p className={styles.kicker}><i aria-hidden="true" />{data.kicker}</p>
          <h2 id="va-reel-title" className={styles.title}>{data.title}</h2>
        </header>

        <div ref={frame} className={styles.frame}>
          <Clip ref={video} clip={ch.clip} loop={false} playing={playing} onEnded={() => setIdx((i) => (i + 1) % data.chapters.length)} label={`Showreel — ${ch.label}: ${ch.text}`} />
          <span className={styles.shade} aria-hidden="true" />
          <p className={styles.tcRow} data-ui aria-hidden="true">
            <span>{data.note}</span>
            <Timecode video={video} className={styles.tc} />
          </p>
          <div className={styles.now} data-ui aria-live="polite">
            <p className={styles.chName}>{ch.label}</p>
            <p className={styles.chText}>{ch.text}</p>
          </div>
          <div className={styles.controls} data-ui>
            <button type="button" className={styles.ctl} onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause the reel" : "Play the reel"}>
              {playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zM13 5h3v14h-3z" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" /></svg>}
            </button>
            <button type="button" className={styles.ctl} onClick={full} aria-label="Watch the reel full screen">
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
            </button>
          </div>
          <ol className={styles.bar} data-ui aria-label="Reel chapters">
            {data.chapters.map((c, i) => (
              <li key={c.label}>
                <button type="button" onClick={() => { setIdx(i); setPlaying(true); }} aria-current={i === idx ? "true" : undefined}>
                  <span className={styles.track}><span ref={(el) => (fills.current[i] = el)} className={styles.fill} /></span>
                  <span className={styles.lbl}>{c.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
