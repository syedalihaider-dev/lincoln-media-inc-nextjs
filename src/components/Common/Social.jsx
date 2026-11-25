import { SOCIAL } from "@/data/site";
import styles from "./Social.module.css";

// Glyphs drawn on a 24-unit grid; instagram is stroked, the rest filled
const GLYPH = {
  facebook: <path d="M13.6 21.5v-8h2.7l.4-3.2h-3.1V8.3c0-.9.3-1.5 1.6-1.5h1.7V4a22 22 0 0 0-2.4-.1c-2.4 0-4.1 1.5-4.1 4.2v2.2H7.6v3.2h2.8v8z" />,
  instagram: <g fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" /></g>,
  linkedin: <path d="M6.9 8.6H3.6V20h3.3zM5.2 3.4a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8M20.4 13.7c0-3.1-.7-5.4-4.3-5.4-1.7 0-2.9.9-3.3 1.8h-.1V8.6H9.6V20h3.3v-5.6c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.4z" />,
  x: <path d="M17.5 3.5h3l-6.6 7.5 7.7 9.5h-6l-4.7-5.9-5.4 5.9h-3l7-7.9-7.4-9.1h6.1l4.3 5.4zm-1 15.3h1.7L7.6 5.1H5.8z" />,
  pinterest: <path d="M12 2.5a9.5 9.5 0 0 0-3.5 18.3c-.1-.8-.2-1.9 0-2.8l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.8 0 1.2.6 1.2 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.7 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.6 2.2-4.6 4.4 0 .9.3 1.8.8 2.3l.1.3-.3 1.2c0 .2-.2.3-.4.2-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8A9.5 9.5 0 1 0 12 2.5" />,
  quora: <path d="M12.1 3C7.2 3 3.6 6.7 3.6 11.4s3.6 8.4 8.5 8.4c.8 0 1.5-.1 2.2-.3.6 1.1 1.5 2.1 3 2.1 2.2 0 2.9-1.7 3-3h-1.1c-.1.7-.6 1.3-1.3 1.3-.9 0-1.5-.7-2-1.6 2.7-1.3 4.6-3.9 4.6-6.9C20.5 6.7 17 3 12.1 3m2.2 13.7c-.6-1-1.3-2-2.9-2-.5 0-1 .1-1.4.3l.4.8.6-.1c1 0 1.5.8 2 1.8l-.9.1c-3 0-4.3-2.3-4.3-5.6s1.3-5.6 4.3-5.6 4.3 2.3 4.3 5.6c0 1.9-.5 3.5-1.2 4.5z" />,
};

/**
 * The studio's social profiles as icon buttons (links from src/data/site.js → SOCIAL).
 * tone: "dark" (on ink) · "light" (on paper). size: "md" · "sm".
 */
export default function Social({ tone = "dark", size = "md", className = "", label = "The Lincoln Media on social media" }) {
  return (
    <ul className={`${styles.social} ${styles[tone]} ${styles[size]} ${className}`} aria-label={label}>
      {SOCIAL.map((s) => (
        <li key={s.key}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`} className={styles.link}>
            <span className={styles.glyphs} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">{GLYPH[s.key]}</svg>
              <svg viewBox="0 0 24 24" fill="currentColor">{GLYPH[s.key]}</svg>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
