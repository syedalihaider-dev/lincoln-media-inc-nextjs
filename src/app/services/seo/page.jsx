import { getMarketingService, marketingServiceMetadata } from "@/data/marketing-services";
import MarketingServicePage from "@/components/DigitalMarketingInner/MarketingServicePage";

// A Digital Marketing service page: the master design, filled from src/data/marketing-services/seo.js
const SLUG = "seo";
export const metadata = marketingServiceMetadata(SLUG);
export default function Page() {
  return <MarketingServicePage service={getMarketingService(SLUG)} />;
}
