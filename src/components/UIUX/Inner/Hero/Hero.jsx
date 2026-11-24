"use client";
import { useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { SITE } from "@/data/site";
import { UIUX_PATH } from "@/data/ui-ux/main";
import Button from "@/components/Common/Button";
import View from "@/components/DesignKit/View";
import { useScene, MOTION, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Hero.module.css";

const CURSORS = [{ name: "UX lead", c: "#c4572e", x: [18, 62], y: [30, 58] }, { name: "UI designer", c: "#7b5bff", x: [74, 40], y: [64, 24] }, { name: "You", c: "#1f9d8a", x: [46, 80], y: [80, 70] }];

/**
 * A case-study cover. The service name is set like a title page above a meta row (discipline,
 * deliverables, tools). Below, the project's working file lies on the desk tilted back, three
 * collaborators' named cursors moving across it. Scrolling zooms the canvas in — the zoom readout
 * climbing from 50% to 100% — while the file stands up flat to face you and the cursors travel.
 */
export default function Hero({ service: s }) {
  const ref = useRef(null);
  const h = s.hero;
  useScene(ref, (mm, root) => {
    const q = (x) => root.querySelector(x);
    mm.add(MOTION, () => {
      const split = SplitText.create(q("[data-title]"), { type: "chars", mask: "chars" });
      gsap.timeline({ delay: 0.1 })
        .from(split.chars, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.025 })
        .from(root.querySelectorAll("[data-rise]"), { y: 24, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.07 }, 0.3)
        .from(q("[data-file]"), { y: 120, rotationX: 60, opacity: 0, duration: 1.6, ease: "expo.out" }, 0.2);
      return () => split.revert();
    });
    const zoom = (st, far = 1) => {
      const z = { v: 50 };
      const read = q("[data-zoom]");
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });
      tl.fromTo(q("[data-file]"), { rotationX: 38, scale: 0.9 }, { rotationX: 0, scale: 1 + 0.12 * far, duration: 1 }, 0)
        .to(z, { v: 100, duration: 1, onUpdate: () => { read.textContent = `${Math.round(z.v)}%`; } }, 0);
      CURSORS.forEach((c, i) => tl.fromTo(root.querySelectorAll("[data-cursor]")[i], { left: `${c.x[0]}%`, top: `${c.y[0]}%` }, { left: `${c.x[1]}%`, top: `${c.y[1]}%`, duration: 1 }, 0));
      return tl;
    };
    mm.add(PIN, () => { zoom({ trigger: q("[data-stage]"), start: "top 85%", end: "bottom 30%", scrub: 0.8 }); });
    mm.add(SMALL, () => { zoom({ trigger: q("[data-stage]"), start: "top 90%", end: "bottom 40%", scrub: 0.6 }, 0.3); });
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="uxi-title">
      <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
        <ol><li><a href="/">Home</a></li><li><a href="/services">Services</a></li><li><a href={UIUX_PATH}>UI/UX Design</a></li><li><span aria-current="page">{s.name}</span></li></ol>
      </nav>
      <h1 id="uxi-title" className={styles.title} data-title>{s.name}</h1>
      <div className={styles.row}>
        <p className={styles.headline} data-rise>{h.headline}</p>
        <div className={styles.side} data-rise>
          <p className={styles.text}>{h.text}</p>
          <div className={styles.actions}>
            <Button href="/#contact" size="lg">{h.cta}</Button>
            <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
          </div>
        </div>
      </div>
      <dl className={styles.meta} data-rise>
        <div><dt>Discipline</dt><dd>{h.discipline}</dd></div>
        <div><dt>Deliverables</dt><dd>{h.deliverables.join(" · ")}</dd></div>
        <div><dt>Tools</dt><dd>{h.tools.join(" · ")}</dd></div>
      </dl>
      <div className={styles.stage} data-stage aria-hidden="true">
        <div className={styles.file} data-file>
          <View view={h.view} page={h.page} />
          {CURSORS.map((c) => <span key={c.name} className={styles.cursor} style={{ "--c": c.c, left: `${c.x[0]}%`, top: `${c.y[0]}%` }} data-cursor><i /><b>{c.name}</b></span>)}
        </div>
        <span className={styles.zoom} data-zoom>50%</span>
      </div>
    </section>
  );
}
