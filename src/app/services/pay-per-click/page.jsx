import { getMarketingService, marketingServiceMetadata } from "@/data/marketing-services";
import MarketingServicePage from "@/components/DigitalMarketingInner/MarketingServicePage";

// A Digital Marketing service page: the master design, filled from src/data/marketing-services/pay-per-click.js
const SLUG = "pay-per-click";
export const metadata = marketingServiceMetadata(SLUG);
export default function Page() {
  return <MarketingServicePage service={getMarketingService(SLUG)} />;
}
