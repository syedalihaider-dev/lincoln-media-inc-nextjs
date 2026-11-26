"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { useScene, PIN, MOTION } from "@/components/ServicePage/scene";
import Button from "@/components/Common/Button";
import Device, { Screen } from "@/components/MobileApp/Device";
import { Browser, App, Ic } from "../ui/Halden";
import styles from "./Hero.module.css";

// Each link of the chain shows the product from another side
const STATES = [
  { view: "overview", app: "assistant", chip: ["Assistant", "3 requests need you"], hook: "classify.request → urgent" },
  { view: "billing", app: "onboard", chip: ["Workspace", "Northgate · 18 seats"], hook: "subscription.renewed" },
  { view: "requests", app: "today", chip: ["Technician app", "Route synced offline"], hook: "job.assigned → push" },
  { view: "releases", app: "notify", chip: ["Release 4.12", "Rolling out · 10%"], hook: "deploy.production → ok" },
];
const VIEWS = STATES.map((s) => s.view);
const APPS = STATES.map((s) => s.app);

/**
 * Opening: large type on the left; on the right a product assembled in depth — the web console, the
 * technician's phone in front of it, and two live fragments (an assistant card, an event log line).
 * The chain under the headline steps through Intelligent products → SaaS → Mobile → Scale and the
 * product turns to show each side. Pointer moves the layers at different depths; scrolling away
 * pulls them apart.
 */
export default function Hero({ data, note }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);

  // cycle the chain (pauses while the hero is off screen or motion is reduced)
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let vis = true, t;
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting));
    io.observe(ref.current);
    t = setInterval(() => vis && !document.hidden && setAt((a) => (a + 1) % STATES.length), 3600);
    return () => { clearInterval(t); io.disconnect(); };
  }, []);

  // cross-fade the stacked console views and phone screens
  useEffect(() => {
    const root = ref.current;
    root.querySelectorAll("[data-view]").forEach((el) => gsap.to(el, { opacity: el.dataset.view === VIEWS[at] ? 1 : 0, duration: 0.8, ease: "power2.out" }));
    root.querySelectorAll("[data-app]").forEach((el) => gsap.to(el, { opacity: el.dataset.app === APPS[at] ? 1 : 0, scale: el.dataset.app === APPS[at] ? 1 : 1.04, duration: 0.8, ease: "power2.out" }));
  }, [at]);

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      const split = SplitText.create(root.querySelector("h1"), { type: "chars,words", charsClass: styles.char });
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(root.querySelector("[data-kicker]"), { y: 16, opacity: 0, duration: 1 })
        .from(split.chars, { yPercent: 115, rotateX: -70, opacity: 0, transformOrigin: "50% 100% -20px", duration: 1.3, stagger: 0.012, ease: "expo.out" }, 0.1)
        .from(root.querySelectorAll("[data-rise]"), { y: 30, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.7)
        .from(root.querySelector("[data-browser]"), { z: -500, rotateX: 28, rotateY: -24, opacity: 0, duration: 1.8, ease: "expo.out" }, 0.3)
        .from(root.querySelector("[data-phone]"), { y: 160, rotateY: 30, opacity: 0, duration: 1.6, ease: "expo.out" }, 0.55)
        .from(root.querySelectorAll("[data-frag]"), { scale: 0.8, y: 30, opacity: 0, duration: 1.1, stagger: 0.12, ease: "back.out(1.6)" }, 1.1);
      return () => split.revert();
    });
    mm.add(PIN, () => {
      // pointer depth
      const layers = gsap.utils.toArray("[data-depth]", root).map((el) => ({ el, d: +el.dataset.depth, x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3" }), y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3" }) }));
      const stage = root.querySelector("[data-stage]");
      const rx = gsap.quickTo(stage, "rotateX", { duration: 1.4, ease: "power3" }), ry = gsap.quickTo(stage, "rotateY", { duration: 1.4, ease: "power3" });
      const move = (e) => {
        const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
        layers.forEach((l) => { l.x(nx * l.d * 40); l.y(ny * l.d * 26); });
        rx(-ny * 5); ry(nx * 7 - 12);
      };
      addEventListener("pointermove", move);
      // leaving: the layers separate in depth and the type lifts away
      gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 0.8 } })
        .to(root.querySelector("[data-copy]"), { yPercent: -18, opacity: 0.2, ease: "none" }, 0)
        .to(root.querySelector("[data-browser]"), { z: -260, yPercent: -10, ease: "none" }, 0)
        .to(root.querySelector("[data-phone]"), { z: 220, yPercent: 14, ease: "none" }, 0)
        .to(root.querySelectorAll("[data-frag]"), { z: 380, opacity: 0, stagger: 0.05, ease: "none" }, 0);
      return () => removeEventListener("pointermove", move);
    });
  }, []);

  const st = STATES[at];
  return (
    <section ref={ref} className={styles.hero} aria-labelledby="ai-hero-title">
      <div className={styles.light} aria-hidden="true" />
      <div className={styles.copy} data-copy>
        <p className={styles.kicker} data-kicker><i aria-hidden="true" />{data.kicker}</p>
        <h1 id="ai-hero-title" className={styles.title}>
          {data.title.map((l) => <span key={l} className={styles.line}>{l}</span>)}
        </h1>
        <p className={styles.text} data-rise>{data.text}</p>
        <div className={styles.ctas} data-rise>
          <Button href={data.primary.href} size="lg">{data.primary.label}</Button>
          <Button href={data.secondary.href} variant="text" icon="down">{data.secondary.label}</Button>
        </div>
        <ol className={styles.chain} data-rise aria-label="What we build">
          {data.chain.map((c, i) => (
            <li key={c} className={i === at ? styles.on : i < at ? styles.past : ""}>
              <button type="button" onClick={() => setAt(i)} aria-pressed={i === at}>{c}</button>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.stageWrap} aria-hidden="true">
        <div className={styles.stage} data-stage>
          <div className={styles.browserL} data-depth="0.6"><Browser views={VIEWS} note={note} data-browser /></div>
          <div className={styles.phoneL} data-depth="1.4">
            <div data-phone>
              <Device depth={10}>
                {APPS.map((a, i) => <Screen key={a} data-app={a} style={{ opacity: i ? 0 : 1 }}><App screen={a} /></Screen>)}
              </Device>
            </div>
          </div>
          <div className={`${styles.frag} ${styles.fragA}`} data-depth="2" data-frag>
            <span className={styles.fragI}><Ic n="bolt" /></span>
            <div><b>{st.chip[0]}</b><span>{st.chip[1]}</span></div>
          </div>
          <div className={`${styles.frag} ${styles.fragB}`} data-depth="2.4" data-frag>
            <code><em>200</em> {st.hook}</code>
          </div>
        </div>
      </div>
    </section>
  );
}
