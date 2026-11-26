import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import ScrollSync from "@/components/Common/ScrollSync";
import Head from "@/components/ServicePage/Head";
import { serviceMetadata, serviceJsonLd, JsonLd } from "@/components/ServicePage/seo";
import { GMB_PAGE as d, GMB_PATH, GMB_OFFERS } from "@/data/services/gmbOptimization";
import Hero from "./Hero/Hero";
import Open from "./Open/Open";
import styles from "./GmbOptimizationPage.module.css";

const Moment = dynamic(() => import("./Moment/Moment"));
const Anatomy = dynamic(() => import("./Anatomy/Anatomy"));
const Apart = dynamic(() => import("./Apart/Apart"));
const Locality = dynamic(() => import("./Locality/Locality"));
const Month = dynamic(() => import("./Month/Month"));
const Locations = dynamic(() => import("./Locations/Locations"));
const Route = dynamic(() => import("./Route/Route"));
const Faq = dynamic(() => import("@/components/Ecommerce/kit/Faq"));
const CTA = dynamic(() => import("./CTA/CTA"));

/**
 * /services/gmb-optimization-services — GMB (Google Business Profile) Optimization. Its own world:
 * local cartography in daylight — warm paper, drawn streets, pins and one neighbourhood florist
 * ("Hollis & Vine", labelled as a demo) whose profile the whole page works on. Rhythm:
 *   map (hero draws itself) → video in a shop-window arch (open) → phone search journey (held) →
 *   profile anatomy (interactive) → editorial photograph from a pin-head (apart) → neighbourhood
 *   scan (held) → a month on the calendar (sticky) → aerial footage with locations →
 *   route across the map (held) → questions → evening video CTA.
 */
export default function GmbOptimizationPage() {
  return (
    <>
      <PageShell current="/services">
        <Hero data={d.hero} />
        <Open data={d.open} />
        <Moment data={d.moment} />
        <Anatomy data={d.services} />
        <Apart data={d.apart} />
        <Locality data={d.locality} />
        <Month data={d.month} />
        <Locations data={d.locations} />
        <Route data={d.process} />
        {/* the shared FAQ's paper takes this page's warm paper */}
        <div className={styles.faq}>
          <Faq data={d.faq} variant="paper" prompt="Something else about your profile?" head={<Head kicker={d.faq.kicker} title={d.faq.title} id="gmb-faq" tone="light" />} />
        </div>
        <CTA data={d.cta} />
        <ScrollSync />
      </PageShell>
      <JsonLd data={serviceJsonLd({
        path: GMB_PATH, name: "GMB Optimization Services", serviceType: "Google Business Profile optimization and management",
        description: d.seo.description, offers: GMB_OFFERS, faq: d.faq.items,
        crumbs: [["Services", "/services"], ["Digital Marketing", "/services/digital-marketing"], ["GMB Optimization", GMB_PATH]],
      })} />
    </>
  );
}

export const gmbOptimizationMetadata = () => serviceMetadata(GMB_PATH, d.seo);
