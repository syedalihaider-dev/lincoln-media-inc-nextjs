import PageShell from "@/components/Common/PageShell";
import InnerServiceHero from "./InnerServiceHero";
import ServiceIntro from "./ServiceIntro";
import ServiceCapabilities from "./ServiceCapabilities";
import TechnologyExperience from "./TechnologyExperience";
import ServiceDetails from "./ServiceDetails";
import WhyLincoln from "./WhyLincoln";
import DevelopmentProcess from "./DevelopmentProcess";
import ServiceShowcase from "./ServiceShowcase";
import ServiceFAQ from "./ServiceFAQ";
import ServiceCTA from "./ServiceCTA";
import { SITE } from "@/data/site";

/**
 * The inner service page: one design system for every /services/<slug> page. Everything on the page
 * comes from the service's data object (src/data/inner-services/<slug>.js); a section whose data is
 * missing is simply left out, so services with less material still get a complete page.
 */
export default function InnerServicePage({ service: s }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.seo.description,
    url: `${SITE.url}${s.path}`,
    provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
    hasOfferCatalog: s.capabilities && { "@type": "OfferCatalog", name: s.name, itemListElement: s.capabilities.items.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name } })) },
  };
  const faqLd = s.faq && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <PageShell current="/services">
        <InnerServiceHero service={s} />
        {s.intro && <ServiceIntro data={s.intro} />}
        {s.capabilities && <ServiceCapabilities data={s.capabilities} />}
        {s.technology && <TechnologyExperience data={s.technology} />}
        {s.details && <ServiceDetails data={s.details} />}
        {s.why && <WhyLincoln data={s.why} />}
        {s.process && <DevelopmentProcess data={s.process} />}
        {s.showcase && <ServiceShowcase data={s.showcase} motif={s.motif} />}
        {s.faq && <ServiceFAQ data={s.faq} />}
        {s.cta && <ServiceCTA data={s.cta} />}
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
    </>
  );
}
