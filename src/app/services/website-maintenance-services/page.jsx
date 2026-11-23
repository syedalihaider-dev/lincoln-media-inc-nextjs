import { getChildService, childServiceMetadata } from "@/data/child-services";
import ChildServicePage from "@/components/ChildService/ChildServicePage";

// A Web Development child page: the master design, filled from src/data/child-services/website-maintenance-services.js
const SLUG = "website-maintenance-services";
export const metadata = childServiceMetadata(SLUG);
export default function Page() {
  return <ChildServicePage service={getChildService(SLUG)} />;
}
