// The 14 Web Development child pages: one master design (src/components/ChildService), one dataset each.
// Slugs are exactly the live site's (lincolnmediainc.com header menu → Web Development), at /services/<slug>.
// `summary` is each page's own one-liner from the live service cards.
//
// To add a page: write src/data/child-services/<slug>.js (same shape as wordpress-development.js), import it
// below as that entry's `data`, and add src/app/services/<slug>/page.jsx (three lines — copy any sibling's).
import { SITE } from "@/data/site";
import WORDPRESS from "./wordpress-development";
import SHAREPOINT from "./sharepoint-development";
import ENTERPRISE from "./enterprise-development";
import SITECORE from "./sitecore-development";
import PHP from "./php-development";
import JOOMLA from "./joomla-development";
import ASPNET from "./asp-net-development";
import CMS from "./cms-website-development";
import DRUPAL from "./drupal-web-development";
import LARAVEL from "./laravel-web-development";
import PYTHON from "./python-development";
import ANGULAR from "./angularjs-development";
import MAINTENANCE from "./website-maintenance-services";
import WHATSAPP from "./whatsapp-web-integration";

const entry = (slug, name, summary, data = null) => ({ slug, path: `/services/${slug}`, name, summary, data });

export const CHILD_SERVICES = [
  entry("wordpress-development", "WordPress Development", "Develop the most jaw-dropping WordPress sites you've ever seen.", WORDPRESS),
  entry("sharepoint-development", "SharePoint Development", "Cost-effective, end-to-end custom SharePoint development services.", SHAREPOINT),
  entry("enterprise-development", "Enterprise Development", "Enterprise management software that generates more accurate information and better results.", ENTERPRISE),
  entry("sitecore-development", "Sitecore Development", "Blazing fast web solutions with Sitecore developers in the USA.", SITECORE),
  entry("php-development", "PHP Development", "Create amazing PHP websites to wow your clients.", PHP),
  entry("joomla-development", "Joomla Development", "Development and consulting in the Joomla CMS.", JOOMLA),
  entry("asp-net-development", "ASP.NET Development", "Dynamic web pages, applications and services.", ASPNET),
  entry("cms-website-development", "CMS Development", "Advanced CMS services featuring software, websites and CMS platforms.", CMS),
  entry("drupal-web-development", "Drupal Development", "Customised websites built on the Drupal content management system.", DRUPAL),
  entry("laravel-web-development", "Laravel Development", "Robust, scalable and secure Laravel development.", LARAVEL),
  entry("python-development", "Python Development", "Future-ready Python web and app development.", PYTHON),
  entry("angularjs-development", "AngularJS Development", "Custom AngularJS web services for clients globally.", ANGULAR),
  entry("website-maintenance-services", "Website Maintenance Services", "Improving the performance and security of websites for businesses across the globe.", MAINTENANCE),
  entry("whatsapp-web-integration", "WhatsApp Integration", "WhatsApp integration for your website, for customer conversations.", WHATSAPP),
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
