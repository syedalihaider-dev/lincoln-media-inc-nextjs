import { SITE } from "@/data/site";
import { siteConfig } from "@/config/site";

// Crawling stays allowed even in the NOINDEX phase: a crawler has to fetch a page to see its
// "noindex, nofollow" (meta robots + X-Robots-Tag, driven by siteConfig.seo.indexing). Blocking it
// here would hide that instruction and could leave already-known URLs in the index.
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    ...(siteConfig.seo.indexing ? { sitemap: `${SITE.url}/sitemap.xml` } : {}),
    host: SITE.url,
  };
}
