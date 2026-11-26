import AiSaasMobilePage, { aiSaasMobileMetadata } from "@/components/AiSaasMobile/AiSaasMobilePage";

// AI, SaaS & Mobile Apps — its own design, filled from src/data/services/aiSaasMobile.js
export const metadata = aiSaasMobileMetadata();
export default function Page() {
  return <AiSaasMobilePage />;
}
