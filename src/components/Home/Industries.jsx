"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText, useGSAP, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion, useMediaQuery, sfx } from "@/lib/motion";
import { INDUSTRIES } from "@/data/home";
import SectionLabel from "@/components/Common/SectionLabel";
import RevealText from "@/components/Common/RevealText";
import styles from "./Industries.module.css";

const IndustryField = dynamic(() => import("./IndustryField"), { ssr: false, loading: () => null });

const pad = (n) => String(n).padStart(2, "0");
const STRIPS = 5;
const PHONE_MOTION = "(max-width: 900px) and (prefers-reduced-motion: no-preference)";

/* One photograph cut into vertical strips (the shutter), plus a full-colour copy for the hover lens */
function Plate({ ind, i, sizes }) {
  return (
    <figure className={styles.plate} data-plate aria-hidden="true">
      {Array.from({ length: STRIPS }, (_, s) => (
        <div key={s} className={styles.strip} style={{ "--s": s }} data-strip>
          <div className={styles.stripImg} data-img>
            <div className={styles.par}>
              <Image src={ind.image} alt="" fill sizes={sizes} className={styles.photo} priority={i === 0 && s === 0} />
            </div>
          </div>
        </div>
      ))}
      <span className={styles.tint} />
      <div className={styles.lens}>
        <div className={styles.par}>
          <Image src={ind.image} alt="" fill sizes={sizes} className={styles.photoColor} />
        </div>
      </div>
    </figure>
  );
}

/**
 * Chapter VI — Industries, "Aperture". A pinned cinematic sequence: each industry's name is set
 * huge across the frame and changes letter by letter; its photograph opens through a five-strip
 * shutter; the industry's line icon floats in front of it as a 3D constellation that re-forms into
 * the next one as you scroll. Hovering the frame tilts it and opens a lens onto the full-colour image.
 * Phones and reduced motion: each industry in turn, revealed through a mask.
 */
