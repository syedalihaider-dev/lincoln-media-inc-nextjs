import { getEcomInner, ecomInnerMetadata } from "@/data/ecommerce/inner";
import EcomServicePage from "@/components/Ecommerce/Inner/EcomServicePage";

// An E-commerce platform page: the master design, filled from src/data/ecommerce/inner/big-commerce.js
const SLUG = "big-commerce";
export const metadata = ecomInnerMetadata(SLUG);
export default function Page() {
  return <EcomServicePage service={getEcomInner(SLUG)} />;
}
