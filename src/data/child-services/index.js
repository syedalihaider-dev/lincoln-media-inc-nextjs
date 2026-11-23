// The 14 Web Development child pages: one master design (src/components/ChildService), one dataset each.
// Slugs are exactly the live site's (lincolnmediainc.com header menu → Web Development), at /services/<slug>.
// `summary` is each page's own one-liner from the live service cards.
//
// To build the next page:
//   1. write src/data/child-services/<slug>.js — same shape as wordpress-development.js
//   2. import it below and set it as that entry's `data`
//   3. add src/app/services/<slug>/page.jsx (three lines — copy wordpress-development's)
// Until then the entry has no `data`, its route keeps serving the legacy page, and the menu still links to it.
import { SITE } from "@/data/site";
import WORDPRESS from "./wordpress-development";

const entry = (slug, name, summary, data = null) => ({ slug, path: `/services/${slug}`, name, summary, data });

export const CHILD_SERVICES = [
  entry("wordpress-development", "WordPress Development", "Develop the most jaw-dropping WordPress sites you've ever seen.", WORDPRESS),
  entry("sharepoint-development", "SharePoint Development", "Cost-effective, end-to-end custom SharePoint development services."),
  entry("enterprise-development", "Enterprise Development", "Enterprise management software that generates more accurate information and better results."),
  entry("sitecore-development", "Sitecore Development", "Blazing fast web solutions with Sitecore developers in the USA."),
  entry("php-development", "PHP Development", "Create amazing PHP websites to wow your clients."),
  entry("joomla-development", "Joomla Development", "Development and consulting in the Joomla CMS."),
  entry("asp-net-development", "ASP.NET Development", "Dynamic web pages, applications and services."),
  entry("cms-website-development", "CMS Development", "Advanced CMS services featuring software, websites and CMS platforms."),
  entry("drupal-web-development", "Drupal Development", "Customised websites built on the Drupal content management system."),
  entry("laravel-web-development", "Laravel Development", "Robust, scalable and secure Laravel development."),
  entry("python-development", "Python Development", "Future-ready Python web and app development."),
  entry("angularjs-development", "AngularJS Development", "Custom AngularJS web services for clients globally."),
  entry("website-maintenance-services", "Website Maintenance Services", "Improving the performance and security of websites for businesses across the globe."),
  entry("whatsapp-web-integration", "WhatsApp Integration", "WhatsApp integration for your website, for customer conversations."),
];

// Pages that have their own dataset (and so their own route in src/app/services/<slug>)
export const CHILD_SERVICE_PATHS = CHILD_SERVICES.filter((c) => c.data).map((c) => c.path);

export const getChildService = (slug) => {
  const c = CHILD_SERVICES.find((x) => x.slug === slug);
  return c?.data ? { ...c.data, slug: c.slug, path: c.path, name: c.name, summary: c.summary } : null;
};

// The other 13 — linked from each page's closing section
export const siblingsOf = (slug) => CHILD_SERVICES.filter((c) => c.slug !== slug);

// Next.js metadata, generated from the page's own data
export function childServiceMetadata(slug) {
  const s = getChildService(slug);
  if (!s) return {};
  const images = s.seo.image ? [{ url: s.seo.image.src, width: s.seo.image.width, height: s.seo.image.height, alt: s.seo.imageAlt }] : undefined;
  return {
    title: { absolute: s.seo.title },
    description: s.seo.description,
    keywords: s.seo.keywords,
    alternates: { canonical: s.path },
    robots: { index: true, follow: true },
    openGraph: { type: "website", url: s.path, title: s.seo.title, description: s.seo.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: s.seo.title, description: s.seo.description, images: images?.map((i) => i.url) },
  };
}
