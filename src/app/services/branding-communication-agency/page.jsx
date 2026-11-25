import BrandingPage, { brandingMetadata } from "@/components/Branding/Main/BrandingPage";

// The Digital Branding & Communication category page — its own design, filled from src/data/branding/main.js
export const metadata = brandingMetadata();
export default function Page() {
  return <BrandingPage />;
}
