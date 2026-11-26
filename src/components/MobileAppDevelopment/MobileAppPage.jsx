import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { MOBILE_PAGE as d, MOBILE_PATH, MOBILE_CHILDREN } from "@/data/mobile-app-development";
import Hero from "./Hero/Hero";
import AppExperience from "./AppExperience/AppExperience";
import WhatWeBuild from "./WhatWeBuild/WhatWeBuild";
import { ROBOTS } from "@/config/site";

// Below the fold: split into their own chunks so the hero's code arrives first (still server-rendered)
const ProductJourney = dynamic(() => import("./ProductJourney/ProductJourney"));
const UXShowcase = dynamic(() => import("./UXShowcase/UXShowcase"));
const Technology = dynamic(() => import("./Technology/Technology"));
const AppShowcase = dynamic(() => import("./AppShowcase/AppShowcase"));
const Performance = dynamic(() => import("./Performance/Performance"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const ConceptToApp = dynamic(() => import("./ConceptToApp/ConceptToApp"));
const FAQ = dynamic(() => import("./FAQ/FAQ"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * /services/mobile-app-development — the Mobile App Development category page. Its own visual world:
 * solid phones in CSS 3D holding real app interfaces (src/components/MobileApp), seen in perspective
 * and lit like a product film. Twelve sections, each with its own motion idea:
 *   hero — three phones in one lit space, the main app moving from browsing to an order (held) ·
 *   experience — idea to product as panes passing in depth · build — the list drives one phone ·
 *   journey — strategy to launch, held, the phone and its working documents changing ·
 *   design — five screens on a paper table moving from a row to a fan · technology — the
 *   architecture rising off the table and connecting · showcase — a held phone you walk through ·
 *   quality — instrument panels sweeping in on a diagonal · capabilities — stacked cards ·
 *   concept — one screen wiped from wireframe to finished app (held) · questions · close.
 */
export default function MobileAppPage() {
  const url = `${SITE.url}${MOBILE_PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Mobile App Development",
        serviceType: "Mobile application development",
        description: d.seo.description,
        url,
        areaServed: "US",
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mobile App Development services",
          itemListElement: MOBILE_CHILDREN.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, url: `${SITE.url}${c.path}` } })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
          { "@type": "ListItem", position: 3, name: "Mobile App Development", item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <Hero data={d.hero} />
        <AppExperience data={d.experience} />
        <WhatWeBuild data={d.build} />
        <ProductJourney data={d.journey} />
        <UXShowcase data={d.design} />
        <Technology data={d.technology} />
        <AppShowcase data={d.showcase} />
        <Performance data={d.quality} />
        <Capabilities data={d.capabilities} />
        <ConceptToApp data={d.concept} />
        <FAQ data={d.faq} />
        <CTA data={d.cta} links={MOBILE_CHILDREN} />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function mobileAppMetadata() {
  const s = d.seo;
  const images = [{ url: s.image.src, width: s.image.width, height: s.image.height, alt: s.imageAlt }];
  return {
    title: { absolute: s.title },
    description: s.description,
    keywords: s.keywords,
    alternates: { canonical: MOBILE_PATH },
    robots: ROBOTS,
    openGraph: { type: "website", url: MOBILE_PATH, title: s.title, description: s.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: images.map((i) => i.url) },
  };
}
