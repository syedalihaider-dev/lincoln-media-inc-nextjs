"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import { CS_PAGE, room as roomOf } from "@/data/case-studies";
import { Kicker, Facts, ProjectLink } from "../parts";
import c from "../common.module.css";
import s from "./Layers.module.css";

/**
 * Room VII — Bike Store. A product story told in layers, like the brief's "rich product stories":
 * two words of the brief slide across the back wall in opposite directions, the whole machine floats
 * on its own graphite (the frame dissolves into the room), and two close-up studies — wheel and
 * drivetrain — drift past in front at their own speeds. No pin: depth comes from the scroll itself.
 * Phones run the same layers with smaller travel.
 */
export default function Layers() {
  const ref = useRef(null);
  const r = roomOf("bike-store");
  const b = CS_PAGE.bike;

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);
    mm.add(MOTION, () => {
      const k = matchMedia("(max-width: 900px)").matches ? 0.5 : 1;
      const st = (vars) => ({ ease: "none", ...vars, scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      gsap.fromTo(q("[data-back='0']"), { xPercent: 12 * k }, st({ xPercent: -28 * k }));
      gsap.fromTo(q("[data-back='1']"), { xPercent: -22 * k }, st({ xPercent: 14 * k }));
      gsap.fromTo(q("[data-main]"), { y: 90 * k }, st({ y: -90 * k }));
      gsap.fromTo(q("[data-near='0']"), { y: 260 * k, rotate: -4 }, st({ y: -260 * k, rotate: 2 }));
      gsap.fromTo(q("[data-near='1']"), { y: 360 * k, rotate: 5 }, st({ y: -320 * k, rotate: -2 }));
      gsap.from(q("[data-up]"), { y: 50, opacity: 0, duration: 1.2, stagger: 0.1, scrollTrigger: { trigger: q("[data-copy]")[0], start: "top 82%", once: true } });
    });
  });

  return (
    <section ref={ref} id="room-bike-store" className={s.layers} aria-labelledby="room-bike-store-title" data-room-anchor="bike-store" data-room-offset="0.3">
      <div className={s.scene}>
        <p className={s.back} aria-hidden="true">
          {b.words.map((w, i) => <span key={w} className={c.name} data-back={i}>{w}</span>)}
        </p>
        <figure className={s.main} data-main>
          <Image src={r.image} alt={`${r.alt} — Bike Store, retail e-commerce case study`} fill sizes="(max-width: 900px) 100vw, 70vw" />
        </figure>
        {b.details.map((d, i) => (
          <figure key={d.pos} className={`${s.near} ${i ? s.n1 : s.n0}`} data-near={i}>
            <div className={s.zoom} style={{ "--zoom": d.zoom }}>
              <Image src={r.image} alt={d.alt} fill sizes="(max-width: 900px) 40vw, 22vw" style={{ objectPosition: d.pos }} />
            </div>
          </figure>
        ))}
      </div>

      <div className={s.copy} data-copy>
        <div data-up><Kicker room={r} /></div>
        <h2 id="room-bike-store-title" className={`${c.name} ${s.title}`} data-up>{r.name}</h2>
        <p className={s.brief} data-up>{r.brief}</p>
        <div className={s.side} data-up>
          <Facts room={r} className={s.facts} />
          <ProjectLink room={r} />
        </div>
      </div>
    </section>
  );
}
