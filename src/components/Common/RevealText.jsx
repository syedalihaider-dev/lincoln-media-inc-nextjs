"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, ANY_MOTION } from "@/lib/gsap";
import { useSiteMotion } from "@/lib/motion";

/**
 * Headline that rises line by line out of a mask when it scrolls into view.
 * `scrub` ties the rise to the scroll position instead of playing once.
 */
export default function RevealText({ as: Tag = "h2", children, className, start = "top 85%", delay = 0, stagger = 0.09, scrub = false, ...rest }) {
  const ref = useRef(null);
  const { ready } = useSiteMotion();

  useGSAP(() => {
    if (!ready || !ref.current) return;
    const mm = gsap.matchMedia();
    mm.add(ANY_MOTION, () => {
      const split = SplitText.create(ref.current, {
        type: "lines",
        mask: "lines",
        linesClass: "lm-line",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            rotate: 2.5,
            transformOrigin: "0% 100%",
            duration: 1.25,
            delay,
            stagger,
            ease: "expo.out",
            scrollTrigger: scrub
              ? { trigger: ref.current, start, end: "bottom 55%", scrub: 0.8 }
              : { trigger: ref.current, start, once: true },
          }),
      });
      return () => split.revert();
    });
    return () => mm.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
