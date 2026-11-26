"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import { CS_PAGE, room as roomOf } from "@/data/case-studies";
import { Kicker, Facts, ProjectLink } from "../parts";
import c from "../common.module.css";
import s from "./Gallery.module.css";

/**
 * Room II — BetterHomes. A pinned horizontal gallery walked like a corridor: the name, the house at
 * dusk wiped onto the wall, the brief filling word by word, two detail studies cut from the same
 * photograph, then the brief's three verbs. Each frame wipes in from its leading edge while the
 * photograph inside slides against the walk. Phones: the same panels, stacked, wiping in vertically.
 */
export default function Gallery() {
  const ref = useRef(null);
  const r = roomOf("betterhomes");
  const g = CS_PAGE.gallery;
  const [lead, rest] = splitBrief(r.brief);

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);

    mm.add(PIN, () => {
      const pin = q("[data-pin]")[0], track = q("[data-track]")[0], bar = q("[data-bar]")[0];
      const dist = () => track.scrollWidth - innerWidth;
      const walk = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: pin, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.9, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (st) => gsap.set(bar, { scaleX: st.progress }),
        },
      });
      const at = (el, start, end, vars, from) => gsap.fromTo(el, from, { ...vars, ease: "none", scrollTrigger: { trigger: el, containerAnimation: walk, start, end, scrub: true } });

      at(q("[data-lead-title]")[0], "left left", "right left", { xPercent: -22 }, { xPercent: 0 });
      q("[data-wipe]").forEach((f) => {
        at(f, "left 96%", "left 42%", { clipPath: "inset(0% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 100%)" });
        const p = f.querySelector("[data-par]");
        const z = +p.dataset.zoom;
        gsap.fromTo(p, { xPercent: -9, scale: z * 1.08 }, { xPercent: 9, scale: z, ease: "none", scrollTrigger: { trigger: f, containerAnimation: walk, start: "left right", end: "right left", scrub: true } });
      });
      const words = q("[data-fill]");
      gsap.fromTo(words, { opacity: 0.16 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: q("[data-statement]")[0], containerAnimation: walk, start: "left 80%", end: "left 15%", scrub: true } });
      q("[data-verb]").forEach((v, i) => at(v, `left ${100 - i * 6}%`, `left ${58 - i * 6}%`, { xPercent: 0, opacity: 1 }, { xPercent: 70, opacity: 0 }));
    });

    mm.add(SMALL, () => {
      q("[data-wipe]").forEach((f) =>
        gsap.fromTo(f, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: f, start: "top 92%", end: "top 48%", scrub: 0.5 } })
      );
      gsap.fromTo(q("[data-fill]"), { opacity: 0.18 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: q("[data-statement]")[0], start: "top 80%", end: "bottom 55%", scrub: 0.5 } });
    });
  });

  return (
    <section ref={ref} id="room-betterhomes" className={s.gallery} aria-labelledby="room-betterhomes-title" data-room-anchor="betterhomes" data-room-offset="0">
      <div className={s.pin} data-pin>
        <div className={s.track} data-track>
          <div className={`${s.panel} ${s.lead}`}>
            <Kicker room={r} />
            <h2 id="room-betterhomes-title" className={`${c.name} ${s.title}`}><span data-lead-title>{r.name}</span></h2>
            <p className={s.lede}>{lead}</p>
          </div>

          <figure className={`${s.panel} ${s.wide}`} data-wipe>
            <div className={s.par} data-par data-zoom="1">
              <Image src={r.image} alt={`${r.alt} — BetterHomes, property platform case study`} fill sizes="(max-width: 900px) 100vw, 64vw" />
            </div>
          </figure>

          <div className={`${s.panel} ${s.statement}`} data-statement>
            <p className={s.big}>
              {rest.split(" ").map((w, i) => <span key={i} data-fill>{w} </span>)}
            </p>
            <Facts room={r} className={s.facts} />
            <ProjectLink room={r} />
          </div>

          {g.crops.map((cr, i) => (
            <figure key={cr.pos} className={`${s.panel} ${i ? s.square : s.tall}`} data-wipe>
              <div className={s.par} data-par data-zoom={cr.zoom} style={{ "--zoom": cr.zoom }}>
                <Image src={r.image} alt={cr.alt} fill sizes="(max-width: 900px) 100vw, 34vw" style={{ objectPosition: cr.pos }} />
              </div>
            </figure>
          ))}

          <div className={`${s.panel} ${s.verbs}`} aria-hidden="true">
            {g.verbs.map((v) => <span key={v} className={c.name} data-verb>{v}</span>)}
          </div>
        </div>
        <span className={s.bar} aria-hidden="true"><i data-bar /></span>
      </div>
    </section>
  );
}

// "Search, compare and book viewings in seconds. A property platform rebuilt around speed."
const splitBrief = (b) => {
  const i = b.indexOf(". ");
  return i < 0 ? [b, ""] : [b.slice(0, i + 1), b.slice(i + 2)];
};

