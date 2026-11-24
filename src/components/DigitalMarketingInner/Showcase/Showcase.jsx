"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import VideoBackground from "@/components/Common/VideoBackground";
import Head from "@/components/DigitalMarketing/Head";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import Visual from "../Visual";
import styles from "./Showcase.module.css";

// The shape each frame opens from, in turn — a slit, a band, a corner, an iris, a curtain
const MASKS = ["inset(0% 48% 0% 48% round 24px)", "inset(46% 0% 46% 0% round 24px)", "inset(0% 0% 100% 100% round 24px)", "circle(0% at 50% 50%)", "inset(0% 100% 0% 0% round 24px)"];
const OPEN = (m) => (m.startsWith("circle") ? "circle(75% at 50% 50%)" : "inset(0% 0% 0% 0% round 24px)");

/**
 * The service in pictures — photography, film and its own interfaces — on a filmstrip. Held on
 * desktop, the strip travels sideways; each frame opens through its own mask as it comes in while
 * its picture pans the other way inside it. Phones: the frames stack and open as they arrive.
 */
export default function Showcase({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const frames = gsap.utils.toArray("[data-frame]", root);
    mm.add(PIN, () => {
      const track = root.querySelector("[data-track]");
      const dist = () => track.scrollWidth - root.clientWidth;
      const move = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true } });
      frames.forEach((f, i) => {
        const m = MASKS[i % MASKS.length];
        gsap.fromTo(f.querySelector("[data-mask]"), { clipPath: m }, { clipPath: OPEN(m), ease: "power2.out", scrollTrigger: { trigger: f, containerAnimation: move, start: "left 95%", end: "left 45%", scrub: true } });
        gsap.fromTo(f.querySelector("[data-pan]"), { xPercent: 12 }, { xPercent: -12, ease: "none", scrollTrigger: { trigger: f, containerAnimation: move, start: "left right", end: "right left", scrub: true } });
      });
    });
    mm.add(SMALL, () => {
      frames.forEach((f, i) => {
        const m = MASKS[i % MASKS.length];
        gsap.fromTo(f.querySelector("[data-mask]"), { clipPath: m }, { clipPath: OPEN(m), ease: "none", scrollTrigger: { trigger: f, start: "top 92%", end: "top 45%", scrub: 0.5 } });
      });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ms-show">
      <div className={styles.track} data-track>
        <div className={styles.intro}><Head kicker={data.kicker} title={data.title} text={data.text} id="ms-show" /></div>
        {data.items.map((it, i) => (
          <figure key={i} className={`${styles.frame} ${styles[`f${i % 5}`]}`} data-frame>
            <div className={styles.mask} data-mask>
              <div className={styles.pan} data-pan>
                {it.video
                  ? <VideoBackground src={it.video} mobileSrc={it.mobileVideo} poster={it.poster} />
                  : it.image
                    ? <Visual item={it} fit="cover" sizes="(max-width: 900px) 90vw, 50vw" />
                    : <div className={styles.screen}><Visual item={it} sizes="(max-width: 900px) 90vw, 40vw" /></div>}
              </div>
            </div>
            <figcaption><b>{it.title}</b>{it.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
