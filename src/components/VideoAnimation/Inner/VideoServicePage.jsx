import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import ScrollSync from "@/components/Common/ScrollSync";
import { SITE } from "@/data/site";
import { getVideoInner, videoSiblings } from "@/data/video-animation/inner";
import Head from "../kit/Head";
import Hero from "./Hero/Hero";
import Story from "./Story/Story";
import styles from "./VideoServicePage.module.css";

const Does = dynamic(() => import("./Does/Does"));
const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Capabilities = dynamic(() => import("./Capabilities/Capabilities"));
const Process = dynamic(() => import("./Process/Process"));
const Creative = dynamic(() => import("./Creative/Creative"));
const Quality = dynamic(() => import("./Quality/Quality"));
const Faq = dynamic(() => import("@/components/Ecommerce/kit/Faq"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * The master design for the Video & Animation service pages (/services/explainer-videos,
 * /services/whiteboard-videos-animation). One layout, one motion system; everything else comes from
 * the page's data (src/data/video-animation/inner/<slug>.js) — copy, footage, stills, the working
 * artefact (an animatic or a self-drawing board), process, checks, questions, SEO — and its theme:
 * "dark" (a screen) or "light" (a white board), set as tokens on the wrapper.
 *   hero — widescreen frame + monitor · story — editorial opener · does — jobs as a two-shot card ·
 *   showcase — iris reveal, held · capabilities — rack focus · process — a film strip exposing ·
 *   creative — the artefact, live · quality — a QC sheet ticked off · questions · close.
 */
export default function VideoServicePage({ slug }) {
  const s = getVideoInner(slug);
  const path = `/services/${slug}`;
  const url = `${SITE.url}${path}`;
  const tone = s.theme === "light" ? "light" : "dark";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", name: s.name, serviceType: s.name, description: s.seo.description, url, areaServed: "US",
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        isRelatedTo: { "@type": "Service", name: "Video & Animation", url: `${SITE.url}/services/video-animation` },
        hasOfferCatalog: { "@type": "OfferCatalog", name: `${s.name} capabilities`, itemListElement: s.capabilities.items.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, description: c.text } })) },
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.url}/services` },
        { "@type": "ListItem", position: 3, name: "Video & Animation", item: `${SITE.url}/services/video-animation` },
        { "@type": "ListItem", position: 4, name: s.name, item: url },
      ] },
      { "@type": "FAQPage", mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };

  return (
    <>
      <PageShell current="/services">
        <div className={`${styles.page} ${styles[s.theme]}`}>
          <Hero data={s.hero} page={s} />
          <Story data={s.story} />
          <Does data={s.does} tone={tone} />
          <Showcase data={s.showcase} />
          <Capabilities data={s.capabilities} tone={tone} />
          <Process data={s.process} tone={tone} />
          <Creative data={s.creative} page={s} tone={tone} />
          <Quality data={s.quality} page={s} tone={tone} />
          <Faq data={s.faq} variant={tone === "light" ? "paper" : "inner"} prompt={`Something else about ${s.short.toLowerCase()}?`} head={<Head kicker={s.faq.kicker} title={s.faq.title} id="vs-faq" tone={tone} />} />
          <CTA data={s.cta} siblings={videoSiblings(slug)} />
        </div>
        <ScrollSync />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
