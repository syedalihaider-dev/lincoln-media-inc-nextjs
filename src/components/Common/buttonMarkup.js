import styles from "./Button.module.css";

/*
 * The site button (Common/Button) as an HTML string, for markup React doesn't render itself — the
 * legacy pre-built pages. Same DOM and the same CSS-module classes as <Button>, so it looks and
 * animates identically (label letter roll, arrow disc, flood). The legacy pages' own `.magnetic`
 * script supplies the pointer lean.
 */
const ARROW = '<path d="M6 18 18 6M9 6h9v9" />';
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const letters = (t) => [...t].map((c, i) => `<span class="${styles.ch}" style="--i:${i}">${c === " " ? "&nbsp;" : esc(c)}</span>`).join("");

export function buttonHTML({ href, label, variant = "solid", size = "md", extra = "" }) {
  const cls = [styles.btn, styles[variant], styles[size], extra].filter(Boolean).join(" ");
  return `<a class="${cls}" href="${esc(href)}">`
    + `<span class="${styles.label}"><span class="${styles.rollA}">${letters(label)}</span><span class="${styles.rollB}" aria-hidden="true">${letters(label)}</span></span>`
    + `<span class="${styles.disc}" aria-hidden="true"><svg viewBox="0 0 24 24" class="${styles.iconA}">${ARROW}</svg><svg viewBox="0 0 24 24" class="${styles.iconB}">${ARROW}</svg></span>`
    + `<span class="${styles.flood}" aria-hidden="true"></span></a>`;
}

// Rewrites the legacy site's buttons — <a class="btn btn-red|btn-ghost [btn-sm] [extras]" href="…"><span>Label</span>[<i>↗</i>]</a> —
// into the site button. Classes that aren't button styling (talk, magnetic, explore-all…) are kept.
export function upgradeLegacyButtons(html) {
  return html.replace(/<a class="btn ([^"]*)" href="([^"]*)">\s*<span>([^<]*)<\/span>\s*(?:<i>[^<]*<\/i>)?\s*<\/a>/g, (m, classes, href, label) => {
    const list = classes.split(/\s+/);
    const variant = list.includes("btn-ghost") ? "outline" : "solid";
    const size = list.includes("btn-sm") ? "sm" : "md";
    const extra = list.filter((c) => !/^btn-(red|ghost|sm)$/.test(c)).join(" ");
    const text = label.replace(/&#x27;/g, "'").replace(/&amp;/g, "&");
    return buttonHTML({ href, label: text, variant, size, extra });
  });
}
