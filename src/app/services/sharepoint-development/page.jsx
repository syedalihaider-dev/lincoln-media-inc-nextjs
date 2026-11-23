import { getChildService, childServiceMetadata } from "@/data/child-services";
import ChildServicePage from "@/components/ChildService/ChildServicePage";

// A Web Development child page: the master design, filled from src/data/child-services/sharepoint-development.js
const SLUG = "sharepoint-development";
export const metadata = childServiceMetadata(SLUG);
export default function Page() {
  return <ChildServicePage service={getChildService(SLUG)} />;
}
