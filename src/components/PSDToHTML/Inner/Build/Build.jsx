"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import BPHead from "../BPHead";
import Terminal from "@/components/DesignKit/Terminal";
import Site from "@/components/DesignKit/Site";
import { Browser } from "@/components/DesignKit/Devices";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import b from "../blueprint.module.css";
import styles from "./Build.module.css";

const FID = ["wire", "grey", "ui"];

/**
 * The method as a build log. Held on desktop, the terminal streams its output line by line as you
 * scroll — each stage's command, then its results — and the browser beside it rebuilds the page
 * at each stage: wireframe, then unstyled-grey, then finished. The stage list on the left steps
 * with it. Phones: the log streams as it passes; the stages are listed beneath.
 */
export default function Build({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const stream = (tl) => {
      const lines = gsap.utils.toArray("[data-line]", root);
      gsap.set(lines, { opacity: 0 });
      tl.to(lines, { opacity: 1, duration: 0.05, stagger: 1 / lines.length, ease: "none" }, 0);
      return tl;
    };
    mm.add(PIN, () => {
      const tl = stream(gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=200%", pin: true, scrub: 0.6, anticipatePin: 1 } }));
      const views = gsap.utils.toArray("[data-fid]", root);
      const steps = gsap.utils.toArray("[data-step]", root);
      gsap.set(views.slice(1), { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.set(steps.slice(1), { "--on": 0 });
      views.slice(1).forEach((v, i) => tl.to(v, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.12, ease: "power2.inOut" }, 0.3 + i * 0.33));
      steps.forEach((s, i) => { if (i) tl.to(steps[i - 1], { "--on": 0.35, duration: 0.02 }, (i / steps.length)).to(s, { "--on": 1, duration: 0.02 }, (i / steps.length)); });
      tl.to({}, { duration: 0.1 });
    });
    mm.add(SMALL, () => { stream(gsap.timeline({ scrollTrigger: { trigger: q("[data-term]"), start: "top 80%", end: "bottom 40%", scrub: 0.5 } })); });
  });

  return (
    <section ref={ref} className={`${b.bp} ${b.deep} ${styles.section}`} aria-labelledby="pi-build">
      <div className={styles.copy}>
        <BPHead kicker={data.kicker} title={data.title} id="pi-build" />
        <ol className={styles.steps}>{data.steps.map((s) => <li key={s.name} data-step style={{ "--on": 1 }}><b>{s.name}</b><p>{s.text}</p></li>)}</ol>
      </div>
      <div className={styles.work} aria-hidden="true">
        <div data-term><Terminal title={data.term} lines={data.log} /></div>
        <div className={styles.browser}>
          <Browser url={data.url}>
            <div className={styles.fids}>{FID.map((f) => <div key={f} className={styles.fid} data-fid><Site page={data.page} fid={f} /></div>)}</div>
          </Browser>
        </div>
      </div>
    </section>
  );
}
