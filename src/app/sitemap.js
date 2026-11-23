import pages from "@/data/legacy-pages.json";
import { SITE } from "@/data/site";
import { ROUTE_ALIASES, ALIASED_SOURCES } from "@/data/route-aliases";

// Every page the site serves: the homepage plus all pre-built inner pages
export default function sitemap() {
  // legacy routes, with aliased ones listed under their live URL
  const routes = [...Object.keys(pages).filter((r) => !ALIASED_SOURCES.has(r)), ...Object.keys(ROUTE_ALIASES)];
  return routes.map((route) => ({
    url: `${SITE.url}${route === "/" ? "" : route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
