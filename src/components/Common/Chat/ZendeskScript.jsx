"use client";
import Script from "next/script";
import { CHAT } from "@/data/site";

// The official Zendesk snippet, loaded once for the whole site (root layout) after the page is idle,
// so it never competes with first paint or the GSAP scenes. The id "ze-snippet" is the one Zendesk
// expects, and it also stops a second copy being injected (Common/Chat/providers.js checks it).
// Zendesk's own launcher stays hidden: the site's "Let's talk" panel (Common/Chat) is the single
// entry point, and its "Start a conversation" option opens this widget. Closing the widget hides it again.
const SNIPPET = (key) => `https://static.zdassets.com/ekr/snippet.js?key=${encodeURIComponent(key)}`;

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
  if (CHAT?.provider !== "zendesk" || !CHAT.key) return null;
  return <Script id="ze-snippet" src={SNIPPET(CHAT.key)} strategy="lazyOnload" onLoad={hideLauncher} />;
}
