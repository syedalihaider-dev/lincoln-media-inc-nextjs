"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP, ANY_MOTION, DESKTOP_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import Label from "@/components/About/Label";
import styles from "./ExperienceShowcase.module.css";

/* The four layers of a page, drawn in HTML. Bottom to top: structure, interface, content, code. */
function Structure() {
  return (
    <div className={`${styles.plane} ${styles.pStructure}`}>
      <span className={styles.wNav} /><span className={styles.wHero} /><span className={styles.wImg} />
      <span className={styles.wCard} /><span className={styles.wCard} /><span className={styles.wCard} />
      {[1, 2, 3, 4, 5].map((i) => <i key={i} className={styles.col} style={{ left: `${i * (100 / 6)}%` }} />)}
    </div>
  );
}
function Interface() {
  return (
    <div className={`${styles.plane} ${styles.pInterface}`}>
      <span className={styles.swatches}><i /><i /><i /><i /></span>
      <span className={styles.type}>Aa</span>
      <span className={styles.uiBtn}>Get started</span>
      <span className={styles.uiToggle}><i /></span>
      <span className={styles.uiField} />
    </div>
  );
}
function Content({ image, url }) {
  return (
    <div className={`${styles.plane} ${styles.pContent}`}>
      <p className={styles.bar}><i /><i /><i /><span>{url}</span></p>
      <div className={styles.cHero}>
        <div>
          <p className={styles.cEyebrow}>New collection</p>
          <p className={styles.cH}>Your brand, online.</p>
          <p className={styles.cP}>A short line that says what you do and who it is for.</p>
        </div>
        <div className={styles.cImg}><Image src={image} alt="" fill sizes="(max-width: 900px) 40vw, 22vw" className={styles.cover} /></div>
      </div>
      <div className={styles.cCards}><span /><span /><span /></div>
    </div>
  );
}
function Code() {
  return (
    <div className={`${styles.plane} ${styles.pCode}`}>
      <b style={{ left: "4%", top: "12%", width: "92%", height: "9%" }}><em>&lt;nav&gt;</em></b>
      <b style={{ left: "4%", top: "28%", width: "44%", height: "34%" }}><em>&lt;h1&gt;</em></b>
      <b style={{ left: "52%", top: "28%", width: "44%", height: "34%" }}><em>&lt;img loading=lazy&gt;</em></b>
      <b style={{ left: "4%", top: "70%", width: "92%", height: "22%" }}><em>&lt;section&gt;</em></b>
    </div>
  );
}
const PLANES = [Structure, Interface, Content, Code];

/**
 * "We don't just build websites. We build digital experiences." A page is shown whole, then — as the
 * section holds on desktop — it tilts into an exploded stack of its four layers. Each layer lights in
 * turn while its description takes the stage beside it. Phones: the stack sits exploded, the
 * layers listed beneath, nothing pinned.
 */
export default function ExperienceShowcase({ data }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const root = ref.current;
    const planes = gsap.utils.toArray("[data-plane]", root);
    const items = gsap.utils.toArray("[data-layer]", root);
    const setActive = (k) => {
      planes.forEach((p, i) => p.classList.toggle(styles.on, i === k));
      items.forEach((p, i) => p.classList.toggle(styles.on, i === k));
    };
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(root.querySelectorAll("[data-head]"), { type: "words", mask: "words" });
      gsap.from(split.words, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.04, scrollTrigger: { trigger: root, start: "top 70%", once: true } });
      return () => split.revert();
    });
    mm.add(DESKTOP_MOTION, () => {
      const stack = root.querySelector("[data-stack]");
      let last = -1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root, start: "top top", end: "+=180%", pin: true, scrub: 0.8, anticipatePin: 1,
          onUpdate: (st) => { const k = st.progress < 0.28 ? -1 : Math.min(3, Math.floor(((st.progress - 0.28) / 0.72) * 4)); if (k !== last) { last = k; setActive(k); } },
        },
      });
      tl.fromTo(stack, { rotationX: 0, rotationZ: 0, scale: 1.05 }, { rotationX: 56, rotationZ: -32, scale: 0.86, duration: 0.28, ease: "power2.inOut" }, 0);
      planes.forEach((p, i) => tl.fromTo(p, { z: 0 }, { z: (i - 1.5) * 110, duration: 0.28, ease: "power2.inOut" }, 0));
      tl.to(stack, { rotationZ: -24, duration: 0.72, ease: "none" }, 0.28);
      // the cursor turns the stack a little further
      const ry = gsap.quickTo(root.querySelector("[data-tilt]"), "rotationY", { duration: 1.2, ease: "power3.out" });
      const move = (e) => ry((e.clientX / innerWidth - 0.5) * 10);
      addEventListener("pointermove", move, { passive: true });
      return () => { removeEventListener("pointermove", move); setActive(-1); };
    });
    // Phones / reduced motion: layers light as their rows come into view
    mm.add("(max-width: 900px), (prefers-reduced-motion: reduce)", () => {
      const sts = items.map((el, i) => gsap.timeline({ scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 70%", onToggle: (st) => st.isActive && setActive(i) } }));
      return () => sts.forEach((t) => t.kill());
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} id="experience" className={styles.exp} aria-labelledby="experience-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <Label>{data.kicker}</Label>
          <h2 id="experience-title" className={styles.title}>
            <span data-head>{data.title[0]}</span>
            <span className={styles.em} data-head>{data.title[1]}</span>
          </h2>
          <p className={styles.text}>{data.text}</p>
          <ol className={styles.layers}>
            {data.layers.map((l) => (
              <li key={l.name} className={styles.layer} data-layer>
                <h3>{l.name}</h3>
                <p>{l.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.view} aria-hidden="true">
          <div className={styles.tilt} data-tilt>
            <div className={styles.stack} data-stack>
              {PLANES.map((P, i) => (
                <div key={i} className={styles.slot} data-plane>
                  <P image={data.image} url={data.url} />
                  <span className={styles.tag}>{data.layers[i]?.name}</span>
                </div>
              ))}
            </div>
          </div>
          <span className={styles.glow} />
        </div>
      </div>
    </section>
  );
}
