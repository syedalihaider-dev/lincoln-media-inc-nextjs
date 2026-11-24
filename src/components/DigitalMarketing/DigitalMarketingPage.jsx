import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { DM_PAGE as d, DM_PATH, DM_SERVICES } from "@/data/digital-marketing";
import StoryRail from "./StoryRail";
import Hero from "./Hero/Hero";
import AttentionToConversion from "./AttentionToConversion/AttentionToConversion";

// Below the fold: each section is its own chunk so the hero's code arrives first (still server-rendered)
const Ecosystem = dynamic(() => import("./Ecosystem/Ecosystem"));
const VideoStory = dynamic(() => import("./VideoStory/VideoStory"));
const Performance = dynamic(() => import("./Performance/Performance"));
const SEOJourney = dynamic(() => import("./SEOJourney/SEOJourney"));
const PaidMedia = dynamic(() => import("./PaidMedia/PaidMedia"));
const SocialContent = dynamic(() => import("./SocialContent/SocialContent"));
const ContentStory = dynamic(() => import("./ContentStory/ContentStory"));
const CustomerJourney = dynamic(() => import("./CustomerJourney/CustomerJourney"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const GrowthLoop = dynamic(() => import("./GrowthLoop/GrowthLoop"));
const CinematicImage = dynamic(() => import("./CinematicImage/CinematicImage"));
const FAQ = dynamic(() => import("./FAQ/FAQ"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * /services/digital-marketing — one continuous story, Attention → Strategy → Traffic → Engagement →
 * Conversion → Measurement → Optimization → Growth, told through a single demo campaign (a fictional
 * Midtown hotel) whose real interfaces — search, ads, social, landing page, checkout, analytics —
 * reappear from chapter to chapter (src/components/DigitalMarketing/ui). A small fixed rail names
 * the chapter. Every section has its own motion idea; see each component's header.
 */
export default function DigitalMarketingPage() {
  const url = `${SITE.url}${DM_PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Digital Marketing",
        serviceType: "Digital marketing",
        description: d.seo.description,
        url,
        areaServed: "US",
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital marketing services",
          itemListElement: DM_SERVICES.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, url: `${SITE.url}${c.href}` } })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
          { "@type": "ListItem", position: 3, name: "Digital Marketing", item: url },
        ],
      },
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <Hero data={d.hero} />
        <AttentionToConversion data={d.attention} />
        <Ecosystem data={d.ecosystem} />
        <VideoStory data={d.video} />
        <Performance data={d.performance} />
        <SEOJourney data={d.search} />
        <PaidMedia data={d.paid} />
        <SocialContent data={d.social} />
        <ContentStory data={d.content} />
        <CustomerJourney data={d.journey} />
        <Capabilities data={d.capabilities} />
        <GrowthLoop data={d.growth} />
        <CinematicImage data={d.cinematic} />
        <FAQ data={d.faq} />
        <CTA data={d.cta} links={DM_SERVICES} />
        <StoryRail />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function digitalMarketingMetadata() {
  const s = d.seo;
  const images = [{ url: s.image.src, width: s.image.width, height: s.image.height, alt: s.imageAlt }];
  return {
    title: { absolute: s.title },
    description: s.description,
    keywords: s.keywords,
    alternates: { canonical: DM_PATH },
    robots: { index: true, follow: true },
    openGraph: { type: "website", url: DM_PATH, title: s.title, description: s.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: images.map((i) => i.url) },
  };
}
