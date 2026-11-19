import pages from "@/data/legacy-pages.json";
import { SITE } from "@/data/site";

// Every page the site serves: the homepage plus all pre-built inner pages
export default function sitemap() {
  return Object.keys(pages).map((route) => ({
    url: `${SITE.url}${route === "/" ? "" : route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
