"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import UiNote from "@/components/MobileApp/UiNote";
import Head from "../Head";
import styles from "./ConceptToApp.module.css";

const ACCENT = "#1f6feb";

/**
 * Concept → design → development → finished product, on one screen. Desktop: the section holds on a
 * pale drafting surface with a phone showing the home screen as a wireframe. Scrolling wipes each
 * later stage down over it behind a scan line — the designed screen, then the build under the
 * inspector, then the finished app — while the stage names step past on the left. At the end the
 * surface goes dark, the phone grows, turns into the light, and its first notification arrives.
 * Phones: the four stages side by side.
 */
export default function ConceptToApp({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const n = data.stages.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const q = (s) => root.querySelector(s);
      const layers = gsap.utils.toArray("[data-dev] [data-layer]", root);
      const words = gsap.utils.toArray("[data-word]", root);
      const notes = gsap.utils.toArray("[data-say]", root);
      let last = -1;
      const on = (k) => { if (k === last) return; last = k; words.forEach((w, j) => w.toggleAttribute("data-on", j === k)); sfx("tick"); };
      gsap.set(layers.slice(1), { opacity: 1, clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(notes.slice(1), { autoAlpha: 0 });
      gsap.set(q("[data-dev]"), { rotationY: 0, rotationX: 0 });
      on(0);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root, start: "top top", end: "+=320%", pin: true, scrub: 0.8, anticipatePin: 1, onUpdate: (s) => on(Math.min(n - 1, Math.floor(s.progress * n * 0.999))) },
      });
      for (let i = 1; i < n; i++) {
        const t = (i - 1) * 1.2 + 0.3;
        tl.to(layers[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power1.inOut" }, t)
          .fromTo(q("[data-scan]"), { top: "0%", opacity: 1 }, { top: "100%", duration: 0.9, ease: "power1.inOut" }, t)
          .to(q("[data-scan]"), { opacity: 0, duration: 0.1 }, t + 0.9)
          .to(notes[i - 1], { autoAlpha: 0, y: -24, duration: 0.3 }, t)
          .fromTo(notes[i], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.3 }, t + 0.35)
          .to(q("[data-words]"), { yPercent: -(100 / n) * i, duration: 0.6, ease: "power2.inOut" }, t + 0.2);
      }
      const end = (n - 1) * 1.2 + 0.3;
      tl.to(q("[data-dark]"), { opacity: 1, duration: 0.6 }, end - 0.9)
        .to(root, { "--fg": "#eef1f7", duration: 0.6 }, end - 0.9)
        .to(q("[data-dev]"), { scale: 1.12, rotationY: -20, rotationX: 6, duration: 0.8, ease: "power2.inOut" }, end - 0.8)
        .fromTo(q("[data-push]"), { autoAlpha: 0, y: 30, scale: 0.9 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4 }, end - 0.2);
      return () => words.forEach((w) => w.removeAttribute("data-on"));
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(root.querySelectorAll("[data-m]"), { clipPath: "inset(0% 0% 100% 0% round 16px)", duration: 1.2, ease: "expo.inOut", stagger: 0.15, scrollTrigger: { trigger: root.querySelector("[data-grid]"), start: "top 80%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.concept} aria-labelledby="concept-title">
      <span className={styles.dark} data-dark aria-hidden="true" />
      <Head kicker={data.kicker} title={data.title} id="concept-title" tone="light" className={styles.head} />

      <div className={styles.stage}>
        <div className={styles.wordsWin} aria-hidden="true">
          <ol className={styles.words} data-words>{data.stages.map((s) => <li key={s.name} data-word>{s.name}</li>)}</ol>
        </div>
        <div className={styles.phone} aria-hidden="true">
          <Device depth={15} data-dev>
            {data.stages.map((s) => <Screen key={s.name}><AppScreen kind="home" mode={s.mode || undefined} accent={ACCENT} /></Screen>)}
          </Device>
          <span className={styles.scan} data-scan />
          <UiNote note={{ kind: "push", app: "Yourbrand", title: "Welcome to Yourbrand", text: "Your first order ships free this week." }} className={styles.push} data-push />
        </div>
        <ol className={styles.says}>
          {data.stages.map((s) => <li key={s.name} data-say><b>{s.name}</b>{s.text}</li>)}
        </ol>
      </div>

      <ol className={styles.grid} data-grid>
        {data.stages.map((s) => (
          <li key={s.name}>
            <div className={styles.mini} data-m aria-hidden="true"><Device depth={6}><Screen><AppScreen kind="home" mode={s.mode || undefined} accent={ACCENT} /></Screen></Device></div>
            <b>{s.name}</b>
            <span>{s.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
