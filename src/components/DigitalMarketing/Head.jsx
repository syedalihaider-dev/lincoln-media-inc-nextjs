import RevealText from "@/components/Common/RevealText";
import Label from "@/components/About/Label";
import styles from "./Head.module.css";

// The page's section heading: eyebrow, a line rising out of its mask, an optional paragraph
export default function Head({ kicker, title, text, id, tone = "dark", align = "start", className = "" }) {
  return (
    <header className={`${styles.head} ${styles[tone]} ${styles[align]} ${className}`}>
      <Label className={styles.label}>{kicker}</Label>
      <RevealText id={id} className={styles.title}>{title}</RevealText>
      {text && <p className={styles.text}>{text}</p>}
    </header>
  );
}
