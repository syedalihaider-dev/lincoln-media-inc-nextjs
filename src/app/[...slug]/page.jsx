import { notFound } from "next/navigation";
import pages from "@/data/legacy-pages.json";
import LegacyPage, { getPage, pageMetadata } from "@/components/Legacy/LegacyPage";
import { CHILD_SERVICE_PATHS } from "@/data/child-services";
import { MARKETING_SERVICE_PATHS } from "@/data/marketing-services";
import { ROUTE_ALIASES, ALIASED_SOURCES, sourceOf } from "@/data/route-aliases";

// All inner pages (services, work, policies) — pre-rendered at build time
export const dynamicParams = false;

// Routes that now have their own page in src/app (the legacy copy stays in the JSON, unused)
// (/services/conversion-rate-optimization is the legacy spelling: it redirects to the live
// /services/conversation-rate-optimization — next.config.mjs)
const OWN_PAGES = new Set(["/", "/about-us", "/services", "/services/web-development", "/services/digital-marketing", "/services/conversion-rate-optimization", ...CHILD_SERVICE_PATHS, ...MARKETING_SERVICE_PATHS]);


export function generateStaticParams() {
  const routes = [...Object.keys(pages).filter((r) => !ALIASED_SOURCES.has(r)), ...Object.keys(ROUTE_ALIASES)];
  return routes.filter((r) => !OWN_PAGES.has(r)).map((r) => ({ slug: r.slice(1).split("/") }));
}

const routeOf = async (params) => "/" + (await params).slug.join("/");

export async function generateMetadata({ params }) {
  const route = await routeOf(params);
  return { ...pageMetadata(sourceOf(route)), alternates: { canonical: route } };
}

export default async function InnerPage({ params }) {
  const route = await routeOf(params);
  if (!getPage(sourceOf(route))) notFound();
  return <LegacyPage route={sourceOf(route)} />;
}
