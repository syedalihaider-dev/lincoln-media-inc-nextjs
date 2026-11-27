"use client";
import { useRef } from "react";
// `m` + the site-wide <LazyMotion features={domAnimation}> (Common/MotionFeatures) instead of `motion`:
// the same animations without shipping framer-motion's full feature bundle on every page
import { m, useMotionValue, useSpring } from "framer-motion";
import { sfx } from "@/lib/motion";
import styles from "./Button.module.css";

const ICONS = {
  arrow: <path d="M6 18 18 6M9 6h9v9" />,
  right: <path d="M4 12h15M13 6l6 6-6 6" />,
  down: <path d="M12 4v15M6 13l6 6 6-6" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  mail: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
};

// The label, letter by letter, so it can roll over in a wave
const Letters = ({ text }) => [...(Array.isArray(text) ? text.join("") : String(text))].map((c, i) => (
  <span key={i} className={styles.ch} style={{ "--i": i }}>{c === " " ? " " : c}</span>
));

/**
 * The studio's button: a label and a disc. On hover the cyan fill spreads out of the disc across the
 * whole button, the label's letters roll over in a wave, the arrow leaves the disc and a new one
 * arrives, and the disc leans further toward the cursor than the label does.
 * variant: "solid" · "outline" (a slowly turning lit border) · "text" (a quiet link with a disc)
 * size: "sm" · "md" · "lg". Children should be plain text.
 */
export default function Button({ href, children, variant = "solid", icon = "arrow", size = "md", external = false, className = "", onClick, type = "button", ...rest }) {
  const ref = useRef(null);
  const spring = { stiffness: 240, damping: 17, mass: 0.4 };
  const x = useSpring(useMotionValue(0), spring), y = useSpring(useMotionValue(0), spring);
  const dx = useSpring(useMotionValue(0), spring), dy = useSpring(useMotionValue(0), spring);

  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - r.left - r.width / 2, my = e.clientY - r.top - r.height / 2;
    x.set(mx * 0.16); y.set(my * 0.28);
    dx.set(mx * 0.12); dy.set(my * 0.2);
  };
  const leave = () => { x.set(0); y.set(0); dx.set(0); dy.set(0); };

  const inner = (
    <>
      <span className={styles.label}>
        <span className={styles.rollA}><Letters text={children} /></span>
        <span className={styles.rollB} aria-hidden="true"><Letters text={children} /></span>
      </span>
      {icon && ICONS[icon] && (
        <m.span className={styles.disc} style={{ x: dx, y: dy }} aria-hidden="true">
          <svg viewBox="0 0 24 24" className={styles.iconA}>{ICONS[icon]}</svg>
          <svg viewBox="0 0 24 24" className={styles.iconB}>{ICONS[icon]}</svg>
        </m.span>
      )}
      <span className={styles.flood} aria-hidden="true" />
      {variant === "outline" && <span className={styles.ring} aria-hidden="true"><i /></span>}
    </>
  );
  const props = {
    ref,
    className: `${styles.btn} ${styles[variant]} ${styles[size]} ${icon ? "" : styles.noIcon} ${className}`,
    style: { x, y },
    onPointerMove: move,
    onPointerLeave: leave,
    onPointerEnter: () => sfx("tick"),
    onClick,
    ...rest,
  };
  return href ? (
    <m.a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...props}>{inner}</m.a>
  ) : (
    <m.button type={type} {...props}>{inner}</m.button>
  );
}
