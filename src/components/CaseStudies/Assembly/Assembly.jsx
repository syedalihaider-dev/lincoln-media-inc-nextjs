"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/motion";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import { room as roomOf } from "@/data/case-studies";
import { Kicker, Facts, ProjectLink } from "../parts";
import c from "../common.module.css";
import s from "./Assembly.module.css";

const AssemblyScene = dynamic(() => import("./AssemblyScene"), { ssr: false });
const SLICES = 9;

/**
 * Room III — CryptoSouk. The one room in 3D, because the brief asks for it: "complex markets feel
 * calm, legible and trustworthy". The chart photograph arrives in nine scattered slices (WebGL,
 * desktop) and settles into one image as you scroll; a ghost of the name slides behind it, the
 * real name comes forward through depth, and the brief's last words light up once it is whole.
 * Phones and tablets get the same assembly in CSS slices; reduced motion shows the finished image.
 */
export default function Assembly() {
  const ref = useRef(null);
  const progress = useRef(0);
  const r = roomOf("cryptosouk");
  const desktop = useMediaQuery(PIN);
  const [head, calm] = r.brief.split(" feel ");

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);

    mm.add(PIN, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: q("[data-stage]")[0], start: "top top", end: "+=240%", pin: true, scrub: 0.6, anticipatePin: 1,
          onUpdate: (st) => { progress.current = st.progress; },
        },
      });
      tl.fromTo(q("[data-ghost]"), { xPercent: 8 }, { xPercent: -42, duration: 1 }, 0)
        .fromTo(q("[data-near]"), { scale: 1.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.42 }, 0.08)
        .fromTo(q("[data-kick]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.12 }, 0.3)
        .fromTo(q("[data-word]"), { yPercent: 110 }, { yPercent: 0, stagger: 0.012, duration: 0.12 }, 0.38)
        .to(q("[data-calm]"), { color: "#36e4d0", duration: 0.1 }, 0.72)
        .fromTo(q("[data-fact]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.03, duration: 0.12 }, 0.74)
        .fromTo(q("[data-link]"), { opacity: 0 }, { opacity: 1, duration: 0.08 }, 0.86);
    });

    mm.add(SMALL, () => {
      const slices = q("[data-slice]");
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: q("[data-css]")[0], start: "top 95%", end: "center 45%", scrub: 0.6 } });
      slices.forEach((el, i) => {
        const dir = i % 2 ? 1 : -1;
        tl.fromTo(el, { yPercent: dir * (18 + (i % 3) * 10), rotateY: dir * 38, z: (i % 3) * -90, opacity: 0.35 }, { yPercent: 0, rotateY: 0, z: 0, opacity: 1 }, 0);
      });
      tl.fromTo(q("[data-ghost]"), { xPercent: 10 }, { xPercent: -30 }, 0);
      gsap.from(q("[data-word]"), { yPercent: 110, stagger: 0.03, duration: 0.9, scrollTrigger: { trigger: q("[data-brief]")[0], start: "top 88%", once: true } });
      gsap.to(q("[data-calm]"), { color: "#36e4d0", duration: 0.6, scrollTrigger: { trigger: q("[data-brief]")[0], start: "top 60%", toggleActions: "play none none reverse" } });
    });
  });

  return (
    <section ref={ref} id="room-cryptosouk" className={s.assembly} aria-labelledby="room-cryptosouk-title" data-room-anchor="cryptosouk" data-room-offset="0.9">
      <div className={s.stage} data-stage>
        <p className={`${c.name} ${s.ghost}`} aria-hidden="true"><span data-ghost>{r.name}</span></p>

        <div className={s.visual}>
          {desktop ? (
            <AssemblyScene src={r.image.src} progress={progress} />
          ) : (
            <div className={s.css} data-css role="img" aria-label={`${r.alt} — CryptoSouk, fintech case study`}>
              {Array.from({ length: SLICES }, (_, i) => (
                <span key={i} className={s.slice} data-slice style={{ "--i": i, "--n": SLICES }}>
                  <Image src={r.image} alt="" fill sizes="100vw" style={{ objectPosition: `${(i / (SLICES - 1)) * 100}% 50%` }} />
                </span>
              ))}
            </div>
          )}
          {/* crawlable, and the image for anyone without WebGL */}
          {desktop && <span className={c.sr}>{`${r.alt} — CryptoSouk, fintech case study`}</span>}
        </div>

        <div className={s.copy}>
          <div data-kick><Kicker room={r} /></div>
          <h2 id="room-cryptosouk-title" className={`${c.name} ${s.title}`}><span data-near className={s.near}>{r.name}</span></h2>
          <p className={s.brief} data-brief>
            <span className={c.sr}>{r.brief}</span>
            <span aria-hidden="true">
              {`${head} feel`.split(" ").map((w, i) => <span key={i} className={c.wmask}><span data-word>{w}</span></span>)}
              {calm.split(" ").map((w, i) => <span key={`c${i}`} className={c.wmask}><span data-word data-calm>{w}</span></span>)}
            </span>
          </p>
          <Facts room={r} item="data-fact" className={s.facts} />
          <div className={s.link} data-link><ProjectLink room={r} /></div>
        </div>
      </div>
    </section>
  );
}
