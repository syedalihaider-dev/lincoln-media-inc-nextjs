import styles from "./Label.module.css";

// Section eyebrow: a short cyan rule and the section's name — no counters
export default function Label({ children, className = "" }) {
  return (
    <p className={`${styles.label} ${className}`}>
      <i className={styles.rule} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
