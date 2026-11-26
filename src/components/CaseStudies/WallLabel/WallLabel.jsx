"use client";
import { useEffect, useRef, useState } from "react";
import { useSiteMotion } from "@/lib/motion";
import { ROOMS } from "@/data/case-studies";
import s from "./WallLabel.module.css";

// Where a room's content is fully on screen: its anchor's top plus data-room-offset viewport heights
// of scrolling through its pinned scene
// (the offset only applies where the rooms are pinned; elsewhere a room starts at its own article)
const PINNED = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";
const spot = (el) => {
  if (!matchMedia(PINNED).matches) return (el.querySelector("article") || el).getBoundingClientRect().top + scrollY;
  return el.getBoundingClientRect().top + scrollY + (parseFloat(el.dataset.roomOffset) || 0) * innerHeight;
};

/**
 * Moving between projects: a small museum wall label fixed at the bottom-left that names the room
 * you're standing in, steps to the previous or next room (the scroll glides there), and opens the
 * full list of rooms. It appears once the first room is open and steps aside at the collection.
 */
export default function WallLabel() {
  const { scrollTo } = useSiteMotion();
  const [at, setAt] = useState(-1);
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const anchors = [...document.querySelectorAll("[data-room-anchor]")];
      const stop = document.querySelector("[data-room-stop]");
      let i = -1;
      // the last room whose content is on screen (the first one opens out of the hero, so the label waits for it)
      anchors.forEach((el, k) => { if (spot(el) - scrollY <= innerHeight * 0.55) i = k; });
      if (stop && stop.getBoundingClientRect().top < innerHeight * 0.6) i = -1;
      setAt(i);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(read); };
    read();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onDown = (e) => !listRef.current?.parentElement.contains(e.target) && setOpen(false);
    addEventListener("keydown", onKey);
    addEventListener("pointerdown", onDown);
    return () => { removeEventListener("keydown", onKey); removeEventListener("pointerdown", onDown); };
  }, [open]);

  const go = (k) => {
    const el = document.querySelector(`[data-room-anchor="${ROOMS[k]?.slug}"]`);
    setOpen(false);
    if (el) scrollTo(Math.max(0, spot(el) - innerHeight * 0.02));
  };

  const room = ROOMS[at];
  const shown = at >= 0;
  return (
    <nav className={`${s.label} ${shown ? s.shown : ""}`} aria-label="Case studies on this page" inert={!shown ? true : undefined}>
      <div className={s.card}>
        <p className={s.now}>
          <span className={s.eyebrow}>Now showing</span>
          <span className={s.name} key={room?.slug} aria-live="polite">{room?.name || ""}</span>

        </p>
        <div className={s.controls}>
          <button type="button" className={s.step} onClick={() => go(at - 1)} disabled={at <= 0} aria-label={at > 0 ? `Previous: ${ROOMS[at - 1].name}` : "Previous"}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" className={s.step} onClick={() => go(at + 1)} disabled={at >= ROOMS.length - 1} aria-label={at < ROOMS.length - 1 && at >= 0 ? `Next: ${ROOMS[at + 1].name}` : "Next"}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
          <button type="button" className={s.all} aria-expanded={open} aria-controls="cs-rooms" onClick={() => setOpen((v) => !v)}>All rooms</button>
        </div>
      </div>
      <ol id="cs-rooms" ref={listRef} className={`${s.list} ${open ? s.open : ""}`} hidden={!open}>
        {ROOMS.map((r, k) => (
          <li key={r.slug}>
            <button type="button" onClick={() => go(k)} aria-current={k === at ? "true" : undefined}>
              <span>{r.name}</span><em>{r.sector}</em>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
