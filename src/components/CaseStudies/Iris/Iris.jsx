"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import { CS_PAGE, room as roomOf } from "@/data/case-studies";
import { Kicker, Facts, ProjectLink } from "../parts";
import c from "../common.module.css";
import s from "./Iris.module.css";

/**
 * Room VI — Polly. A paper room with a peephole: the brief is set above and below a small round
 * window onto the dashboard. Scrolling opens the iris until the paper is gone, the brief's halves
 * part, the name spreads into place from tight tracking — then the camera pushes into the laptop
 * screen and the room dips to black, a film cut into the next room.
 * Phones: the iris opens as the photograph scrolls through, without the hold.
 */
export default function Iris() {
  const ref = useRef(null);
  const r = roomOf("polly");
  const halves = CS_PAGE.polly.halves;

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);

    mm.add(PIN, () => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: q("[data-stage]")[0], start: "top top", end: "+=250%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.fromTo(q("[data-iris]"), { clipPath: "circle(9% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", duration: 0.42 }, 0.04)
        .fromTo(q("[data-iris-img]"), { scale: 1.5 }, { scale: 1, duration: 0.42 }, 0.04)
        .fromTo(q("[data-half='0']"), { y: 0 }, { y: () => -innerHeight * 0.45, opacity: 0, duration: 0.34 }, 0.06)
        .fromTo(q("[data-half='1']"), { y: 0 }, { y: () => innerHeight * 0.45, opacity: 0, duration: 0.34 }, 0.06)
        .fromTo(q("[data-veil]"), { opacity: 0 }, { opacity: 1, duration: 0.14 }, 0.42)
        .fromTo(q("[data-kick]"), { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.46)
        .fromTo(q("[data-track]"), { letterSpacing: "0.6em", opacity: 0 }, { letterSpacing: "-0.02em", opacity: 1, duration: 0.18 }, 0.46)
        .fromTo(q("[data-fact]"), { opacity: 0, x: -30 }, { opacity: 1, x: 0, stagger: 0.03, duration: 0.1 }, 0.56)
        // push into the screen, cut to black
        .to(q("[data-iris-img]"), { scale: 1.9, duration: 0.26 }, 0.74)
        .to(q("[data-copy]"), { opacity: 0, duration: 0.08 }, 0.8)
        .fromTo(q("[data-cut]"), { opacity: 0 }, { opacity: 1, duration: 0.14 }, 0.86);
    });

    mm.add(SMALL, () => {
      gsap.fromTo(q("[data-iris]"), { clipPath: "circle(22% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "none", scrollTrigger: { trigger: q("[data-iris]")[0], start: "top 85%", end: "center 45%", scrub: 0.5 } });
      gsap.fromTo(q("[data-track]"), { letterSpacing: "0.4em", opacity: 0 }, { letterSpacing: "-0.02em", opacity: 1, ease: "none", scrollTrigger: { trigger: q("[data-copy]")[0], start: "top 90%", end: "top 55%", scrub: 0.5 } });
    });
  });

  return (
    <section ref={ref} id="room-polly" className={s.iris} aria-labelledby="room-polly-title" data-room-anchor="polly" data-room-offset="1.15">
      <div className={s.stage} data-stage>
        <p className={s.halves}>
          <span className={`${s.half} ${s.h0}`} data-half="0">{halves[0]}</span>
          <span className={`${s.half} ${s.h1}`} data-half="1">{halves[1]}</span>
        </p>

        <figure className={s.window} data-iris>
          <div className={s.img} data-iris-img>
            <Image src={r.image} alt={`${r.alt} — Polly, SaaS case study`} fill sizes="100vw" />
          </div>
          <span className={s.veil} data-veil aria-hidden="true" />
        </figure>

        <div className={s.copy} data-copy>
          <div data-kick><Kicker room={r} /></div>
          <h2 id="room-polly-title" className={`${c.name} ${s.title}`}><span data-track>{r.name}</span></h2>
          <p className={s.services}>{r.services}</p>
          <Facts room={r} item="data-fact" className={s.facts} />
          <div data-fact><ProjectLink room={r} /></div>
        </div>
        <span className={s.cut} data-cut aria-hidden="true" />
      </div>
    </section>
  );
}
