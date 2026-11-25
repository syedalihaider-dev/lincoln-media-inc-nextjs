"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import { BIMG, SURFACES } from "@/data/branding/brands";
import { Phone } from "@/components/Ecommerce/kit/Frames";
import { LogoSheet, Site, Social, Poster, Spread, Slide, OnSurface, Mark, Wordmark, Caption } from "../../kit/Identity";
import Head from "../Head";
import styles from "./Ecosystem.module.css";

/* A small app screen for the "digital experience" channel: order ahead, in the brand's own colours */
function AppMini({ brand }) {
  const [ink, paper, acc] = brand.colors.map((c) => c.hex);
  return (
    <div className={styles.app} style={{ "--ink": ink, "--paper": paper, "--acc": acc }}>
      <header><Wordmark brand={brand} /><span>Pick-up · Kent Ave</span></header>
      <p className={styles.appHi}>Good morning, Alex.</p>
      <div className={styles.appCard}><Mark brand={brand} tone="paper" /><div><b>Your usual?</b><small>Flat white · Oat · Large</small></div></div>
      <ul>{["Breakfast Blend", "Single origin — Huila", "Cold brew"].map((t) => <li key={t}>{t}<i>Add</i></li>)}</ul>
      <span className={styles.appBtn}>Order ahead</span>
    </div>
  );
}

function Channel({ k, brand }) {
  switch (k) {
    case "identity": return <div className={styles.one}><LogoSheet brand={brand} /></div>;
    case "website": return <div className={styles.one}><Site brand={brand} img={BIMG.cupsKraft} /></div>;
    case "social": return (
      <div className={styles.fan}>
        <div><Social brand={brand} img={BIMG.takeawaySet} /></div>
        <div><Social brand={brand} kind="quote" /></div>
        <div><Social brand={brand} img={BIMG.coffeeBag} /></div>
      </div>
    );
    case "campaigns": return (
      <div className={styles.camp}>
        <div className={styles.campA}><OnSurface surface={SURFACES.billboardNight} sizes="25vw"><Poster brand={brand} /></OnSurface></div>
        <div className={styles.campB}><OnSurface surface={SURFACES.signBrick} sizes="25vw"><div className={styles.sign} style={{ "--ink": brand.colors[0].hex, "--paper": brand.colors[1].hex }}><Wordmark brand={brand} tone="paper" /></div></OnSurface></div>
      </div>
    );
    case "content": return (
      <div className={styles.content}>
        <div className={styles.cSpread}><Spread brand={brand} img={BIMG.cupsKraft} title="How we roast" /></div>
        <div className={styles.cSlide}><Slide brand={brand} /></div>
      </div>
    );
    default: return <div className={styles.phone}><Phone><AppMini brand={brand} /></Phone></div>;
  }
}

/**
 * The communication ecosystem as a switchboard. The six channels sit on one thread that starts at
 * the brand's mark; choosing one (click, hover or arrow keys) wipes the stage to the same brand in
 * that channel's format. While the section is on screen it moves through the channels on its own
 * until someone takes over (never with reduced motion).
 */
export default function Ecosystem({ data, brand }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const touched = useRef(false);
  const { ready } = useSiteMotion();
  const n = data.channels.length;

  const choose = (i, user = true) => { if (user) touched.current = true; setActive(((i % n) + n) % n); };

  // auto-advance while visible
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer, visible = false;
    const tick = () => { if (visible && !touched.current) setActive((a) => (a + 1) % n); };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.4 });
    io.observe(ref.current);
    timer = setInterval(tick, 4200);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [n]);

  // each change wipes the stage in
  useGSAP(() => {
    if (!ready || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(ref.current.querySelector("[data-stage]"), { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" });
    gsap.fromTo(ref.current.querySelector("[data-stage] [data-art]"), { scale: 1.06 }, { scale: 1, duration: 1.2, ease: "expo.out" });
  }, { dependencies: [active, ready], scope: ref });

  const onKey = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); choose(active + 1); ref.current.querySelectorAll("[role=tab]")[(active + 1) % n].focus(); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); choose(active - 1); ref.current.querySelectorAll("[role=tab]")[(active - 1 + n) % n].focus(); }
  };
  const c = data.channels[active];

  return (
    <section ref={ref} className={styles.eco} aria-labelledby="brand-eco">
      <Head kicker={data.kicker} title={data.title} text={data.text} id="brand-eco" tone="paper" />
      <div className={styles.thread} role="tablist" aria-label="Channels" onKeyDown={onKey}>
        <span className={styles.origin} aria-hidden="true" style={{ "--paper": brand.colors[1].hex, "--ink": brand.colors[0].hex }}><Mark brand={brand} tone="paper" /></span>
        <span className={styles.line} aria-hidden="true"><i style={{ width: `${(active / (n - 1)) * 100}%` }} /></span>
        {data.channels.map((ch, i) => (
          <button
            key={ch.key} type="button" role="tab" id={`eco-tab-${ch.key}`} aria-selected={i === active} aria-controls="eco-panel" tabIndex={i === active ? 0 : -1}
            className={`${styles.tab} ${i === active ? styles.on : ""} ${i < active ? styles.past : ""}`}
            onClick={() => { choose(i); sfx("tick"); }} onPointerEnter={(e) => e.pointerType === "mouse" && choose(i)}
          >
            <i aria-hidden="true" /><span>{ch.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.panel} id="eco-panel" role="tabpanel" aria-labelledby={`eco-tab-${c.key}`}>
        <div className={styles.stage} data-stage><div className={styles.art} data-art aria-hidden="true"><Channel k={c.key} brand={brand} /></div></div>
        <div className={styles.info}>
          <h3>{c.name}</h3>
          <p>{c.text}</p>
          <Caption />
        </div>
      </div>
    </section>
  );
}
