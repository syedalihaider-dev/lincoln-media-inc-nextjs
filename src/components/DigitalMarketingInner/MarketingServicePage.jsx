import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { DM_PATH } from "@/data/digital-marketing";
import { marketingSiblings } from "@/data/marketing-services";
import Hero from "./Hero/Hero";
import Intro from "./Intro/Intro";

// Below the fold: each section is its own chunk so the hero's code arrives first (still server-rendered)
const Does = dynamic(() => import("./Does/Does"));
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Process = dynamic(() => import("./Process/Process"));
const Technology = dynamic(() => import("./Technology/Technology"));
const Results = dynamic(() => import("./Results/Results"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const FAQ = dynamic(() => import("@/components/DigitalMarketing/FAQ/FAQ"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * The master design for the ten Digital Marketing service pages (/services/<live slug>). One layout,
 * one motion system; everything that differs — copy, photography, film, the demo interfaces each
 * section shows, FAQs, SEO — comes from that service's dataset in src/data/marketing-services.
 *   hero — the lead screen stands up off a lit plinth · intro — statement lines slide and fill ·
 *   what it does — four panels hand the width to one another (held) · showcase — a masked
 *   filmstrip (held, sideways) · process — a slot-counter of stages and a flipping deck (held) ·
 *   technology — an exploded stack of interfaces (held) · results — before → optimization → after
 *   on one screen (held) · capabilities — a list that drives one held picture · questions · close.
 */
export default function MarketingServicePage({ service: s }) {
  const url = `${SITE.url}${s.path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.name,
        serviceType: s.name,
        description: s.seo.description,
        url,
        areaServed: "US",
        category: "Digital marketing",
        isRelatedTo: { "@type": "Service", name: "Digital Marketing", url: `${SITE.url}${DM_PATH}` },
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        hasOfferCatalog: { "@type": "OfferCatalog", name: `${s.name} services`, itemListElement: s.capabilities.items.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, description: c.text } })) },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
          { "@type": "ListItem", position: 3, name: "Digital Marketing", item: `${SITE.url}${DM_PATH}` },
          { "@type": "ListItem", position: 4, name: s.name, item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <Hero service={s} />
        <Intro data={s.intro} />
        <Does data={s.does} />
        <Showcase data={s.showcase} />
        <Process data={s.process} />
        <Technology data={s.tech} />
        <Results data={s.results} />
        <Capabilities data={s.capabilities} />
        <FAQ data={s.faq} />
        <CTA service={s} siblings={marketingSiblings(s.slug)} />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
