import { SITE } from "@/data/site";

/**
 * Next.js metadata for a service page: unique title/description, canonical, Open Graph and X card.
 * seo = { title, description, keywords, image, imageAlt }
 */
export function serviceMetadata(path, seo) {
  const images = [{ url: seo.image, width: 1280, height: 720, alt: seo.imageAlt }];
  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: { type: "website", url: path, title: seo.ogTitle || seo.title, description: seo.description, siteName: SITE.name, locale: "en_US", images },
    twitter: { card: "summary_large_image", title: seo.ogTitle || seo.title, description: seo.description, images: images.map((i) => i.url) },
  };
}

/**
 * Structured data: Service (with its offer catalogue) + breadcrumbs + FAQ.
 * crumbs = [[name, path], …] after Home; offers = [{ name, text }]
 */
export function serviceJsonLd({ path, name, serviceType, description, offers = [], faq = [], crumbs = [] }) {
  const url = `${SITE.url}${path}`;
  const trail = [["Home", ""], ...crumbs];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service", name, serviceType, description, url, areaServed: "US",
        provider: {
          "@type": "Organization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email,
          address: { "@type": "PostalAddress", streetAddress: SITE.street, addressLocality: SITE.city, addressRegion: "NY", postalCode: "10065", addressCountry: "US" },
        },
        ...(offers.length ? { hasOfferCatalog: { "@type": "OfferCatalog", name, itemListElement: offers.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o.name, description: o.text } })) } } : {}),
      },
      { "@type": "BreadcrumbList", itemListElement: trail.map(([n, p], i) => ({ "@type": "ListItem", position: i + 1, name: n, item: `${SITE.url}${p}` })) },
      ...(faq.length ? [{ "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
    ],
  };
}

/** <script type="application/ld+json"> */
export const JsonLd = ({ data }) => <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
