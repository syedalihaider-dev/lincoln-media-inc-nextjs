import PageShell from "@/components/Common/PageShell";
import InnerServiceHero from "./InnerServiceHero";
import ServiceIntro from "./ServiceIntro";
import ExperienceShowcase from "./ExperienceShowcase";
import ServiceBuild from "./ServiceBuild";
import ServiceCapabilities from "./ServiceCapabilities";
import TechnologyArchitecture from "./TechnologyArchitecture";
import ServiceProcess from "./ServiceProcess";
import ResponsiveExperience from "./ResponsiveExperience";
import PerformanceSection from "./PerformanceSection";
import InteractiveLens from "./InteractiveLens";
import ServiceFAQ from "./ServiceFAQ";
import ServiceCTA from "./ServiceCTA";
import { SITE } from "@/data/site";

/**
 * The inner service page: one design system for every /services/<slug> page, filled from the
 * service's data object (src/data/inner-services/<slug>.js). Each section has its own visual idea
 * and motion; a section whose data is missing is simply left out, so services with less material
 * still get a complete page. Order:
 * hero → presence → experience → what we build → capabilities → architecture → process →
 * every screen → quality → beneath the surface → questions → close.
 */
export default function InnerServicePage({ service: s }) {
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
        hasOfferCatalog: s.build && { "@type": "OfferCatalog", name: s.name, itemListElement: s.build.items.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, description: c.text, ...(c.href ? { url: `${SITE.url}${c.href}` } : {}) } })) },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
          { "@type": "ListItem", position: 3, name: s.name, item: url },
        ],
      },
      s.faq && {
        "@type": "FAQPage",
        mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ].filter(Boolean),
  };

  return (
    <>
      <PageShell current="/services">
        <InnerServiceHero service={s} />
        {s.intro && <ServiceIntro data={s.intro} />}
        {s.experience && <ExperienceShowcase data={s.experience} />}
        {s.build && <ServiceBuild data={s.build} />}
        {s.capabilities && <ServiceCapabilities data={s.capabilities} />}
        {s.architecture && <TechnologyArchitecture data={s.architecture} />}
        {s.process && <ServiceProcess data={s.process} image={s.devices?.image || s.experience?.image} />}
        {s.devices && <ResponsiveExperience data={s.devices} />}
        {s.quality && <PerformanceSection data={s.quality} />}
        {s.interactive && <InteractiveLens data={s.interactive} />}
        {s.faq && <ServiceFAQ data={s.faq} />}
        {s.cta && <ServiceCTA data={s.cta} />}
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
