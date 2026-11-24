import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { PSD_PATH } from "@/data/psd-to-html/main";
import { UIUX_PATH } from "@/data/ui-ux/main";
import { uiuxSiblings } from "@/data/ui-ux/children";
import Hero from "./Hero/Hero";
import Notes from "./Notes/Notes";
import styles from "./PSDInnerPage.module.css";

const Build = dynamic(() => import("./Build/Build"));
const Sheets = dynamic(() => import("./Sheets/Sheets"));
const Parts = dynamic(() => import("./Parts/Parts"));
const Stack = dynamic(() => import("./Stack/Stack"));
const Commits = dynamic(() => import("./Commits/Commits"));
const Signoff = dynamic(() => import("./Signoff/Signoff"));
const FAQ = dynamic(() => import("@/components/DigitalMarketing/FAQ/FAQ"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * The master design for the build-led UI/UX pages (responsive-website-design, landing-page-design):
 * a website's engineering drawing, in blueprint blue. Title-block hero with dimension lines → drawing
 * notes → build log streaming beside the page (held) → drawing sheets dealt onto the table (held) →
 * parts list with callouts (held) → sectional elevation of the stack (held) → commit history →
 * inspection sign-off (held) → questions → cyanotype developing into the photograph.
 * One layout; content from src/data/psd-to-html/inner/<slug>.js.
 */
export default function PSDInnerPage({ service: s }) {
  const url = `${SITE.url}${s.path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", name: s.name, serviceType: s.name, description: s.seo.description, url, areaServed: "US", category: "Web design and development",
        isRelatedTo: [{ "@type": "Service", name: "UI/UX Design", url: `${SITE.url}${UIUX_PATH}` }, { "@type": "Service", name: "PSD to Responsive HTML", url: `${SITE.url}${PSD_PATH}` }],
        provider: { "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email },
        hasOfferCatalog: { "@type": "OfferCatalog", name: `${s.name} services`, itemListElement: s.parts.items.map((c) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: c.name, description: c.text } })) },
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "UI/UX Design", item: `${SITE.url}${UIUX_PATH}` }, { "@type": "ListItem", position: 3, name: "PSD to HTML", item: `${SITE.url}${PSD_PATH}` }, { "@type": "ListItem", position: 4, name: s.name, item: url }] },
      { "@type": "FAQPage", mainEntity: s.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
  return (
    <>
      <PageShell current="/services">
        <Hero service={s} />
        <Notes data={s.notes} />
        <Build data={s.build} />
        <Sheets data={s.sheets} />
        <Parts data={s.parts} />
        <Stack data={s.stack} />
        <Commits data={s.commits} />
        <Signoff data={s.signoff} />
        <div className={styles.faq}><FAQ data={s.faq} /></div>
        <CTA service={s} siblings={uiuxSiblings(s.slug)} />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
