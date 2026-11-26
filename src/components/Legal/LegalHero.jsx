"use client";
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import { SITE } from "@/data/site";
import s from "./Legal.module.css";

/** Compact opening: breadcrumb, title, one line on what the document covers, the other policies. */
export default function LegalHero({ meta, others }) {
  const ref = useRef(null);
  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);
    mm.add(MOTION, () => {
      gsap.fromTo(q("[data-title]"), { yPercent: 110 }, { yPercent: 0, duration: 1.3, ease: "expo.out", delay: 0.1 });
      gsap.fromTo(q("[data-fade]"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08, delay: 0.35, ease: "expo.out" });
      gsap.fromTo(q("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "expo.inOut", delay: 0.2 });
    });
  });

  return (
    <header ref={ref} className={s.hero}>
      <nav className={s.crumbs} aria-label="Breadcrumb" data-fade>
        <ol>
          <li><a href="/">Home</a></li>
          <li aria-current="page">{meta.title}</li>
        </ol>
      </nav>
      <p className={s.kicker} data-fade>{meta.kicker}</p>
      <h1 id="legal-title" className={s.title}><span className={s.mask}><span data-title>{meta.title}</span></span></h1>
      <p className={s.summary} data-fade>{meta.summary}</p>
      <div className={s.heroFoot} data-fade>
        <p className={s.ask}>Questions? <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <a href={SITE.phoneHref}>{SITE.phone}</a></p>
        <ul className={s.pills} aria-label="Other policies">
          {others.map((o) => <li key={o.path}><a href={o.path}>{o.title}</a></li>)}
        </ul>
      </div>
      <i className={s.heroRule} data-rule aria-hidden="true" />
    </header>
  );
}
