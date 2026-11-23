import { getAppService, appServiceMetadata } from "@/data/app-services";
import AppServicePage from "@/components/AppService/AppServicePage";

// A Mobile App Development child page: the master design, filled from src/data/app-services/hybrid-app-development.js
const SLUG = "hybrid-app-development";
export const metadata = appServiceMetadata(SLUG);
export default function Page() {
  return <AppServicePage service={getAppService(SLUG)} />;
}
