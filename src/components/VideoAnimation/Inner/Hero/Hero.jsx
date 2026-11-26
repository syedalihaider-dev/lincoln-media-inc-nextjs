"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Button from "@/components/Common/Button";
import Clip from "../../kit/Clip";
import Artefact from "../Artefact";
import styles from "./Hero.module.css";

/**
 * The service hero: the title set in a tall stack beside a widescreen (2.39:1) frame of the service's
 * footage, which opens from its centre line like an anamorphic matte; the service's own working
 * artefact (an animatic, a board drawing itself) sits on a monitor overlapping its corner. On scroll
 * the frame widens toward the edges and the monitor lifts.
 */
export default function Hero({ data, page }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-hl]"), { type: "words", mask: "words" });
      gsap.timeline({ delay: 0.1 })
        .from(split.words, { yPercent: 110, duration: 1.2, stagger: 0.07, ease: "expo.out" })
        .fromTo(q("[data-scope]"), { clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, 0.15)
        .from(q("[data-monitor]"), { y: 80, opacity: 0, duration: 1.4, ease: "expo.out" }, 0.9)
        .from(root.querySelectorAll("[data-rise]"), { y: 22, opacity: 0, duration: 1, stagger: 0.07 }, 0.6);
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      const st = { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 };
      gsap.to(q("[data-scope]"), { scale: 1.08, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-monitor]"), { yPercent: -30, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-stack]"), { yPercent: 12, ease: "none", scrollTrigger: st });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="vs-title">
      <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
        <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/services/video-animation">Video & Animation</a></li>
          <li><span aria-current="page">{page.short}</span></li>
        </ol>
      </nav>

      <div className={styles.stack} data-stack>
        <p className={styles.kicker} data-rise><i aria-hidden="true" />{data.kicker}</p>
        <h1 id="vs-title" className={styles.title}>
          {data.title.map((l) => <span key={l} className={styles.hl} data-hl>{l}</span>)}
          <span className={styles.srOnly}> — {page.name}</span>
        </h1>
        <p className={styles.lead} data-rise>{data.lead}</p>
        <div className={styles.actions} data-rise>
          <Button href="/contact-us#contact-form" size="lg">Start your video</Button>
          <Button href="#vs-process" variant="text" icon="down">How it's made</Button>
        </div>
      </div>

      <div className={styles.media}>
        <div className={styles.scope} data-scope><Clip clip={data.video} label={`${page.name} — footage`} /></div>
        <div className={styles.monitor} data-monitor>
          <Artefact kind={data.artefact} page={page} compact />
        </div>
      </div>
    </section>
  );
}
