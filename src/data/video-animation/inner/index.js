// The two active Video & Animation service pages — one master design (src/components/VideoAnimation/Inner),
// one dataset each. Live-site slugs; the routes are src/app/services/<slug>/page.jsx.
import { SITE } from "@/data/site";
import explainer from "./explainer-videos";
import whiteboard from "./whiteboard-videos-animation";
import { ROBOTS } from "@/config/site";

const PAGES = { [explainer.slug]: explainer, [whiteboard.slug]: whiteboard };

export const VIDEO_INNER_PATHS = Object.keys(PAGES).map((s) => `/services/${s}`);
export const getVideoInner = (slug) => PAGES[slug] || null;
// the other active page(s), for each page's closing links
export const videoSiblings = (slug) => Object.values(PAGES).filter((p) => p.slug !== slug).map((p) => ({ name: p.short, path: `/services/${p.slug}` }));

export function videoInnerMetadata(slug) {
  const p = PAGES[slug];
  const path = `/services/${slug}`;
  const s = p.seo;
  const images = [{ url: s.image, width: 1280, height: 720, alt: s.imageAlt }];
  return {
    title: { absolute: s.title }, description: s.description, keywords: s.keywords,
    alternates: { canonical: path }, robots: ROBOTS,
    openGraph: { type: "website", url: path, title: s.title, description: s.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: images.map((i) => i.url) },
  };
}
