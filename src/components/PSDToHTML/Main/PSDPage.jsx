import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { PSD_PAGE as d, PSD_PATH } from "@/data/psd-to-html/main";
import { UIUX_PATH } from "@/data/ui-ux/main";
import { uiuxSiblings } from "@/data/ui-ux/children";
import Hero from "./Hero/Hero";
import Words from "./Words/Words";

const Pixel = dynamic(() => import("./Pixel/Pixel"));
const Responsive = dynamic(() => import("./Responsive/Responsive"));
const Architecture = dynamic(() => import("./Architecture/Architecture"));
const Tour = dynamic(() => import("./Tour/Tour"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const Performance = dynamic(() => import("./Performance/Performance"));
const Live = dynamic(() => import("./Live/Live"));
const QA = dynamic(() => import("./QA/QA"));
const FAQ = dynamic(() => import("@/components/DigitalMarketing/FAQ/FAQ"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * /services/psd-to-html — PSD to Responsive HTML, its own visual world: a developer's studio —
 * near-black, a faint baseline grid, cyan as the only colour, monospace labels — showing the same
 * "Meridian" site travelling from design file to production (src/components/DesignKit).
 *   hero — design file, code and browser on three planes (held) · words — DESIGN → CODE →
 *   EXPERIENCE in their own media (held) · pixel — split screen and onion skin (held) · responsive —
 *   three devices and a breakpoint ruler (held) · architecture — the code builds the page (held) ·
 *   tour — one browser, the page scrolling inside it (held) · capabilities — an editor's files
 *   (held) · performance — a test report · live — file to live site in one shot (held) · QA — a
 *   device lab (held) · FAQ · close.
 */
export default function PSDPage() {
  const url = `${SITE.url}${PSD_PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", name: "PSD to Responsive HTML", serviceType: "Design to HTML/CSS conversion", description: d.seo.description, url, areaServed: "US",
        isRelatedTo: { "@type": "Service", name: "UI/UX Design", url: `${SITE.url}${UIUX_PATH}` },
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Design to code services", itemListElement: d.capabilities.items.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, description: c.text } })) },
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` }, { "@type": "ListItem", position: 3, name: "UI/UX Design", item: `${SITE.url}${UIUX_PATH}` }, { "@type": "ListItem", position: 4, name: "PSD to Responsive HTML", item: url }] },
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  return (
    <>
      <PageShell current="/services">
        <Hero data={d.hero} />
        <Words data={d.words} />
        <Pixel data={d.pixel} />
        <Responsive data={d.responsive} />
        <Architecture data={d.architecture} />
        <Tour data={d.tour} />
        <Capabilities data={d.capabilities} />
        <Performance data={d.performance} />
        <Live data={d.live} />
        <QA data={d.qa} />
        <FAQ data={d.faq} />
        <CTA data={d.cta} links={uiuxSiblings("psd-to-html")} />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function psdMetadata() {
  const s = d.seo;
  const images = [{ url: s.image.src, width: s.image.width, height: s.image.height, alt: s.imageAlt }];
  return {
    title: { absolute: s.title }, description: s.description, keywords: s.keywords,
    alternates: { canonical: PSD_PATH }, robots: { index: true, follow: true },
    openGraph: { type: "website", url: PSD_PATH, title: s.title, description: s.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: images.map((i) => i.url) },
  };
}
