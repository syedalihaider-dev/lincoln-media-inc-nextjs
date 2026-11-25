import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import ScrollSync from "@/components/Common/ScrollSync";
import { SITE } from "@/data/site";
import { VIDEO_PAGE as d, VIDEO_PATH, VIDEO_CHILDREN } from "@/data/video-animation/main";
import Head from "../kit/Head";
import Hero from "./Hero/Hero";
import Motion from "./Motion/Motion";

const Reel = dynamic(() => import("./Reel/Reel"));
const Formats = dynamic(() => import("./Formats/Formats"));
const Interlude = dynamic(() => import("./Interlude/Interlude"));
const Pipeline = dynamic(() => import("./Pipeline/Pipeline"));
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Production = dynamic(() => import("./Production/Production"));
const Story = dynamic(() => import("./Story/Story"));
const Tech = dynamic(() => import("./Tech/Tech"));
const Faq = dynamic(() => import("@/components/Ecommerce/kit/Faq"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * /services/video-animation — the Video & Animation category page. Its own world: a film studio.
 * Black frames, letterbox bars, viewfinder marks and real timecodes; Unbounded set large and light;
 * real footage everywhere it earns its place, and live animation made in the page. Twelve scenes,
 * each with its own motion idea:
 *   opening — the film opens from a slit, credits roll · motion — a statement develops word by word,
 *   pictures open in the line · reel — a frame opens to full screen and plays its chapters · formats —
 *   an edit bin cutting a monitor · interlude — subtitles over a projector (held) · pipeline — a
 *   storyboard travelling over a timeline (pinned) · showcase — a cutting room of live pieces ·
 *   production — stacked call sheets · story — three acts in layers · technology — a compositor's
 *   layers driving a viewer · questions · final frame.
 */
export default function VideoPage() {
  const url = `${SITE.url}${VIDEO_PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", name: "Video Production & Animation", serviceType: "Video production and animation studio", description: d.seo.description, url, areaServed: "US",
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email, address: { "@type": "PostalAddress", streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: "NY", postalCode: "10065", addressCountry: "US" } },
        hasOfferCatalog: { "@type": "OfferCatalog", name: "Video & animation services", itemListElement: d.formats.items.map((f) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: f.name, description: f.text, ...(f.href ? { url: `${SITE.url}${f.href}` } : {}) } })) },
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
        { "@type": "ListItem", position: 3, name: "Video & Animation", item: url },
      ] },
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <Hero data={d.hero} />
        <Motion data={d.motion} />
        <Reel data={d.reel} />
        <Formats data={d.formats} />
        <Interlude data={d.interlude} />
        <Pipeline data={d.pipeline} />
        <Showcase data={d.showcase} />
        <Production data={d.production} />
        <Story data={d.story} />
        <Tech data={d.tech} />
        <Faq data={d.faq} variant="inner" prompt="Something else about your film?" head={<Head kicker={d.faq.kicker} title={d.faq.title} id="va-faq" />} />
        <CTA data={d.cta} kicker={d.cta.kicker} links={VIDEO_CHILDREN} />
        <ScrollSync />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

export function videoMetadata() {
  const s = d.seo;
  const images = [{ url: s.image, width: 1280, height: 720, alt: s.imageAlt }];
  return {
    title: { absolute: s.title }, description: s.description, keywords: s.keywords,
    alternates: { canonical: VIDEO_PATH }, robots: { index: true, follow: true },
    openGraph: { type: "website", url: VIDEO_PATH, title: s.title, description: s.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.title, description: s.description, images: images.map((i) => i.url) },
  };
}
