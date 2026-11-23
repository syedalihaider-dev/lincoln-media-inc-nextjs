"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import Head from "../Head";
import Panel from "./Panels";
import styles from "./ProductJourney.module.css";

const ACCENT = "#1f6feb";

/**
 * The product journey, held on screen (desktop). A rail of six stages fills as you scroll; at each
 * stage the words change, the phone turns a little and shows the app as it stands then — a
 * wireframe, a design without imagery, the build under the inspector, the finished app, the store
 * listing — and the stage's working document (brief, tokens, architecture, code, tests, release)
 * slides up beside it. Phones and reduced motion: the stages simply follow one another.
 */
export default function ProductJourney({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const n = data.stages.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const texts = gsap.utils.toArray("[data-text]", root);
      const panels = gsap.utils.toArray("[data-panel]", root);
      const layers = gsap.utils.toArray("[data-dev] [data-layer]", root);
      const marks = gsap.utils.toArray("[data-mark]", root);
      const dev = root.querySelector("[data-dev]");
      let last = -1;
      const mark = (k) => { if (k === last) return; last = k; marks.forEach((m, j) => { m.toggleAttribute("data-on", j <= k); m.toggleAttribute("data-now", j === k); }); sfx("tick"); };
      gsap.set([...texts.slice(1), ...panels.slice(1)], { autoAlpha: 0 });
      gsap.set(dev, { rotationY: -16, rotationX: 4 });
      mark(0);
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 0.5 },
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${(n - 1) * innerHeight * 0.75}`, pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (s) => mark(Math.round(s.progress * (n - 1))) },
      });
      tl.fromTo(root.querySelector("[data-fill]"), { scaleX: 0 }, { scaleX: 1, ease: "none", duration: n - 1 }, 0);
      for (let i = 1; i < n; i++) {
        const t = i - 0.5;
        tl.to(texts[i - 1], { autoAlpha: 0, y: -40 }, t)
          .fromTo(texts[i], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0 }, t + 0.15)
          .to(panels[i - 1], { autoAlpha: 0, y: -30, rotationX: 12 }, t)
          .fromTo(panels[i], { autoAlpha: 0, y: 60, rotationX: -14 }, { autoAlpha: 1, y: 0, rotationX: 0 }, t + 0.15)
          .to(layers[i], { opacity: 1, duration: 0.4 }, t + 0.05)
          .to(dev, { rotationY: i % 2 ? 14 : -16, rotationX: i % 2 ? -2 : 4, duration: 0.9 }, t - 0.2);
      }
      return () => { marks.forEach((m) => { m.removeAttribute("data-on"); m.removeAttribute("data-now"); }); };
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.journey} aria-labelledby="journey-title">
      <div className={styles.top}>
        <Head kicker={data.kicker} title={data.title} id="journey-title" />
        <ol className={styles.rail} aria-hidden="true">
          {data.stages.map((s) => <li key={s.name} data-mark>{s.name}</li>)}
          <span className={styles.track}><span className={styles.fill} data-fill /></span>
        </ol>
      </div>

      <div className={styles.cols}>
        {data.stages.map((s) => (
          <article key={s.name} className={styles.stage}>
            <div className={styles.text} data-text>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </div>
            <div className={styles.panelWrap}><Panel kind={s.panel} className={styles.panel} data-panel /></div>
          </article>
        ))}
        <div className={styles.phone} aria-hidden="true">
          <Device depth={14} data-dev>
            {data.stages.map((s) => <Screen key={s.name}><AppScreen kind={s.screen} mode={s.mode} accent={ACCENT} /></Screen>)}
          </Device>
        </div>
      </div>
    </section>
  );
}
