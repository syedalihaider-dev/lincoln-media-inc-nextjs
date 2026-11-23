"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import UiNote from "@/components/MobileApp/UiNote";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import Head from "../Head";
import styles from "./AppExperience.module.css";

const ACCENT = "#7b5bff";
const CODE = [
  ["c", "// BookingRepository.kt"],
  ["k", "suspend fun book(slot: Slot): Booking ="],
  ["", "  api.post(\"/v1/bookings\") {"],
  ["s", "    setBody(BookingRequest(slot.id))"],
  ["", "  }.body<Booking>()"],
  ["", ""],
  ["c", "// then: confirm + schedule a reminder"],
  ["k", "notifications.schedule(booking.reminder)"],
];

/* The five panes — one for each stage, from a written need to an app in someone's hand */
function Pane({ i, data }) {
  if (i === 0) return (
    <div className={`${styles.card} ${styles.story}`}>
      <small>User story</small>
      <p>“{data.story}”</p>
      <ul><li>Returning customer</li><li>On a phone, on the move</li><li>Under a minute</li></ul>
    </div>
  );
  if (i === 1) return (
    <div className={`${styles.card} ${styles.flow}`}>
      <small>User journey</small>
      <div className={styles.flowRow}>
        {["home", "product", "booking"].map((k, j) => (
          <div key={k} className={styles.mini}>
            <div className={styles.miniScreen}><ScaledScreen width={390}><AppScreen kind={k} mode="wire" /></ScaledScreen></div>
            <span>{["Browse", "Choose", "Book"][j]}</span>
          </div>
        ))}
      </div>
    </div>
  );
  if (i === 2) return (
    <div className={`${styles.card} ${styles.ui}`}>
      <div className={styles.uiScreen}><ScaledScreen width={390}><AppScreen kind="booking" accent={ACCENT} /></ScaledScreen></div>
    </div>
  );
  if (i === 3) return (
    <div className={`${styles.card} ${styles.code}`}>
      <small>Android · Kotlin</small>
      <pre>{CODE.map(([t, l], j) => <span key={j} className={styles[`t_${t || "n"}`]}>{l}{"\n"}</span>)}</pre>
    </div>
  );
  return (
    <div className={styles.product}>
      <Device platform="android" depth={12}><Screen><AppScreen kind="success" platform="android" accent={ACCENT} /></Screen></Device>
      <UiNote note={{ kind: "push", app: "Yourbrand", title: "Booking confirmed", text: "Private viewing · Tue 25 Nov, 10:30 AM" }} className={styles.push} />
    </div>
  );
}

/**
 * Editorial: why an app is more than its screens. The five stages run across the page as one huge
 * line of type that slides sideways with the scroll, while five panes — a user story, a journey in
 * wireframes, the interface, its code and the finished app — arrive one after another, each from the
 * right, settling into a row that recedes in depth. The stage being shown lights up in the list.
 */
export default function AppExperience({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();
  const n = data.stages.length;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const items = gsap.utils.toArray("[data-stage]", root);
    const light = (k) => items.forEach((el, j) => el.toggleAttribute("data-on", j === k));
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const words = root.querySelector("[data-words]");
      gsap.fromTo(words, { x: () => innerWidth * 0.1 }, { x: () => -(words.scrollWidth - innerWidth * 0.75), ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5, invalidateOnRefresh: true } });
    });
    mm.add(DESKTOP_MOTION, () => {
      const panes = gsap.utils.toArray("[data-pane]", root);
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: root.querySelector("[data-body]"), start: "top 80%", end: "bottom 95%", scrub: 0.7, onUpdate: (s) => light(Math.min(n - 1, Math.floor(s.progress * n * 0.999))) },
      });
      panes.forEach((p, i) => tl.from(p, { x: () => innerWidth * 0.5, opacity: 0, rotationY: -30, duration: 1 }, i * 0.9));
      return () => light(-1);
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-pane]", root).forEach((p) => gsap.from(p, { clipPath: "inset(0% 0% 100% 0% round 20px)", y: 40, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 88%", once: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.exp} aria-labelledby="exp-title">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="exp-title" className={styles.head} />

      <p className={styles.words} data-words aria-hidden="true">
        {data.stages.map((s, i) => <span key={s.name}>{s.name}{i < n - 1 && <i>→</i>}</span>)}
      </p>

      <div className={styles.body} data-body>
        <ol className={styles.list}>
          {data.stages.map((s) => (
            <li key={s.name} data-stage>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.panes} aria-hidden="true">
          {data.stages.map((s, i) => (
            <div key={s.name} className={`${styles.slot} ${styles[`s${i}`]}`}>
              <div className={styles.pane} data-pane><Pane i={i} data={data} /><span className={styles.tag}>{s.name}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
