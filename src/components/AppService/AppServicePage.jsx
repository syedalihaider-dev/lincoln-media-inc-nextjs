import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { appSiblingsOf } from "@/data/app-services";
import Hero from "./Hero/Hero";
import Intro from "./Intro/Intro";

// Below the fold: their own chunks (still server-rendered)
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Technology = dynamic(() => import("./Technology/Technology"));
const Features = dynamic(() => import("./Features/Features"));
const Process = dynamic(() => import("./Process/Process"));
const FAQ = dynamic(() => import("./FAQ/FAQ"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * The master design for the Mobile App Development child pages (/services/<live-slug>). One layout,
 * one motion system, one visual language — the isometric "spec dossier": phones lying on a blueprint
 * plane, their layers lifted apart and put back together by the scroll. Everything comes from the
 * service's dataset (src/data/app-services). Nine sections, every page:
 *   hero — an exploded phone that assembles · intro — a statement lit word by word, photograph, facts ·
 *   capabilities — screens rising off the table · showcase — a held filmstrip of phones standing up
 *   as they pass · technology — the stack as exploded slabs · features — two rows sliding against
 *   each other · process — a line drawn down the page · questions · close — the phone stands up.
 */
export default function AppServicePage({ service: s }) {
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
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        isRelatedTo: { "@type": "Service", name: s.parent.name, url: `${SITE.url}${s.parent.href}` },
        hasOfferCatalog: { "@type": "OfferCatalog", name: s.name, itemListElement: s.capabilities.items.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, description: c.text } })) },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
          { "@type": "ListItem", position: 3, name: s.parent.name, item: `${SITE.url}${s.parent.href}` },
          { "@type": "ListItem", position: 4, name: s.name, item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  const ui = { platform: s.platform, accent: s.accent };

  return (
    <>
      <PageShell current="/services">
        <Hero service={s} ui={ui} />
        <Intro data={s.intro} />
        <Capabilities data={s.capabilities} ui={ui} />
        <Showcase data={s.screens} ui={ui} />
        <Technology data={s.stack} />
        <Features data={s.features} />
        <Process data={s.process} />
        <FAQ data={s.faq} />
        <CTA data={s.cta} ui={ui} parent={s.parent} siblings={appSiblingsOf(s.slug)} />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
