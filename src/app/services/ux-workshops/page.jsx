import { getUIUXInner, uiuxInnerMetadata } from "@/data/ui-ux/inner";
import UIUXInnerPage from "@/components/UIUX/Inner/UIUXInnerPage";

// A UI/UX inner page: the master design, filled from src/data/ui-ux/inner/ux-workshops.js
const SLUG = "ux-workshops";
export const metadata = uiuxInnerMetadata(SLUG);
export default function Page() {
  return <UIUXInnerPage service={getUIUXInner(SLUG)} />;
}
