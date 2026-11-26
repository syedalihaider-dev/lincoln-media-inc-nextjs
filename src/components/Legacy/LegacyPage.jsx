import pages from "@/data/legacy-pages.json";
import { upgradeLegacyButtons } from "@/components/Common/buttonMarkup";
import { trimFontRequest } from "@/components/Common/fonts";
import { withSiteContact } from "@/lib/siteContact";
import { ROBOTS } from "@/config/site";

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
  return p ? { title: p.title, description: p.description, alternates: { canonical: route }, robots: ROBOTS } : {};
}

// Their "Contact" / "Let's talk" / "Start a project" links pointed at the homepage's contact section;
// like every contact call to action on the site, they now open the contact page's form
const toContactForm = (html) => html.replace(/href="\/?#contact"/g,'href="/contact-us#contact-form"');

// Their footers match the site footer: the full Overview list, and no "New York · Est. 2012" line
const OLD_OVERVIEW = '<li><a href="/about-us">About Us</a></li><li><a href="/services">Services</a></li>';
const NEW_OVERVIEW = '<li><a href="/">Home</a></li><li><a href="/about-us">About</a></li><li><a href="/services">Services</a></li><li><a href="/case-studies">Case Studies</a></li><li><a href="/contact-us">Contact Us</a></li>';
const tidyFooter = (html) => html.replace(OLD_OVERVIEW, NEW_OVERVIEW).replace(/\s*<span>New York · Est\. 2012<\/span>/, "");

const render = (html) => withSiteContact(toContactForm(tidyFooter(html)));

export default function LegacyPage({ route }) {
  const p = getPage(route);
  // Set the page's <body> class / data-page before anything renders (the CSS and scripts rely on them)
  const boot = `<script>document.body.className=${JSON.stringify(p.bodyClass)};document.body.setAttribute("data-page",${JSON.stringify(p.dataPage)});</script>`;
  // The page's own scripts edit this markup while it parses (year, menus…), so the DOM React finds
  // differs from the string by design — React leaves it alone either way; don't warn about it.
  return <div id="lm-page" style={{ display: "contents" }} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: boot + render(trimFontRequest(p.head)) + render(upgradeLegacyButtons(p.body)) }} />;
}
