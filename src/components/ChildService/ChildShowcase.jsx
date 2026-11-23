"use client";
import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import { Browser, Phone, Site, ScreenBody, screenUrl } from "./ui/Screens";
import styles from "./ChildShowcase.module.css";

function Screen({ kind, photos, url, ui }) {
  if (kind === "phone") return <Phone><Site photos={photos} compact /></Phone>;
  return <Browser url={screenUrl(kind, ui, url)}><ScreenBody kind={kind} photos={photos} ui={ui} /></Browser>;
}

/**
 * One project seen from every side, on a carousel in 3D. On desktop the section holds at the top of
 * the screen and the carousel turns ONLY with the scroll inside that hold: the first screen faces you
 * when the section arrives, each further stretch of scroll brings the next one round (snapping to it),
 * and the last faces you as the hold ends. Nothing before the section can advance it. The cursor tips
 * the carousel. Phones: the screens sit in a row you can swipe through.
 */
export default function ChildShowcase({ data, photos, ui }) {
  const ref = useRef(null);
  const [front, setFront] = useState(0);
  const { ready } = useSiteMotion();
  const n = data.screens.length;
  const step = 360 / Math.max(n, 6);

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const ring = root.querySelector("[data-ring]");
    let last = 0;
    const show = (a) => {
      ring.style.setProperty("--a", `${-a}deg`);
      const k = Math.min(n - 1, Math.max(0, Math.round(a / step)));
      if (k !== last) { last = k; setFront(k); }
    };
    show(0); // the first screen faces the viewer before anything scrolls
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelector("[data-title]"), { type: "words", mask: "words" });
      gsap.from(split.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: root, start: "top 75%", once: true } });
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      // progress 0 → 1 across the hold = first screen → last screen
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: root, start: "top top", end: () => `+=${(n - 1) * innerHeight * 0.65}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          snap: { snapTo: 1 / (n - 1), duration: { min: 0.25, max: 0.7 }, delay: 0.08, ease: "power2.inOut" },
          onUpdate: (self) => show(self.progress * (n - 1) * step),
          onRefresh: (self) => show(self.progress * (n - 1) * step),
        },
      });
      const tilt = root.querySelector("[data-tilt]");
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 1.2, ease: "power3.out" });
      const move = (e) => rx(-5 + (e.clientY / innerHeight - 0.5) * -8);
      addEventListener("pointermove", move, { passive: true });
      return () => { st.kill(); removeEventListener("pointermove", move); show(0); };
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="showcase" className={styles.show} aria-labelledby="showcase-title">
      <header className={styles.head}>
        <Label>{data.kicker}</Label>
        <h2 id="showcase-title" className={styles.title} data-title>{data.title}</h2>
        <p className={styles.text}>{data.text}</p>
      </header>

      <div className={styles.stage} aria-hidden="true">
        <div className={styles.tilt} data-tilt>
          <div className={styles.ring} data-ring style={{ "--step": `${step}deg` }}>
            {data.screens.map((s, i) => (
              <figure key={s.label} className={`${styles.item} ${s.kind === "phone" ? styles.isPhone : ""} ${i === front ? styles.front : ""}`} style={{ "--i": i }}>
                <Screen kind={s.kind} photos={photos} url={data.url} ui={ui} />
              </figure>
            ))}
          </div>
        </div>
        <span className={styles.floor} />
      </div>

      <ol className={styles.labels}>
        {data.screens.map((s, i) => <li key={s.label} className={i === front ? styles.on : ""} aria-current={i === front || undefined}><i aria-hidden="true" />{s.label}</li>)}
      </ol>
    </section>
  );
}
