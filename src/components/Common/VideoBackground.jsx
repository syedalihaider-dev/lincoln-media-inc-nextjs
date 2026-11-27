"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./VideoBackground.module.css";

/**
 * Muted, looping, inline background video.
 * - Nothing downloads until the section is near the viewport; it pauses again off-screen.
 * - Phones get a smaller encode; reduced-motion and data-saver visitors only get the poster.
 * - lazyPoster: for sections that are never on screen at load (e.g. the homepage chapters behind the
 *   guided intro) the poster image, too, waits until the section is within ~1.5 screens of the viewport
 *   (browsers otherwise fetch a poster at once, even inside a hidden element).
 */
export default function VideoBackground({ src, mobileSrc, poster, className = "", tint = true, lazyPoster = false }) {
  const ref = useRef(null);
  const [source, setSource] = useState(null);
  const [posterOn, setPosterOn] = useState(!lazyPoster);

  useEffect(() => {
    if (posterOn) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPosterOn(true); io.disconnect(); } }, { rootMargin: "150% 0px" });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [posterOn]);

  useEffect(() => {
    const el = ref.current;
    // React doesn't always emit the `muted` attribute, and browsers only autoplay muted video
    el.muted = true; el.defaultMuted = true;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData;
    if (still) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSource((cur) => cur || (matchMedia("(max-width: 900px)").matches && mobileSrc ? mobileSrc : src));
          el.play?.().catch(() => {});
        } else el.pause?.();
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [src, mobileSrc]);

  useEffect(() => {
    if (source) ref.current?.play?.().catch(() => {});
  }, [source]);

  return (
    <div className={`${styles.wrap} ${tint ? styles.tint : ""} ${className}`} aria-hidden="true">
      <video ref={ref} className={styles.video} poster={posterOn ? poster : undefined} src={source || undefined} muted loop playsInline autoPlay preload="none" disablePictureInPicture tabIndex={-1} />
    </div>
  );
}
