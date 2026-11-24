"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import Site from "@/components/DesignKit/Site";
import { OnDevice } from "@/components/DesignKit/Devices";
import { useScene, PIN } from "@/components/DigitalMarketing/shared";
import styles from "./Responsive.module.css";

const H = 880; // the device's height in real pixels — the page is laid out at the real width inside it

/**
 * Desktop → Tablet → Mobile with one device that changes shape. Held on desktop: the frame narrows
 * from 1280 to 820 to 390 real pixels while you scroll, and because the page inside is real HTML
 * laid out with container queries, it genuinely rearranges — navigation collapses, columns stack,
 * the photo moves above the headline. The bezel thickens, the corners round and the frame swings
 * in perspective as it passes each breakpoint; a readout shows the live width.
 * Phones and reduced motion: the three devices side by side, then stacked.
 */
export default function Responsive({ data }) {
  const ref = useRef(null);
  const steps = data.steps;

  // the frame is laid out at real pixels and scaled to the stage's height
  useEffect(() => {
    const stage = ref.current?.querySelector("[data-stage]");
    if (!stage) return;
    const ro = new ResizeObserver(([e]) => stage.style.setProperty("--s", Math.min(e.contentRect.height / H, e.contentRect.width / 1300)));
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  useScene(ref, (mm, root) => {
    mm.add(PIN, () => {
      const dev = root.querySelector("[data-dev]");
      const read = root.querySelector("[data-read]");
      const names = gsap.utils.toArray("[data-step]", root);
      const st = { w: steps[0].w };
      const show = () => { dev.style.width = `${st.w}px`; read.textContent = `${Math.round(st.w)} px`; };
      show();
      gsap.set(names.slice(1), { "--on": 0 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=220%", pin: true, scrub: 0.8, anticipatePin: 1 } });
      steps.slice(1).forEach((s, i) => {
        const at = i * 1.2 + 0.2;
        tl.to(st, { w: s.w, duration: 1, ease: "power2.inOut", onUpdate: show }, at)
          .to(dev, { "--r": i ? 56 : 34, "--b": i ? 14 : 22, duration: 1, ease: "power2.inOut" }, at)
          .to(root.querySelector("[data-tilt]"), { rotationY: i ? 14 : -12, duration: 0.5, ease: "power2.out", yoyo: true, repeat: 1 }, at)
          .to(names[i], { "--on": 0.35, duration: 0.2 }, at + 0.5)
          .to(names[i + 1], { "--on": 1, duration: 0.2 }, at + 0.55);
      });
      tl.to({}, { duration: 0.4 });
      return () => { dev.style.width = ""; };
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ux-resp">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="ux-resp" />
        <ol className={styles.steps} aria-hidden="true">
          {steps.map((s, i) => <li key={s.name} data-step style={{ "--on": i ? undefined : 1 }}><b>{s.name}</b><span>{s.w} px</span></li>)}
        </ol>
      </div>

      <div className={styles.stage} data-stage aria-hidden="true">
        <div className={styles.tilt} data-tilt>
          <div className={styles.dev} data-dev style={{ height: H }}>
            <div className={styles.screen}><Site page="home" /></div>
          </div>
        </div>
        <p className={styles.read} data-read>1280 px</p>
      </div>

      <div className={styles.trio} aria-hidden="true">
        <div className={styles.tDesk}><OnDevice page="home" /></div>
        <div className={styles.tTab}><OnDevice device="tablet" page="home" /></div>
        <div className={styles.tPhone}><OnDevice device="phone" page="home" /></div>
      </div>
    </section>
  );
}
