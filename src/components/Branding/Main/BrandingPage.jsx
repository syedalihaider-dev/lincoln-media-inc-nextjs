import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import ScrollSync from "@/components/Common/ScrollSync";
import { SITE } from "@/data/site";
import { BRAND_PAGE as d, BRAND_PATH, BRAND_CHILDREN } from "@/data/branding/main";
import Hero from "./Hero/Hero";
import Perception from "./Perception/Perception";
import Head from "./Head";
import { ROBOTS } from "@/config/site";

const Transformation = dynamic(() => import("./Transformation/Transformation"));
const Film = dynamic(() => import("./Film/Film"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Ecosystem = dynamic(() => import("./Ecosystem/Ecosystem"));
const Direction = dynamic(() => import("./Direction/Direction"));
const Process = dynamic(() => import("./Process/Process"));
const Experience = dynamic(() => import("./Experience/Experience"));
const Faq = dynamic(() => import("@/components/Ecommerce/kit/Faq"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * /services/branding-communication-agency — the Branding & Communication category page. Its own world:
 * an art-directed studio — heavy Unbounded at poster scale, ink chapters and paper spreads, real
 * footage and photography, and one demo identity (Oro) built in HTML across every artefact (../kit).
 * Twelve sections, each with its own motion idea:
 *   hero — film opening from one stroke, headline in difference blend · perception — words inked by
 *   the scroll · transformation — before → after in four stages (held) · film — lines wiped open ·
 *   capabilities — an index with a picture that follows the pointer · showcase — a reel of cuts (held) ·
 *   ecosystem — a switchboard of channels · direction — a growing frame under drifting words (sticky) ·
 *   process — a sideways pinboard (held) · experience — a layered collage · questions · close.
 */
export default function BrandingPage() {
  const url = `${SITE.url}${BRAND_PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", name: "Digital Branding & Communication", serviceType: "Branding and communication agency", description: d.seo.description, url, areaServed: "US",
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Branding services", itemListElement: BRAND_CHILDREN.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.full, url: `${SITE.url}${c.path}` } })) },
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
        { "@type": "ListItem", position: 3, name: "Digital Branding & Communication", item: url },
      ] },
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <Hero data={d.hero} brand={d.brand} />
        <Perception data={d.perception} />
        <Transformation data={d.transformation} brand={d.brand} />
        <Film data={d.film} />
        <Capabilities data={d.capabilities} />
        <Showcase data={d.showcase} brand={d.brand} />
        <Ecosystem data={d.ecosystem} brand={d.brand} />
        <Direction data={d.direction} />
        <Process data={d.process} brand={d.brand} />
        <Experience data={d.experience} brand={d.brand} />
        <Faq data={d.faq} variant="paper" prompt="Something else about your brand?" head={<Head kicker={d.faq.kicker} title={d.faq.title} id="brand-faq" tone="paper" />} />
        <CTA data={d.cta} links={BRAND_CHILDREN} />
        <ScrollSync />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function brandingMetadata() {
  const s = d.seo;
  const images = [{ url: s.image.src, width: s.image.width, height: s.image.height, alt: s.imageAlt }];
  return {
    title: { absolute: s.title }, description: s.description, keywords: s.keywords,
    alternates: { canonical: BRAND_PATH }, robots: ROBOTS,
    openGraph: { type: "website", url: BRAND_PATH, title: s.title, description: s.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: images.map((i) => i.url) },
  };
}
