"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { SITE } from "@/data/site";
import Button from "@/components/Common/Button";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import UiNote from "@/components/MobileApp/UiNote";
import styles from "./Hero.module.css";

const ACCENT = "#1f6feb";
const FLOW = ["home", "product", "checkout", "success"]; // the main phone's screens, in the order the scroll reveals them

/**
 * The cinematic opening. Three phones stand in one lit space: the main device, holding a real app,
 * and two more set back in the dark — an Android dashboard and an iPhone's lock screen. As you scroll
 * (desktop: the scene holds), the main phone turns through the light, its app moves from browsing to
 * a confirmed order, the back phones drift on their own planes, and the code, API call and
 * notification around it float at different depths while the headline lifts away.
 */
export default function Hero({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const layers = gsap.utils.toArray("[data-main] [data-layer]", root);
    const mm = gsap.matchMedia();

    mm.add(ANY_MOTION, () => {
      gsap.set(q("[data-main-device]"), { rotationY: -24, rotationX: 8 });
      gsap.set(q("[data-back1] > div"), { rotationY: 26, rotationX: 4 });
      gsap.set(q("[data-back2] > div"), { rotationY: -30, rotationX: 6 });
      // arrival: phones rise out of the dark, the title out of its mask
      gsap.timeline({ delay: 0.15 })
        .from(root.querySelectorAll("[data-line]"), { yPercent: 115, duration: 1.4, ease: "expo.out", stagger: 0.1 })
        .from(root.querySelectorAll("[data-rise]"), { y: 28, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.35)
        .from([q("[data-back1]"), q("[data-back2]")], { y: 140, opacity: 0, duration: 1.8, stagger: 0.12 }, 0.1)
        .from(q("[data-main]"), { y: 220, rotationX: 24, opacity: 0, duration: 2, ease: "expo.out" }, 0)
        .from(root.querySelectorAll("[data-note]"), { scale: 0.85, opacity: 0, duration: 1.2, stagger: 0.15 }, 0.9);
    });

    const scroll = (st) => {
      const tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });
      tl.to(q("[data-main-device]"), { rotationY: 18, rotationX: -3, duration: 1 }, 0)
        .to(q("[data-back1] > div"), { rotationY: 8, duration: 1 }, 0)
        .to(q("[data-back1]"), { xPercent: -18, yPercent: 6, duration: 1 }, 0)
        .to(q("[data-back2] > div"), { rotationY: -12, duration: 1 }, 0)
        .to(q("[data-back2]"), { xPercent: 16, yPercent: -8, duration: 1 }, 0)
        .to(q("[data-light]"), { scale: 1.35, xPercent: -12, duration: 1 }, 0)
        .to(q("[data-floor]"), { scaleX: 0.7, opacity: 0.4, duration: 1 }, 0);
      layers.slice(1).forEach((l, i) => tl.fromTo(l, { opacity: 0, yPercent: 3 }, { opacity: 1, yPercent: 0, duration: 0.12 }, 0.16 + i * 0.24));
      gsap.utils.toArray("[data-note]", root).forEach((n, i) => tl.to(n, { y: [-140, -60, -220][i], duration: 1 }, 0));
      return tl;
    };

    mm.add(DESKTOP_MOTION, () => {
      const tl = scroll({ trigger: root, start: "top top", end: "+=140%", pin: true, scrub: 0.8, anticipatePin: 1 });
      tl.to(q("[data-copy]"), { y: -90, opacity: 0, duration: 0.3 }, 0.7).to(q("[data-cue]"), { opacity: 0, duration: 0.1 }, 0);
    });
    // phones: no hold — the app moves on as the hero scrolls away
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      scroll({ trigger: q("[data-stage]"), start: "top 70%", end: "bottom top", scrub: 0.6 });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="mad-title">
      <span className={styles.light} data-light aria-hidden="true" />

      <div className={styles.copy} data-copy>
        <nav aria-label="Breadcrumb" className={styles.crumb} data-rise>
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><span aria-current="page">{data.kicker}</span></li>
          </ol>
        </nav>
        <h1 id="mad-title" className={styles.title}>
          <span className={styles.mask}><span data-line>{data.title[0]}</span></span>
          <span className={styles.mask}><span data-line className={styles.l2}>{data.title[1]}</span></span>
        </h1>
        <p className={styles.tagline} data-rise>{data.tagline}</p>
        <p className={styles.lead} data-rise>{data.lead}</p>
        <div className={styles.actions} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={SITE.phoneHref} variant="text" icon="phone">{SITE.phone}</Button>
        </div>
      </div>

      <div className={styles.stage} data-stage>
        <div className={styles.back1} data-back1>
          <Device platform="android" depth={11}><Screen><AppScreen kind="dashboard" platform="android" dark accent="#36e4d0" /></Screen></Device>
        </div>
        <div className={styles.back2} data-back2>
          <Device depth={11} finish="silver"><Screen><AppScreen kind="lock" accent={ACCENT} /></Screen></Device>
        </div>
        <div className={styles.main} data-main>
          <Device depth={16} className={styles.mainDevice} data-main-device>
            {FLOW.map((k) => <Screen key={k}><AppScreen kind={k} accent={ACCENT} /></Screen>)}
          </Device>
        </div>
        {data.notes.map((n, i) => <UiNote key={n.kind} note={n} className={styles[`note${i}`]} data-note />)}
        <span className={styles.floor} data-floor aria-hidden="true" />
      </div>

      <p className={styles.cue} data-cue aria-hidden="true"><i />Scroll to explore the app</p>
    </section>
  );
}
