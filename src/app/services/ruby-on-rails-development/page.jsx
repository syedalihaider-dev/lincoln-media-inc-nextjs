import { getAppService, appServiceMetadata } from "@/data/app-services";
import AppServicePage from "@/components/AppService/AppServicePage";

// A Mobile App Development child page: the master design, filled from src/data/app-services/ruby-on-rails-development.js
const SLUG = "ruby-on-rails-development";
export const metadata = appServiceMetadata(SLUG);
export default function Page() {
  return <AppServicePage service={getAppService(SLUG)} />;
}
