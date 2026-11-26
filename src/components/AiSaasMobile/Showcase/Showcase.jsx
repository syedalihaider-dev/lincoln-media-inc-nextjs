"use client";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import Device, { Screen } from "@/components/MobileApp/Device";
import { Browser, App } from "../ui/Halden";
import styles from "./Showcase.module.css";

/**
 * One product, every surface. The product stays on screen (sticky) while its story scrolls past:
 * each chapter switches the console to another view and the phone to the matching screen, and the
 * whole product turns a little further toward you as you read on. The active chapter's progress
 * bar fills with the scroll.
 */
export default function Showcase({ data, note }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const views = data.chapters.map((c) => c.view), apps = data.chapters.map((c) => c.app);

  useScene(ref, (mm, root) => {
    const show = (i) => {
      setAt(i);
      root.querySelectorAll("[data-view]").forEach((el) => gsap.to(el, { opacity: el.dataset.view === views[i] ? 1 : 0, filter: el.dataset.view === views[i] ? "blur(0px)" : "blur(6px)", duration: 0.7, ease: "power2.out", overwrite: true }));
      root.querySelectorAll("[data-app]").forEach((el) => gsap.to(el, { opacity: el.dataset.app === apps[i] ? 1 : 0, yPercent: el.dataset.app === apps[i] ? 0 : 6, duration: 0.7, ease: "power2.out", overwrite: true }));
    };
    mm.add("all", () => {
      gsap.utils.toArray("[data-ch]", root).forEach((el, i) => {
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (st) => st.isActive && show(i) });
      });
    });
    mm.add(MOTION, () => {
      gsap.fromTo(root.querySelector("[data-product]"), { rotateX: 16, rotateY: -16, scale: 0.86 }, { rotateX: 2, rotateY: -4, scale: 1, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "center center", scrub: 1 } });
      gsap.utils.toArray("[data-ch]", root).forEach((el) => {
        gsap.fromTo(el.querySelector("[data-fill]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 60%", scrub: true } });
        gsap.from(el.querySelectorAll("h3, p"), { y: 40, opacity: 0, stagger: 0.08, duration: 1.1, scrollTrigger: { trigger: el, start: "top 75%", once: true } });
      });
    });
  }, []);

  return (
    <section ref={ref} className={styles.showcase} aria-labelledby="ai-showcase">
      <div className={styles.intro}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="ai-showcase" />
      </div>
      <div className={styles.body}>
        <div className={styles.chapters}>
          {data.chapters.map((c, i) => (
            <article key={c.title} className={`${styles.ch} ${i === at ? styles.on : ""}`} data-ch>
              <span className={styles.bar}><i data-fill /></span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
        <div className={styles.sticky} aria-hidden="true">
          <div className={styles.product} data-product>
            <Browser views={views} note={note} className={styles.browser} />
            <div className={styles.phone}>
              <Device depth={9}>
                {apps.map((a, i) => <Screen key={a} data-app={a} style={{ opacity: i ? 0 : 1 }}><App screen={a} /></Screen>)}
              </Device>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