export default function Industries() {
  const ref = useRef(null);
  const st = useRef(null);
  const activeRef = useRef(0);
  const progressRef = useRef(0);
  const pointer = useRef({ x: 0, y: 0, inside: false });
  const [active, setActive] = useState(0);
  const { ready, scrollTo } = useSiteMotion();
  const desktop = useMediaQuery(DESKTOP_MOTION); // the 3D layer (and its download) only where the stage runs
  const n = INDUSTRIES.length;

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();

    /* ---------- Desktop: the pinned sequence ---------- */
    mm.add(DESKTOP_MOTION, () => {
      const root = ref.current;
      const plates = gsap.utils.toArray("[data-stage] [data-plate]", root);
      const items = gsap.utils.toArray("[data-stage] [data-item]", root);
      const splits = items.map((it) => SplitText.create(it.querySelector("[data-title]"), { type: "words,chars", mask: "chars" }));
      const fx = items.map((it) => it.querySelectorAll("[data-fx]"));

      gsap.set(plates, { autoAlpha: 0 });
      gsap.set(plates[0], { autoAlpha: 1, zIndex: 2 });
      gsap.set(items, { autoAlpha: 0 });
      gsap.set(items[0], { autoAlpha: 1 });

      let cur = 0, z = 2, tl = null;
      const show = (next) => {
        const prev = cur, dir = next > prev ? 1 : -1;
        cur = next;
        activeRef.current = next;
        setActive(next);
        sfx("tick");
        if (tl) tl.progress(1).kill();
        const pIn = plates[next], pOut = plates[prev];
        tl = gsap.timeline({ defaults: { overwrite: "auto" } });

        // Type: the old name tips away letter by letter in the scroll direction, the new one flips in
        tl.to(splits[prev].chars, { yPercent: -115 * dir, rotateX: 70 * dir, duration: 0.42, ease: "expo.in", stagger: { each: 0.012, from: dir > 0 ? "start" : "end" } }, 0)
          .to(fx[prev], { clipPath: "inset(0% 0% 0% 100%)", duration: 0.38, ease: "expo.in", stagger: 0.03 }, 0)
          .set(items[prev], { autoAlpha: 0 }, 0.45)
          .set(items[next], { autoAlpha: 1 }, 0.3)
          .fromTo(splits[next].chars, { yPercent: 115 * dir, rotateX: -70 * dir }, { yPercent: 0, rotateX: 0, duration: 1.05, ease: "expo.out", stagger: { each: 0.022, from: dir > 0 ? "start" : "end" } }, 0.3)
          .fromTo(fx[next], { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.95, ease: "expo.inOut", stagger: 0.07 }, 0.45);

        // Image: the shutter — strips slide in from alternating sides while the photo settles from a push-in
        gsap.set(pIn, { autoAlpha: 1, zIndex: ++z });
        tl.fromTo(pIn.querySelectorAll("[data-strip]"), { yPercent: (k) => (k % 2 ? -100 : 100) * dir }, { yPercent: 0, duration: 1.15, ease: "expo.inOut", stagger: { each: 0.06, from: dir > 0 ? "start" : "end" } }, 0)
          .fromTo(pIn.querySelectorAll("[data-img]"), { scale: 1.35 }, { scale: 1.04, duration: 1.7, ease: "expo.out" }, 0.1)
          .to(pOut.querySelectorAll("[data-img]"), { scale: 0.92, duration: 1.1, ease: "expo.inOut" }, 0)
          .set(pOut, { autoAlpha: 0 })
          .set(pOut.querySelectorAll("[data-strip], [data-img]"), { clearProps: "transform" });
      };

      st.current = ScrollTrigger.create({
        trigger: root.querySelector("[data-pin]"),
        start: "top top",
        end: `+=${n * 75}%`,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const pos = self.progress * n;
          progressRef.current = self.progress;
          root.style.setProperty("--pos", pos.toFixed(3));
          root.style.setProperty("--lp", (pos - Math.min(n - 1, Math.floor(pos))).toFixed(3));
          const i = Math.min(n - 1, Math.floor(pos));
          if (i !== cur) show(i);
        },
      });

      // The name settles in the first time the chapter arrives
      gsap.from(splits[0].chars, { yPercent: 115, rotateX: -70, duration: 1.1, ease: "expo.out", stagger: 0.022, scrollTrigger: { trigger: root.querySelector("[data-pin]"), start: "top 60%", once: true } });

      // Hover: the frame tilts toward the cursor, the lens follows it, the particles part around it
      const visual = root.querySelector("[data-visual]");
      const tilt = root.querySelector("[data-tilt]");
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
      const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });
      gsap.set(tilt, { transformPerspective: 1400 });
      const move = (e) => {
        const r = visual.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        pointer.current = { x: x * 2 - 1, y: -(y * 2 - 1), inside: true };
        visual.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
        visual.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
        ry((x - 0.5) * 10);
        rx(-(y - 0.5) * 8);
      };
      const leave = () => { pointer.current = { ...pointer.current, inside: false }; rx(0); ry(0); };
      visual.addEventListener("pointermove", move);
      visual.addEventListener("pointerleave", leave);

      return () => {
        visual.removeEventListener("pointermove", move);
        visual.removeEventListener("pointerleave", leave);
        if (tl) tl.kill();
        splits.forEach((s) => s.revert());
        st.current = null;
      };
    });

    /* ---------- Phones: each industry opens through a mask as it scrolls in ---------- */
    mm.add(PHONE_MOTION, () => {
      const blocks = gsap.utils.toArray("[data-list] [data-block]", ref.current);
      const splits = [];
      blocks.forEach((b) => {
        const fig = b.querySelector("[data-fig]");
        gsap.fromTo(fig, { clipPath: "inset(18% 12% 18% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: b, start: "top 95%", end: "top 35%", scrub: 0.6 } });
        gsap.fromTo(fig.querySelector("[data-img]"), { scale: 1.3, yPercent: -6 }, { scale: 1, yPercent: 6, ease: "none", scrollTrigger: { trigger: b, start: "top bottom", end: "bottom top", scrub: true } });
        const s = SplitText.create(b.querySelector("[data-title]"), { type: "words,chars", mask: "chars" });
        splits.push(s);
        gsap.from(s.chars, { yPercent: 115, rotateX: -70, duration: 0.95, ease: "expo.out", stagger: 0.025, scrollTrigger: { trigger: b.querySelector("[data-title]"), start: "top 88%", once: true } });
        gsap.fromTo(b.querySelectorAll("[data-fx]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut", stagger: 0.08, scrollTrigger: { trigger: b.querySelector("[data-title]"), start: "top 85%", once: true } });
      });
      return () => splits.forEach((s) => s.revert());
    });

    return () => mm.revert();
  }, { dependencies: [ready, n], scope: ref });

  // The index jumps straight to an industry's part of the pinned scroll
  const go = (i) => {
    const s = st.current;
    if (s) scrollTo(s.start + ((i + 0.5) / n) * (s.end - s.start));
  };

  const cur = INDUSTRIES[active];

  return (
    <section ref={ref} id="industries" className={styles.section} data-chapter="Industries" data-nav="work" aria-labelledby="industries-title">
      <header className={styles.head}>
        <SectionLabel index="06" tone="dark">Industries we serve</SectionLabel>
        <RevealText id="industries-title" className={styles.title}>
          Built for <em>your world.</em>
        </RevealText>
        <p className={styles.count}>(0{n}) sectors</p>
      </header>

      {/* ---------- Desktop: pinned "aperture" ---------- */}
      <div className={styles.pin} data-pin data-stage>
        <p className={styles.ghost} aria-hidden="true">{cur.name.split(" ")[0]}</p>

        <nav className={styles.index} aria-label="Industries">
          <ol>
            {INDUSTRIES.map((ind, i) => (
              <li key={ind.name}>
                <button type="button" className={i === active ? styles.on : undefined} aria-current={i === active ? "true" : undefined} onClick={() => go(i)} onMouseEnter={() => sfx("tick")}>
                  <span>{pad(i + 1)}</span>{ind.name}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className={styles.visual} data-visual>
          <div className={styles.tilt} data-tilt>
            <div className={styles.frame}>
              {INDUSTRIES.map((ind, i) => <Plate key={ind.name} ind={ind} i={i} sizes="(min-width: 901px) 46vw, 100vw" />)}
              <span className={styles.vignette} aria-hidden="true" />
              <span className={styles.ring} aria-hidden="true" />
            </div>
            <div className={styles.field} aria-hidden="true">
              {desktop && <IndustryField active={activeRef} pointer={pointer} progress={progressRef} />}
            </div>
            <p className={styles.hudTop} aria-hidden="true">FIG. {pad(active + 1)} — {cur.name}</p>
            <p className={styles.hudBottom} aria-hidden="true">Hover to look closer</p>
          </div>
        </div>

        <div className={styles.titles}>
          {INDUSTRIES.map((ind, i) => (
            <article key={ind.name} className={styles.item} data-item aria-hidden={i === active ? undefined : "true"}>
              <h3 className={styles.name} data-title>{ind.name}</h3>
              <p className={styles.desc} data-fx>{ind.text}</p>
              <ul className={styles.chips} data-fx>
                {ind.chips.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className={styles.foot} aria-hidden="true">
          <p className={styles.counter}><b key={active}>{pad(active + 1)}</b> / {pad(n)}</p>
          <div className={styles.rail}>
            {INDUSTRIES.map((ind, i) => <span key={ind.name} style={{ "--i": i }}><i /></span>)}
          </div>
        </div>
      </div>

      {/* ---------- Phones and reduced motion: one after another ---------- */}
      <div className={styles.list} data-list>
        {INDUSTRIES.map((ind, i) => (
          <article key={ind.name} className={styles.block} data-block>
            <figure className={styles.blockFig} data-fig aria-hidden="true">
              <div className={styles.blockImg} data-img>
                <Image src={ind.image} alt="" fill sizes="100vw" className={styles.photo} />
              </div>
              <span className={styles.tint} />
              <span className={styles.blockNo}>{pad(i + 1)} / {pad(n)}</span>
            </figure>
            <h3 className={styles.name} data-title>{ind.name}</h3>
            <p className={styles.desc} data-fx>{ind.text}</p>
            <ul className={styles.chips} data-fx>
              {ind.chips.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
