import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import ScrollSync from "@/components/Common/ScrollSync";
import { SITE } from "@/data/site";
import { brandVars } from "../kit/Identity";
import Hero from "./Hero/Hero";
import Intro from "./Intro/Intro";
import Head from "./Head";

const Challenge = dynamic(() => import("./Challenge/Challenge"));
const Solution = dynamic(() => import("./Solution/Solution"));
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const Process = dynamic(() => import("./Process/Process"));
const Experience = dynamic(() => import("./Experience/Experience"));
const Faq = dynamic(() => import("@/components/Ecommerce/kit/Faq"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * The master design for the five Branding & Communication service pages (/services/logo-design,
 * corporate-identity-design, business-card-design, brochure-design, packaging-designs). One component,
 * filled from src/data/branding/inner/<slug>.js — never edit it for a single page. Its own world,
 * distinct from the category page: a brand book on warm paper, mixed-case Unbounded, a running folio,
 * and each page tinted by its own demo brand. Ten sections:
 *   hero — a spread with the artefact across the fold · intro — magazine page, image growing ·
 *   challenge — scattered notes pulled into order · solution — a spotlight moving over the artefact ·
 *   showcase — a deck of plates fanning out · capabilities — a contents list wiping in · process —
 *   index cards lifted off a pile (held) · experience — footage with a drifting reel · questions · close.
 */
export default function BrandServicePage({ service: s }) {
  const url = `${SITE.url}${s.path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Service", name: s.hero.kicker, serviceType: s.name, description: s.seo.description, url, areaServed: "US", provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
        { "@type": "ListItem", position: 3, name: "Digital Branding & Communication", item: `${SITE.url}/services/branding-communication-agency` },
        { "@type": "ListItem", position: 4, name: s.hero.kicker, item: url },
      ] },
      { "@type": "FAQPage", mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <div style={brandVars(s.brand)}>
          <Hero data={s.hero} brand={s.brand} />
          <Intro data={s.intro} service={s.name} />
          <Challenge data={s.challenge} service={s.name} />
          <Solution data={s.solution} brand={s.brand} service={s.name} />
          <Showcase data={s.showcase} brand={s.brand} service={s.name} />
          <Capabilities data={s.capabilities} service={s.name} />
          <Process data={s.process} service={s.name} />
          <Experience data={s.experience} brand={s.brand} service={s.name} />
          <Faq data={s.faq} variant="paper" prompt={`Something else about ${s.name.toLowerCase()}?`} head={<Head service={s.name} kicker={s.faq.kicker} title={s.faq.title} id="bsi-faq" />} />
          <CTA data={s.cta} brand={s.brand} siblings={s.siblings} />
        </div>
        <ScrollSync />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
