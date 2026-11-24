// The build-led UI/UX child pages on the PSD-to-HTML inner master (src/components/PSDToHTML/Inner).
// Slugs are the live site's. The live site has no PSD-to-HTML child pages, so the user chose
// (2026-11-24) to put these two build-oriented UI/UX children here. To add a page: write <slug>.js
// (shape = responsive-website-design.js), add it below, add src/app/services/<slug>/page.jsx.
import { SITE } from "@/data/site";
import RESPONSIVE from "./responsive-website-design";
import LANDING from "./landing-page-design";

const entry = (slug, name, data) => ({ slug, path: `/services/${slug}`, name, data });

export const PSD_INNER = [
  entry("responsive-website-design", "Responsive Web Design", RESPONSIVE),
  entry("landing-page-design", "Landing Page Design", LANDING),
];
export const PSD_INNER_PATHS = PSD_INNER.map((c) => c.path);

export const getPSDInner = (slug) => {
  const c = PSD_INNER.find((x) => x.slug === slug);
  return c ? { ...c.data, slug: c.slug, path: c.path, name: c.name } : null;
};

export function psdInnerMetadata(slug) {
  const s = getPSDInner(slug);
  if (!s) return {};
  const images = [{ url: s.seo.image.src, width: s.seo.image.width, height: s.seo.image.height, alt: s.seo.imageAlt }];
  return {
    title: { absolute: s.seo.title }, description: s.seo.description, keywords: s.seo.keywords,
    alternates: { canonical: s.path }, robots: { index: true, follow: true },
    openGraph: { type: "website", url: s.path, title: s.seo.title, description: s.seo.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.seo.title, description: s.seo.description, images: images.map((i) => i.url) },
  };
}
