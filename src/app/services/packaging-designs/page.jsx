import { getBrandInner, brandInnerMetadata } from "@/data/branding/inner";
import BrandServicePage from "@/components/Branding/Inner/BrandServicePage";

// A Branding & Communication service page: the master design, filled from src/data/branding/inner/packaging-designs.js
const SLUG = "packaging-designs";
export const metadata = brandInnerMetadata(SLUG);
export default function Page() {
  return <BrandServicePage service={getBrandInner(SLUG)} />;
}
