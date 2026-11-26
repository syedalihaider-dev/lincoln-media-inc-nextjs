"use client";
import { useEffect, useId, useRef, useState } from "react";
import f from "./Form.module.css";

/**
 * A dropdown in the form's own style: a button that names the choice, a floating label like the
 * text fields, and a listbox that unfolds beneath it. The chosen value travels in a hidden input
 * (`name`), so the form reads it like any other field.
 * Keyboard (WAI-ARIA listbox pattern): ↑/↓/Enter/Space open it; ↑/↓/Home/End move; typing jumps to
 * the next option starting with that letter; Enter/Space choose; Escape/Tab close.
 */
export default function Select({ name, label, options }) {
  const uid = useId();
  const btnId = `${uid}-btn`, listId = `${uid}-list`, labelId = `${uid}-label`;
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef(null), btn = useRef(null), list = useRef(null);
  const typed = useRef({ s: "", t: 0 });

  const choose = (i) => { setValue(options[i]); setOpen(false); btn.current?.focus(); };
  const show = (i = Math.max(0, options.indexOf(value))) => { setActive(i); setOpen(true); };

  // the list takes focus while open, so arrow keys work from it
  useEffect(() => { if (open) list.current?.focus({ preventScroll: true }); }, [open]);
  useEffect(() => {
    if (!open) return;
    const away = (e) => !wrap.current?.contains(e.target) && setOpen(false);
    addEventListener("pointerdown", away);
    return () => removeEventListener("pointerdown", away);
  }, [open]);
  // the form's reset clears the hidden input; mirror it
  useEffect(() => {
    const form = wrap.current?.closest("form");
    if (!form) return;
    const reset = () => setValue("");
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, []);

  const jump = (key) => {
    const now = Date.now();
    typed.current = { s: now - typed.current.t > 700 ? key : typed.current.s + key, t: now };
    const q = typed.current.s.toLowerCase();
    const from = open ? active + (q.length === 1 ? 1 : 0) : 0;
    for (let k = 0; k < options.length; k++) {
      const i = (from + k) % options.length;
      if (options[i].toLowerCase().startsWith(q)) return i;
    }
    return -1;
  };

  const onButtonKey = (e) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      show(e.key === "ArrowUp" ? options.length - 1 : undefined);
    } else if (e.key.length === 1 && /\S/.test(e.key)) {
      const i = jump(e.key);
      if (i >= 0) setValue(options[i]);
    }
  };

  const onListKey = (e) => {
    const last = options.length - 1;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(last, a + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(last); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
    else if (e.key === "Escape") { e.preventDefault(); setOpen(false); btn.current?.focus(); }
    else if (e.key === "Tab") setOpen(false);
    else if (e.key.length === 1 && /\S/.test(e.key)) { const i = jump(e.key); if (i >= 0) setActive(i); }
  };

  // keep the highlighted option in view
  useEffect(() => {
    if (open) list.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  return (
    <div ref={wrap} className={`${f.field} ${f.select}`} data-filled={value ? "true" : undefined} data-open={open ? "true" : undefined} data-field>
      <input type="hidden" name={name} value={value} />
      <button
        ref={btn}
        id={btnId}
        type="button"
        className={f.control}
        data-focus="self"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${btnId}`}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onButtonKey}
      >
        <span className={f.value}>{value || " "}</span>
        <span className={f.chevron} aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg></span>
      </button>
      <label id={labelId} htmlFor={btnId} className={f.label}>{label}</label>
      <span className={f.ring} aria-hidden="true" />

      <ul
        ref={list}
        id={listId}
        role="listbox"
        tabIndex={-1}
        aria-labelledby={labelId}
        aria-activedescendant={open ? `${uid}-o${active}` : undefined}
        className={f.menu}
        onKeyDown={onListKey}
        data-lenis-prevent

      >
        {options.map((o, i) => (
          <li
            key={o}
            id={`${uid}-o${i}`}
            role="option"
            data-i={i}
            aria-selected={o === value}
            className={`${f.option} ${i === active ? f.activeOption : ""}`}
            onPointerEnter={() => setActive(i)}
            onClick={() => choose(i)}
          >
            <span>{o}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={f.tick}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
