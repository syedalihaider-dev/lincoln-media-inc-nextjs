import DigitalMarketingPage, { digitalMarketingMetadata } from "@/components/DigitalMarketing/DigitalMarketingPage";

// The Digital Marketing category page — its own design, filled from src/data/digital-marketing.js
export const metadata = digitalMarketingMetadata();
export default function Page() {
  return <DigitalMarketingPage />;
}
