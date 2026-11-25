"use client";
import { useEffect, useId, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./Board.module.css";

// The drawing, in the order a hand would make it (an 800 × 450 board). accent: drawn in the second colour.
const PATHS = [
  { id: "under", d: "M60 96 C 140 90, 220 102, 312 93", accent: true },
  { id: "bulb", d: "M150 160 C 110 160, 100 205, 122 228 C 132 240, 134 250, 134 262 L 166 262 C 166 250, 168 240, 178 228 C 200 205, 190 160, 150 160 Z" },
  { id: "base", d: "M136 276 L164 275 M140 288 L160 288" },
  { id: "rays", d: "M150 138 L150 122 M110 152 L99 141 M190 152 L201 141" },
  { id: "label0" },
  { id: "arrow1", d: "M222 222 C 250 214, 272 230, 302 222 M290 211 L304 222 L289 234" },
  { id: "plan", d: "M332 168 L 470 166 L 472 288 L 334 290 Z" },
  { id: "lines", d: "M352 198 L450 196 M352 226 L440 228 M352 254 L420 253" },
  { id: "label1" },
  { id: "arrow2", d: "M500 222 C 530 230, 556 214, 586 222 M574 211 L588 222 L573 234" },
  { id: "circle", d: "M680 166 C 640 166, 615 198, 618 230 C 622 266, 652 290, 684 288 C 720 286, 746 260, 744 226 C 742 192, 716 166, 680 166" },
  { id: "check", d: "M655 230 L676 252 L712 204", accent: true },
  { id: "label2" },
];
const LABELS = [{ x: 150 }, { x: 402 }, { x: 681 }];

/**
 * A whiteboard that draws itself, live: every stroke revealed in the order a hand would draw it,
 * the words written left to right, and the marker following the line as it goes. Runs while on
 * screen; reduced motion shows the finished board.
 */
export default function Board({ data, compact = false }) {
  const ref = useRef(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const root = ref.current;
    const pen = root.querySelector("[data-pen]");
    const place = (x, y) => gsap.set(pen, { left: `${(x / 800) * 100}%`, top: `${(y / 450) * 100}%` });
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
      const strokes = root.querySelectorAll("[data-stroke]");
      // round caps would leave a dot where an undrawn stroke starts, so strokes stay hidden until drawn
      strokes.forEach((p) => { const len = p.getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 }); });
      const clips = root.querySelectorAll("[data-clip]");
      tl.set(clips, { attr: { width: 0 } }).set(pen, { autoAlpha: 1 });
      // the title, then each piece in order
      const write = (rect) => {
        const x = +rect.getAttribute("x"), y = +rect.getAttribute("data-y"), w = +rect.getAttribute("data-w");
        tl.to(rect, { attr: { width: w }, duration: w / 260, ease: "none", onUpdate() { place(x + w * this.progress(), y); } }, "+=0.1");
      };
      write(clips[0]);
      let li = 1;
      PATHS.forEach((s) => {
        if (s.id.startsWith("label")) { write(clips[li++]); return; }
        const p = root.querySelector(`[data-stroke="${s.id}"]`);
        const len = p.getTotalLength();
        tl.set(p, { opacity: 1 }, "+=0.12").to(p, { strokeDashoffset: 0, duration: Math.max(0.25, len / 520), ease: "power1.inOut", onUpdate() { const pt = p.getPointAtLength(len * this.progress()); place(pt.x, pt.y); } });
      });
      tl.to(pen, { left: "96%", top: "92%", duration: 0.6, ease: "power2.inOut" }).addLabel("hold").to({}, { duration: 1.6 })
        .to(root.querySelector("[data-ink]"), { autoAlpha: 0, duration: 0.5 })
        .set(root.querySelector("[data-ink]"), { autoAlpha: 1 })
        .set(strokes, { strokeDashoffset: (i, el) => el.getTotalLength(), opacity: 0 })
        .set(clips, { attr: { width: 0 } });
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) { tl.pause("hold"); return; }
      tl.pause();
      const io = new IntersectionObserver(([e]) => (e.isIntersecting ? tl.play() : tl.pause()), { threshold: 0.25 });
      io.observe(root);
      return () => io.disconnect();
    }, root);
    return () => ctx.revert();
  }, []);

  const labels = data.labels;
  return (
    <div ref={ref} className={`${styles.board} ${compact ? styles.compact : ""}`} role="img" aria-label={`A whiteboard drawing: ${data.title} — ${labels.join(", then ")}`}>
      <svg viewBox="0 0 800 450" className={styles.svg} aria-hidden="true">
        <defs>
          <clipPath id={`${uid}-c0`}><rect data-clip x="58" y="40" height="70" width="0" data-w="270" data-y="86" /></clipPath>
          {LABELS.map((l, i) => <clipPath key={i} id={`${uid}-c${i + 1}`}><rect data-clip x={l.x - 90} y="300" height="50" width="0" data-w="180" data-y="336" /></clipPath>)}
        </defs>
        <g data-ink>
          <text x="60" y="84" className={styles.title} clipPath={`url(#${uid}-c0)`}>{data.title}</text>
          {PATHS.filter((s) => s.d).map((s) => <path key={s.id} d={s.d} data-stroke={s.id} className={s.accent ? styles.accent : styles.stroke} />)}
          {LABELS.map((l, i) => <text key={i} x={l.x} y="332" textAnchor="middle" className={styles.label} clipPath={`url(#${uid}-c${i + 1})`}>{labels[i]}</text>)}
        </g>
      </svg>
      <span className={styles.pen} data-pen aria-hidden="true"><i /></span>
    </div>
  );
}
