"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery, sfx } from "@/lib/motion";
import SectionHead from "./SectionHead";
import styles from "./ServiceCapabilities.module.css";

/**
 * What we build, as an editorial list: every service name set inline as running type. Hovering a
 * name dims the rest, tints the whole section with its picture, and brings a picture and a one-line
 * description out from the cursor, which it then follows. On touch screens a first tap selects a
 * name and opens its card under the list (with the link); a second tap on the same name follows it.
 */
export default function ServiceCapabilities({ data }) {
  const ref = useRef(null);
  const follower = useRef(null);
  const mover = useRef(null);
  const [active, setActive] = useState(-1);
  const [picked, setPicked] = useState(0);
  const { ready } = useSiteMotion();
  const touch = useMediaQuery("(hover: none)");
  const items = data.items;

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.fromTo(root.querySelectorAll("[data-name]"), { opacity: 0, yPercent: 60, rotation: 3 }, { opacity: 1, yPercent: 0, rotation: 0, duration: 1, ease: "expo.out", stagger: 0.035, scrollTrigger: { trigger: root.querySelector("[data-list]"), start: "top 80%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  // The follower trails the cursor inside the list (desktop only)
  useEffect(() => {
    if (touch) return;
    const el = follower.current;
    const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
    const list = ref.current.querySelector("[data-list]");
    const move = (e) => { const r = list.getBoundingClientRect(); qx(e.clientX - r.left); qy(e.clientY - r.top); };
    mover.current = (x, y) => { gsap.set(el, { x, y }); };
    list.addEventListener("pointermove", move);
    return () => list.removeEventListener("pointermove", move);
  }, [touch]);

  const enter = (i) => { if (touch) return; setActive(i); sfx("tick"); };
  // Keyboard focus places the card beside the focused name
  const focus = (i, e) => {
    if (touch) return;
    const list = ref.current.querySelector("[data-list]").getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    mover.current?.(r.right - list.left, r.top - list.top + r.height / 2);
    setActive(i);
  };
  const tap = (i, e) => {
    if (!touch) return;
    if (picked !== i || !items[i].href) { e.preventDefault(); setPicked(i); sfx("tick"); }
  };

  const shown = active >= 0 ? items[active] : null;
  const card = items[picked];

  return (
    <section ref={ref} id="capabilities" className={styles.caps} aria-labelledby="caps-title">
      {/* Desktop: the pointed-at service's picture, blurred, colours the whole section */}
      {!touch && (
        <div className={styles.ambient} aria-hidden="true">
          {items.map((c, i) => (
            <span key={c.name} className={`${styles.amb} ${i === active ? styles.ambOn : ""}`}><Image src={c.image} alt="" fill sizes="300px" loading="lazy" /></span>
          ))}
        </div>
      )}
      <SectionHead kicker={data.kicker} title={data.title} id="caps-title" />

      <div className={styles.wrap} data-list onPointerLeave={() => setActive(-1)}>
        <ul className={`${styles.list} ${active >= 0 ? styles.dim : ""}`}>
          {items.map((c, i) => {
            const cls = `${styles.name} ${i === active || (touch && i === picked) ? styles.on : ""}`;
            const inner = <span className={styles.label} data-name>{c.name}</span>;
            return (
              <li key={c.name} className={styles.item}>
                {c.href
                  ? <a href={c.href} className={cls} onPointerEnter={() => enter(i)} onFocus={(e) => focus(i, e)} onBlur={() => setActive(-1)} onClick={(e) => tap(i, e)}>{inner}</a>
                  : <button type="button" className={cls} onPointerEnter={() => enter(i)} onFocus={(e) => focus(i, e)} onBlur={() => setActive(-1)} onClick={(e) => tap(i, e)}>{inner}</button>}
              </li>
            );
          })}
        </ul>

        {/* Desktop: the picture and line that follow the cursor */}
        {!touch && (
          <div ref={follower} className={`${styles.follower} ${shown ? styles.show : ""}`} aria-hidden="true">
            <div className={styles.fcard}>
              {items.map((c, i) => (
                <span key={c.name} className={`${styles.fimg} ${i === active ? styles.fon : ""}`}><Image src={c.image} alt="" fill sizes="300px" loading="lazy" /></span>
              ))}
              <p className={styles.ftext}>{shown?.text}</p>
            </div>
          </div>
        )}
      </div>

      {/* Touch: the selected name's card */}
      {touch && card && (
        <article key={picked} className={styles.card} aria-live="polite">
          <span className={styles.cimg}><Image src={card.image} alt="" fill sizes="40vw" loading="lazy" /></span>
          <div className={styles.cbody}>
            <h3>{card.name}</h3>
            <p>{card.text}</p>
            {card.href && <a href={card.href} className={styles.clink}>View service <span aria-hidden="true">→</span></a>}
          </div>
        </article>
      )}
    </section>
  );
}
