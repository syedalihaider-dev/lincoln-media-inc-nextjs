import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import Hero from "./Hero/Hero";
import Intro from "./Intro/Intro";
import Head from "./Head";
import ScrollSync from "@/components/Common/ScrollSync";

const Solves = dynamic(() => import("./Solves/Solves"));
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const Process = dynamic(() => import("./Process/Process"));
const Technology = dynamic(() => import("./Technology/Technology"));
const Experience = dynamic(() => import("./Experience/Experience"));
const Faq = dynamic(() => import("../kit/Faq"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * The master design for the six E-commerce platform pages (/services/shopify, shopify-plus, woo-commerce,
 * magento, big-commerce, mirakl). One component, filled from src/data/ecommerce/inner/<slug>.js — never
 * edit it for a single page. Its own world, distinct from the category page: a specialist's dossier on
 * paper and ink, heavy uppercase Unbounded, a platform tab on every section. Ten sections:
 *   hero — the name across the page, a capsule opening to a full frame · intro — held statement,
 *   photograph uncovered · solves — problems struck through, solutions rising (held) · showcase — a
 *   browser standing up from the table, pins dropping (held) · capabilities — stacking cards ·
 *   process — a line drawn down the page · technology — a table wiping in · experience — footage with
 *   layered parallax · questions · close — a photograph opening in an arch.
 */
export default function EcomServicePage({ service: s }) {
  const url = `${SITE.url}${s.path}`;
  const platform = s.name;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.hero.kicker,
        serviceType: `${platform} development`,
        description: s.seo.description,
        url,
        areaServed: "US",
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
          { "@type": "ListItem", position: 3, name: "E-commerce Web Development", item: `${SITE.url}/services/ecommerce-web-development` },
          { "@type": "ListItem", position: 4, name: s.hero.kicker, item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <Hero data={s.hero} store={s.store} />
        <Intro data={s.intro} platform={platform} />
        <Solves data={s.solves} platform={platform} />
        <Showcase data={s.showcase} store={s.store} platform={platform} />
        <Capabilities data={s.capabilities} store={s.store} platform={platform} />
        <Process data={s.process} platform={platform} />
        <Technology data={s.technology} platform={platform} />
        <Experience data={s.experience} store={s.store} platform={platform} />
        <Faq data={s.faq} variant="inner" prompt={`Something else about ${platform}?`} head={<Head platform={platform} kicker={s.faq.kicker} title={s.faq.title} id="eci-faq" tone="ink" />} />
        <CTA data={s.cta} siblings={s.siblings} />
        <ScrollSync />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
