import styles from "./UiNote.module.css";

/**
 * A fragment of a real app system that floats beside a device: the push notification it receives,
 * a line of the code behind it, or the API call it just made. Decorative.
 *   { kind: "push", app, title, text } · { kind: "code", file, line } · { kind: "api", method, path, status, time }
 */
export default function UiNote({ note, className = "", ...rest }) {
  if (note.kind === "push") {
    return (
      <div className={`${styles.note} ${styles.push} ${className}`} aria-hidden="true" {...rest}>
        <span className={styles.icon}>{note.app[0]}</span>
        <div><span className={styles.top}><small>{note.app}</small><small>now</small></span><b>{note.title}</b><small>{note.text}</small></div>
      </div>
    );
  }
  if (note.kind === "code") {
    return (
      <div className={`${styles.note} ${styles.code} ${className}`} aria-hidden="true" {...rest}>
        <small className={styles.file}>{note.file}</small>
        <code>{note.line}</code>
      </div>
    );
  }
  return (
    <div className={`${styles.note} ${styles.api} ${className}`} aria-hidden="true" {...rest}>
      <span className={styles.method}>{note.method}</span>
      <code>{note.path}</code>
      <span className={styles.ok}><i />{note.status}</span>
      <small>{note.time}</small>
    </div>
  );
}
