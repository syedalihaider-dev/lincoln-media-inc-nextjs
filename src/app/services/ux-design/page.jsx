import { getUIUXInner, uiuxInnerMetadata } from "@/data/ui-ux/inner";
import UIUXInnerPage from "@/components/UIUX/Inner/UIUXInnerPage";

// A UI/UX inner page: the master design, filled from src/data/ui-ux/inner/ux-design.js
const SLUG = "ux-design";
export const metadata = uiuxInnerMetadata(SLUG);
export default function Page() {
  return <UIUXInnerPage service={getUIUXInner(SLUG)} />;
}
