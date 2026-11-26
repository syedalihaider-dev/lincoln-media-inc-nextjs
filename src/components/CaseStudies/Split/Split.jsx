"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import { CS_PAGE, room as roomOf } from "@/data/case-studies";
import { Kicker, Facts, ProjectLink } from "../parts";
import c from "../common.module.css";
import s from "./Split.module.css";

const TOAST = "#d27a2c";
const CRUMB = "#1b0e05";

/**
 * Room IV — The Bagel Shak. A split screen that changes its mind. The brief is told line by line
 * on the right while the room heats from night navy to a baked-crust amber; then the photograph
 * crosses to the other side and grows, the story steps left and the wall label arrives.
 * Phones: photograph, then the lines, with the same colour change as you read.
 */
export default function Split() {
  const ref = useRef(null);
  const r = roomOf("the-bagel-shak");
  const lines = CS_PAGE.bagel.lines;

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);

    mm.add(PIN, () => {
      const story = q("[data-story]")[0];
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: q("[data-stage]")[0], start: "top top", end: "+=230%", pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true } });
      tl.fromTo(q("[data-line]"), { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, stagger: 0.07, duration: 0.12 }, 0.04)
        .fromTo(root, { backgroundColor: "#070b14", color: "#eef1f7" }, { backgroundColor: TOAST, color: CRUMB, duration: 0.32 }, 0.08)
        .fromTo(q("[data-img]"), { scale: 1.3 }, { scale: 1.06, duration: 0.45 }, 0)
        // the photograph crosses over and grows; the story steps left
        // (the story steps out, the photograph crosses, the story comes back on the other side — a cut, not a collision)
        .to(story, { opacity: 0, duration: 0.07 }, 0.44)
        .fromTo(q("[data-fig]"), { clipPath: "inset(10% 54% 10% 5% round 20px)" }, { clipPath: "inset(5% 4% 5% 47% round 20px)", duration: 0.28 }, 0.48)
        .fromTo(story, { x: 0 }, { x: () => -(story.offsetLeft - innerWidth * 0.05), duration: 0.01 }, 0.6)
        .to(story, { opacity: 1, duration: 0.1 }, 0.66)
        .fromTo(q("[data-fact]"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.1 }, 0.74)
        .fromTo(q("[data-link]"), { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.84)
        .fromTo(q("[data-tag]"), { xPercent: 30, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.16 }, 0.8);
    });

    mm.add(SMALL, () => {
      gsap.fromTo(root, { backgroundColor: "#070b14", color: "#eef1f7" }, { backgroundColor: TOAST, color: CRUMB, ease: "none", scrollTrigger: { trigger: q("[data-story]")[0], start: "top 85%", end: "top 30%", scrub: 0.5 } });
      gsap.from(q("[data-line]"), { yPercent: 105, stagger: 0.12, duration: 1, scrollTrigger: { trigger: q("[data-story]")[0], start: "top 80%", once: true } });
      gsap.fromTo(q("[data-img]"), { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: q("[data-fig]")[0], start: "top bottom", end: "bottom top", scrub: true } });
    });
  });

  return (
    <section ref={ref} id="room-the-bagel-shak" className={s.split} aria-labelledby="room-the-bagel-shak-title" data-room-anchor="the-bagel-shak" data-room-offset="0.5">
      <div className={s.stage} data-stage>
        <figure className={s.fig} data-fig>
          <div className={s.img} data-img>
            <Image src={r.image} alt={`${r.alt} — The Bagel Shak, food & beverage case study`} fill sizes="(max-width: 900px) 100vw, 60vw" />
          </div>
          <figcaption className={s.tag} data-tag>{r.services}</figcaption>
        </figure>

        <div className={s.story} data-story>
          <Kicker room={r} className={s.kicker} />
          <h2 id="room-the-bagel-shak-title" className={`${c.name} ${s.title}`}>{r.name}</h2>
          <p className={s.lines}>
            <span className={c.sr}>{r.brief}</span>
            {lines.map((l) => <span key={l} className={s.lineMask} aria-hidden="true"><span data-line>{l}</span></span>)}
          </p>
          <Facts room={r} item="data-fact" className={s.facts} />
          <div className={s.link} data-link><ProjectLink room={r} /></div>
        </div>
      </div>
    </section>
  );
}
