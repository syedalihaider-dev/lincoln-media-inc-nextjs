import styles from "./Logo.module.css";

// The Lincoln Media's text wordmark ("THE LINCOLN" over "MEDIA"), set in the homepage's type
export default function Logo({ className = "" }) {
  return (
    <span className={`${styles.logo} ${className}`}>
      <span className={styles.main}>The Lincoln</span>
      <span className={styles.sub}>Media</span>
    </span>
  );
}
