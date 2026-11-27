"use client";
import { use } from "react";

/**
 * Deferred hydration for markup that is complete on the server but not on screen yet — the homepage,
 * which sits in #site (display:none) behind the guided intro until the visitor enters or skips.
 *
 * Wrapped in its own <Suspense>, a gated part suspends during hydration: React keeps the server HTML
 * exactly as it is and hydrates that part later. Parts open one at a time while the browser is idle
 * after load (each one a short task instead of one long hydration of the whole page), and all of
 * them at once on the visitor's first tap, click, key or wheel — before the homepage can open.
 * Where the homepage is already showing at load (a deep link such as /#services) nothing is gated.
 * Gates may register late (a part inside an already-opened part); the idle chain picks them up.
 *
 * A gate only ever suspends the first (hydration) render: once open it renders its children directly.
 */
const EVENTS = ["pointerdown", "keydown", "touchstart", "wheel"];
const gates = new Map(); // index → { promise, resolve, open }
let listening = false, loaded = false, pending = false, allOpen = false;

const idle = (fn) => (window.requestIdleCallback ? window.requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 60));
const nextClosed = () => [...gates.keys()].sort((a, b) => a - b).map((k) => gates.get(k)).find((g) => !g.open);

function release(g) { g.open = true; g.resolve(); }

// Open the lowest closed gate in an idle period, then the next one in the following idle period…
function kick() {
  if (!loaded || pending || allOpen || !nextClosed()) return;
  pending = true;
  idle(() => {
    pending = false;
    const g = nextClosed();
    if (g) release(g);
    kick();
  });
}

function openAll() {
  allOpen = true;
  EVENTS.forEach((t) => window.removeEventListener(t, openAll, true));
  gates.forEach((g) => { if (!g.open) release(g); });
}

function listen() {
  if (listening) return;
  listening = true;
  EVENTS.forEach((t) => window.addEventListener(t, openAll, { capture: true, passive: true }));
  const start = () => setTimeout(() => { loaded = true; kick(); }, 0);
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
}

function gateFor(index) {
  let g = gates.get(index);
  if (!g) {
    let resolve;
    const promise = new Promise((r) => { resolve = r; });
    g = { promise, resolve, open: false };
    gates.set(index, g);
    kick();
  }
  return g;
}

const onScreen = () => {
  const site = document.getElementById("site");
  return !document.body.classList.contains("locked") || Boolean(site && site.classList.contains("shown"));
};

/** True once the gates were opened by an interaction (or the homepage was already on screen). */
export const gatesOpened = () => allOpen;

export default function HydrateGate({ index, children }) {
  if (typeof window === "undefined" || allOpen) return children;
  if (onScreen()) { openAll(); return children; }
  const g = gateFor(index);
  if (g.open) return children;
  listen();
  use(g.promise);
  return children;
}
