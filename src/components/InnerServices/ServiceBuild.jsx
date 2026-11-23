"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP, DESKTOP_MOTION, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import Label from "@/components/About/Label";
import RevealText from "@/components/Common/RevealText";
import ServiceButton from "./ServiceButton";
import styles from "./ServiceBuild.module.css";

/**
 * What we build: every offering set as one large flowing index, like the contents page of a
 * magazine. Pointing at a name lights it and dims the rest, a photograph follows the cursor, the
 * light in the room moves with it, and the panel above swaps to that service's description and link.
 * Touch: tapping a name selects it. Every name is a real link to the service's own page.
 */
export default function ServiceBuild({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const { ready } = useSiteMotion();
  const item = data.items[active];

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      gsap.from(root.querySelectorAll("[data-word]"), { yPercent: 60, opacity: 0, duration: 1, ease: "expo.out", stagger: { each: 0.035 }, scrollTrigger: { trigger: root.querySelector("[data-index]"), start: "top 85%", once: true } });
    });
    mm.add(DESKTOP_MOTION, () => {
      const card = root.querySelector("[data-float]");
      const x = gsap.quickTo(card, "x", { duration: 0.7, ease: "power3.out" }), y = gsap.quickTo(card, "y", { duration: 0.7, ease: "power3.out" });
      const r = gsap.quickTo(card, "rotation", { duration: 0.9, ease: "power3.out" });
      let lx = 0;
      const move = (e) => {
        const b = root.getBoundingClientRect();
        x(e.clientX - b.left); y(e.clientY - b.top);
        r(gsap.utils.clamp(-8, 8, (e.clientX - lx) * 0.4)); lx = e.clientX;
        root.style.setProperty("--mx", `${e.clientX - b.left}px`);
        root.style.setProperty("--my", `${e.clientY - b.top}px`);
      };
      root.addEventListener("pointermove", move);
      return () => root.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const pick = (i) => { if (i !== active) { setActive(i); sfx("tick"); } };

  return (
    <section ref={ref} id="build" className={`${styles.build} ${hovering ? styles.hovering : ""}`} aria-labelledby="build-title">
      <span className={styles.light} aria-hidden="true" />
      <div className={styles.head}>
        <div className={styles.intro}>
          <Label>{data.kicker}</Label>
          <RevealText id="build-title" className={styles.title}>{data.title}</RevealText>
          <p className={styles.text}>{data.text}</p>
        </div>
        <div className={styles.detail} aria-hidden="true">
          <div key={active} className={styles.detailIn}>
            <p className={styles.detailName}>{item.name}</p>
            <p className={styles.detailText}>{item.text}</p>
          </div>
          {item.href && <ServiceButton href={item.href} variant="text" tabIndex={-1}>Explore {item.name}</ServiceButton>}
        </div>
      </div>

      <ul className={styles.index} data-index onPointerEnter={() => setHovering(true)} onPointerLeave={() => setHovering(false)}>
        {data.items.map((it, i) => {
          const cls = `${styles.word} ${i === active ? styles.on : ""}`;
          // shown large: the platform alone ("WordPress"); the rest of the name is still part of the link text
          const short = it.name.replace(/ Development$/, "");
          const rest = it.name.slice(short.length);
          const inner = (<><span className={styles.wordText}>{short}</span><span className="lm-sr-only">{rest} — {it.text}</span></>);
          return (
            <li key={it.name} data-word>
              {it.href ? (
                <a href={it.href} className={cls} onPointerEnter={() => pick(i)} onFocus={() => pick(i)}>{inner}</a>
              ) : (
                <button type="button" className={cls} onPointerEnter={() => pick(i)} onFocus={() => pick(i)} onClick={() => pick(i)}>{inner}</button>
              )}
            </li>
          );
        })}
      </ul>

      <div className={styles.float} data-float aria-hidden="true">
        <div className={styles.floatIn}>
          {data.items.map((it, i) => (
            <Image key={it.name} src={it.image} alt="" fill sizes="340px" className={`${styles.floatImg} ${i === active ? styles.shown : ""}`} />
          ))}
          <span className={styles.floatLabel}>{item.name}</span>
        </div>
      </div>
    </section>
  );
}
