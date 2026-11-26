// Live-chat providers. The chat panel only ever calls openLiveChat(CHAT); to switch provider, add one
// here and change chat in src/config/site.js — the panel's design doesn't change. The Zendesk snippet
// is already loaded site-wide (ZendeskScript, id "ze-snippet"); loadScript only adds it if that
// hasn't happened yet, so there is never a second copy.

const loadScript = (src, id) => new Promise((resolve, reject) => {
  if (document.getElementById(id)) return resolve();
  const s = document.createElement("script");
  s.src = src; s.id = id; s.async = true;
  s.onload = () => resolve(); s.onerror = () => reject(new Error("chat script failed"));
  document.head.appendChild(s);
});

const waitFor = (test, ms = 10000) => new Promise((resolve, reject) => {
  const t0 = Date.now();
  const tick = () => (test() ? resolve() : Date.now() - t0 > ms ? reject(new Error("chat timed out")) : setTimeout(tick, 150));
  tick();
});

const PROVIDERS = {
  // Zendesk (the Web Widget / Chat snippet the reference site uses)
  zendesk: {
    async open({ key }) {
      await loadScript(`https://static.zdassets.com/ekr/snippet.js?key=${encodeURIComponent(key)}`, "ze-snippet");
      await waitFor(() => typeof window.zE === "function" || window.$zopim?.livechat);
      const zE = window.zE;
      if (typeof zE === "function") {
        try { zE("messenger", "open"); } catch {}
        try { zE("webWidget", "show"); zE("webWidget", "open"); } catch {}
      }
      try { window.$zopim?.livechat?.window?.show(); } catch {}
      // Only report success once a chat window is really on screen (the account may be offline or
      // not allow this domain) — otherwise the panel offers the other channels instead.
      await waitFor(() => [...document.querySelectorAll('iframe[id="webWidget"], iframe[title*="chat" i], iframe[title*="messaging" i]')]
        .some((f) => { const r = f.getBoundingClientRect(); return r.height > 120 && r.bottom > 0 && r.top < innerHeight && getComputedStyle(f).visibility !== "hidden"; }), 6000);
    },
  },
};

/** Opens the configured live chat. Resolves true when it opened, false when it couldn't. */
export async function openLiveChat(config) {
  const p = config?.provider && PROVIDERS[config.provider];
  if (!p) return false;
  try { await p.open(config); return true; } catch { return false; }
}

export const hasLiveChat = (config) => Boolean(config?.provider && PROVIDERS[config.provider]);
