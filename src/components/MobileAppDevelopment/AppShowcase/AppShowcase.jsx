"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import Head from "../Head";
import styles from "./AppShowcase.module.css";

const ACCENT = "#0d9488";

/**
 * Walk through a complete app. Desktop: the phone holds centre stage while you scroll through seven
 * moments of one customer's day with it — first open to the notification that brings them back. Each
 * step slides the next screen up over the last, turns the phone slightly, and changes what is said on
 * either side: what the person does on the left, what the app is doing underneath on the right.
 * Phones: the same seven moments as a swipeable row.
 */
export default function AppShowcase({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const n = data.steps.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const dev = root.querySelector("[data-dev]");
      const layers = gsap.utils.toArray("[data-dev] [data-layer]", root);
      const says = gsap.utils.toArray("[data-say]", root);
      const techs = gsap.utils.toArray("[data-tech]", root);
      const ticks = gsap.utils.toArray("[data-tick]", root);
      let last = -1;
      const tick = (k) => { if (k === last) return; last = k; ticks.forEach((t, j) => t.toggleAttribute("data-on", j === k)); sfx("tick"); };
      gsap.set([...says.slice(1), ...techs.slice(1)], { autoAlpha: 0 });
      gsap.set(dev, { rotationY: -10, rotationX: 3 });
      tick(0);
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut", duration: 0.55 },
        scrollTrigger: { trigger: root, start: "top top", end: () => `+=${(n - 1) * innerHeight * 0.6}`, pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true, onUpdate: (s) => tick(Math.round(s.progress * (n - 1))) },
      });
      for (let i = 1; i < n; i++) {
        const t = i - 0.5;
        tl.fromTo(layers[i], { opacity: 1, yPercent: 100 }, { yPercent: 0 }, t)
          .to(layers[i - 1], { yPercent: -18, scale: 0.94, duration: 0.55 }, t)
          .to(says[i - 1], { autoAlpha: 0, x: -40 }, t)
          .fromTo(says[i], { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0 }, t + 0.15)
          .to(techs[i - 1], { autoAlpha: 0, y: -20 }, t)
          .fromTo(techs[i], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0 }, t + 0.2)
          .to(dev, { rotationY: i % 2 ? 12 : -10, rotationX: i % 2 ? -2 : 3, duration: 1 }, t - 0.25);
      }
      return () => ticks.forEach((t) => t.removeAttribute("data-on"));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.show} aria-labelledby="show-title">
      <Head kicker={data.kicker} title={data.title} id="show-title" className={styles.head} />

      {/* desktop: one held phone */}
      <div className={styles.stage}>
        <ol className={styles.ticks} aria-hidden="true">{data.steps.map((s) => <li key={s.name} data-tick>{s.name}</li>)}</ol>
        <div className={styles.say}>
          {data.steps.map((s) => (
            <div key={s.name} data-say className={styles.sayItem}>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.phone} aria-hidden="true">
          <Device depth={15} data-dev>
            {data.steps.map((s) => <Screen key={s.name}><AppScreen kind={s.screen} accent={ACCENT} /></Screen>)}
          </Device>
          <span className={styles.halo} />
        </div>
        <div className={styles.techCol}>
          {data.steps.map((s) => (
            <p key={s.name} data-tech className={styles.tech}><small>Under the surface</small>{s.tech}</p>
          ))}
        </div>
      </div>

      {/* phones: a swipeable row */}
      <ol className={styles.row} aria-label="App walkthrough">
        {data.steps.map((s) => (
          <li key={s.name} className={styles.card}>
            <div className={styles.cardPhone} aria-hidden="true"><Device depth={8}><Screen><AppScreen kind={s.screen} accent={ACCENT} /></Screen></Device></div>
            <h3>{s.name}</h3>
            <p>{s.text}</p>
            <p className={styles.cardTech}>{s.tech}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
