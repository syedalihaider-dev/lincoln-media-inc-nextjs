// The five Branding & Communication service pages, all on one master design (src/components/Branding/Inner),
// at the live site's own URLs (/services/<slug>, not nested). Reference dataset shape: logo-design.js.
import { SITE } from "@/data/site";
import { BRAND_CHILDREN } from "@/data/branding/main";
import logoDesign from "./logo-design";
import corporateIdentity from "./corporate-identity-design";
import businessCards from "./business-card-design";
import brochures from "./brochure-design";
import packaging from "./packaging-designs";
import { ROBOTS } from "@/config/site";

const DATA = {
  "logo-design": logoDesign,
  "corporate-identity-design": corporateIdentity,
  "business-card-design": businessCards,
  "brochure-design": brochures,
  "packaging-designs": packaging,
};

export const BRAND_INNER_PATHS = BRAND_CHILDREN.map((c) => c.path);

export function getBrandInner(slug) {
  const self = BRAND_CHILDREN.find((c) => c.slug === slug);
  return { ...DATA[slug], slug, path: self.path, siblings: BRAND_CHILDREN.filter((c) => c.slug !== slug) };
}

export function brandInnerMetadata(slug) {
  const { seo } = DATA[slug];
  const path = BRAND_CHILDREN.find((c) => c.slug === slug).path;
  const images = [{ url: seo.image.src, width: seo.image.width, height: seo.image.height, alt: seo.imageAlt }];
  return {
    title: { absolute: seo.title }, description: seo.description, keywords: seo.keywords,
    alternates: { canonical: path }, robots: ROBOTS,
    openGraph: { type: "website", url: path, title: seo.title, description: seo.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: images.map((i) => i.url) },
  };
}
