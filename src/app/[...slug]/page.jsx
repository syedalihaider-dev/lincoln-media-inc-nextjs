import { notFound } from "next/navigation";
import pages from "@/data/legacy-pages.json";
import LegacyPage, { getPage, pageMetadata } from "@/components/Legacy/LegacyPage";

// All inner pages (services, work, about, policies) — pre-rendered at build time
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pages).filter((r) => r !== "/").map((r) => ({ slug: r.slice(1).split("/") }));
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
