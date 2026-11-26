"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import UiNote from "@/components/MobileApp/UiNote";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import styles from "./Hero.module.css";

const LIFT = [120, 230, 330]; // how high each layer floats above the phone, in px

/**
 * The exploded phone. Seen from above at an isometric angle on a blueprint plane, the phone lies with
 * its parts lifted apart: the interface floating off the glass, the notification and the line of code
 * behind it higher still, each tagged like a drawing. As the page scrolls, the layers settle back
 * into the device and the plane tilts up toward you — the product assembling itself.
 */
export default function Hero({ service: s, ui }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const h = s.hero;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const lifts = gsap.utils.toArray("[data-lift]", root);
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.set(lifts, { z: (i) => LIFT[i] });
      gsap.timeline({ delay: 0.15 })
        .from(root.querySelectorAll("[data-line]"), { yPercent: 115, duration: 1.4, ease: "expo.out", stagger: 0.1 })
        .from(root.querySelectorAll("[data-rise]"), { y: 26, opacity: 0, duration: 1.1, stagger: 0.07 }, 0.3)
        .from(root.querySelector("[data-plane]"), { rotationX: 75, z: -200, opacity: 0, duration: 2, ease: "expo.out" }, 0)
        .from(lifts, { z: (i) => LIFT[i] + 400, opacity: 0, duration: 1.6, ease: "expo.out", stagger: 0.14 }, 0.4)
        .from(root.querySelectorAll("[data-spec] > div"), { clipPath: "inset(0% 100% 0% 0%)", duration: 1.2, ease: "expo.inOut", stagger: 0.08 }, 0.6);
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.7 } })
        .to(lifts, { z: (i) => 2 + i * 2, duration: 1 }, 0)
        .to(root.querySelectorAll("[data-tag]"), { opacity: 0, duration: 0.4 }, 0)
        .to(lifts.slice(1), { opacity: 0, duration: 0.3 }, 0.6)
        .to(root.querySelector("[data-plane]"), { rotationX: 28, rotationZ: -18, duration: 1 }, 0)
        .to(root.querySelector("[data-copy]"), { yPercent: -18, opacity: 0.2, duration: 1 }, 0);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="app-title">
      <div className={styles.copy} data-copy>
        <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href={s.parent.href}>{s.parent.name}</a></li>
            <li><span aria-current="page">{s.name}</span></li>
          </ol>
        </nav>
        <h1 id="app-title" className={styles.title}>
          <span className={styles.mask}><span data-line>{h.title[0]}</span></span>
          <span className={styles.mask}><span data-line className={styles.l2}>{h.title[1]}</span></span>
        </h1>
        <p className={styles.tagline} data-rise>{h.tagline}</p>
        <p className={styles.lead} data-rise>{h.lead}</p>
        <div className={styles.actions} data-rise>
          <Button href="/contact-us#contact-form" size="lg">Start your app</Button>
          <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
        </div>
      </div>

      <div className={styles.scene} aria-hidden="true">
        <div className={styles.plane} data-plane>
          <span className={styles.floor} />
          <div className={styles.phone}>
            <Device platform={ui.platform} depth={16}><Screen><AppScreen kind={h.screens[1]} platform={ui.platform} accent={ui.accent} mode="wire" /></Screen></Device>
          </div>
          <div className={`${styles.lift} ${styles.ui}`} data-lift style={{ transform: `translateZ(${LIFT[0]}px)` }}>
            <div className={styles.uiScreen}><ScaledScreen width={390}><AppScreen kind={h.screens[0]} platform={ui.platform} accent={ui.accent} /></ScaledScreen></div>
            <span className={styles.tag} data-tag>Interface</span>
          </div>
          {h.notes.map((n, i) => (
            <div key={n.kind} className={`${styles.lift} ${styles[`n${i}`]}`} data-lift style={{ transform: `translateZ(${LIFT[i + 1]}px)` }}>
              <UiNote note={n} className={styles.note} />
              <span className={styles.tag} data-tag>{n.kind === "push" ? "Notifications" : "Code"}</span>
            </div>
          ))}
        </div>
      </div>

      <dl className={styles.spec} data-spec>
        {h.spec.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </section>
  );
}
