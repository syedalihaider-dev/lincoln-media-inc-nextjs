import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { UIUX_PAGE as d, UIUX_PATH } from "@/data/ui-ux/main";
import { UIUX_CHILDREN } from "@/data/ui-ux/children";
import Hero from "./Hero/Hero";
import Statement from "./Statement/Statement";
import { ROBOTS } from "@/config/site";

// Below the fold: each section is its own chunk so the hero's code arrives first (still server-rendered)
const Journey = dynamic(() => import("./Journey/Journey"));
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Responsive = dynamic(() => import("./Responsive/Responsive"));
const System = dynamic(() => import("./System/System"));
const Motion = dynamic(() => import("./Motion/Motion"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const Transform = dynamic(() => import("./Transform/Transform"));
const Quality = dynamic(() => import("./Quality/Quality"));
const FAQ = dynamic(() => import("@/components/DigitalMarketing/FAQ/FAQ"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * /services/ui-ux-design — the UI/UX Design category page, a design studio's own visual world:
 * warm ink and paper, clay accents, and one product ("Meridian", fictional) shown at every stage of
 * its design — research board, sitemap, wireframe, prototype, finished UI (src/components/DesignKit).
 *   hero — a fan of real screens opening in depth (held) · statement — paper spread, type, photo and
 *   UI fragments on three layers · journey — one frame refined stage by stage (held) · showcase —
 *   a 3D gallery walk (held) · responsive — one device narrowing 1280 → 390 while the page reflows
 *   (held) · system — scattered components assembling into the page (held) · motion — a prototype
 *   playing its interactions (held) · capabilities — a typographic index that breathes (held) ·
 *   transform — wireframe → product as one shot (held) · quality — a design review (held) · FAQ · close.
 */
export default function UIUXPage() {
  const url = `${SITE.url}${UIUX_PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", name: "UI/UX Design", serviceType: "User experience and interface design", description: d.seo.description, url, areaServed: "US",
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        hasOfferCatalog: { "@type": "OfferCatalog", name: "UI/UX design services", itemListElement: UIUX_CHILDREN.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, url: `${SITE.url}${c.path}` } })) },
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` }, { "@type": "ListItem", position: 3, name: "UI/UX Design", item: url }] },
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <Hero data={d.hero} />
        <Statement data={d.statement} />
        <Journey data={d.journey} />
        <Showcase data={d.showcase} />
        <Responsive data={d.responsive} />
        <System data={d.system} />
        <Motion data={d.motion} />
        <Capabilities data={d.capabilities} />
        <Transform data={d.transform} />
        <Quality data={d.quality} />
        <FAQ data={d.faq} />
        <CTA data={d.cta} links={UIUX_CHILDREN} />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function uiuxMetadata() {
  const s = d.seo;
  const images = [{ url: s.image.src, width: s.image.width, height: s.image.height, alt: s.imageAlt }];
  return {
    title: { absolute: s.title }, description: s.description, keywords: s.keywords,
    alternates: { canonical: UIUX_PATH }, robots: ROBOTS,
    openGraph: { type: "website", url: UIUX_PATH, title: s.title, description: s.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: images.map((i) => i.url) },
  };
}
