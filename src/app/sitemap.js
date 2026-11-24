import pages from "@/data/legacy-pages.json";
import { SITE } from "@/data/site";
import { ROUTE_ALIASES, ALIASED_SOURCES } from "@/data/route-aliases";
import { MOBILE_PATH } from "@/data/mobile-app-development";
import { APP_SERVICE_PATHS } from "@/data/app-services";
import { MARKETING_SERVICE_PATHS } from "@/data/marketing-services";

// Every page the site serves: the homepage plus all pre-built inner pages
export default function sitemap() {
  // legacy routes, with aliased ones listed under their live URL
  // plus the pages that exist only in src/app (no legacy copy): Mobile App Development and its children
  // and the Digital Marketing service pages (two have no legacy copy; CRO's legacy spelling redirects)
  const routes = [...new Set([...Object.keys(pages).filter((r) => !ALIASED_SOURCES.has(r) && r !== "/services/conversion-rate-optimization"), ...Object.keys(ROUTE_ALIASES), MOBILE_PATH, ...APP_SERVICE_PATHS, ...MARKETING_SERVICE_PATHS])];
  return routes.map((route) => ({
    url: `${SITE.url}${route === "/" ? "" : route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
