"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";
import styles from "./ParallaxImage.module.css";

/**
 * An image in a frame: it drifts inside the frame as the page scrolls (parallax) and,
 * optionally, the frame opens from a smaller inset as it enters (masked reveal).
 */
export default function ParallaxImage({ src, alt, sizes, className = "", amount = 10, reveal = true, priority = false, quality = 75, style }) {
  const frame = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const img = frame.current.querySelector("img");
      // The image is (100 + 2·amount)% tall, so this drift uses exactly the spare `amount` on each side
      const yp = (amount * 100) / (100 + 2 * amount);
      gsap.fromTo(img, { yPercent: -yp }, { yPercent: yp, ease: "none", scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true } });
      if (reveal) {
        gsap.fromTo(frame.current, { clipPath: "inset(16% 10% 16% 10%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: frame.current, start: "top 95%", end: "top 40%", scrub: 0.6 } });
      }
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: frame });

  return (
    <figure ref={frame} className={`${styles.frame} ${className}`} style={style}>
      <Image src={src} alt={alt} fill sizes={sizes} quality={quality} priority={priority} placeholder={typeof src === "object" ? "blur" : "empty"} className={styles.img} style={{ "--amt": `${amount}%` }} />
    </figure>
  );
}
