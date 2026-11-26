"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useScene, MOTION } from "@/components/ServicePage/scene";
import { CS_PAGE, ROOMS, LAUNCHES } from "@/data/case-studies";
import c from "../common.module.css";
import s from "./Index.module.css";

// Letters grouped by word (so long names can still wrap between words), each able to roll over
const Letters = ({ text }) => {
  let n = 0;
  return text.split(" ").map((word, w) => (
    <span key={w}>
      {w > 0 && " "}
      <span className={s.wordGroup}>
        {[...word].map((ch) => {
          const i = n++;
          return <span key={i} className={s.ch} style={{ "--i": i }}><span>{ch}</span><span aria-hidden="true">{ch}</span></span>;
        })}
      </span>
    </span>
  ));
};

/**
 * The collection — every room on one wall, as a typographic index. On a mouse, the photograph of
 * whichever name you point at follows the cursor, swapping with a short wipe; the name rolls its
 * letters and slides forward while the others step back. Keyboard focus shows the same preview.
 * Below: the product launches the studio shipped with Sybrid (external links).
 * Touch screens: each row carries its own thumbnail.
 */
export default function Index() {
  const ref = useRef(null);
  const pv = useRef(null);
  const [near, setNear] = useState(false);
  const d = CS_PAGE.index;

  // the preview is fixed to the viewport, so its photographs only mount once the collection is close
  // (and only where there is a cursor to follow)
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine) and (min-width: 901px)").matches) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "800px 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const items = [
    ...ROOMS.map((r) => ({ key: r.slug, name: r.name, a: r.sector, b: r.year, c: r.services, href: r.href, image: r.image, alt: r.alt, ext: false })),
    ...LAUNCHES.map((l) => ({ key: l.name, name: l.name, a: l.kind, b: "Sybrid", c: l.tags, href: l.href, image: l.image, alt: `${l.name} — ${l.kind}`, ext: true })),
  ];

  useScene(ref, (mm, root) => {
    const q = gsap.utils.selector(root);
    mm.add(MOTION, () => {
      q("[data-row]").forEach((row) => {
        gsap.fromTo(row.querySelector("[data-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: row, start: "top 92%", once: true } });
        gsap.fromTo(row.querySelector("[data-name]"), { xPercent: -6, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 1.2, delay: 0.15, scrollTrigger: { trigger: row, start: "top 92%", once: true } });
      });
    });
    mm.add("(hover: hover) and (pointer: fine) and (min-width: 901px)", () => {
      const el = pv.current;
      const x = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" }), y = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" });
      const rot = gsap.quickTo(el, "rotate", { duration: 0.9, ease: "power3" });
      let lx = 0;
      const move = (e) => { x(e.clientX); y(e.clientY); rot(gsap.utils.clamp(-8, 8, (e.clientX - lx) * 0.4)); lx = e.clientX; };
      root.addEventListener("pointermove", move);
      return () => root.removeEventListener("pointermove", move);
    });
  });

  // show one photograph in the cursor preview (DOM only — no React renders on hover)
  const show = (key, at) => {
    const el = pv.current;
    if (!el) return;
    el.querySelectorAll("[data-shot]").forEach((n) => n.classList.toggle(s.on, n.dataset.shot === key));
    el.classList.toggle(s.live, !!key);
    if (at && key) gsap.set(el, { x: at.x, y: at.y });
  };
  const focusAt = (e) => { const r = e.currentTarget.getBoundingClientRect(); return { x: r.left + r.width * 0.68, y: r.top + r.height / 2 }; };

  const rows = (list) => list.map((it) => (
    <li key={it.key} className={s.row} data-row>
      <a
        href={it.href}
        className={s.link}
        {...(it.ext ? { target: "_blank", rel: "noopener" } : {})}
        onPointerEnter={(e) => e.pointerType === "mouse" && show(it.key)}
        onFocus={(e) => show(it.key, focusAt(e))}
        onBlur={() => show(null)}
        aria-label={`${it.name} — ${it.a}${it.ext ? " (opens sybrid.com)" : ", view the case study"}`}
      >
        <span className={s.thumb} aria-hidden="true"><Image src={it.image} alt="" fill sizes="96px" /></span>
        <span className={`${c.name} ${s.name}`}><span className={s.nameIn} data-name><Letters text={it.name} /></span></span>
        <span className={s.meta}><span>{it.a}</span><span>{it.b}</span></span>
        <span className={s.services}>{it.c}</span>
        <span className={s.arrow} aria-hidden="true">{it.ext ? "↗" : "→"}</span>
      </a>
      <i className={s.rule} data-rule aria-hidden="true" />
    </li>
  ));

  return (
    <section ref={ref} id="collection" className={s.index} aria-labelledby="collection-title" data-room-stop>
      <header className={s.head}>
        <p className={s.kicker}>{d.kicker}</p>
        <h2 id="collection-title" className={`${c.name} ${s.title}`}>{d.title}</h2>
      </header>

      <ul className={s.list} onPointerLeave={() => show(null)}>{rows(items.filter((i) => !i.ext))}</ul>

      <h3 className={s.sub}>{d.launchesTitle}</h3>
      <ul className={`${s.list} ${s.small}`} onPointerLeave={() => show(null)}>{rows(items.filter((i) => i.ext))}</ul>

      <div ref={pv} className={s.preview} aria-hidden="true">
        {near && items.map((it) => (
          <span key={it.key} className={s.shot} data-shot={it.key}>
            <Image src={it.image} alt="" fill sizes="340px" />
          </span>
        ))}
      </div>
    </section>
  );
}
