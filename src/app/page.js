import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { introParts } from "@/components/Intro/introParts";
import RawHTML from "@/components/Legacy/RawHTML";
import HomeSite from "@/components/Home/HomeSite";

export const metadata = {
  title: { absolute: SITE.title },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: SITE.title, description: SITE.description },
  twitter: { title: SITE.title, description: SITE.description },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  foundingDate: String(SITE.established),
  address: { "@type": "PostalAddress", streetAddress: SITE.street, addressLocality: "New York", addressRegion: "NY", postalCode: "10065", addressCountry: "US" },
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICES.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  },
};

/**
 * EXPERIENCE A — the guided AI intro (unchanged; markup + public/app.js, rendered verbatim)
 * EXPERIENCE B — the homepage that opens after "Skip intro" or once the build plan is on screen
 */
export default function Home() {
  const intro = introParts();
  return (
    <>
      <RawHTML html={intro.boot + intro.head + intro.chrome} />
      <main id="top">
        <RawHTML html={intro.experience} />
        <HomeSite />
      </main>
      {/* The intro's engine: runs while the page parses, after the markup above exists (it wires the contact form too) */}
      <RawHTML html={intro.scripts} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
