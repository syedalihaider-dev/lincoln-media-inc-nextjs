"use client";
import { useRef } from "react";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import { Browser, Phone, DemoTag } from "../../kit/Frames";
import Screen from "../../kit/Screens";
import Head from "../Head";
import styles from "./Showcase.module.css";

/**
 * The service's main interface, presented like a product on a plinth. The browser starts tipped back
 * on the table in perspective and stands up to face you as the section holds (desktop); the phone
 * slides in from the side with the customer's view, then annotation pins drop onto the parts that
 * matter. Phones see both interfaces flat with the notes listed beneath.
 */
export default function Showcase({ data, store, platform }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const q = (s) => root.querySelector(s);
    const notes = gsap.utils.toArray("[data-note]", root);
    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: { trigger: root, start: "top top", end: "+=130%", pin: true, scrub: 0.8, anticipatePin: 1 } })
        .fromTo(q("[data-browser]"), { rotationX: 38, scale: 0.78, yPercent: 14 }, { rotationX: 0, scale: 1, yPercent: 0, duration: 1 }, 0)
        .fromTo(q("[data-phone]"), { xPercent: 120, rotationY: -30, opacity: 0 }, { xPercent: 0, rotationY: -8, opacity: 1, duration: 0.7 }, 0.3)
        .fromTo(q("[data-head]"), { opacity: 1 }, { opacity: 0.25, duration: 0.6 }, 0.4)
        .from(notes, { scale: 0, opacity: 0, duration: 0.15, stagger: 0.12, ease: "back.out(2)" }, 0.95)
        .to({}, { duration: 0.3 });
    });
    mm.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.from(q("[data-browser]"), { rotationX: 20, y: 40, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: q("[data-browser]"), start: "top 85%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const { main, side } = data;
  return (
    <section ref={ref} className={styles.show} aria-labelledby="eci-show">
      <div data-head className={styles.headWrap}>
        <Head platform={platform} kicker={data.kicker} title={data.title} text={data.text} id="eci-show" tone="ink" align="center" />
      </div>
      <div className={styles.stage}>
        <div className={styles.browser} data-browser aria-hidden="true">
          <Browser url={store.domain} tone="dark"><Screen kind={main.kind} store={store} data={main.data} /></Browser>
          {data.notes.map((n, i) => (
            <span key={n.text} className={styles.note} style={{ left: `${n.x}%`, top: `${n.y}%` }} data-note>
              <i>{String.fromCharCode(65 + i)}</i><b>{n.text}</b>
            </span>
          ))}
        </div>
        <div className={styles.phone} data-phone aria-hidden="true">
          <Phone><Screen kind={side.kind} store={store} device="phone" data={side.data} /></Phone>
        </div>
      </div>
      <div className={styles.foot}>
        <DemoTag />
        <ul className={styles.list}>{data.notes.map((n, i) => <li key={n.text}><i>{String.fromCharCode(65 + i)}</i>{n.text}</li>)}</ul>
      </div>
    </section>
  );
}
