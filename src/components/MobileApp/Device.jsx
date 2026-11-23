import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import styles from "./Device.module.css";

const SLABS = 10; // stacked copies of the body give the phone real, rounded thickness in 3D

/**
 * A phone with real depth, built in CSS 3D (no WebGL): a lit glass front, a body made of stacked
 * slabs, and a back with its camera module, so it can be turned in perspective and read as a solid
 * object. The screen is a real 390px-wide interface scaled into the glass.
 *
 * children   — one interface, or several <Screen> layers stacked for transitions
 * platform   — "ios" (dynamic island) · "android" (punch-hole camera)
 * depth      — thickness in px at the rendered size
 * The parent scene supplies `perspective`; GSAP turns the device with rotationX/Y directly.
 */
export default function Device({ children, platform = "ios", depth = 12, className = "", finish = "graphite", style, ...rest }) {
  return (
    <div className={`${styles.device} ${styles[finish]} ${className}`} style={{ "--d": `${depth}px`, ...style }} aria-hidden="true" {...rest}>
      {Array.from({ length: SLABS }, (_, i) => (
        <i key={i} className={styles.slab} style={{ transform: `translateZ(calc(var(--d) * ${-(i + 1) / SLABS}))` }} />
      ))}
      <div className={styles.back}><span className={styles.cam} /></div>
      <div className={styles.front}>
        <div className={styles.glass}>
          {children}
          <span className={platform === "android" ? styles.punch : styles.island} />
          <span className={styles.glare} />
        </div>
      </div>
    </div>
  );
}

/** One interface layer inside a Device — stack several and cross-fade them (data-layer) */
export function Screen({ children, className = "", ...rest }) {
  return (
    <div className={`${styles.layer} ${className}`} data-layer {...rest}>
      <ScaledScreen width={390}>{children}</ScaledScreen>
    </div>
  );
}
