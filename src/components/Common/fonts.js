// The site's web fonts are all self-hosted: Unbounded (headings) by @font-face in src/app/globals.css
// (public/fonts/unbounded), Poppins (everything else) by next/font in src/app/layout.js.
// The pre-built pages and the guided intro still carry a Google Fonts <link> (and its preconnects) in
// their <head>; trimFontRequest removes them, so no page waits on a render-blocking third-party stylesheet.
const GOOGLE_FONT_TAGS = /<link\b[^>]*\bhref="https:\/\/fonts\.(?:googleapis|gstatic)\.com[^"]*"[^>]*>\s*/g;
export const trimFontRequest = (html) => html.replace(GOOGLE_FONT_TAGS, "");
