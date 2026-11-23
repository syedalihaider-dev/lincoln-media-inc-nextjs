"use client";
import { useRef } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Device, { Screen } from "@/components/MobileApp/Device";
import AppScreen from "@/components/MobileApp/AppScreen";
import Head from "../Head";
import styles from "./Technology.module.css";

/* What each part of the system actually holds, shown as the real thing */
const NODES = [
  () => (
    <div className={styles.nodePhone}>
      <Device depth={7}><Screen><AppScreen kind="checkout" accent="#1f6feb" /></Screen></Device>
    </div>
  ),
  () => (
    <pre className={styles.req}>
      <span className={styles.m}>POST</span> /v1/orders{"\n"}
      <span className={styles.c}>Authorization: Bearer ••••</span>{"\n"}
      {"{"} <span className={styles.s}>"item"</span>: <span className={styles.s}>"ring-7"</span>, <span className={styles.s}>"qty"</span>: 1 {"}"}{"\n"}
      <span className={styles.ok}>→ 201 Created · 84 ms</span>
    </pre>
  ),
  () => (
    <ul className={styles.svcs}>
      {["Auth", "Catalogue", "Orders", "Payments", "Notifications"].map((s) => <li key={s}><i />{s}</li>)}
    </ul>
  ),
  () => (
    <table className={styles.table}>
      <thead><tr><th>id</th><th>status</th><th>total</th></tr></thead>
      <tbody>
        {[["20418", "paid", "2,580"], ["20417", "packed", "3,150"], ["20416", "paid", "250"]].map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}
      </tbody>
    </table>
  ),
  () => (
    <p className={styles.ext}>
      {["Payments", "Maps", "Push · APNs / FCM", "Analytics", "Email & SMS", "CRM / ERP"].map((s) => <span key={s}>{s}</span>)}
    </p>
  ),
];

/**
 * Technology & architecture. The system behind an app, drawn as a working board: it starts lying
 * flat like a blueprint on a table and rises to face you as you scroll, while each part — the app,
 * its API call, the back end's services, the database rows, the outside services — arrives in order
 * and the connections between them draw themselves, with requests running along them. Below, the
 * platforms (each linking to its own page) and the services every app relies on, wiped in line by line.
 */
export default function Technology({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const nodes = gsap.utils.toArray("[data-node]", root);
      const links = gsap.utils.toArray("[data-link]", root);
      const desk = matchMedia("(min-width: 901px)").matches;
      const tl = gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: root.querySelector("[data-board-wrap]"), start: desk ? "top 85%" : "top 75%", end: desk ? "center 50%" : "bottom 70%", scrub: 0.8, onUpdate: (s) => root.toggleAttribute("data-live", s.progress > 0.95) } });
      if (desk) tl.fromTo(root.querySelector("[data-board]"), { rotationX: 54, scale: 0.84, y: 80 }, { rotationX: 0, scale: 1, y: 0, duration: 3, ease: "power2.inOut" }, 0);
      nodes.forEach((n, i) => {
        tl.from(n, { opacity: 0, y: 50, z: -120, duration: 0.6 }, 0.4 + i * 0.55);
        if (links[i]) tl.from(links[i], { [desk ? "scaleX" : "scaleY"]: 0, duration: 0.45, ease: "none" }, 0.8 + i * 0.55);
      });
      gsap.utils.toArray("[data-row]", root).forEach((r) => gsap.from(r, { clipPath: "inset(0% 100% 0% 0%)", duration: 1.3, ease: "expo.inOut", scrollTrigger: { trigger: r, start: "top 92%", once: true } }));
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.tech} aria-labelledby="tech-title">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="tech-title" />

      <div className={styles.boardWrap} data-board-wrap>
        <figure className={styles.board} data-board>
          <figcaption className="lm-sr-only">{data.nodes.join(" → ")}</figcaption>
          {data.nodes.map((name, i) => {
            const Body = NODES[i];
            return (
              <div key={name} className={styles.cell}>
                <div className={styles.node} data-node aria-hidden="true">
                  <small>{name}</small>
                  <Body />
                </div>
                {i < data.nodes.length - 1 && <span className={styles.link} data-link aria-hidden="true"><i /></span>}
              </div>
            );
          })}
        </figure>
      </div>

      <div className={styles.lists}>
        <div>
          <h3 className={styles.listHead}>Platforms</h3>
          <ul className={styles.rows}>
            {data.platforms.map((p) => (
              <li key={p.name} data-row>
                <a href={p.href} className={styles.rowLink}>
                  <b>{p.name}</b>
                  <span className={styles.stack}>{p.stack}</span>
                  <span className={styles.what}>{p.text}</span>
                  <i aria-hidden="true">→</i>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className={styles.listHead}>Inside every app</h3>
          <ul className={styles.rows}>
            {data.services.map((s) => (
              <li key={s.name} data-row className={styles.svcRow}><b>{s.name}</b><span className={styles.what}>{s.text}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
