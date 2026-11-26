import pages from "@/data/legacy-pages.json";
import { trimFontRequest } from "@/components/Common/fonts";
import { withSiteContact } from "@/lib/siteContact";

/**
 * The guided AI intro, exactly as the original homepage (legacy/index.html) defines it.
 * Its markup is driven imperatively by public/app.js (orb, voice, questions, plan card), so it is
 * rendered verbatim as HTML rather than re-written as React — React must never re-render or
 * hydrate-patch it. Only the old studio site that followed it (and its scripts) is left out.
 */
const SITE_START = '<!-- The rest of the site stays hidden until the visitor finishes the questions -->';
// The previous studio site's motion stack — replaced by the React homepage
const DROP_SCRIPTS = /gsap|ScrollTrigger|lenis|site\.js/i;

function cut(str, from, to, label) {
  const a = str.indexOf(from);
  const b = to ? str.indexOf(to, a) : str.length;
  if (a < 0 || b < 0) throw new Error(`Intro markup: could not find ${label} in legacy/index.html`);
  return [a, b];
}

let cache;
export function introParts() {
  if (cache) return cache;
  const home = pages["/"];
  // (contact details come from src/config/site.js — values only, the markup is untouched)
  const body = withSiteContact(home.body);

  // Fixed chrome: WebGL canvas, HUD overlays, the intro header (logo, sound, menu) and its menu
  const [, mainAt] = cut(body, "", '<main id="top">', "<main>");
  const chrome = body.slice(0, mainAt);

  // The question-by-question experience, up to where the old studio site began
  const [expAt, siteAt] = cut(body, '<section class="experience"', SITE_START, "the experience section");
  const experience = body.slice(expAt, siteAt).trim();

  // Scripts after </main>, in their original order (three.js r128 → voice lines → app.js)
  const tail = body.slice(body.lastIndexOf("</main>"));
  const scripts = (tail.match(/<script\b[^>]*><\/script>/g) || []).filter((s) => !DROP_SCRIPTS.test(s));
  if (!scripts.some((s) => /app\.js/.test(s))) throw new Error("Intro markup: app.js script tag not found");

  // The intro's CSS reads <body class="locked" data-page="home"> before anything paints
  const boot = `<script>document.body.className=${JSON.stringify(home.bodyClass)};document.body.setAttribute("data-page",${JSON.stringify(home.dataPage)});</script>`;

  // The old studio site's stylesheet styles `.site > section` etc. and would leak into the new homepage.
  // The intro only needs a few of its rules, copied verbatim into public/intro-site.css.
  const SITE_CSS = /href="site\.css\?v=\d+"/;
  if (!SITE_CSS.test(home.head)) throw new Error("Intro markup: site.css link not found in <head>");
  const head = trimFontRequest(home.head.replace(SITE_CSS, 'href="intro-site.css?v=1"'));

  cache = { boot, head, chrome, experience, scripts: scripts.join("") };
  return cache;
}
