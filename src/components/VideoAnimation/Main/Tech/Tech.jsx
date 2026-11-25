"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Head from "../../kit/Head";
import Clip from "../../kit/Clip";
import Composite from "../../kit/Composite";
import { LowerThird } from "../../kit/Anim";
import { VIMG } from "@/data/video-animation/media";
import styles from "./Tech.module.css";

/** Interactive media: the shot follows the pointer (or a drag) instead of playing on its own */
function Scrub({ clip }) {
  const box = useRef(null);
  const vid = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const v = document.createElement("video");
    v.muted = true; v.playsInline = true; v.preload = "auto"; v.src = clip.src;
    v.className = styles.scrubVid;
    v.setAttribute("aria-hidden", "true");
    v.addEventListener("loadeddata", () => { v.currentTime = v.duration / 2; setReady(true); }, { once: true });
    box.current.prepend(v);
    vid.current = v;
    return () => v.remove();
  }, [clip.src]);
  const move = (e) => {
    const v = vid.current, r = box.current.getBoundingClientRect();
    if (!v?.duration) return;
    const p = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    v.currentTime = p * (v.duration - 0.05);
    box.current.style.setProperty("--p", `${p * 100}%`);
  };
  return (
    <div ref={box} className={`${styles.scrub} ${ready ? styles.scrubOn : ""}`} onPointerMove={move} onPointerDown={move} style={{ backgroundImage: `url(${clip.poster})` }}>
      <span className={styles.scrubLine} aria-hidden="true" />
      <span className={styles.scrubHint}>Move across the frame</span>
    </div>
  );
}

function Viewer({ layer }) {
  if (layer.key === "comp") return <Composite plate={layer.plate} bg={layer.bg} />;
  if (layer.key === "graphics") return <LowerThird lines={layer.lines} image={VIMG.reel} />;
  if (layer.key === "interactive") return <Scrub clip={layer.clip} />;
  return <Clip clip={layer.clip} fit={layer.clip.h > layer.clip.w ? "contain" : "cover"} label={layer.text} />;
}

/**
 * Creative technology — a compositor's layer stack beside its viewer. Each layer is a tool, and
 * selecting it puts a working demo in the viewer: a green-screen composite you can wipe, 3D,
 * motion design, a graphics template animating, and a shot you scrub with the pointer.
 * The viewer changes with a wipe; the layer's eye opens.
 */
export default function Tech({ data }) {
  const ref = useRef(null);
  const [on, setOn] = useState(0);
  const { ready } = useSiteMotion();
  const layer = data.layers[on];

  const pick = (i) => {
    if (i === on) return;
    setOn(i);
    sfx("tick");
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.fromTo(ref.current.querySelector("[data-view]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut", overwrite: true });
    }
  };

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.timeline({ scrollTrigger: { trigger: root.querySelector("[data-desk]"), start: "top 78%", once: true } })
        .from(root.querySelectorAll("[data-layer]"), { y: 30, opacity: 0, stagger: 0.07, duration: 0.9 })
        .fromTo(root.querySelector("[data-screen]"), { clipPath: "inset(0% 50% 0% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" }, 0.1);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className={styles.tech} aria-labelledby="va-tech">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="va-tech" />
      <div className={styles.desk} data-desk>
        <div className={styles.panel}>
          <p className={styles.panelHead} aria-hidden="true"><span>Layers</span><span>Comp 01</span></p>
          <ul className={styles.layers} role="tablist" aria-label="Creative technology">
            {data.layers.map((l, i) => (
              <li key={l.key} role="presentation" data-layer>
                <button type="button" role="tab" id={`va-tab-${l.key}`} aria-selected={i === on} aria-controls="va-tech-view" className={`${styles.layer} ${i === on ? styles.on : ""}`} onClick={() => pick(i)}>
                  <span className={styles.eye} aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.6" /></svg>
                  </span>
                  <span className={styles.lname}>{l.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.view} id="va-tech-view" role="tabpanel" aria-labelledby={`va-tab-${layer.key}`}>
          <div className={styles.screen} data-screen>
            <div className={styles.viewIn} data-view key={layer.key}><Viewer layer={layer} /></div>
          </div>
          <p className={styles.caption}><b>{layer.name}</b>{layer.text}</p>
        </div>
      </div>
    </section>
  );
}
