import { SITE } from "@/data/site";
import { ABOUT_META } from "@/data/about";
import PageShell from "@/components/Common/PageShell";
import AboutHero from "@/components/About/AboutHero";
import OurStory from "@/components/About/OurStory";
import WhoWeAre from "@/components/About/WhoWeAre";
import MissionVision from "@/components/About/MissionVision";
import OurValues from "@/components/About/OurValues";
import AboutCTA from "@/components/About/AboutCTA";
import { POSTAL_ADDRESS } from "@/config/site";

export const metadata = {
  title: { absolute: ABOUT_META.title },
  description: ABOUT_META.description,
  alternates: { canonical: "/about-us" },
  openGraph: { type: "website", url: "/about-us", title: ABOUT_META.title, description: ABOUT_META.description, siteName: SITE.name },
  twitter: { card: "summary_large_image", title: ABOUT_META.title, description: ABOUT_META.description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: ABOUT_META.title,
  url: `${SITE.url}/about-us`,
  description: ABOUT_META.description,
  mainEntity: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: String(SITE.established),
    address: POSTAL_ADDRESS,
  },
};

export default function AboutUsPage() {
  return (
    <>
      <PageShell current="/about-us">
        <AboutHero />
        <OurStory />
        <WhoWeAre />
        <MissionVision />
        <OurValues />
        <AboutCTA />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
