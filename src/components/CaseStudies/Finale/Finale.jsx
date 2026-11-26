"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import VideoBackground from "@/components/Common/VideoBackground";
import Button from "@/components/Common/Button";
import { CS_PAGE } from "@/data/case-studies";
import c from "../common.module.css";
import s from "./Finale.module.css";

/**
 * The last frame. New York at night (the studio's city) behind the studio's own closing line —
 * "Yours could be next." The film settles from a slow zoom, the line rises word by word at its own
 * depth, and as you leave, letterbox bars close in from top and bottom like the end of a film.
 */
export default function Finale() {
  const ref = useRef(null);
  const f = CS_PAGE.finale;

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);
    mm.add(MOTION, () => {
      gsap.fromTo(q("[data-film]"), { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom bottom", scrub: true } });
      gsap.fromTo(q("[data-type]"), { y: 120 }, { y: -40, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.fromTo(q("[data-fw]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.12, duration: 1.4, scrollTrigger: { trigger: q("[data-type]")[0], start: "top 78%", once: true } });
      gsap.fromTo(q("[data-after]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.12, duration: 1.2, delay: 0.5, scrollTrigger: { trigger: q("[data-type]")[0], start: "top 78%", once: true } });
      gsap.fromTo(q("[data-bar]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root, start: "bottom 85%", end: "bottom 15%", scrub: true } });
    });
  });

  return (
    <section ref={ref} className={s.finale} aria-labelledby="finale-title" data-room-stop>
      <div className={s.film} data-film>
        <VideoBackground {...f.video} />
      </div>
      <div className={s.inner}>
        <p className={s.kicker} data-after>{f.kicker}</p>
        <h2 id="finale-title" className={`${c.name} ${s.title}`} data-type>
          <span className={c.sr}>{f.title}</span>
          <span aria-hidden="true">
            {f.title.split(" ").map((w, i) => <span key={i} className={c.wmask}><span data-fw>{w}</span></span>)}
          </span>
        </h2>
        <p className={s.text} data-after>{f.text}</p>
        <div className={s.actions} data-after>
          <Button href={f.primary.href} size="lg">{f.primary.label}</Button>
          <Button href={f.secondary.href} variant="outline" size="lg">{f.secondary.label}</Button>
        </div>
      </div>
      <i className={`${s.bar} ${s.top}`} data-bar aria-hidden="true" />
      <i className={`${s.bar} ${s.bottom}`} data-bar aria-hidden="true" />
    </section>
  );
}
