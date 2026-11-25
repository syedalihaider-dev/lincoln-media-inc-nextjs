"use client";
import { useEffect, useRef } from "react";

const pad = (n) => String(Math.floor(n)).padStart(2, "0");
// SMPTE-style HH:MM:SS:FF at 25 frames a second (the clips are encoded at 25fps)
export const toTimecode = (t) => `${pad(t / 3600)}:${pad((t / 60) % 60)}:${pad(t % 60)}:${pad((t % 1) * 25)}`;

/** The real position of a playing clip, written straight into the DOM each frame (no re-renders). */
export default function Timecode({ video, offset = 0, className }) {
  const ref = useRef(null);
  useEffect(() => {
    let raf;
    const tick = () => {
      const v = typeof video === "function" ? video() : video?.current;
      if (ref.current && v) ref.current.textContent = toTimecode(offset + (v.currentTime || 0));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [video, offset]);
  return <span ref={ref} className={className} aria-hidden="true">{toTimecode(offset)}</span>;
}
