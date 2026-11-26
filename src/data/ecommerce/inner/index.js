// The six E-commerce platform pages, all on one master design (src/components/Ecommerce/Inner).
// Each lives at the live site's slug, /services/<slug> (not nested); the older nested routes
// (/services/ecommerce-web-development/<slug>) redirect there — next.config.mjs.
import { SITE } from "@/data/site";
import { ECOM_CHILDREN, ECOM_PATH } from "@/data/ecommerce/main";
import shopify from "./shopify";
import shopifyPlus from "./shopify-plus";
import wooCommerce from "./woo-commerce";
import magento from "./magento";
import bigCommerce from "./big-commerce";
import mirakl from "./mirakl";
import { ROBOTS } from "@/config/site";

const DATA = { shopify, "shopify-plus": shopifyPlus, "woo-commerce": wooCommerce, magento, "big-commerce": bigCommerce, mirakl };

export const ECOM_INNER_PATHS = ECOM_CHILDREN.map((c) => c.path);
export const ECOM_LEGACY_PATHS = ECOM_CHILDREN.map((c) => `${ECOM_PATH}/${c.slug}`);

export function getEcomInner(slug) {
  const data = DATA[slug];
  const self = ECOM_CHILDREN.find((c) => c.slug === slug);
  return { ...data, slug, path: self.path, siblings: ECOM_CHILDREN.filter((c) => c.slug !== slug) };
}

export function ecomInnerMetadata(slug) {
  const { seo } = DATA[slug];
  const path = ECOM_CHILDREN.find((c) => c.slug === slug).path;
  const images = [{ url: seo.image.src, width: seo.image.width, height: seo.image.height, alt: seo.imageAlt }];
  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: path },
    robots: ROBOTS,
    openGraph: { type: "website", url: path, title: seo.title, description: seo.description, siteName: SITE.name, images },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: images.map((i) => i.url) },
  };
}
