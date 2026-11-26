// Inner service pages: one shared design system, one data object per service.
// To add a page: write src/data/inner-services/<slug>.js (same shape as web-development.js), register it
// below, and add src/app/services/<slug>/page.jsx (three lines — copy web-development's). Slugs must be
// the live site's (lincolnmediainc.com/services/<slug>); see MEGA_MENU in src/data/service-categories.js.
import { SITE } from "@/data/site";
import WEB_DEVELOPMENT from "./web-development";
import { ROBOTS } from "@/config/site";

export const INNER_SERVICES = {
  [WEB_DEVELOPMENT.slug]: WEB_DEVELOPMENT,
};

export const getInnerService = (slug) => INNER_SERVICES[slug] || null;

// Next.js metadata for an inner service page
export function innerServiceMetadata(slug) {
  const s = getInnerService(slug);
  if (!s) return {};
  return {
    title: { absolute: s.seo.title },
    description: s.seo.description,
    alternates: { canonical: s.path },
    robots: ROBOTS,
    openGraph: { type: "website", url: s.path, title: s.seo.title, description: s.seo.description, siteName: SITE.name, images: s.seo.image ? [{ url: s.seo.image.src, width: s.seo.image.width, height: s.seo.image.height, alt: s.seo.imageAlt }] : undefined },
    twitter: { card: "summary_large_image", title: s.seo.title, description: s.seo.description, images: s.seo.image ? [s.seo.image.src] : undefined },
  };
}
