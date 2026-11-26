"use client";
import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, PIN, SMALL } from "@/components/ServicePage/scene";
import Head from "@/components/ServicePage/Head";
import Device, { Screen } from "@/components/MobileApp/Device";
import VideoBackground from "@/components/Common/VideoBackground";
import { SearchApp, Ic } from "../ui/Listing";
import styles from "./Moment.module.css";

/**
 * The moment of search — held. One phone walks through a real local search: typing the query, the
 * map and three businesses, your profile, the tap on Directions. Each step swipes the next screen up
 * while the phone turns a few degrees, and the caption beside it takes over. Real footage of a hand
 * searching a map sits in a window beside the phone.
 */
export default function Moment({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  const n = data.steps.length;

  useScene(ref, (mm, root) => {
    const build = (trigger) => {
      const layers = root.querySelectorAll("[data-phone] [data-layer]");
      const tl = gsap.timeline({ scrollTrigger: { ...trigger, onUpdate: (st) => setAt(Math.min(n - 1, Math.floor(st.progress * n * 0.999))) } });
      tl.fromTo(root.querySelector("[data-phone]"), { rotateY: -14, rotateX: 6 }, { rotateY: 10, rotateX: 0, ease: "none", duration: n }, 0);
      for (let i = 1; i < n; i++) {
        tl.to(layers[i - 1], { yPercent: -18, opacity: 0, duration: 0.35, ease: "power2.in" }, i - 0.2)
          .fromTo(layers[i], { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" }, i - 0.05);
      }
      tl.fromTo(root.querySelector("[data-inset]"), { clipPath: "inset(100% 0 0 0 round 18px)" }, { clipPath: "inset(0% 0 0 0 round 18px)", duration: 0.8, ease: "power2.out" }, 0.1);
    };
    mm.add(PIN, () => build({ trigger: root, start: "top top", end: "+=" + n * 70 + "%", pin: true, scrub: 0.7 }));
    mm.add(SMALL, () => build({ trigger: root.querySelector("[data-stage]"), start: "top 75%", end: "bottom 25%", scrub: 0.7 }));
  }, []);

  return (
    <section ref={ref} className={styles.moment} aria-labelledby="gmb-moment">
      <div className={styles.side}>
        <Head kicker={data.kicker} title={data.title} id="gmb-moment" tone="light" size="md" />
        <ol className={styles.steps}>
          {data.steps.map((s, i) => (
            <li key={s.key} className={i === at ? styles.on : i < at ? styles.past : ""}>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className={styles.stage} data-stage aria-hidden="true">
        <div className={styles.phone} data-phone>
          <Device depth={10} finish="silver">
            {data.steps.map((s, i) => <Screen key={s.key} style={{ opacity: i ? 0 : 1 }}><SearchApp stage={s.key} /></Screen>)}
          </Device>
        </div>
        <div className={styles.inset} data-inset>
          <VideoBackground src={data.inset.src} poster={data.inset.poster} tint={false} />
          <span className={styles.tag}><Ic n="pin" /> Someone nearby, right now</span>
        </div>
      </div>
    </section>
  );
}
