"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Head from "../../kit/Head";
import styles from "./Pipeline.module.css";

/** The script page, set as a screenplay (scene heading, action, character, dialogue) */
function Script({ lines }) {
  return (
    <div className={styles.script} role="img" aria-label="A page of script in screenplay layout">
      {lines.map((l, i) => <p key={i} className={styles[l.k]}>{l.t}</p>)}
    </div>
  );
}

/** A storyboard strip: three frames with their shot sizes and directions */
function Board({ frames }) {
  return (
    <div className={styles.board} role="img" aria-label={`A storyboard: ${frames.map((f) => f.note).join(", ")}`}>
      {frames.map((f) => (
        <figure key={f.note} className={styles.panel}>
          <span className={styles.pimg}><Image src={f.img} alt="" fill sizes="12vw" /></span>
          <figcaption><b>{f.shot}</b>{f.note}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * From concept to motion. Seven storyboard sheets travel sideways while the section is held, and a
 * timeline sits along the foot like an editor's sequence: one clip per stage, a playhead that follows
 * the scroll, and the stage under it lit. Each sheet carries its stage's real artefact — a script
 * page, a storyboard strip, a style frame, a mixing desk. Phones: the sheets stack.
 */
export default function Pipeline({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const track = root.querySelector("[data-track]");
    const clips = gsap.utils.toArray("[data-tclip]", root);
    const head = root.querySelector("[data-playhead]");
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const dist = () => track.scrollWidth - track.parentElement.clientWidth;
      let last = -1;
      gsap.to(track, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: root.querySelector("[data-pin]"), start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.7, invalidateOnRefresh: true,
          onUpdate: (self) => {
            head.style.left = `${self.progress * 100}%`;
            const i = Math.min(clips.length - 1, Math.floor(self.progress * clips.length));
            if (i !== last) { clips.forEach((c, k) => c.classList.toggle(styles.lit, k === i)); last = i; }
          },
        },
      });
      // each sheet's picture drifts against the travel
      gsap.utils.toArray("[data-sheet] [data-art]", root).forEach((a) => gsap.fromTo(a, { xPercent: 6 }, { xPercent: -6, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-pin]"), start: "top top", end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true } }));
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-sheet]", root).forEach((s) => gsap.from(s, { y: 50, opacity: 0, duration: 1.1, scrollTrigger: { trigger: s, start: "top 88%", once: true } }));
    });
    mm.add(ANY_MOTION, () => {
      gsap.from(clips, { scaleX: 0, transformOrigin: "left", duration: 1, stagger: 0.06, ease: "expo.inOut", scrollTrigger: { trigger: root.querySelector("[data-timeline]"), start: "top 95%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.pipe} aria-labelledby="va-pipe">
      <div className={styles.pin} data-pin>
        <Head kicker={data.kicker} title={data.title} id="va-pipe" className={styles.head} />
        <div className={styles.viewport}>
          <ol className={styles.track} data-track>
            {data.stages.map((s) => (
              <li key={s.name} className={styles.sheet} data-sheet>
                <div className={styles.frame}>
                  <div className={styles.art} data-art>
                    {s.artefact === "script" ? <Script lines={data.script} /> : s.artefact === "board" ? <Board frames={data.board} /> : (
                      <Image src={s.img || s.poster} alt={s.alt} fill sizes="(min-width: 901px) 34vw, 92vw" />
                    )}
                  </div>
                </div>
                <h3 className={styles.name}>{s.name}</h3>
                <p className={styles.text}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className={styles.timeline} data-timeline aria-hidden="true">
          <div className={styles.lane}>
            <span className={styles.laneLbl}>V1</span>
            <div className={styles.clips}>
              {data.stages.map((s) => <span key={s.name} className={styles.tclip} data-tclip>{s.name}</span>)}
              <span className={styles.playhead} data-playhead />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
