// The ten Digital Marketing service pages: one master design (src/components/DigitalMarketingInner),
// one dataset each. Slugs are exactly the live site's (lincolnmediainc.com header menu → Digital
// Marketing), at /services/<slug> — including the live site's own spelling "conversation-rate-optimization".
//
// Content: each live page's service-specific copy, restructured. The live pages share one template
// whose process (a video-animation process), FAQ (web-design questions), figures (265+ / 325+ / 20+,
// platform user counts, email ROI), AED prices, client names and portfolio are left out; each page has
// its own process and FAQ written from what that live page says the team does. Figures inside the demo
// interfaces are labelled as illustrative.
//
// To add a page: write <slug>.js (same shape as seo.js), add it below, and add
// src/app/services/<slug>/page.jsx (three lines — copy any sibling's).
import { SITE } from "@/data/site";
import SEO from "./seo";
import PPC from "./pay-per-click";
import SMM from "./social-media-marketing";
import SMO from "./social-media-optimization";
import CRO from "./conversation-rate-optimization";
import EMAIL from "./email-marketing";
import CONTENT from "./content-marketing";
import ORM from "./online-reputation-management";
import ASO from "./app-store-optimization";
import PR from "./public-relation-firm";
import { ROBOTS } from "@/config/site";

const entry = (slug, name, short, data) => ({ slug, path: `/services/${slug}`, name, short, data });

export const MARKETING_SERVICES = [
  entry("social-media-marketing", "Social Media Marketing", "SMM", SMM),
  entry("social-media-optimization", "Social Media Optimization", "SMO", SMO),
  entry("pay-per-click", "Pay-Per-Click Advertising", "PPC", PPC),
  entry("seo", "Search Engine Optimization", "SEO", SEO),
  entry("conversation-rate-optimization", "Conversion Rate Optimization", "CRO", CRO),
  entry("email-marketing", "Email Marketing", "Email Marketing", EMAIL),
  entry("content-marketing", "Content Marketing", "Content Marketing", CONTENT),
  entry("online-reputation-management", "Online Reputation Management", "ORM", ORM),
  entry("app-store-optimization", "App Store Optimization", "ASO", ASO),
  entry("public-relation-firm", "Public Relations", "PR", PR),
];

export const MARKETING_SERVICE_PATHS = MARKETING_SERVICES.map((c) => c.path);

export const getMarketingService = (slug) => {
  const c = MARKETING_SERVICES.find((x) => x.slug === slug);
  return c ? { ...c.data, slug: c.slug, path: c.path, name: c.name, short: c.short } : null;
};

// The other nine — linked from each page's close
export const marketingSiblings = (slug) => MARKETING_SERVICES.filter((c) => c.slug !== slug).map(({ path, name }) => ({ path, name }));

// Next.js metadata, generated from the page's own data
export function marketingServiceMetadata(slug) {
  const s = getMarketingService(slug);
  if (!s) return {};
  const images = [{ url: s.seo.image.src, width: s.seo.image.width, height: s.seo.image.height, alt: s.seo.imageAlt }];
  return {
    title: { absolute: s.seo.title },
    description: s.seo.description,
    keywords: s.seo.keywords,
    alternates: { canonical: s.path },
    robots: ROBOTS,
    openGraph: { type: "website", url: s.path, title: s.seo.title, description: s.seo.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.seo.title, description: s.seo.description, images: images.map((i) => i.url) },
  };
}
