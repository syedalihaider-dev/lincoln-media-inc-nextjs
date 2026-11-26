import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import ScrollSync from "@/components/Common/ScrollSync";
import Head from "@/components/ServicePage/Head";
import { serviceMetadata, serviceJsonLd, JsonLd } from "@/components/ServicePage/seo";
import { AI_PAGE as d, AI_PATH, AI_OFFERS } from "@/data/services/aiSaasMobile";
import Hero from "./Hero/Hero";
import Vision from "./Vision/Vision";

const Showcase = dynamic(() => import("./Showcase/Showcase"));
const Film = dynamic(() => import("./Film/Film"));
const Build = dynamic(() => import("./Build/Build"));
const Architecture = dynamic(() => import("./Architecture/Architecture"));
const Mobile = dynamic(() => import("./Mobile/Mobile"));
const Ecosystem = dynamic(() => import("./Ecosystem/Ecosystem"));
const Scale = dynamic(() => import("./Scale/Scale"));
const Process = dynamic(() => import("./Process/Process"));
const Faq = dynamic(() => import("@/components/Ecommerce/kit/Faq"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * /services/ai-saas-mobile — AI, SaaS & Mobile Apps. Its own world: a product lab at night. One
 * fictional product ("Halden", labelled as a demo) runs through the whole page as real interfaces —
 * console, technician app, assistant — so every claim is shown working. Rhythm:
 *   interface (hero) → typography (vision) → interface (showcase, sticky) → video (film opens) →
 *   interactive index (build) → 3D layered stack (architecture) → devices over photography (mobile,
 *   pinned) → paper chapter (ecosystem trace, pinned) → image (scale dial) → horizontal process →
 *   questions → video CTA.
 */
export default function AiSaasMobilePage() {
  const note = d.demo.note;
  return (
    <>
      <PageShell current="/services">
        <Hero data={d.hero} note={note} />
        <Vision data={d.vision} />
        <Showcase data={d.showcase} note={note} />
        <Film data={d.film} />
        <Build data={d.build} note={note} />
        <Architecture data={d.architecture} />
        <Mobile data={d.mobile} />
        <Ecosystem data={d.ecosystem} />
        <Scale data={d.scale} />
        <Process data={d.process} />
        <Faq data={d.faq} variant="inner" prompt="Something else about your product?" head={<Head kicker={d.faq.kicker} title={d.faq.title} id="ai-faq" />} />
        <CTA data={d.cta} />
        <ScrollSync />
      </PageShell>
      <JsonLd data={serviceJsonLd({
        path: AI_PATH, name: "AI, SaaS & Mobile App Development", serviceType: "AI, SaaS and mobile application development",
        description: d.seo.description, offers: AI_OFFERS, faq: d.faq.items, crumbs: [["Services", "/services"], ["AI, SaaS & Mobile Apps", AI_PATH]],
      })} />
    </>
  );
}

export const aiSaasMobileMetadata = () => serviceMetadata(AI_PATH, d.seo);
