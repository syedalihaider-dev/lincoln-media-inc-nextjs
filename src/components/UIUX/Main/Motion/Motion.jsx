"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Head from "@/components/DigitalMarketing/Head";
import { Phone } from "@/components/DesignKit/Devices";
import imgEmpire from "@public/images/home/empire.jpg";
import imgTowers from "@public/images/home/towers.jpg";
import imgDusk from "@public/images/home/nyc-dusk.jpg";
import { useScene, PIN, SMALL } from "@/components/DigitalMarketing/shared";
import styles from "./Motion.module.css";

const HOMES = [[imgEmpire, "Park Avenue loft", "$1,850,000"], [imgTowers, "Hudson tower residence", "$2,400,000"], [imgDusk, "Riverside studio", "$725,000"]];

/** The prototype: the Meridian app at 390px, with every state stacked so GSAP can play between them */
function App() {
  return (
    <div className={styles.app}>
      <div className={styles.list} data-list>
        <p className={styles.appTitle}>Saved homes</p>
        {HOMES.map(([img, t, p], i) => (
          <div key={t} className={styles.row} data-row={i}>
            <span className={styles.thumb}><Image src={img} alt="" fill sizes="80px" style={{ objectFit: "cover" }} /></span>
            <p><b>{t}</b><span>{p}</span></p>
            <i className={styles.skel} data-skel><em /><em /></i>
          </div>
        ))}
        <span className={styles.press} data-press>View home</span>
        <span className={styles.tap} data-tap />
      </div>
      <div className={styles.detail} data-detail>
        <span className={styles.hero}><Image src={imgEmpire} alt="" fill sizes="300px" style={{ objectFit: "cover" }} /></span>
        <p className={styles.dTitle}>Park Avenue loft</p>
        <p className={styles.dMeta}>2 bed · 2 bath · 1,240 sq ft</p>
        <span className={styles.book}>Book a viewing</span>
      </div>
      <div className={styles.scrim} data-scrim />
      <div className={styles.sheet} data-sheet>
        <i className={styles.grab} />
        <p className={styles.sTitle}>Choose a time</p>
        <div className={styles.slots}><span>Sat 10:00</span><span className={styles.pick} data-pick>Sat 11:30</span><span>Sun 14:30</span></div>
        <span className={styles.confirm}>Confirm viewing</span>
      </div>
      <div className={styles.toast} data-toast><b>✓</b>Viewing booked · Sat 11:30</div>
    </div>
  );
}

/**
 * Interaction & motion, as a working prototype. Held on desktop, scrolling plays the phone's
 * interactions in order — a press on a button, a list loading through skeletons, a push into the
 * home's page, a booking sheet sliding up with a time being chosen, and a confirmation toast — while
 * a keyframe track beside it advances and names each beat's timing.
 * Phones: the same sequence plays once as the phone scrolls into view.
 */
export default function Motion({ data }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = (s) => root.querySelector(s);
    const build = (tl) => {
      const beats = gsap.utils.toArray("[data-beat]", root);
      gsap.set(beats.slice(1), { "--on": 0 });
      const mark = (i, at) => tl.to(beats[i - 1], { "--on": 0.35, duration: 0.1 }, at).to(beats[i], { "--on": 1, duration: 0.1 }, at);
      gsap.set(q("[data-press]"), { scale: 1 });
      // hover / press
      tl.fromTo(q("[data-tap]"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.1)
        .to(q("[data-press]"), { scale: 0.94, backgroundColor: "#933a1c", duration: 0.2 }, 0.35)
        .to(q("[data-press]"), { scale: 1, backgroundColor: "#c4572e", duration: 0.2 }, 0.6)
        .to(q("[data-tap]"), { opacity: 0, duration: 0.2 }, 0.7);
      // loading: skeletons give way to content
      mark(1, 0.9);
      tl.fromTo(root.querySelectorAll("[data-skel]"), { opacity: 1 }, { opacity: 0, stagger: 0.15, duration: 0.3 }, 1.0);
      // transition: push to detail
      mark(2, 1.8);
      tl.fromTo(q("[data-detail]"), { xPercent: 100 }, { xPercent: 0, duration: 0.6, ease: "power3.inOut" }, 1.9)
        .to(q("[data-list]"), { xPercent: -28, opacity: 0.5, duration: 0.6, ease: "power3.inOut" }, 1.9);
      // modal sheet
      mark(3, 2.8);
      tl.fromTo(q("[data-scrim]"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.9)
        .fromTo(q("[data-sheet]"), { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: "power3.out" }, 2.9)
        .fromTo(q("[data-pick]"), { backgroundColor: "#ffffff", color: "#1d1a16" }, { backgroundColor: "#1d1a16", color: "#f4efe8", duration: 0.2 }, 3.5);
      // feedback
      mark(4, 3.9);
      tl.to(q("[data-sheet]"), { yPercent: 100, duration: 0.4, ease: "power3.in" }, 4.0)
        .to(q("[data-scrim]"), { opacity: 0, duration: 0.3 }, 4.1)
        .fromTo(q("[data-toast]"), { yPercent: -160, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }, 4.3)
        .fromTo(q("[data-head]"), { scaleX: 0 }, { scaleX: 1, duration: 4.7, ease: "none" }, 0);
      return tl;
    };
    mm.add(PIN, () => { build(gsap.timeline({ scrollTrigger: { trigger: root, start: "top top", end: "+=220%", pin: true, scrub: 0.8, anticipatePin: 1 } })).to({}, { duration: 0.4 }); });
    mm.add(SMALL, () => { build(gsap.timeline({ scrollTrigger: { trigger: q("[data-phone]"), start: "top 70%", end: "bottom 30%", scrub: 0.6 } })); });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="ux-motion">
      <div className={styles.copy}>
        <Head kicker={data.kicker} title={data.title} id="ux-motion" />
        <ol className={styles.beats}>
          {data.beats.map((b) => <li key={b.name} className={styles.beat} data-beat><b>{b.name}</b><code>{b.spec}</code><p>{b.text}</p></li>)}
        </ol>
        <div className={styles.track} aria-hidden="true"><i data-head />{data.beats.map((b, i) => <em key={b.name} style={{ left: `${2 + i * 23}%` }} />)}</div>
      </div>
      <div className={styles.phone} data-phone aria-hidden="true"><Phone><App /></Phone></div>
    </section>
  );
}
