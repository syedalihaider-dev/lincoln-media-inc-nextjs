"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Button from "@/components/Common/Button";
import Clip from "../../kit/Clip";
import Timecode from "../../kit/Timecode";
import styles from "./Hero.module.css";

/**
 * The opening scene. The film opens from a thin slit to a letterboxed frame, the way a projector
 * shutter opens; a viewfinder sits over it with the clip's real timecode, and the crafts run as
 * opening credits, one title card at a time. The headline rises letter by letter. On scroll the
 * letterbox closes in and the frame pulls back — the end of the scene.
 */
export default function Hero({ data }) {
  const ref = useRef(null);
  const video = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-hl]"), { type: "words,chars", mask: "chars" });
      gsap.timeline({ delay: 0.1 })
        .fromTo(q("[data-screen]"), { clipPath: "inset(49.6% 0% 49.6% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "expo.inOut" })
        .fromTo(q("[data-screen] video"), { scale: 1.25 }, { scale: 1.06, duration: 2.6, ease: "expo.out" }, 0.2)
        .from(root.querySelectorAll("[data-bar]"), { scaleY: 0, duration: 1.4, ease: "expo.inOut" }, 0.9)
        .from(split.chars, { yPercent: 115, duration: 1.3, stagger: 0.025, ease: "expo.out" }, 1)
        .from(root.querySelectorAll("[data-corner]"), { scale: 1.6, opacity: 0, duration: 1, stagger: 0.05, ease: "expo.out" }, 1.2)
        .from(root.querySelectorAll("[data-rise]"), { y: 26, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out" }, 1.4);
      // opening credits: one card at a time
      const cards = gsap.utils.toArray("[data-credit]", root);
      const credits = gsap.timeline({ repeat: -1, delay: 2.2 });
      cards.forEach((c) => credits.fromTo(c, { autoAlpha: 0, letterSpacing: "0.5em" }, { autoAlpha: 1, letterSpacing: "0.28em", duration: 0.9, ease: "power2.out" }).to(c, { autoAlpha: 0, duration: 0.6, ease: "power2.in" }, "+=1.3"));
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(root.querySelectorAll("[data-bar]"), { scaleY: 2.6, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-frame]"), { scale: 0.9, borderRadius: 18, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-title]"), { yPercent: -38, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-foot]"), { yPercent: -60, opacity: 0, ease: "none", scrollTrigger: { ...st, end: "60% top" } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="va-title">
      <div className={styles.frame} data-frame>
        <div className={styles.screen} data-screen>
          <Clip ref={video} clip={data.video} />
          <span className={styles.grade} aria-hidden="true" />
        </div>
        <span className={`${styles.bar} ${styles.top}`} data-bar aria-hidden="true" />
        <span className={`${styles.bar} ${styles.bottom}`} data-bar aria-hidden="true" />
        {["tl", "tr"].map((c) => <span key={c} className={`${styles.corner} ${styles[c]}`} data-corner aria-hidden="true" />)}
        <p className={styles.hud} data-rise aria-hidden="true"><i className={styles.rec} />REC <Timecode video={video} className={styles.tc} /></p>
        <p className={styles.credit} data-rise>{data.credit}</p>
        <div className={styles.credits} aria-hidden="true">
          {data.crafts.map((c) => <span key={c} data-credit>{c}</span>)}
        </div>
      </div>

      <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
        <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><span aria-current="page">{data.kicker}</span></li>
        </ol>
      </nav>

      <h1 id="va-title" className={styles.title} data-title>
        {data.title.map((l) => <span key={l} className={styles.hl} data-hl>{l}</span>)}
        <span className={styles.srOnly}> — {data.kicker} studio</span>
      </h1>

      <div className={styles.foot} data-foot>
        <p className={styles.lead} data-rise>{data.lead}</p>
        <p className={styles.sub} data-rise>{data.sub}</p>
        <div className={styles.actions} data-rise>
          <Button href="/#contact" size="lg">Start your film</Button>
          <Button href="#va-reel" variant="text" icon="down">Watch the reel</Button>
        </div>
      </div>
    </section>
  );
}
