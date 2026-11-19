import { getInnerService, innerServiceMetadata } from "@/data/inner-services";
import InnerServicePage from "@/components/InnerServices/InnerServicePage";

// An inner service page: the shared design system, filled from src/data/inner-services/web-development.js
const SLUG = "web-development";
export const metadata = innerServiceMetadata(SLUG);
export default function Page() {
  return <InnerServicePage service={getInnerService(SLUG)} />;
}
