import pages from "@/data/legacy-pages.json";
import { upgradeLegacyButtons } from "@/components/Common/buttonMarkup";
import { trimFontRequest } from "@/components/Common/fonts";

// Renders one of the site's pre-built pages as it was built: same markup, stylesheets and scripts —
// except its buttons, which are rewritten into the site-wide button (Common/buttonMarkup).
// The browser runs the page's scripts in order while parsing (as on the static site), and the
// wrapper uses `display: contents`, so it adds no box to the layout.
// Used by the inner pages (services, work, about, policies); the homepage is src/app/page.js.
export function getPage(route) {
  return pages[route] || null;
}

export function pageMetadata(route) {
  const p = getPage(route);
  return p ? { title: p.title, description: p.description, alternates: { canonical: route } } : {};
}

export default function LegacyPage({ route }) {
  const p = getPage(route);
  // Set the page's <body> class / data-page before anything renders (the CSS and scripts rely on them)
  const boot = `<script>document.body.className=${JSON.stringify(p.bodyClass)};document.body.setAttribute("data-page",${JSON.stringify(p.dataPage)});</script>`;
  return <div id="lm-page" style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: boot + trimFontRequest(p.head) + upgradeLegacyButtons(p.body) }} />;
}
