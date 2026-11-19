import styles from "./SectionLabel.module.css";

// "II — Services" chapter marker: roman numeral, hairline, name
export default function SectionLabel({ index, children, tone = "dark", className = "" }) {
  return (
    <p className={`${styles.label} ${styles[tone]} ${className}`}>
      {index && <span className={styles.index}>{index}</span>}
      <i className={styles.rule} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
