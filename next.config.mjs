/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional separate output folder (e.g. to run a production build while `next dev` is using .next)
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // The live-voice route loads Kokoro at runtime on your own machine only; never bundle or ship it
  serverExternalPackages: ["kokoro-js"],
  outputFileTracingExcludes: { "*": ["node_modules/kokoro-js/**", "node_modules/onnxruntime-node/**", "node_modules/@huggingface/**"] },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
  },
  async headers() {
    return [
      { source: "/videos/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/images/:file*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};

export default nextConfig;
