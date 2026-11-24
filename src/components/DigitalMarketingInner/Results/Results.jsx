"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import { Ui, isPhoneScreen } from "@/components/DigitalMarketing/ui/Frames";
import styles from "./Results.module.css";

const PHASES = ["Before", "Optimization", "After"];

/**
 * Before → Optimization → After, told on one screen and without invented numbers. The service's
 * own interface first appears drained of colour, with what was wrong listed beside it. Held on
 * desktop: a scan line sweeps across, restoring the screen to full colour behind it while the work
 * that was done ticks off; then the outcomes take the list's place. Phones: the sweep runs as the
 * screen passes and the three lists follow in order.
 */
export default function Results({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const sweep = (tl, at = 0, dur = 1) => tl
      .fromTo(q("[data-after]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: dur }, at)
      .fromTo(q("[data-scan]"), { left: "0%", opacity: 1 }, { left: "100%", ease: "none", duration: dur }, at)
      .to(q("[data-scan]"), { opacity: 0, duration: 0.1 }, at + dur);

    mm.add(PIN, () => {
      const lists = gsap.utils.toArray("[data-list]", root);
      const tabs = gsap.utils.toArray("[data-tab]", root);
      gsap.set(lists.slice(1), { autoAlpha: 0, y: 30 });
      gsap.set(tabs.slice(1), { "--on": 0 });
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: root, start: "top top", end: "+=240%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      tl.from(lists[0].querySelectorAll("li"), { x: 30, opacity: 0, stagger: 0.1, duration: 0.3 }, 0)
        .to(lists[0], { autoAlpha: 0, y: -30, duration: 0.25 }, 0.8)
        .to(tabs[0], { "--on": 0.35, duration: 0.1 }, 0.8).to(tabs[1], { "--on": 1, duration: 0.1 }, 0.85)
        .to(lists[1], { autoAlpha: 1, y: 0, duration: 0.25 }, 0.95)
        .from(lists[1].querySelectorAll("li"), { x: 30, opacity: 0, stagger: 0.25, duration: 0.25 }, 1);
      sweep(tl, 1, 1.2);
      tl.to(lists[1], { autoAlpha: 0, y: -30, duration: 0.25 }, 2.4)
        .to(tabs[1], { "--on": 0.35, duration: 0.1 }, 2.4).to(tabs[2], { "--on": 1, duration: 0.1 }, 2.45)
        .to(lists[2], { autoAlpha: 1, y: 0, duration: 0.25 }, 2.55)
        .from(lists[2].querySelectorAll("li"), { x: 30, opacity: 0, stagger: 0.12, duration: 0.25 }, 2.6)
        .fromTo(q("[data-screen]"), { scale: 0.97 }, { scale: 1, duration: 0.6 }, 2.4)
        .to({}, { duration: 0.4 });
    });
    mm.add(SMALL, () => {
      sweep(gsap.timeline({ scrollTrigger: { trigger: q("[data-screen]"), start: "top 80%", end: "bottom 35%", scrub: 0.5 } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ms-results">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="ms-results" />
        <ol className={styles.tabs} aria-hidden="true">
          {PHASES.map((p, i) => <li key={p} data-tab style={{ "--on": 1 }}>{p}{i < 2 && <i>→</i>}</li>)}
        </ol>
        <div className={styles.lists}>
          {[data.before, data.actions, data.after].map((list, i) => (
            <div key={PHASES[i]} className={`${styles.list} ${styles[`l${i}`]}`} data-list>
              <h3>{PHASES[i]}</h3>
              <ul>{list.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.screen} ${isPhoneScreen(data.screen) ? styles.phone : ""}`} data-screen aria-hidden="true">
        <div className={styles.before}><Ui kind={data.screen} /></div>
        <div className={styles.after} data-after><Ui kind={data.screen} /></div>
        <span className={styles.scan} data-scan />
      </div>
    </section>
  );
}
