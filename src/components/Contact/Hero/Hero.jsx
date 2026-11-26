"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import VideoBackground from "@/components/Common/VideoBackground";
import Button from "@/components/Common/Button";
import Clock from "@/components/Common/Clock";
import { SITE } from "@/data/site";
import { CONTACT_PAGE, CONTACT_FORM_ID } from "@/data/contact";
import s from "./Hero.module.css";

/**
 * Opening — New York at night, seen through a letterbox that opens as the page arrives, with the
 * studio's own question set large across it. The studio's live clock and the two direct lines sit
 * at the foot; one button glides down to the form. Leaving, the lines drift up at different speeds
 * while the film sinks — a slow parallax rather than a fade.
 */
export default function Hero() {
  const ref = useRef(null);
  const h = CONTACT_PAGE.hero;

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);
    mm.add(MOTION, () => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(q("[data-frame]"), { clipPath: "inset(46% 0% 46% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut" })
        .fromTo(q("[data-film]"), { scale: 1.3 }, { scale: 1.06, duration: 2.4, ease: "expo.out" }, 0.2)
        .fromTo(q("[data-line]"), { yPercent: 112 }, { yPercent: 0, duration: 1.5, stagger: 0.14, ease: "expo.out" }, 0.75)
        .fromTo(q("[data-meta]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 1.15);

      const st = { trigger: root, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q("[data-drift='0']"), { y: -140, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-drift='1']"), { y: -60, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-sink]"), { yPercent: 18, ease: "none", scrollTrigger: st });
    });
  });

  return (
    <section ref={ref} className={s.hero} aria-labelledby="contact-title">
      <div className={s.frame} data-frame>
        <div className={s.sink} data-sink>
          <div className={s.film} data-film><VideoBackground {...h.video} /></div>
        </div>
        <span className={s.shade} aria-hidden="true" />
      </div>

      <div className={s.inner}>
        <p className={s.kicker} data-meta>{h.kicker}</p>
        <h1 id="contact-title" className={s.title}>
          {h.lines.map((l, i) => (
            <span key={l} className={`${s.row} ${i ? s.rowB : ""}`} data-drift={i}>
              <span className={s.mask}><span data-line>{l}</span></span>
            </span>
          ))}
        </h1>
        <div className={s.foot}>
          <p className={s.text} data-meta>{h.text}</p>
          <div className={s.actions} data-meta>
            <Button href={`#${CONTACT_FORM_ID}`} size="lg" icon="down">{h.cta}</Button>
            <Button href={SITE.phoneHref} size="lg" variant="outline" icon="phone">{SITE.phone}</Button>
          </div>
          <dl className={s.meta} data-meta>
            <div><dt>Studio time</dt><dd><Clock prefix="New York" /></dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}
