"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import { room as roomOf } from "@/data/case-studies";
import { Kicker, Facts, ProjectLink } from "../parts";
import c from "../common.module.css";
import s from "./Lettering.module.css";

/**
 * Room VIII — Upmatch. The name is the window: the team photograph lives inside the letters. Scroll
 * and you fly into the stem of the U until the letter is the whole screen and the photograph takes
 * over; then the brief turns over word by word, like cards being matched.
 * Phones: the lettered name breathes as it passes and the words turn over as they arrive.
 */
export default function Lettering() {
  const ref = useRef(null);
  const r = roomOf("upmatch");
  const bg = { backgroundImage: `url(${r.image.src})` };

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);

    mm.add(PIN, () => {
      const word = q("[data-word-mark]")[0], u = q("[data-u]")[0];
      // aim for the U's left stem
      const aim = () => {
        const w = word.getBoundingClientRect(), l = u.getBoundingClientRect();
        const sx = gsap.getProperty(word, "scale") || 1;
        const x = ((l.left - w.left) / sx + (l.width / sx) * 0.15) / (w.width / sx) * 100;
        gsap.set(word, { transformOrigin: `${x.toFixed(2)}% 52%` });
      };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: q("[data-stage]")[0], start: "top top", end: "+=220%", pin: true, scrub: 0.8, anticipatePin: 1, onRefreshInit: () => gsap.set(word, { scale: 1 }), onRefresh: aim },
      });
      aim();
      tl.fromTo(q("[data-intro]"), { opacity: 1 }, { opacity: 0, y: -30, duration: 0.12 }, 0)
        .fromTo(word, { scale: 1 }, { scale: 42, ease: "power3.in", duration: 0.5 }, 0.02)
        .fromTo(q("[data-full]"), { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.2 }, 0.36)
        .fromTo(q("[data-veil]"), { opacity: 0 }, { opacity: 1, duration: 0.12 }, 0.54)
        .fromTo(q("[data-kick]"), { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.56)
        .fromTo(q("[data-title]"), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.12 }, 0.56)
        .fromTo(q("[data-flip]"), { rotateX: -95, opacity: 0 }, { rotateX: 0, opacity: 1, stagger: 0.012, duration: 0.1 }, 0.62)
        .fromTo(q("[data-fact]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.08 }, 0.78);
    });

    mm.add(SMALL, () => {
      gsap.fromTo(q("[data-word-mark]"), { scale: 0.92 }, { scale: 1.12, ease: "none", scrollTrigger: { trigger: q("[data-word-mark]")[0], start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(q("[data-flip]"), { rotateX: -95, opacity: 0, stagger: 0.04, duration: 0.8, scrollTrigger: { trigger: q("[data-brief]")[0], start: "top 86%", once: true } });
    });
  });

  return (
    <section ref={ref} id="room-upmatch" className={s.lettering} aria-labelledby="room-upmatch-title" data-room-anchor="upmatch" data-room-offset="1.25">
      <div className={s.stage} data-stage>
        <div className={s.mark}>
          <p className={s.intro} data-intro aria-hidden="true">{r.sector} · {r.services}</p>
          <p className={`${c.name} ${s.word}`} data-word-mark style={bg} aria-hidden="true">
            <span data-u>{r.name[0]}</span>{r.name.slice(1)}
          </p>
        </div>

        <figure className={s.full} data-full>
          <Image src={r.image} alt={`${r.alt} — Upmatch, recruitment platform case study`} fill sizes="100vw" />
          <span className={s.veil} data-veil aria-hidden="true" />
        </figure>

        <div className={s.copy}>
          <div data-kick><Kicker room={r} /></div>
          <h2 id="room-upmatch-title" className={`${c.name} ${s.title}`}><span data-title>{r.name}</span></h2>
          <p className={s.brief} data-brief>
            <span className={c.sr}>{r.brief}</span>
            <span aria-hidden="true">
              {r.brief.split(" ").map((w, i) => <span key={i} className={s.flipWord}><span data-flip>{w}</span></span>)}
            </span>
          </p>
          <Facts room={r} item="data-fact" className={s.facts} />
          <div data-fact><ProjectLink room={r} /></div>
        </div>
      </div>
    </section>
  );
}
