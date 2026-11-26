import dynamic from "next/dynamic";
import PageShell from "@/components/Common/PageShell";
import ScrollSync from "@/components/Common/ScrollSync";
import { SITE } from "@/data/site";
import { CONTACT_PAGE, CONTACT_PATH, CONTACT_FORM_ID } from "@/data/contact";
import Hero from "./Hero/Hero";
import FormSection from "./FormSection/FormSection";
import { POSTAL_ADDRESS, ROBOTS } from "@/config/site";

const Lines = dynamic(() => import("./Lines/Lines"));
const Studio = dynamic(() => import("./Studio/Studio"));

// Runs while the page is still parsing: a visitor arriving at /contact-us#contact-form would get the
// browser's instant jump; take the fragment off first so PageShell can glide there instead (it puts
// the fragment back afterwards). Without JavaScript, the native jump still lands on the form.
const GLIDE = `(function(){try{if(location.hash==="#${CONTACT_FORM_ID}"){window.__lmGlide=location.hash;history.replaceState(null,"",location.pathname+location.search);}}catch(e){}})();`;

/**
 * /contact-us — the conversion page. New York at night opens the conversation, the form
 * (#contact-form) is the destination of every contact call to action on the site, then four direct
 * lines and the studio itself. Every word of contact information is real HTML.
 */
export default function ContactPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GLIDE }} />
      <PageShell current={`${CONTACT_PATH}#${CONTACT_FORM_ID}`}>
        <Hero />
        <FormSection />
        <Lines />
        <Studio />
        <ScrollSync />
      </PageShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
    </>
  );
}

export function contactMetadata() {
  const { title, description, image, imageAlt } = CONTACT_PAGE.seo;
  const images = [{ url: image.src, width: image.width, height: image.height, alt: imageAlt }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: CONTACT_PATH },
    robots: ROBOTS,
    openGraph: { type: "website", url: CONTACT_PATH, title, description, siteName: SITE.name, locale: "en_US", images },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

function jsonLd() {
  const url = `${SITE.url}${CONTACT_PATH}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: CONTACT_PAGE.seo.title,
        description: CONTACT_PAGE.seo.description,
        url,
        mainEntity: {
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          email: SITE.email,
          telephone: SITE.phone,
          foundingDate: String(SITE.established),
          address: POSTAL_ADDRESS,
          contactPoint: { "@type": "ContactPoint", contactType: "sales", telephone: SITE.phone, email: SITE.email, areaServed: "US", availableLanguage: "English" },
        },
      },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: "Contact Us", item: url }] },
    ],
  };
}
