"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import Head from "../Head";
import { Serp, Landing, Checkout } from "../ui/Screens";
import frame from "../ui/Frames.module.css";
import { useScene, PIN, SMALL } from "../shared";
import styles from "./SEOJourney.module.css";

/**
 * Search → Discovery → Click → Experience → Conversion, watched in one browser window. Held on
 * desktop: the query types itself, the results arrive, our result lifts out of the page while the
 * others fall back and the pointer clicks it; the site opens out of that result's own rectangle,
 * the address bar changes, and the booking slides up and confirms. The window turns slowly in
 * perspective as the journey moves on. Phones: the same journey plays as the window scrolls past.
 */
export default function SEOJourney({ data }) {
  const ref = useRef(null);

  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const steps = gsap.utils.toArray("[data-step]", root);

    const journey = (tl) => {
      const results = root.querySelectorAll("[data-serp] [data-result]");
      const others = [...results].filter((r) => !r.hasAttribute("data-ours"));
      const ours = q("[data-serp] [data-ours]");
      gsap.set(steps, { "--on": 0 });
      tl.set(steps[0], { "--on": 1 }, 0)
        .fromTo(q("[data-typed]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "steps(32)", duration: 0.8 }, 0)
        // discovery
        .set(steps[1], { "--on": 1 }, 0.9)
        .from(results, { y: 30, opacity: 0, duration: 0.6, stagger: 0.08 }, 0.9)
        // click
        .set(steps[2], { "--on": 1 }, 1.8)
        .to(others, { opacity: 0.3, duration: 0.4 }, 1.8)
        .to(ours, { scale: 1.06, backgroundColor: "#eef3ff", boxShadow: "0 24px 50px -18px rgba(26,63,176,0.45)", duration: 0.5 }, 1.8)
        .fromTo(q("[data-pointer]"), { x: "60vw", y: "40vh", opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 1.9)
        .to(q("[data-pointer]"), { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }, 2.5)
        // experience: the site opens out of the result
        .set(steps[3], { "--on": 1 }, 2.7)
        .set(q("[data-site]"), { opacity: 1 }, 2.7)
        .fromTo(q("[data-site]"), { clipPath: "inset(30% 44% 50% 13% round 12px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.8, ease: "power3.inOut" }, 2.7)
        .to(q("[data-pointer]"), { opacity: 0, duration: 0.2 }, 2.7)
        .to(q("[data-url-a]"), { yPercent: -100, opacity: 0, duration: 0.3 }, 2.8)
        .fromTo(q("[data-url-b]"), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 2.8)
        .fromTo(q("[data-site] [data-cta]"), { boxShadow: "0 0 0 0 rgba(18,56,47,0)" }, { boxShadow: "0 0 0 8px rgba(18,56,47,0.25)", duration: 0.3, yoyo: true, repeat: 1 }, 3.5)
        // conversion
        .set(steps[4], { "--on": 1 }, 3.9)
        .set(q("[data-book]"), { opacity: 1 }, 3.9)
        .fromTo(q("[data-book]"), { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: "power3.out" }, 3.9)
        .to(q("[data-url-b]"), { yPercent: -100, opacity: 0, duration: 0.3 }, 3.9)
        .fromTo(q("[data-url-c]"), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3 }, 3.9)
        .to(q("[data-book] [data-done]"), { autoAlpha: 1, duration: 0.4 }, 4.7)
        .from(q("[data-book] [data-done] > *"), { y: 20, opacity: 0, duration: 0.4, stagger: 0.06 }, 4.75);
      return tl;
    };

    // the daylight panel rises into the dark chapter before it, opening from a rounded card
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(root, { clipPath: "inset(6% 5% 0% 5% round 48px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "top top", scrub: 0.5 } });
    });

    mm.add(PIN, () => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: root, start: "top top", end: "+=360%", pin: true, scrub: 0.9, anticipatePin: 1 } });
      tl.fromTo(q("[data-win]"), { rotationY: -16, rotationX: 10, scale: 0.92 }, { rotationY: 0, rotationX: 2, scale: 1, duration: 2.7, ease: "none" }, 0)
        .to(q("[data-win]"), { rotationY: 10, rotationX: 4, scale: 0.96, duration: 2.6, ease: "none" }, 2.7);
      journey(tl).to({}, { duration: 0.4 });
    });
    mm.add(SMALL, () => {
      journey(gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: q("[data-win]"), start: "top 85%", end: "bottom 15%", scrub: 0.6 } }));
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="seo-title" data-phase="Traffic">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="seo-title" tone="light" />
        <ol className={styles.steps}>
          {data.steps.map((s) => <li key={s.name} className={styles.step} data-step><b>{s.name}</b><p>{s.text}</p></li>)}
        </ol>
      </div>

      <div className={styles.stage} aria-hidden="true">
        <div className={`${frame.browser} ${styles.win}`} data-win>
          <div className={frame.bar}>
            <span className={frame.dots}><i /><i /><i /></span>
            <span className={`${frame.url} ${styles.urls}`}>
              <span data-url-a>search?q={data.query.replaceAll(" ", "+")}</span>
              <span data-url-b>yourbrand.com</span>
              <span data-url-c>yourbrand.com/book/park-view-king</span>
            </span>
            <span />
          </div>
          <div className={frame.view}>
            <div className={styles.layer} data-serp><ScaledScreen width={1280}><Serp query={data.query} /></ScaledScreen></div>
            <div className={`${styles.layer} ${styles.site}`} data-site><ScaledScreen width={1280}><Landing /></ScaledScreen></div>
            <div className={`${styles.layer} ${styles.book}`} data-book><ScaledScreen width={1280}><Checkout /></ScaledScreen></div>
            <svg className={styles.pointer} data-pointer viewBox="0 0 24 24"><path d="M4 2l15 9-6.5 1.6L16 20l-3 1.4-3.4-7.4L4 18z" /></svg>
          </div>
        </div>
      </div>
    </section>
  );
}
