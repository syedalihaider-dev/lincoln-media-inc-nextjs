"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL, MOTION } from "@/components/ServicePage/scene";
import { CS_PAGE, room as roomOf } from "@/data/case-studies";
import { Chars, Kicker, Facts, ProjectLink } from "../parts";
import c from "../common.module.css";
import s from "./Overture.module.css";

/**
 * Opening scene + Room I (Belgravia London). The studio's line sits over a loose collage of every
 * project photograph, hung at different depths (they lean away from the cursor by depth). Scrolling
 * pulls the collage apart — near frames fly past, far ones drift — while the centre plate, London
 * from above, opens to the whole screen and becomes the first room: the name rises letter by
 * letter, the brief wipes in, the wall label slides in from the right.
 * Phones: the collage stays a still composition; the Belgravia plate opens as it scrolls in.
 */
export default function Overture() {
  const ref = useRef(null);
  const h = CS_PAGE.hero;
  const r = roomOf("belgravia-london");

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);

    mm.add(MOTION, () => {
      gsap.from(q("[data-in]"), { yPercent: 112, duration: 1.6, stagger: 0.14, delay: 0.1 });
      gsap.from(q("[data-frame-img]"), { opacity: 0, scale: 1.25, duration: 2, stagger: 0.08, ease: "expo.out" });
      gsap.from(q("[data-fade]"), { opacity: 0, y: 24, duration: 1.2, delay: 0.7, stagger: 0.1 });
    });

    mm.add(PIN, () => {
      const stage = q("[data-stage]")[0];
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: stage, start: "top top", end: "+=260%", pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true },
      });
      // the line splits and leaves; the collage separates by depth
      tl.to(q("[data-line='0']"), { xPercent: -38, opacity: 0, duration: 0.32 }, 0)
        .to(q("[data-line='1']"), { xPercent: 38, opacity: 0, duration: 0.32 }, 0)
        .to(q("[data-out]"), { opacity: 0, y: -40, duration: 0.14 }, 0);
      q("[data-frame]").forEach((f) => {
        const d = +f.dataset.d, dx = +f.dataset.dx, dy = +f.dataset.dy;
        tl.to(f, { x: () => dx * innerWidth * (0.3 + d * 0.55), y: () => dy * innerHeight * (0.3 + d * 0.55), scale: 1 + d * 1.1, opacity: 0, duration: 0.4 + (1 - d) * 0.1 }, 0);
      });
      // the plate opens into the room
      // (the CSS holds the same start states, so nothing flashes before the fonts are in)
      tl.fromTo(q("[data-plate]"), { clipPath: "inset(31% 37% 31% 37% round 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.44 }, 0.02)
        .fromTo(q("[data-plate-img]"), { scale: 1.32 }, { scale: 1.04, duration: 0.44 }, 0.02)
        .fromTo(q("[data-scrim]"), { opacity: 0 }, { opacity: 1, duration: 0.18 }, 0.36)
        .fromTo(q("[data-room-kicker]"), { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.12 }, 0.42)
        .fromTo(q("[data-char]"), { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, stagger: 0.01, duration: 0.14 }, 0.44)
        .fromTo(q("[data-room-brief]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.16 }, 0.56)
        .fromTo(q("[data-room-fact]"), { x: 80, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.03, duration: 0.12 }, 0.6)
        .fromTo(q("[data-room-link]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1 }, 0.72)
        .to(q("[data-plate-img]"), { scale: 1.14, yPercent: -3, duration: 0.3 }, 0.7);

      // the collage leans away from the cursor, nearer frames more
      const drifts = q("[data-drift]").map((el) => ({ d: +el.dataset.d, x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3" }), y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3" }) }));
      const move = (e) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        drifts.forEach((o) => { o.x(nx * -70 * o.d); o.y(ny * -46 * o.d); });
      };
      addEventListener("pointermove", move, { passive: true });
      return () => removeEventListener("pointermove", move);
    });

    mm.add(SMALL, () => {
      gsap.fromTo(q("[data-plate]"), { clipPath: "inset(10% 9% 10% 9% round 18px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: q("[data-plate]")[0], start: "top 92%", end: "center 55%", scrub: 0.5 } });
      gsap.from(q("[data-char]"), { yPercent: 115, stagger: 0.02, duration: 1, scrollTrigger: { trigger: q("[data-room-title]")[0], start: "top 88%", once: true } });
    });
  });

  return (
    <section ref={ref} className={s.overture} aria-labelledby="cs-title" data-room-anchor="belgravia-london" data-room-offset="1.2">
      <div className={s.stage} data-stage>
        <header className={s.head}>
          <h1 id="cs-title" className={s.title}>
            <span className={s.kicker} data-out><span data-fade>{h.kicker}</span></span>
            {h.lines.map((l, i) => (
              <span key={l} className={`${s.line} ${i ? s.lineB : ""}`} data-line={i}><span data-in>{l}</span></span>
            ))}
          </h1>
          <p className={s.intro} data-out><span data-fade>{h.intro}</span></p>
        </header>
        <div className={s.collage}>
          {CS_PAGE.collage.map((f) => {
            const p = roomOf(f.slug);
            return (
              <div
                key={f.slug}
                className={s.frame}
                data-frame
                data-d={f.d}
                data-dx={((f.x - 50) / 50).toFixed(2)}
                data-dy={((f.y - 50) / 50).toFixed(2)}
                data-mobile={f.m ? "" : "hide"}
                style={{ "--x": `${f.x}%`, "--y": `${f.y}%`, "--w": `${f.w}vw`, "--r": f.r, "--z": Math.round(f.d * 10), "--d": f.d, ...(f.m ? { "--mx": `${f.m[0]}%`, "--my": `${f.m[1]}%`, "--mw": `${f.m[2]}vw` } : {}) }}
              >
                <div className={s.drift} data-drift data-d={f.d}>
                  <div className={s.frameImg} data-frame-img>
                    <Image src={p.image} alt="" sizes="(max-width: 900px) 36vw, 16vw" fill />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <article className={s.room} id="room-belgravia-london" aria-labelledby="room-belgravia-london-title">
          <figure className={s.plate} data-plate>
            <div className={s.plateImg} data-plate-img>
              <Image src={r.image} alt={`${r.alt} — Belgravia London, ${r.sector.toLowerCase()} case study`} fill priority sizes="100vw" />
            </div>
            <span className={s.scrim} data-scrim aria-hidden="true" />
          </figure>
          <div className={s.roomCopy}>
            <div className={s.roomMain}>
              <Kicker room={r} className={s.roomKicker} data-room-kicker />
              <h2 id="room-belgravia-london-title" className={`${c.name} ${s.roomTitle}`} data-room-title><Chars text={r.name} /></h2>
              <p className={s.roomBrief} data-room-brief>{r.brief}</p>
            </div>
            <div className={s.roomSide}>
              <Facts room={r} item="data-room-fact" className={s.facts} />
              <div className={s.roomLink} data-room-link><ProjectLink room={r} /></div>
            </div>
          </div>
        </article>

        <p className={s.cue} data-out aria-hidden="true"><span data-fade><i />{h.cue}</span></p>
      </div>
    </section>
  );
}
