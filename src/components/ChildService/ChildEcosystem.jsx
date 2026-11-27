"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import SectionHead from "@/components/InnerServices/SectionHead";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import { ScreenBody } from "./ui/Screens";
import styles from "./ChildEcosystem.module.css";

function Layer({ kind, photos, ui }) {
  return <ScaledScreen width={1280}><ScreenBody kind={kind} photos={photos} ui={ui} /></ScaledScreen>;
}

/**
 * The ecosystem as a story: how one website comes together — content, CMS, design, development,
 * integrations, the experience people use. On desktop the section holds while one window carries the
 * project forward: each stage's real interface wipes in over the last (the draft becomes the editor,
 * the editor gets its theme, the theme its code, the code its connections, and the site appears),
 * while the flow line on the left lights the stage you're on. Phones: each stage with its own screen.
 */
export default function ChildEcosystem({ data, photos, ui }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { ready } = useSiteMotion();
  const n = data.stages.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const layers = gsap.utils.toArray("[data-layer]", root);
    const line = root.querySelector("[data-progress]"); // the only reader of --p
    let last = 0;
    const set = (k) => { if (k !== last) { last = k; setActive(k); sfx("tick"); } };
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root, start: "top top", end: () => `+=${(n - 1) * innerHeight * 0.6}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, delay: 0.08 },
          onUpdate: (self) => { set(Math.min(n - 1, Math.round(self.progress * (n - 1)))); line?.style.setProperty("--p", self.progress.toFixed(3)); },
        },
      });
      layers.slice(1).forEach((l, i) => {
        tl.fromTo(l, { clipPath: "inset(100% 0% 0% 0%)", yPercent: 8, scale: 0.96 }, { clipPath: "inset(0% 0% 0% 0%)", yPercent: 0, scale: 1, ease: "power2.inOut", duration: 1 }, i)
          .to(layers[i], { scale: 0.94, yPercent: -4, filter: "brightness(0.5)", ease: "power2.inOut", duration: 1 }, i);
      });
      return () => set(0);
    });
    mm.add("(max-width: 900px), (prefers-reduced-motion: reduce)", () => {
      const sts = gsap.utils.toArray("[data-stage]", root).map((el, i) => gsap.timeline({ scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 40%", onToggle: (s) => s.isActive && set(i) } }));
      return () => sts.forEach((t) => t.kill());
    });
    mm.add(ANY_MOTION, () => {
      gsap.from(root.querySelectorAll("[data-stage]"), { x: -30, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: root, start: "top 70%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="ecosystem" className={styles.eco} aria-labelledby="ecosystem-title">
      <div className={styles.side}>
        <SectionHead kicker={data.kicker} title={data.title} id="ecosystem-title" />
        <div className={styles.flowWrap}>
        <span className={styles.line} data-progress aria-hidden="true" />
        <ol className={styles.flow}>
          {data.stages.map((s, i) => (
            <li key={s.name} className={`${styles.stage} ${i === active ? styles.on : ""} ${i < active ? styles.done : ""}`} data-stage>
              <span className={styles.node} aria-hidden="true" />
              <h3 className={styles.name}>{s.name}</h3>
              <p className={styles.text}>{s.text}</p>
              <div className={styles.inline} aria-hidden="true"><div className={styles.inlineFrame}><Layer kind={s.screen} photos={photos} ui={ui} /></div></div>
            </li>
          ))}
        </ol>
        </div>
      </div>

      <div className={styles.view} aria-hidden="true">
        <div className={styles.window}>
          <div className={styles.chrome}><i /><i /><i /><span key={active}>{data.stages[active].url}</span></div>
          <div className={styles.screen}>
            {data.stages.map((s, i) => <div key={s.name} className={styles.layer} data-layer style={{ zIndex: i + 1 }}><Layer kind={s.screen} photos={photos} ui={ui} /></div>)}
          </div>
        </div>
        <p className={styles.caption}><i />{data.stages[active].name}</p>
      </div>
    </section>
  );
}
