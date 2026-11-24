// The design-led UI/UX child pages on one master design (src/components/UIUX/Inner), one dataset each.
// Slugs are the live site's (lincolnmediainc.com → Ui/Ux Design). Build-led children
// (responsive-website-design, landing-page-design) use the PSD-to-HTML inner master instead —
// see src/data/ui-ux/children.js. To add a page: write <slug>.js (shape = ux-design.js), add it
// below, and add src/app/services/<slug>/page.jsx (three lines — copy a sibling's).
import { SITE } from "@/data/site";
import UX from "./ux-design";
import WORKSHOP from "./ux-workshops";
import AUDIT from "./ux-audit";
import GRAPHIC from "./graphic-design-services";

const entry = (slug, name, data) => ({ slug, path: `/services/${slug}`, name, data });

export const UIUX_INNER = [
  entry("ux-design", "UX Design", UX),
  entry("ux-workshops", "UX Design Workshop", WORKSHOP),
  entry("ux-audit", "UX Audit", AUDIT),
  entry("graphic-design-services", "Graphic Design", GRAPHIC),
];
export const UIUX_INNER_PATHS = UIUX_INNER.map((c) => c.path);

export const getUIUXInner = (slug) => {
  const c = UIUX_INNER.find((x) => x.slug === slug);
  return c ? { ...c.data, slug: c.slug, path: c.path, name: c.name } : null;
};

export function uiuxInnerMetadata(slug) {
  const s = getUIUXInner(slug);
  if (!s) return {};
  const images = [{ url: s.seo.image.src, width: s.seo.image.width, height: s.seo.image.height, alt: s.seo.imageAlt }];
  return {
    title: { absolute: s.seo.title }, description: s.seo.description, keywords: s.seo.keywords,
    alternates: { canonical: s.path }, robots: { index: true, follow: true },
    openGraph: { type: "website", url: s.path, title: s.seo.title, description: s.seo.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.seo.title, description: s.seo.description, images: images.map((i) => i.url) },
  };
}
