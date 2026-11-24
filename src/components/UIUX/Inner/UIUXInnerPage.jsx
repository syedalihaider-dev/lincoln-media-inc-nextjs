import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { UIUX_PATH } from "@/data/ui-ux/main";
import { uiuxSiblings } from "@/data/ui-ux/children";
import Hero from "./Hero/Hero";
import Intro from "./Intro/Intro";

const Method = dynamic(() => import("./Method/Method"));
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const System = dynamic(() => import("./System/System"));
const Process = dynamic(() => import("./Process/Process"));
const Results = dynamic(() => import("./Results/Results"));
const FAQ = dynamic(() => import("@/components/DigitalMarketing/FAQ/FAQ"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * The master design for the design-led UI/UX service pages (ux-design, ux-workshops, ux-audit,
 * graphic-design-services) — a case study on paper: cover → brief → method (affinity map, held) →
 * the file's canvas (camera flight, held) → spec sheets piling up → a live component inspector
 * (held) → before/after with the process (held) → session replay (held) → questions → zoom-out close.
 * One layout; everything that differs comes from the page's dataset in src/data/ui-ux/inner.
 */
export default function UIUXInnerPage({ service: s }) {
  const url = `${SITE.url}${s.path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", name: s.name, serviceType: s.name, description: s.seo.description, url, areaServed: "US", category: "UI/UX design",
        isRelatedTo: { "@type": "Service", name: "UI/UX Design", url: `${SITE.url}${UIUX_PATH}` },
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        hasOfferCatalog: { "@type": "OfferCatalog", name: `${s.name} services`, itemListElement: s.capabilities.items.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, description: c.text } })) },
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` }, { "@type": "ListItem", position: 3, name: "UI/UX Design", item: `${SITE.url}${UIUX_PATH}` }, { "@type": "ListItem", position: 4, name: s.name, item: url }] },
      { "@type": "FAQPage", mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  return (
    <>
      <PageShell current="/services">
        <Hero service={s} />
        <Intro data={s.intro} />
        <Method data={s.method} />
        <Showcase data={s.showcase} />
        <Capabilities data={s.capabilities} />
        <System data={s.system} />
        <Process data={s.process} />
        <Results data={s.results} />
        <FAQ data={s.faq} />
        <CTA service={s} siblings={uiuxSiblings(s.slug)} />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
