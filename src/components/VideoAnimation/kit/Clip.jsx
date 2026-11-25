"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./Clip.module.css";

const STILL = () => matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData;

/**
 * A muted, looping clip that fills its box. Nothing downloads until it nears the viewport; it plays
 * only while visible. Changing `clip` swaps the source in place (monitors, reels). Phones get the
 * smaller encode; reduced-motion and data-saver visitors get the poster. `playing={false}` holds it.
 * The <video> element is exposed through the ref (timecodes, scrubbing).
 */
const Clip = forwardRef(function Clip({ clip, className = "", fit = "cover", playing = true, loop = true, onEnded, label }, outer) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  useImperativeHandle(outer, () => ref.current, []);

  useEffect(() => {
    const el = ref.current;
    el.muted = true; el.defaultMuted = true;
    if (STILL()) { setStill(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setNear(true); setVisible(e.isIntersecting); }, { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const src = near && !still ? (clip.mobile && matchMedia("(max-width: 900px)").matches ? clip.mobile : clip.src) : undefined;

  useEffect(() => {
    const el = ref.current;
    if (!src) return;
    if (visible && playing) el.play?.().catch(() => {});
    else el.pause?.();
  }, [src, visible, playing]);

  return (
    <video
      ref={ref}
      className={`${styles.clip} ${styles[fit]} ${className}`}
      src={src}
      poster={clip.poster}
      muted
      loop={loop}
      playsInline
      preload="none"
      disablePictureInPicture
      tabIndex={-1}
      onEnded={onEnded}
      aria-label={label}
      aria-hidden={label ? undefined : "true"}
    />
  );
});

export default Clip;
