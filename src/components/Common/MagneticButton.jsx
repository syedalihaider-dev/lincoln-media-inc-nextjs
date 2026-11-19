"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./MagneticButton.module.css";
import { sfx } from "@/lib/motion";

/**
 * Pill link/button that leans toward the pointer and fills from below on hover.
 * Uses a plain <a> (not next/link): the other pages are pre-rendered HTML with their own scripts,
 * so they must load as full pages.
 */
export default function MagneticButton({ href, children, variant = "accent", size = "md", icon = "↗", external = false, className = "", onClick, type = "button", ...rest }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.4);
  };
  const leave = () => { x.set(0); y.set(0); };
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;
  const inner = (
    <>
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
      {icon && <i className={styles.icon} aria-hidden="true">{icon}</i>}
    </>
  );
  const common = { ref, className: cls, style: { x, y }, onPointerMove: move, onPointerLeave: leave, onPointerEnter: () => sfx("tick"), onClick, ...rest };

  if (href) {
    return (
      <motion.a href={href} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...common}>
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} {...common}>
      {inner}
    </motion.button>
  );
}
