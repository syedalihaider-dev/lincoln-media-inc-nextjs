import t from "./Terminal.module.css";

/*
 * A terminal window running a build — real-looking output, one line per entry. Each line carries
 * data-line so a section can reveal them on scroll.  lines: [kind, text] where kind is
 * "cmd" ($ prompt) · "ok" (✓ green) · "info" (dim) · "warn" (amber) · "url" (cyan).
 */
export default function Terminal({ title = "meridian — zsh", lines = [], className = "" }) {
  return (
    <div className={`${t.term} ${className}`} aria-hidden="true">
      <div className={t.bar}><span className={t.dots}><i /><i /><i /></span><b>{title}</b></div>
      <pre className={t.body}>
        {lines.map(([k, s], i) => <span key={i} className={`${t.line} ${t[k]}`} data-line>{k === "cmd" ? <><em>$</em> {s}</> : k === "ok" ? <><em>✓</em> {s}</> : s}</span>)}
        <span className={t.caret} />
      </pre>
    </div>
  );
}
