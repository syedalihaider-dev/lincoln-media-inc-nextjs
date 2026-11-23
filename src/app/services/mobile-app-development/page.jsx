import MobileAppPage, { mobileAppMetadata } from "@/components/MobileAppDevelopment/MobileAppPage";

// The Mobile App Development category page — its own design, filled from src/data/mobile-app-development.js
export const metadata = mobileAppMetadata();
export default function Page() {
  return <MobileAppPage />;
}
