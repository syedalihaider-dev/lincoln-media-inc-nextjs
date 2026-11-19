"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion, sfx } from "@/lib/motion";
import RevealText from "@/components/Common/RevealText";
import Label from "@/components/About/Label";
import styles from "./TechSphere.module.css";

// The studio's stack: this site's own list (src/data/home.js STACK) plus the platforms lincolnmediainc.com names
const GROUPS = [
  { name: "Platforms & CMS", items: ["WordPress", "Drupal", "Joomla", "Sitecore", "SharePoint"] },
  { name: "Engineering", items: ["PHP", "Laravel", "Python", "ASP.NET", "AngularJS", "React", "Vue JS", "Node.js", "Ruby on Rails", "Flask", "CakePHP", "CodeIgniter", "Bootstrap"] },
  { name: "Commerce", items: ["Shopify Plus", "Shopify", "Magento", "WooCommerce", "BigCommerce", "Mirakl"] },
  { name: "Mobile", items: ["iOS", "Android", "React Native", "Flutter", "Hybrid"] },
  { name: "Cloud & AI", items: ["AWS", "Azure", "Google Cloud", "Dynamics 365", "Salesforce", "LLM Integration", "AI Agents", "RPA"] },
];
const ALL = GROUPS.flatMap((g, gi) => g.items.map((name) => ({ name, gi })));

/**
 * Technologies as a living sphere: every name the studio builds with sits on a globe that turns on
 * its own, follows a drag or the cursor, and spins further as you scroll. Names are sized and faded by
 * depth like points in space. Choosing a group lights its members and lists them alongside.
 */
export default function TechSphere() {
  const ref = useRef(null);
  const sphere = useRef(null);
  const nodes = useRef([]);
  const rot = useRef({ x: -0.25, y: 0, vx: 0, vy: 0.0035, scroll: 0 });
  const [group, setGroup] = useState(-1);
  const { ready } = useSiteMotion();

  // Points spread evenly on a sphere (Fibonacci lattice)
  const points = useMemo(() => ALL.map((_, i) => {
    const y = 1 - (i / (ALL.length - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
    return [Math.cos(th) * r, y, Math.sin(th) * r];
  }), []);

  useEffect(() => {
    let raf = 0, visible = false;
    const el = sphere.current;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) tick(); });
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function tick() {
      cancelAnimationFrame(raf);
      if (!visible) return;
      const R = el.clientWidth * (el.clientWidth < 500 ? 0.33 : 0.42), s = rot.current; // narrower on phones so names stay inside
      if (!reduced) { s.y += s.vy; s.x += s.vx; s.vx *= 0.94; s.vy += (0.0035 - s.vy) * 0.02; }
      const cy = Math.cos(s.y + s.scroll), sy = Math.sin(s.y + s.scroll), cx = Math.cos(s.x), sx = Math.sin(s.x);
      points.forEach(([x, y, z], i) => {
        const x1 = x * cy - z * sy, z1 = x * sy + z * cy;
        const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
        const n = nodes.current[i];
        if (!n) return;
        const depth = (z2 + 1) / 2; // 0 back, 1 front
        n.style.transform = `translate3d(${x1 * R}px, ${y2 * R}px, 0) translate(-50%, -50%) scale(${0.6 + depth * 0.6})`;
        n.style.opacity = String(0.18 + depth * 0.82);
        n.style.zIndex = String(Math.round(depth * 100));
      });
      raf = requestAnimationFrame(tick);
    }
    io.observe(el);
    // Drag to spin
    let drag = null;
    const down = (e) => { drag = { x: e.clientX, y: e.clientY }; el.setPointerCapture?.(e.pointerId); };
    const move = (e) => {
      const s = rot.current;
      if (drag) { s.vy = (e.clientX - drag.x) * 0.0009; s.vx = (e.clientY - drag.y) * 0.0006; drag = { x: e.clientX, y: e.clientY }; }
      else if (e.pointerType === "mouse") { const b = el.getBoundingClientRect(); s.x += (-(e.clientY - b.top) / b.height + 0.5) * 0.004; }
    };
    const up = () => { drag = null; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    addEventListener("pointerup", up);
    return () => { cancelAnimationFrame(raf); io.disconnect(); el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move); removeEventListener("pointerup", up); };
  }, [points]);

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      ScrollTrigger.create({ trigger: ref.current, start: "top bottom", end: "bottom top", onUpdate: (s) => { rot.current.scroll = s.progress * Math.PI * 1.4; } });
      gsap.fromTo(sphere.current, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: sphere.current, start: "top 80%", once: true } });
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  const choose = (i) => { setGroup(group === i ? -1 : i); sfx("tick"); };

  return (
    <section ref={ref} id="technology" className={styles.tech} aria-labelledby="tech-title">
      <div className={styles.copy}>
        <Label>Technology</Label>
        <RevealText id="tech-title" className={styles.title}>Technologies <em>we build with.</em></RevealText>
        <div className={styles.groups} role="group" aria-label="Technology groups">
          {GROUPS.map((g, i) => (
            <button key={g.name} type="button" aria-pressed={group === i} className={group === i ? styles.groupOn : undefined} onClick={() => choose(i)}>
              <span>{g.name}</span><i aria-hidden="true" />
            </button>
          ))}
        </div>
        <motion.ul key={group} className={`${styles.members} ${group < 0 ? styles.membersAll : ""}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}>
            {(group > -1 ? GROUPS[group].items : ALL.map((a) => a.name)).map((n) => <li key={n}>{n}</li>)}
        </motion.ul>
      </div>

      <div className={styles.sphereWrap}>
        <div ref={sphere} className={styles.sphere} aria-hidden="true">
          <span className={styles.core} />
          <span className={styles.ring} />
          <span className={`${styles.ring} ${styles.ring2}`} />
          {ALL.map((t, i) => (
            <span key={t.name} ref={(el) => (nodes.current[i] = el)} className={`${styles.node} ${group === t.gi ? styles.nodeOn : ""} ${group > -1 && group !== t.gi ? styles.nodeOff : ""}`}>{t.name}</span>
          ))}
        </div>
        <p className={styles.hint}>Drag to turn</p>
      </div>
    </section>
  );
}
