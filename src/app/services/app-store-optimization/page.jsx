import { getMarketingService, marketingServiceMetadata } from "@/data/marketing-services";
import MarketingServicePage from "@/components/DigitalMarketingInner/MarketingServicePage";

// A Digital Marketing service page: the master design, filled from src/data/marketing-services/app-store-optimization.js
const SLUG = "app-store-optimization";
export const metadata = marketingServiceMetadata(SLUG);
export default function Page() {
  return <MarketingServicePage service={getMarketingService(SLUG)} />;
}
