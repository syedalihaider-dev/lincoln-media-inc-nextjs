import { getChildService, childServiceMetadata } from "@/data/child-services";
import ChildServicePage from "@/components/ChildService/ChildServicePage";

// A Web Development child page: the master design, filled from src/data/child-services/cms-website-development.js
const SLUG = "cms-website-development";
export const metadata = childServiceMetadata(SLUG);
export default function Page() {
  return <ChildServicePage service={getChildService(SLUG)} />;
}
