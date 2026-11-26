import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import ScrollSync from "@/components/Common/ScrollSync";
import { SITE } from "@/data/site";
import { CS_PAGE, CS_PATH, ROOMS } from "@/data/case-studies";
import Overture from "./Overture/Overture";
import { ROBOTS } from "@/config/site";

const Gallery = dynamic(() => import("./Gallery/Gallery"));
const Assembly = dynamic(() => import("./Assembly/Assembly"));
const Split = dynamic(() => import("./Split/Split"));
const Reel = dynamic(() => import("./Reel/Reel"));
const Iris = dynamic(() => import("./Iris/Iris"));
const Layers = dynamic(() => import("./Layers/Layers"));
const Lettering = dynamic(() => import("./Lettering/Lettering"));
const Index = dynamic(() => import("./Index/Index"));
const Finale = dynamic(() => import("./Finale/Finale"));
const WallLabel = dynamic(() => import("./WallLabel/WallLabel"));

/**
 * /case-studies — the studio's work as an exhibition in eight rooms. Every room is one real case
 * study (src/data/work.js → /work/<slug>) with its own technique, so no two scrolls feel alike:
 *   opening collage → plate opens into Belgravia London (pinned) · BetterHomes, a horizontal
 *   corridor (pinned) · CryptoSouk, slices assembling in WebGL (pinned) · The Bagel Shak, a split
 *   screen that bakes and swaps (pinned) · Aureum, film in a capsule that opens (pinned) · Polly,
 *   an iris on paper and a cut to black (pinned) · Bike Store, free-scrolling parallax layers ·
 *   Upmatch, a fly-through of lettering (pinned) · the collection index with a cursor preview ·
 *   the final frame. A wall label moves between rooms.
 * All project text is real HTML (headings, wall-label <dl>s, links to each case study).
 */
export default function CaseStudiesPage() {
  return (
    <>
      <PageShell current={CS_PATH}>
        <Overture />
        <Gallery />
        <Assembly />
        <Split />
        <Reel />
        <Iris />
        <Layers />
        <Lettering />
        <Index />
        <Finale />
        <WallLabel />
        <ScrollSync />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
    </>
  );
}

export function caseStudiesMetadata() {
  const { title, description, image, imageAlt } = CS_PAGE.seo;
  const images = [{ url: image.src, width: image.width, height: image.height, alt: imageAlt }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: CS_PATH },
    robots: ROBOTS,
    openGraph: { type: "website", url: CS_PATH, title, description, siteName: SITE.name, locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

function jsonLd() {
  const url = `${SITE.url}${CS_PATH}`;
  const org = { "@type": "Organization", name: SITE.name, url: SITE.url };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: CS_PAGE.seo.title,
        description: CS_PAGE.seo.description,
        url,
        publisher: org,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: ROOMS.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE.url}${r.href}`,
            item: { "@type": "CreativeWork", name: r.name, description: r.brief, about: r.sector, dateCreated: String(r.year), keywords: r.services.replace(/ · /g, ", "), url: `${SITE.url}${r.href}`, creator: org },
          })),
        },
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Case Studies", item: url }] },
    ],
  };
}
