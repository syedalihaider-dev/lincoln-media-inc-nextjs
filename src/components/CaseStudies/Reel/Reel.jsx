"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import VideoBackground from "@/components/Common/VideoBackground";
import { CS_PAGE, room as roomOf } from "@/data/case-studies";
import { Kicker, Facts, ProjectLink } from "../parts";
import c from "../common.module.css";
import s from "./Reel.module.css";

/**
 * Room V — Aureum. Film, held like a jewel: the footage of a gold, stone-set bracelet plays inside
 * a narrow capsule between the brief's two halves — "Quiet luxury," / "loud results." As you scroll
 * the capsule opens to the full frame and pushes the words off either side; the wall label then
 * rises out of a mask at the foot of the film.
 * Phones: an arched film window that squares off as it scrolls, words above and below it.
 */
export default function Reel() {
  const ref = useRef(null);
  const r = roomOf("aureum");
  const a = CS_PAGE.aureum;

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);

    mm.add(PIN, () => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: q("[data-stage]")[0], start: "top top", end: "+=220%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.fromTo(q("[data-film]"), { clipPath: "inset(20% 40% 20% 40% round 14vw)" }, { clipPath: "inset(0% 0% 0% 0% round 0vw)", duration: 0.5 }, 0.05)
        .fromTo(q("[data-film-inner]"), { scale: 1.35 }, { scale: 1, duration: 0.5 }, 0.05)
        .fromTo(q("[data-w='0']"), { xPercent: 0 }, { xPercent: -120, opacity: 0, duration: 0.42 }, 0.08)
        .fromTo(q("[data-w='1']"), { xPercent: 0 }, { xPercent: 120, opacity: 0, duration: 0.42 }, 0.08)
        .fromTo(q("[data-veil]"), { opacity: 0 }, { opacity: 1, duration: 0.15 }, 0.5)
        .fromTo(q("[data-rise]"), { clipPath: "inset(100% 0% 0% 0%)", yPercent: 30 }, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, duration: 0.3 }, 0.56)
        .fromTo(q("[data-fact]"), { opacity: 0 }, { opacity: 1, stagger: 0.03, duration: 0.08 }, 0.78);
    });

    mm.add(SMALL, () => {
      gsap.fromTo(q("[data-film]"), { clipPath: "inset(0% 10% 0% 10% round 40vw 40vw 0vw 0vw)" }, { clipPath: "inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)", ease: "none", scrollTrigger: { trigger: q("[data-film]")[0], start: "top 85%", end: "center 45%", scrub: 0.5 } });
      gsap.fromTo(q("[data-w='0']"), { xPercent: -14 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "center top", scrub: true } });
      gsap.fromTo(q("[data-w='1']"), { xPercent: 14 }, { xPercent: -6, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "center top", scrub: true } });
    });
  });

  return (
    <section ref={ref} id="room-aureum" className={s.reel} aria-labelledby="room-aureum-title" data-room-anchor="aureum" data-room-offset="1.2">
      <div className={s.stage} data-stage>
        <p className={s.words} aria-hidden="true">
          <span className={`${c.name} ${s.w0}`} data-w="0">{a.words[0]}</span>
          <span className={`${c.name} ${s.w1}`} data-w="1">{a.words[1]}</span>
        </p>

        <figure className={s.film} data-film>
          <div className={s.filmInner} data-film-inner>
            <VideoBackground {...a.video} tint={false} className={s.video} />
          </div>
          <span className={s.veil} data-veil aria-hidden="true" />
          <figcaption className={c.sr}>Footage of a gold, stone-set bracelet — Aureum, fine jewellery case study</figcaption>
        </figure>

        <div className={s.copy}>
          <div className={s.rise} data-rise>
            <Kicker room={r} className={s.kicker} />
            <h2 id="room-aureum-title" className={`${c.name} ${s.title}`}>{r.name}</h2>
            <p className={s.brief}>{r.brief}</p>
          </div>
          <div className={s.side}>
            <Facts room={r} item="data-fact" className={s.facts} />
            <div data-fact><ProjectLink room={r} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
