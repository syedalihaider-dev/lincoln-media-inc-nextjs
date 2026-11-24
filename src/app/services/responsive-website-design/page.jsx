import { getPSDInner, psdInnerMetadata } from "@/data/psd-to-html/inner";
import PSDInnerPage from "@/components/PSDToHTML/Inner/PSDInnerPage";

// A build-led UI/UX page on the PSD-to-HTML inner master, filled from src/data/psd-to-html/inner/responsive-website-design.js
const SLUG = "responsive-website-design";
export const metadata = psdInnerMetadata(SLUG);
export default function Page() {
  return <PSDInnerPage service={getPSDInner(SLUG)} />;
}
