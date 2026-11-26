import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { ECOM_PAGE as d, ECOM_PATH, ECOM_CHILDREN } from "@/data/ecommerce/main";
import Hero from "./Hero/Hero";
import Experience from "./Experience/Experience";
import Head from "./Head";
import ScrollSync from "@/components/Common/ScrollSync";
import { ROBOTS } from "@/config/site";

// Below the fold: their own chunks so the hero's code arrives first (still server-rendered)
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Film = dynamic(() => import("./Film/Film"));
const Build = dynamic(() => import("./Build/Build"));
const Architecture = dynamic(() => import("./Architecture/Architecture"));
const Conversion = dynamic(() => import("./Conversion/Conversion"));
const Journey = dynamic(() => import("./Journey/Journey"));
const Process = dynamic(() => import("./Process/Process"));
const Quality = dynamic(() => import("./Quality/Quality"));
const Faq = dynamic(() => import("../kit/Faq"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * /services/ecommerce-web-development — the E-commerce category page. Its own world: cinematic and
 * editorial — real footage and photography, mixed-case Unbounded 500, paper spreads between dark
 * chapters — with every interface a real HTML storefront (../kit). Twelve sections, each with its
 * own motion idea:
 *   hero — a window of footage opening to full bleed (held) · experience — words inking in, images
 *   uncovered · showcase — a mosaic settling out of depth · film — the inset footage opening (held) ·
 *   build — a scroll-read index driving a wiping browser · architecture — four slabs parting (held) ·
 *   conversion — drifting words and eight working fragments · journey — a cursor buying (held) ·
 *   process — a sideways track (held) · quality — specs over a slow photograph · questions · close.
 */
export default function EcommercePage() {
  const url = `${SITE.url}${ECOM_PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "E-commerce Web Development",
        serviceType: "E-commerce website development",
        description: d.seo.description,
        url,
        areaServed: "US",
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "E-commerce development services",
          itemListElement: ECOM_CHILDREN.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.full, url: `${SITE.url}${c.path}` } })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
          { "@type": "ListItem", position: 3, name: "E-commerce Web Development", item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <Hero data={d.hero} />
        <Experience data={d.experience} />
        <Showcase data={d.showcase} />
        <Film data={d.film} />
        <Build data={d.build} />
        <Architecture data={d.architecture} />
        <Conversion data={d.conversion} />
        <Journey data={d.journey} />
        <Process data={d.process} />
        <Quality data={d.quality} />
        <Faq data={d.faq} variant="paper" prompt="Something else about your store?" head={<Head kicker={d.faq.kicker} title={d.faq.title} id="ecom-faq" tone="paper" />} />
        <CTA data={d.cta} links={ECOM_CHILDREN} />
        <ScrollSync />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function ecommerceMetadata() {
  const s = d.seo;
  const images = [{ url: s.image.src, width: s.image.width, height: s.image.height, alt: s.imageAlt }];
  return {
    title: { absolute: s.title },
    description: s.description,
    keywords: s.keywords,
    alternates: { canonical: ECOM_PATH },
    robots: ROBOTS,
    openGraph: { type: "website", url: ECOM_PATH, title: s.title, description: s.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: images.map((i) => i.url) },
  };
}
