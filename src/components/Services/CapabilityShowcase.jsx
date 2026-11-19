"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery, sfx } from "@/lib/motion";
import { SERVICE_CATEGORIES, categoryHref } from "@/data/service-categories";
import Button from "@/components/Common/Button";
import RevealText from "@/components/Common/RevealText";
import Label from "@/components/About/Label";
import styles from "./CapabilityShowcase.module.css";

const CapabilityObject = dynamic(() => import("./CapabilityObject"), { ssr: false, loading: () => null });
const EASE = [0.77, 0, 0.18, 1];
const PIN = "(min-width: 1101px) and (prefers-reduced-motion: no-preference)";
// Where the light falls for each service — the chapter's atmosphere moves as the services change
const LIGHT = [[78, 40], [20, 30], [70, 80], [30, 70], [85, 25], [15, 60], [60, 20], [45, 75]];

/**
 * The capability showcase: the eight services pass through the screen one at a time. On desktop
 * the chapter holds while you scroll; each service's name sweeps in, its words and inner services
 * follow, its 3D object turns in front of its photograph (opened through a circle), and the light
 * of the whole chapter moves. A rail of the eight names fills as you travel. Phones: one after another.
 */
export default function CapabilityShowcase() {
  const ref = useRef(null);
  const st = useRef(null);
  const activeRef = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(0);
  const { ready, scrollTo } = useSiteMotion();
  const desktop = useMediaQuery(PIN);
  const n = SERVICE_CATEGORIES.length;

  useEffect(() => {
    const move = (e) => { pointer.current = { x: e.clientX / innerWidth - 0.5, y: e.clientY / innerHeight - 0.5 }; };
    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const mm = gsap.matchMedia();
    mm.add(PIN, () => {
      let cur = 0;
      st.current = ScrollTrigger.create({
        trigger: root.querySelector("[data-pin]"),
        start: "top top",
        end: `+=${n * 70}%`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (s) => {
          root.style.setProperty("--cp", s.progress.toFixed(4));
          const i = Math.min(n - 1, Math.floor(s.progress * n));
          if (i !== cur) { cur = i; activeRef.current = i; setActive(i); sfx("tick"); }
        },
      });
      return () => { st.current = null; };
    });
    mm.add("(max-width: 1100px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-block]", root).forEach((b) => {
        gsap.fromTo(b.querySelector("[data-bimg]"), { clipPath: "circle(12% at 50% 50%)" }, { clipPath: "circle(75% at 50% 50%)", ease: "none", scrollTrigger: { trigger: b, start: "top 90%", end: "top 35%", scrub: 0.6 } });
      });
    });
    return () => mm.revert();
  }, { dependencies: [ready, n], scope: ref });

  const go = (i) => { const s = st.current; if (s) scrollTo(s.start + ((i + 0.5) / n) * (s.end - s.start)); };
  const c = SERVICE_CATEGORIES[active];
  const [lx, ly] = LIGHT[active];

  return (
    <section ref={ref} id="capabilities" className={styles.cap} aria-labelledby="cap-title">
      <header className={styles.head}>
        <Label>Capabilities</Label>
        <RevealText id="cap-title" className={styles.title}>Eight disciplines, <em>one studio.</em></RevealText>
      </header>

      {/* Desktop: the pinned experience */}
      <div className={styles.pin} data-pin style={{ "--lx": `${lx}%`, "--ly": `${ly}%` }}>
        <p className={styles.ghost} key={`g-${c.key}`} aria-hidden="true">{c.short}</p>

        <div className={styles.copy}>
          <motion.div key={c.key} className={styles.copyInner} initial="in" animate="show">
              <motion.h3 className={styles.name} variants={{ in: { clipPath: "inset(0% 100% 0% 0%)", x: 40 }, show: { clipPath: "inset(0% 0% 0% 0%)", x: 0, transition: { duration: 0.8, ease: EASE } }, out: { clipPath: "inset(0% 0% 0% 100%)", x: -30, transition: { duration: 0.35, ease: EASE } } }}>
                {c.name}
              </motion.h3>
              <motion.p className={styles.text} variants={{ in: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.7, ease: EASE } }, out: { opacity: 0, transition: { duration: 0.2 } } }}>{c.text}</motion.p>
              <motion.p className={styles.blurb} variants={{ in: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.7, ease: EASE } }, out: { opacity: 0, transition: { duration: 0.2 } } }}>{c.blurb}</motion.p>
              <motion.ul className={styles.subs} variants={{ in: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.35 } }, out: { opacity: 0, transition: { duration: 0.2 } } }}>
                {c.items.slice(0, 6).map((it) => (
                  <motion.li key={it.name} variants={{ in: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } } }}>{it.name}</motion.li>
                ))}
              </motion.ul>
              <motion.div className={styles.cta} variants={{ in: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.5, duration: 0.6 } }, out: { opacity: 0, transition: { duration: 0.15 } } }}>
                <Button href={categoryHref(c)}>Explore {c.short}</Button>
                <Button href={`#index-${c.key}`} variant="text" icon="down">Every {c.short} service</Button>
              </motion.div>
          </motion.div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div key={c.key} className={styles.photo} initial={{ clipPath: "circle(0% at 50% 50%)" }} animate={{ clipPath: "circle(48% at 50% 50%)", transition: { duration: 1.1, ease: EASE } }} exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.4 } }}>
              <Image src={c.image} alt="" fill sizes="44vw" />
            </motion.div>
          </AnimatePresence>
          <span className={styles.orbit} />
          {desktop && <div className={styles.object}><CapabilityObject active={activeRef} pointer={pointer} /></div>}
        </div>

        <nav className={styles.rail} aria-label="Capabilities">
          {SERVICE_CATEGORIES.map((s, i) => (
            <button key={s.key} type="button" className={i === active ? styles.railOn : undefined} onClick={() => go(i)} aria-current={i === active ? "true" : undefined}>
              <span>{s.short}</span><i aria-hidden="true" />
            </button>
          ))}
        </nav>
      </div>

      {/* Tablet & phone: one after another */}
      <div className={styles.stack}>
        {SERVICE_CATEGORIES.map((s) => (
          <article key={s.key} className={styles.block} data-block>
            <figure className={styles.bImg} data-bimg aria-hidden="true"><Image src={s.image} alt="" fill sizes="100vw" /></figure>
            <h3 className={styles.name}>{s.name}</h3>
            <p className={styles.text}>{s.text}</p>
            <p className={styles.blurb}>{s.blurb}</p>
            <div className={styles.cta}><Button href={categoryHref(s)}>Explore {s.short}</Button></div>
          </article>
        ))}
      </div>
    </section>
  );
}
