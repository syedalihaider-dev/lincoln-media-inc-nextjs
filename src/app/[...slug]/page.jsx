import { notFound } from "next/navigation";
import pages from "@/data/legacy-pages.json";
import LegacyPage, { getPage, pageMetadata } from "@/components/Legacy/LegacyPage";

// All inner pages (services, work, policies) — pre-rendered at build time
export const dynamicParams = false;

// Routes that now have their own page in src/app (the legacy copy stays in the JSON, unused)
const OWN_PAGES = new Set(["/", "/about-us", "/services", "/services/web-development"]);

export function generateStaticParams() {
  return Object.keys(pages).filter((r) => !OWN_PAGES.has(r)).map((r) => ({ slug: r.slice(1).split("/") }));
}

const routeOf = async (params) => "/" + (await params).slug.join("/");

export async function generateMetadata({ params }) {
  return pageMetadata(await routeOf(params));
}

export default async function InnerPage({ params }) {
  const route = await routeOf(params);
  if (!getPage(route)) notFound();
  return <LegacyPage route={route} />;
}
