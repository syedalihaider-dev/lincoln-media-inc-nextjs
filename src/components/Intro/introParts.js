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
const THREE_CDN = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
// Bump when public/app.js changes so browsers fetch the new engine
const APP_VERSION = 39;
const LOGO_TEXT = '<span class="logo-text">THE&nbsp;LINCOLN<span>MEDIA</span></span>';
const LOGO_IMG = '<img class="logo-img" src="/images/logo.png" alt="The Lincoln Media" width="200" height="50" decoding="async" fetchpriority="high">';

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
  // The intro header shows the studio's real logo (public/images/logo.png, the same artwork as the site
  // header) in place of the old typeset "THE LINCOLN MEDIA" lockup. width/height reserve its 4:1 box.
  if (!body.slice(0, mainAt).includes(LOGO_TEXT)) throw new Error("Intro markup: HUD logo lockup not found");
  const chrome = body.slice(0, mainAt).replace(LOGO_TEXT, LOGO_IMG);

  // The question-by-question experience, up to where the old studio site began
  const [expAt, siteAt] = cut(body, '<section class="experience"', SITE_START, "the experience section");
  const experience = body.slice(expAt, siteAt).trim();

  // Scripts after </main>, in their original order (three.js r128 → voice lines → app.js)
  const tail = body.slice(body.lastIndexOf("</main>"));
  const scripts = (tail.match(/<script\b[^>]*><\/script>/g) || [])
    .filter((s) => !DROP_SCRIPTS.test(s))
    // three.js r128 served from this site (public/vendor, immutable cache) instead of a third-party CDN:
    // the same file, without an extra DNS/TLS connection in front of the intro
    .map((s) => s.replace(THREE_CDN, "/vendor/three-r128.min.js").replace(/app\.js\?v=\d+/, `app.js?v=${APP_VERSION}`));
  if (!scripts.some((s) => /app\.js/.test(s))) throw new Error("Intro markup: app.js script tag not found");

  // The intro's CSS reads <body class="locked" data-page="home"> before anything paints
  const boot = `<script>document.body.className=${JSON.stringify(home.bodyClass)};document.body.setAttribute("data-page",${JSON.stringify(home.dataPage)});</script>`;

  // The old studio site's stylesheet styles `.site > section` etc. and would leak into the new homepage.
  // The intro only needs a few of its rules, copied verbatim into public/intro-site.css.
  const SITE_CSS = /href="site\.css\?v=\d+"/;
  if (!SITE_CSS.test(home.head)) throw new Error("Intro markup: site.css link not found in <head>");
  const head = trimFontRequest(home.head.replace(SITE_CSS, 'href="intro-site.css?v=2"'));

  cache = { boot, head, chrome, experience, scripts: scripts.join("") };
  return cache;
}
