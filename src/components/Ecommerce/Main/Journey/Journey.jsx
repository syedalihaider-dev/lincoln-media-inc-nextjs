"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { Browser, Phone, DemoTag } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import Head from "../Head";
import styles from "./Journey.module.css";

// where the visitor clicks on each screen (percent of the browser body) to reach the next one
const CLICK = [[13, 66], [46, 44], [70, 60], [84, 93], [26, 88]];

/**
 * One purchase, start to finish. While the section holds (desktop) a cursor travels to each screen's
 * call to action and clicks; the next screen wipes in over it, and the rail on the left fills as the
 * visitor moves from product to purchase. Phones show the six moments as a stacked sequence.
 */
export default function Journey({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const screens = gsap.utils.toArray("[data-screen]", root);
    const steps = gsap.utils.toArray("[data-step]", root);
    const cursor = q("[data-cursor]");
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const setStep = (i) => steps.forEach((s, j) => { s.classList.toggle(styles.on, j === i); s.classList.toggle(styles.done, j < i); });
      setStep(0);
      gsap.set(screens.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(cursor, { left: "60%", top: "40%" });
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: root, start: "top top", end: `+=${screens.length * 70}%`, pin: true, scrub: 0.8, anticipatePin: 1,
          onUpdate: (self) => setStep(Math.min(screens.length - 1, Math.floor(self.progress * screens.length * 0.999 + 0.12))),
        },
      });
      CLICK.forEach(([x, y], i) => {
        tl.to(cursor, { left: `${x}%`, top: `${y}%`, duration: 0.6 })
          .fromTo(cursor.querySelector("i"), { scale: 0.4, opacity: 0.9 }, { scale: 2.2, opacity: 0, duration: 0.25, ease: "power1.out" })
          .to(screens[i + 1], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5 }, "<")
          .fromTo(screens[i], { scale: 1 }, { scale: 0.96, duration: 0.5 }, "<");
      });
      tl.to(cursor, { opacity: 0, duration: 0.2 }).to(q("[data-fill]"), { scaleY: 1, duration: tl.duration(), ease: "none" }, 0);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.journey} aria-labelledby="ecom-journey">
      <div className={styles.side}>
        <Head kicker={data.kicker} title={data.title} id="ecom-journey" />
        <div className={styles.rail}>
          <span className={styles.track} aria-hidden="true"><span data-fill /></span>
          <ol className={styles.steps}>
          {data.steps.map((s) => (
            <li key={s.name} className={styles.step} data-step>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
              <div className={styles.inline} aria-hidden="true"><Phone><Screen kind={s.screen} store={data.store} device="phone" /></Phone></div>
            </li>
          ))}
          </ol>
        </div>
      </div>
      <div className={styles.stage} aria-hidden="true">
        <Browser url={`${data.store.domain}`} tone="dark" className={styles.browser}>
          {data.steps.map((s) => (
            <div key={s.name} className={styles.screen} data-screen><Screen kind={s.screen} store={data.store} /></div>
          ))}
          <span className={styles.cursor} data-cursor><i /></span>
        </Browser>
        <DemoTag className={styles.tag} />
      </div>
    </section>
  );
}
