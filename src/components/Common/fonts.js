// The site's web-font request: Unbounded (headings) only. All other text is Poppins, self-hosted by
// next/font in src/app/layout.js. The pre-built pages carry an older request in their <head>;
// trimFontRequest rewrites it to this one so nothing downloads families the site no longer uses.
export const FONT_CSS = "https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700;800&display=swap";
export const trimFontRequest = (html) => html.replace(/https:\/\/fonts\.googleapis\.com\/css2\?[^"']*/g, FONT_CSS);
