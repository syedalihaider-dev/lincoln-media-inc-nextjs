import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { siblingsOf } from "@/data/child-services";
import ChildHero from "./ChildHero";
import ChildIntro from "./ChildIntro";
import ChildVisual from "./ChildVisual";
import ChildExpertise from "./ChildExpertise";
import ChildProcess from "./ChildProcess";
import ChildTechnology from "./ChildTechnology";
import ChildShowcase from "./ChildShowcase";
import ChildCapabilities from "./ChildCapabilities";
import ChildEcosystem from "./ChildEcosystem";
import ChildOutcome from "./ChildOutcome";
import ChildFAQ from "./ChildFAQ";
import ChildCTA from "./ChildCTA";

/**
 * The master design for the Web Development child pages (/services/<live-slug>). One layout, one
 * motion system; everything on the page comes from the service's dataset (src/data/child-services).
 * Visuals are real: photography, and real interfaces written in HTML (./ui/Screens). Each section has
 * its own visual idea:
 *   hero — the product in perspective (site, editor, phone) · story — words lighting, three depths ·
 *   visual break — window opening to full bleed · expertise — editorial chapters, photograph + interface ·
 *   process — pinned horizontal photo timeline · technology — cinematic background, tech → outcome → act ·
 *   studio — pinned 3D carousel of interfaces · capabilities — pinned row opened by the scroll ·
 *   ecosystem — pinned window carrying a project from draft to site · outcome — full-bleed photograph ·
 *   questions — two-column accordion · close — photograph opening to full screen, sibling pages.
 * A section whose data is missing is left out.
 */
export default function ChildServicePage({ service: s }) {
  const url = `${SITE.url}${s.path}`;
  const photos = s.demo?.photos || []; // the generic demo site's photography, shared by every interface
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
        hasOfferCatalog: s.capabilities && { "@type": "OfferCatalog", name: s.name, itemListElement: s.capabilities.items.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, description: c.text } })) },
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
      s.faq && { "@type": "FAQPage", mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ].filter(Boolean),
  };

  return (
    <>
      <PageShell current="/services">
        <ChildHero service={s} />
        {s.intro && <ChildIntro data={s.intro} />}
        {s.visual && <ChildVisual data={s.visual} />}
        {s.expertise && <ChildExpertise data={s.expertise} photos={photos} ui={s.ui} />}
        {s.process && <ChildProcess data={s.process} />}
        {s.technology && <ChildTechnology data={s.technology} />}
        {s.showcase && <ChildShowcase data={s.showcase} photos={photos} ui={s.ui} />}
        {s.capabilities && <ChildCapabilities data={s.capabilities} />}
        {s.ecosystem && <ChildEcosystem data={s.ecosystem} photos={photos} ui={s.ui} />}
        {s.outcome && <ChildOutcome data={s.outcome} />}
        {s.faq && <ChildFAQ data={s.faq} />}
        {s.cta && <ChildCTA data={s.cta} parent={s.parent} siblings={siblingsOf(s.slug)} />}
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
