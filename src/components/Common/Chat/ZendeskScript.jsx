"use client";
import { useEffect } from "react";
import { CHAT } from "@/data/site";

// The official Zendesk snippet, loaded once for the whole site (root layout). The id "ze-snippet" is the
// one Zendesk expects, and it also stops a second copy being injected (Common/Chat/providers.js checks it).
// Zendesk's own launcher stays hidden: the site's "Let's talk" panel (Common/Chat) is the single
// entry point, and its "Start a conversation" option opens this widget. Closing the widget hides it again.
//
// Nothing of the widget is visible until the visitor asks for it, so it loads on the visitor's first
// interaction (tap, click, key, wheel or scroll) instead of during page load: its ~700 kB of script and
// main-thread work never compete with first paint, hydration or the opening animations. A chat opened
// before that point still works — providers.js loads the same snippet on demand.
const SNIPPET = (key) => `https://static.zdassets.com/ekr/snippet.js?key=${encodeURIComponent(key)}`;
const TRIGGERS = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"];

function hideLauncher() {
  let tries = 0;
  const run = () => {
    const zE = window.zE;
    if (typeof zE !== "function") { if (tries++ < 40) setTimeout(run, 150); return; }
    try {
      zE("webWidget", "hide");
      zE("webWidget:on", "close", () => zE("webWidget", "hide"));
    } catch {}
  };
  run();
}

export default function ZendeskScript() {
  const enabled = CHAT?.provider === "zendesk" && Boolean(CHAT.key);
  useEffect(() => {
    if (!enabled) return;
    const opts = { passive: true, capture: true };
    const off = () => TRIGGERS.forEach((t) => window.removeEventListener(t, load, opts));
    function load() {
      off();
      const existing = document.getElementById("ze-snippet");
      if (existing) { hideLauncher(); return; }
      const s = document.createElement("script");
      s.id = "ze-snippet";
      s.src = SNIPPET(CHAT.key);
      s.async = true;
      s.onload = hideLauncher;
      document.body.appendChild(s);
    }
    TRIGGERS.forEach((t) => window.addEventListener(t, load, opts));
    return off;
  }, [enabled]);
  return null;
}
