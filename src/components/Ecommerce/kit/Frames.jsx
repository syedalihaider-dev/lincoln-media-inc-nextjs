import styles from "./Frames.module.css";

/**
 * Device frames for the e-commerce interfaces. The frame's body is a size container, so the
 * screen inside scales with the frame (see Screens.module.css: one unit = 1/1280 of a browser,
 * 1/390 of a phone).
 */
export function Browser({ url = "", children, className = "", tone = "light", ...rest }) {
  return (
    <div className={`${styles.browser} ${styles[tone]} ${className}`} {...rest}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}><i /><i /><i /></span>
        <span className={styles.url}><b>https://</b>{url}</span>
        <span className={styles.barEnd} />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export function Phone({ children, className = "", ...rest }) {
  return (
    <div className={`${styles.phone} ${className}`} {...rest}>
      <div className={styles.phoneBody}>
        <span className={styles.island} aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}

// The small caption every demo interface carries, so nothing reads as a real client or real data
export function DemoTag({ children = "Demo store · illustrative", className = "" }) {
  return <span className={`${styles.demo} ${className}`}>{children}</span>;
}
