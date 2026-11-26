"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useMediaQuery, sfx } from "@/lib/motion";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import Device, { Screen } from "@/components/MobileApp/Device";
import { Browser, App } from "../ui/Halden";
import styles from "./Build.module.css";

/** The interface a capability lives in: the console in a browser, or the app in a phone */
function Preview({ item, note }) {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(ref.current, { clipPath: "inset(0 0 100% 0 round 18px)", y: 30 }, { clipPath: "inset(0 0 0% 0 round 18px)", y: 0, duration: 0.9, ease: "expo.out" });
  }, [item]);
  return (
    <div ref={ref} className={`${styles.preview} ${item.surface === "app" ? styles.pApp : ""}`} aria-hidden="true">
      {item.surface === "app" ? (
        <div className={styles.phone}><Device depth={8}><Screen><App screen={item.view} /></Screen></Device></div>
      ) : (
        <Browser views={[item.view]} note={note} />
      )}
    </div>
  );
}

/**
 * What we build — an index, not a grid of icons. Each capability is a row of large type; choosing one
 * (hover, focus or tap) opens it and shows the real interface where that capability lives, sliding
 * up into the preview. On phones the preview opens inside the chosen row.
 */
export default function Build({ data, note }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const wide = useMediaQuery("(min-width: 901px)", true);

  useScene(ref, (mm, root) => {
    mm.add(MOTION, () => {
      gsap.from(root.querySelectorAll("[data-row]"), { xPercent: -8, opacity: 0, duration: 1.2, stagger: 0.06, ease: "expo.out", scrollTrigger: { trigger: root.querySelector("[data-list]"), start: "top 80%", once: true } });
      gsap.from(root.querySelectorAll("[data-row] [data-rule]"), { scaleX: 0, transformOrigin: "left", duration: 1.4, stagger: 0.06, ease: "expo.inOut", scrollTrigger: { trigger: root.querySelector("[data-list]"), start: "top 80%", once: true } });
    });
  }, []);

  const pick = (i) => { if (i !== at) { setAt(i); sfx("tick"); } };
  const item = data.items[at];

  return (
    <section ref={ref} id="build" className={styles.build} aria-labelledby="ai-build">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="ai-build" />
      <div className={styles.grid}>
        <ul className={styles.list} data-list>
          {data.items.map((it, i) => {
            const on = i === at;
            return (
              <li key={it.name} className={`${styles.row} ${on ? styles.on : ""}`} data-row onPointerEnter={(e) => e.pointerType === "mouse" && pick(i)}>
                <span className={styles.rule} data-rule aria-hidden="true" />
                <h3 className={styles.h}>
                  <button type="button" aria-expanded={on} onClick={() => pick(i)} onFocus={() => pick(i)}>
                    <span>{it.name}</span>
                    <small>{it.surface === "app" ? "Mobile" : "Web"}</small>
                  </button>
                </h3>
                <div className={styles.more}><div><p>{it.text}</p>{!wide && on && <Preview item={it} note={note} />}</div></div>
              </li>
            );
          })}
        </ul>
        {wide && <div className={styles.aside}><Preview key={at} item={item} note={note} /></div>}
      </div>
    </section>
  );
}
