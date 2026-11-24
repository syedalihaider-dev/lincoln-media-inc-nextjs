"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ScrollTrigger } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import imgEmpire from "@public/images/home/empire.jpg";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./System.module.css";

// The properties the inspector steps through, in order
const STEPS = [
  { state: "Default", theme: "Light", size: "M" },
  { state: "Hover", theme: "Light", size: "M" },
  { state: "Pressed", theme: "Light", size: "M" },
  { state: "Focus", theme: "Light", size: "L" },
  { state: "Disabled", theme: "Light", size: "L" },
  { state: "Default", theme: "Dark", size: "L" },
];

/**
 * The design system, inspected live. A component's properties panel sits beside the components it
 * controls — a button, an input and a listing card. Held on desktop, scrolling steps through the
 * properties: hover, pressed, focus, disabled, then a size change and the dark theme — and the real
 * components respond to each one, the way a design system's variants do. The tools used are listed
 * beneath. Phones: the same steps play as the section passes.
 */
export default function System({ data }) {
  const ref = useRef(null);
  const [at, setAt] = useState(0);
  useScene(ref, (mm, root) => {
    const run = (st) => ScrollTrigger.create({ ...st, onUpdate: (self) => setAt(Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length))) });
    mm.add(PIN, () => { run({ trigger: root, start: "top top", end: "+=180%", pin: true, scrub: true, anticipatePin: 1 }); });
    mm.add(SMALL, () => { run({ trigger: root.querySelector("[data-live]"), start: "top 75%", end: "bottom 25%" }); });
  });

  const s = STEPS[at];
  const cls = `${styles.live} ${styles[s.state.toLowerCase()]} ${s.theme === "Dark" ? styles.dark : ""} ${s.size === "L" ? styles.large : ""}`;
  return (
    <section ref={ref} className={styles.section} aria-labelledby="uxi-sys">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} text={data.text} id="uxi-sys" />
        <ul className={styles.tools} aria-label="Tools">{data.tools.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      <div className={styles.work} aria-hidden="true">
        <div className={styles.panel}>
          <p className={styles.ph}>Button / Primary</p>
          <Prop name="State" opts={["Default", "Hover", "Pressed", "Focus", "Disabled"]} on={s.state} />
          <Prop name="Size" opts={["M", "L"]} on={s.size} />
          <Prop name="Theme" opts={["Light", "Dark"]} on={s.theme} />
          <p className={styles.ph}>Tokens</p>
          <p className={styles.tok}><i style={{ background: s.theme === "Dark" ? "#f2c9a8" : "#c4572e" }} />color.action.{s.state === "Disabled" ? "disabled" : "primary"}</p>
          <p className={styles.tok}><i className={styles.rad} />radius.pill</p>
          <p className={styles.tok}><i className={styles.sp} />space.{s.size === "L" ? "20" : "16"}</p>
        </div>
        <div className={cls} data-live>
          <span className={styles.btn}>Book a viewing<em /></span>
          <span className={styles.input}><small>Email</small>sara@example.com</span>
          <div className={styles.card}>
            <span className={styles.pic}><Image src={imgEmpire} alt="" fill sizes="20vw" style={{ objectFit: "cover" }} /></span>
            <b>$1,850,000</b><span>Park Avenue loft</span><small>2 bed · 2 bath</small>
          </div>
          <span className={styles.cursor} />
        </div>
      </div>
    </section>
  );
}

const Prop = ({ name, opts, on }) => (
  <div className={styles.prop}><span>{name}</span><p>{opts.map((o) => <em key={o} className={o === on ? styles.sel : ""}>{o}</em>)}</p></div>
);
