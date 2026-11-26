// The six Mobile App Development child pages: one master design (src/components/AppService), one
// dataset each. Slugs are exactly the live site's (header menu → Mobile App Development), served at
// /services/<slug> — not nested under /mobile-app-development.
//
// To add a page: write src/data/app-services/<slug>.js (same shape as ios-app-development.js), import
// it below, and add src/app/services/<slug>/page.jsx (three lines — copy any sibling's).
import { SITE } from "@/data/site";
import { MOBILE_CHILDREN } from "@/data/mobile-app-development";
import IOS from "./ios-app-development";
import ANDROID from "./android-app-development";
import FLUTTER from "./flutter-app-development";
import REACT from "./react-app-development";
import HYBRID from "./hybrid-app-development";
import RAILS from "./ruby-on-rails-development";
import { ROBOTS } from "@/config/site";

const DATA = {
  "ios-app-development": IOS,
  "android-app-development": ANDROID,
  "flutter-app-development": FLUTTER,
  "react-app-development": REACT,
  "hybrid-app-development": HYBRID,
  "ruby-on-rails-development": RAILS,
};

export const APP_SERVICES = MOBILE_CHILDREN.map((c) => ({ ...c, data: DATA[c.slug] || null }));
export const APP_SERVICE_PATHS = APP_SERVICES.filter((c) => c.data).map((c) => c.path);

export const getAppService = (slug) => {
  const c = APP_SERVICES.find((x) => x.slug === slug);
  return c?.data ? { ...c.data, slug: c.slug, path: c.path, name: c.name, summary: c.summary } : null;
};

// The other five — linked from each page's close
export const appSiblingsOf = (slug) => APP_SERVICES.filter((c) => c.slug !== slug);

// Next.js metadata, generated from the page's own data
export function appServiceMetadata(slug) {
  const s = getAppService(slug);
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
