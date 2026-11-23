import ogImage from "@public/images/services/web-development.jpg";
import { SITE } from "@/data/site";
import { SERVICES_PAGE, SERVICE_CATEGORIES } from "@/data/service-categories";
import PageShell from "@/components/Common/PageShell";
import ServicesHero from "@/components/Services/ServicesHero";
import ServicesApproach from "@/components/Services/ServicesApproach";
import ServiceIndex from "@/components/Services/ServiceIndex";
import ProcessPath from "@/components/Services/ProcessPath";
import ServicesFinale from "@/components/Services/ServicesFinale";

export const metadata = {
  title: { absolute: SERVICES_PAGE.title },
  description: SERVICES_PAGE.description,
  alternates: { canonical: "/services" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: "/services", title: SERVICES_PAGE.title, description: SERVICES_PAGE.description, siteName: SITE.name, images: [{ url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: "Code open in an editor on a laptop screen" }] },
  twitter: { card: "summary_large_image", title: SERVICES_PAGE.title, description: SERVICES_PAGE.description, images: [ogImage.src] },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  url: `${SITE.url}/services`,
  telephone: SITE.phone,
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: SITE.street, addressLocality: "New York", addressRegion: "NY", postalCode: "10065", addressCountry: "US" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: SERVICE_CATEGORIES.map((c) => ({
      "@type": "OfferCatalog",
      name: c.name,
      description: c.text,
      itemListElement: c.items.map((it) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: it.name } })),
    })),
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageShell current="/services">
        <ServicesHero />
        <ServicesApproach />
        <ServiceIndex />
        <ProcessPath />
        <ServicesFinale />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
