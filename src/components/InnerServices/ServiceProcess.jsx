"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Label from "@/components/About/Label";
import PanelCanvas from "./PanelCanvas";
import MockSite from "./MockSite";
import ScaledScreen from "./ScaledScreen";
import styles from "./ServiceProcess.module.css";

// What the screen shows at each step: an empty grid, a site map, a wireframe, code, the live page
function Visual({ kind, image }) {
  if (kind === "live") return <div className={styles.live}><ScaledScreen width={1280}><MockSite image={image} sizes="30vw" /></ScaledScreen></div>;
  const map = { blank: "layout", sitemap: "sitemap", wireframe: "wireframe", code: "code" };
  return <PanelCanvas kind={map[kind] || "layout"} width={640} height={420} label={kind === "blank" ? "new project" : undefined} />;
}

/**
 * The development journey. On desktop the section holds while the steps travel sideways past a
 * single screen; the screen evolves with them — empty grid, site map, wireframe, code, live page —
 * and a line along the bottom fills toward launch. Phones: the steps stack down a vertical line,
 * each with its own screen.
 */
export default function ServiceProcess({ data, image }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const n = data.steps.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      let last = 0;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root, start: "top top", end: `+=${(n - 1) * 70}%`, pin: true, scrub: 0.7, anticipatePin: 1,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut", delay: 0.1 },
          onUpdate: (st) => { const k = Math.round(st.progress * (n - 1)); if (k !== last) { last = k; setActive(k); sfx("tick"); } },
        },
      });
      tl.to(root.querySelector("[data-rail]"), { xPercent: (-100 * (n - 1)) / n, ease: "none" }, 0)
        .fromTo(root.querySelector("[data-fill]"), { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0)
        .fromTo(root.querySelector("[data-screen]"), { rotationY: -14 }, { rotationY: 8, ease: "none" }, 0);
      return () => setActive(0);
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(root.querySelector("[data-vline]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root.querySelector("[data-steps]"), start: "top 70%", end: "bottom 70%", scrub: true } });
    });
    mm.add(ANY_MOTION, () => {
      gsap.from(root.querySelectorAll("[data-head] > *"), { y: 30, opacity: 0, duration: 1, stagger: 0.08, scrollTrigger: { trigger: root, start: "top 75%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="process" className={styles.process} aria-labelledby="process-title">
      <div className={styles.inner}>
        <header className={styles.head} data-head>
          <Label>{data.kicker}</Label>
          <h2 id="process-title" className={styles.title}>{data.title}</h2>
        </header>

        <div className={styles.viewport}>
          <span className={styles.vline} data-vline aria-hidden="true" />
          <ol className={styles.rail} data-rail data-steps style={{ "--n": n }}>
            {data.steps.map((s, i) => (
              <li key={s.name} className={`${styles.step} ${i === active ? styles.on : ""}`}>
                <h3 className={styles.name}>{s.name}</h3>
                <p className={styles.text}>{s.text}</p>
                <div className={styles.inlineVisual} aria-hidden="true"><Visual kind={s.visual} image={image} /></div>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.screenWrap} aria-hidden="true">
          <div className={styles.screen} data-screen>
            {data.steps.map((s, i) => (
              <div key={s.name} className={`${styles.layer} ${i === active ? styles.shown : ""} ${i < active ? styles.past : ""}`}><Visual kind={s.visual} image={image} /></div>
            ))}
          </div>
          <p className={styles.caption}><i />{data.steps[active].name}</p>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <span className={styles.track}><span className={styles.fill} data-fill /></span>
          <ol className={styles.marks}>
            {data.steps.map((s, i) => <li key={s.name} className={i <= active ? styles.reached : ""}><i />{s.name}</li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
