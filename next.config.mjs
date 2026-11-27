import { siteConfig } from "./src/config/site.js";

// Response headers every route gets: basic hardening, plus X-Robots-Tag while the site is in its
// NOINDEX + NOFOLLOW phase (siteConfig.seo.indexing) — this also covers files and API responses.
const SITE_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  ...(siteConfig.seo.indexing ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Optional separate output folder (e.g. to run a production build while `next dev` is using .next)
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // The live-voice route loads Kokoro at runtime on your own machine only; never bundle or ship it
  serverExternalPackages: ["kokoro-js"],
  outputFileTracingExcludes: { "*": ["node_modules/kokoro-js/**", "node_modules/onnxruntime-node/**", "node_modules/@huggingface/**"] },
  images: {
    // Serve the original files: Vercel's image optimiser answers 402 once the plan's quota is used up
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
  },
  // The live site's WhatsApp page is /services/whatsapp-web-integration; the older route forwards there
  async redirects() {
    return [
      { source: "/services/whatsapp-business-integration", destination: "/services/whatsapp-web-integration", permanent: true },
      // the live site spells the CRO page "conversation-rate-optimization"; the older spelling forwards there
      { source: "/services/conversion-rate-optimization", destination: "/services/conversation-rate-optimization", permanent: true },
      // the e-commerce platform pages are at the live site's direct slugs; the older nested routes forward there
      { source: "/services/ecommerce-web-development/:slug(woo-commerce|mirakl|magento|big-commerce|shopify|shopify-plus)", destination: "/services/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: SITE_HEADERS },
      { source: "/videos/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/images/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      // Versioned third-party builds served from this site (the file name carries the version)
      { source: "/vendor/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      // The guide's recorded lines are requested with ?v=VOICE_VERSION (public/app.js), so a new recording gets a new URL
      { source: "/assets/voice/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
