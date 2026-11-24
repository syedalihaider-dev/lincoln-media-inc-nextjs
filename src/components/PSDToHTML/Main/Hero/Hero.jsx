"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Canvas from "@/components/DesignKit/Canvas";
import Site from "@/components/DesignKit/Site";
import Code, { HTML } from "@/components/DesignKit/Code";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, PIN, SMALL, MOTION } from "@/components/DigitalMarketing/shared";
import styles from "./Hero.module.css";

/**
 * Design file → HTML → browser, as three planes in one space. At rest the design file faces you.
 * Scrolling (held on desktop) slides it back and away, brings the code editor in on a second plane
 * with its lines writing themselves, then opens a browser in front — rising from its bottom edge —
 * with the finished, coded page inside. The headline steps back as the browser arrives.
 */
export default function Hero({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const lines = () => root.querySelectorAll("[data-code] [data-line]");
    mm.add(MOTION, () => {
      gsap.timeline({ delay: 0.1 })
        .from(root.querySelectorAll("[data-word]"), { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.12 })
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07 }, 0.35)
        .from(q("[data-file]"), { rotationY: -30, z: -400, opacity: 0, duration: 1.8, ease: "expo.out" }, 0.1);
    });
    const play = (st, k = 1) => {
      gsap.set(lines(), { opacity: 0 });
      gsap.set(q("[data-browser]"), { clipPath: "inset(100% 0% 0% 0% round 14px)" });
      return gsap.timeline({ defaults: { ease: "power2.inOut" }, scrollTrigger: st })
        .to(q("[data-file]"), { x: `${-14 * k}%`, z: -320 * k, rotationY: 24, opacity: 0.55, duration: 1 }, 0)
        .fromTo(q("[data-code]"), { x: "40%", z: -200, rotationY: -20, opacity: 0 }, { x: `${4 * k}%`, z: -80 * k, rotationY: -14, opacity: 1, duration: 0.8 }, 0.2)
        .to(lines(), { opacity: 1, stagger: 0.03, duration: 0.05, ease: "none" }, 0.5)
        .to(q("[data-browser]"), { clipPath: "inset(0% 0% 0% 0% round 14px)", duration: 0.8 }, 1.3)
        .fromTo(q("[data-browser]"), { y: 60, rotationX: 14 }, { y: 0, rotationX: 0, duration: 0.8 }, 1.3)
        .to(q("[data-code]"), { opacity: 0.4, duration: 0.4 }, 1.6);
    };
    mm.add(PIN, () => {
      play({ trigger: root, start: "top top", end: "+=170%", pin: true, scrub: 0.9, anticipatePin: 1 })
        .to(q("[data-copy]"), { opacity: 0.25, x: -40, duration: 0.5 }, 1.4);
    });
    mm.add(SMALL, () => { play({ trigger: q("[data-stage]"), start: "top 75%", end: "bottom 20%", scrub: 0.6 }, 0.4); });
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="psd-title">
      <div className={styles.copy} data-copy>
        <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
          <ol><li><a href="/">Home</a></li><li><a href="/services">Services</a></li><li><a href="/services/ui-ux-design">UI/UX Design</a></li><li><span aria-current="page">{data.kicker}</span></li></ol>
        </nav>
        <h1 id="psd-title" className={styles.title}>
          <span className="lm-sr-only">{data.sub}: </span>
          <span className={styles.mask}><span data-word>{data.title[0]}</span></span>{" "}
          <span className={styles.mask}><span data-word className={styles.em}>{data.title[1]}</span></span>
        </h1>
        <p className={styles.sub} data-rise>{data.sub}</p>
        <p className={styles.lead} data-rise>{data.lead}</p>
        <ol className={styles.flow} data-rise aria-label="From file to production">{data.flow.map((f) => <li key={f}>{f}</li>)}</ol>
        <div className={styles.actions} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
        </div>
      </div>
      <div className={styles.stage} data-stage aria-hidden="true">
        <div className={styles.plane} data-file><Canvas frame="Home — Desktop" select={{ left: 3.6, top: 40, width: 44, height: 20, label: "Hero / Headline" }} redlines><Site /></Canvas></div>
        <div className={`${styles.plane} ${styles.code}`} data-code><Code file="index.html" lines={HTML.slice(0, 17)} /></div>
        <div className={`${styles.plane} ${styles.browser}`} data-browser><OnDevice page="home" /></div>
      </div>
    </section>
  );
}
