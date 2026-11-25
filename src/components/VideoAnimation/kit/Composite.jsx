"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Composite.module.css";

const load = (src) => new Promise((res, rej) => { const i = new Image(); i.decoding = "async"; i.onload = () => res(i); i.onerror = rej; i.src = src; });

/**
 * A real composite, made in the browser: the green-screen plate is keyed (greenness → transparency,
 * with spill suppression on the edges) over a new background in a canvas. The wipe compares the
 * composite (left) with the raw plate (right); drag it, or use the arrow keys on the slider.
 */
export default function Composite({ plate, bg, label = "Compare the composite (left) with the green-screen plate (right)" }) {
  const box = useRef(null);
  const canvas = useRef(null);
  const [pos, setPos] = useState(66);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const io = new IntersectionObserver(async ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const [p, b] = await Promise.all([load(plate.src), load(bg.src)]).catch(() => []);
      if (!p || cancelled) return;
      const c = canvas.current, w = (c.width = p.naturalWidth), h = (c.height = p.naturalHeight);
      const ctx = c.getContext("2d", { willReadFrequently: true });
      // background, cover-fitted and slightly defocused (the plate was shot sharp in front of it)
      const s = Math.max(w / b.naturalWidth, h / b.naturalHeight);
      ctx.filter = "blur(3px) brightness(0.9)";
      ctx.drawImage(b, (w - b.naturalWidth * s) / 2, (h - b.naturalHeight * s) / 2, b.naturalWidth * s, b.naturalHeight * s);
      ctx.filter = "none";
      const back = ctx.getImageData(0, 0, w, h).data;
      ctx.drawImage(p, 0, 0, w, h);
      const img = ctx.getImageData(0, 0, w, h), d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i], g = d[i + 1], bl = d[i + 2];
        const key = g - Math.max(r, bl); // how much greener than the other channels
        let a = 1 - Math.min(1, Math.max(0, (key - 18) / 50)); // 1 = keep the plate, 0 = background
        const gs = Math.min(g, Math.max(r, bl) * 1.05); // spill: pull green back to its neighbours
        d[i] = r * a + back[i] * (1 - a);
        d[i + 1] = gs * a + back[i + 1] * (1 - a);
        d[i + 2] = bl * a + back[i + 2] * (1 - a);
      }
      ctx.putImageData(img, 0, 0);
      setDone(true);
    }, { rootMargin: "200px 0px" });
    io.observe(box.current);
    return () => { cancelled = true; io.disconnect(); };
  }, [plate.src, bg.src]);

  const drag = (e) => {
    if (e.type === "pointermove" && !(e.buttons & 1) && e.pointerType !== "mouse") return;
    const r = box.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <div ref={box} className={`${styles.comp} ${done ? styles.done : ""}`} style={{ "--pos": `${pos}%` }} onPointerMove={drag} onPointerDown={drag}>
      <img src={plate.src} alt="A presenter filmed against a green screen" className={styles.plate} loading="lazy" decoding="async" />
      <canvas ref={canvas} className={styles.canvas} role="img" aria-label="The same shot keyed onto a television studio background" />
      <span className={styles.tag} data-side="a">Plate</span>
      <span className={styles.tag} data-side="b">Composite</span>
      <span className={styles.handle} aria-hidden="true"><i /></span>
      <input className={styles.range} type="range" min="0" max="100" value={Math.round(pos)} onChange={(e) => setPos(+e.target.value)} aria-label={label} />
    </div>
  );
}
