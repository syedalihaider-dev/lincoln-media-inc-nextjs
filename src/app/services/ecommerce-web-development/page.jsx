import EcommercePage, { ecommerceMetadata } from "@/components/Ecommerce/Main/EcommercePage";

// The E-commerce Web Development category page — its own design, filled from src/data/ecommerce/main.js
export const metadata = ecommerceMetadata();
export default function Page() {
  return <EcommercePage />;
}
