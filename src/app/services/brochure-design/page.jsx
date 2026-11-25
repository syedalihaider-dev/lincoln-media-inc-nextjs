import { getBrandInner, brandInnerMetadata } from "@/data/branding/inner";
import BrandServicePage from "@/components/Branding/Inner/BrandServicePage";

// A Branding & Communication service page: the master design, filled from src/data/branding/inner/brochure-design.js
const SLUG = "brochure-design";
export const metadata = brandInnerMetadata(SLUG);
export default function Page() {
  return <BrandServicePage service={getBrandInner(SLUG)} />;
}
