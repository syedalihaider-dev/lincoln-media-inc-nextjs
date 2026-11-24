"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "../Head";
import { Browser } from "../ui/Frames";
import { Analytics, AdManager } from "../ui/Screens";
import { useScene, undraw, PIN, SMALL } from "../shared";
import styles from "./Performance.module.css";

/**
 * The data story. One analytics workspace in perspective, held while you scroll through four
 * questions. Traffic — the window swings flat and the sessions line draws itself against last
 * period. Engagement — the headline numbers lift and the channel bars run out. Conversion — the
 * booking funnel rises and a note on the biggest drop-off slides in. Acquisition — the dashboard
 * turns away into depth and the ads manager, where cost per booking is decided, takes its place.
 */
export default function Performance({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const dash = q("[data-dash]");
    const parts = {
      draw: dash.querySelectorAll("[data-draw]"),
      area: dash.querySelector("[data-area]"),
      kpi: dash.querySelectorAll("[data-kpi]"),
      bars: dash.querySelectorAll("[data-bar]"),
      funnel: dash.querySelectorAll("[data-funnel]"),
    };
    const steps = gsap.utils.toArray("[data-step]", root);
    const ads = q("[data-ads]");

    const build = (tl) => {
      undraw(parts.draw);
      gsap.set(parts.area, { opacity: 0 });
      gsap.set(parts.bars, { scaleX: 0 });
      gsap.set(parts.funnel, { scaleY: 0 });
      gsap.set(parts.kpi, { y: 24, opacity: 0.2 });
      undraw(ads.querySelectorAll("[data-draw]"));
      gsap.set(ads.querySelectorAll("[data-bar]"), { scaleX: 0 });
      tl.to(parts.draw, { strokeDashoffset: 0, duration: 1, stagger: 0.2, ease: "power1.inOut" }, 0)
        .to(parts.area, { opacity: 1, duration: 0.5 }, 0.6)
        .to(parts.kpi, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 1.1)
        .to(parts.bars, { scaleX: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 1.3)
        .to(parts.funnel, { scaleY: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" }, 2.2)
        .from(q("[data-note]"), { x: 80, opacity: 0, duration: 0.5 }, 2.6);
      return tl;
    };

    mm.add(PIN, () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: root, start: "top top", end: "+=320%", pin: true, scrub: 0.9, anticipatePin: 1 } });
      tl.fromTo(q("[data-rig]"), { rotationY: -28, rotationX: 18, z: -200 }, { rotationY: -8, rotationX: 6, z: 0, duration: 1, ease: "power2.inOut" }, 0);
      build(tl);
      // acquisition: the dashboard turns away, the ads manager takes its place
      tl.to(q("[data-rig]"), { rotationY: 32, x: "-26%", z: -380, opacity: 0.25, duration: 1, ease: "power2.inOut" }, 3.3)
        .to(q("[data-note]"), { x: -60, opacity: 0, duration: 0.4 }, 3.3)
        .fromTo(ads, { rotationY: -40, xPercent: 60, z: -300, opacity: 0 }, { rotationY: -10, xPercent: 0, z: 0, opacity: 1, duration: 1, ease: "power2.inOut" }, 3.4)
        .to(ads.querySelectorAll("[data-bar]"), { scaleX: 1, duration: 0.5, stagger: 0.06 }, 4.1)
        .to(ads.querySelectorAll("[data-draw]"), { strokeDashoffset: 0, duration: 0.5, stagger: 0.06 }, 4.2)
        .to({}, { duration: 0.3 });
      // the four questions, each lit while its part of the story plays
      const marks = [0, 1.1, 2.2, 3.3, 4.8];
      steps.forEach((s, i) => {
        if (i) tl.fromTo(s, { "--on": 0 }, { "--on": 1, duration: 0.2 }, marks[i]);
        if (i < steps.length - 1) tl.to(s, { "--on": 0, duration: 0.2 }, marks[i + 1] - 0.1);
      });
    });

    mm.add(SMALL, () => {
      build(gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: dash, start: "top 80%", end: "bottom 40%", scrub: 0.6 } }));
      gsap.to(ads.querySelectorAll("[data-bar]"), { scaleX: 1, duration: 1, stagger: 0.06, scrollTrigger: { trigger: ads, start: "top 85%", once: true } });
      gsap.to(ads.querySelectorAll("[data-draw]"), { strokeDashoffset: 0, duration: 1, stagger: 0.06, scrollTrigger: { trigger: ads, start: "top 85%", once: true } });
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="perf-title" data-phase="Traffic">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="perf-title" />
        <ol className={styles.steps}>
          {data.steps.map((s) => (
            <li key={s.name} className={styles.step} data-step><b>{s.name}</b><p>{s.text}</p></li>
          ))}
        </ol>
      </div>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.rig} data-rig>
          <div data-dash><Browser url="analytics › yourbrand.com › overview" dark><Analytics /></Browser></div>
          <div className={styles.note} data-note>
            <small>Biggest drop-off</small>
            <b>Room viewed → Checkout</b>
            <span>Next test: show the breakfast offer on the room page.</span>
          </div>
        </div>
        <div className={styles.ads} data-ads><Browser url="ads manager › yourbrand › campaigns"><AdManager /></Browser></div>
      </div>
    </section>
  );
}
