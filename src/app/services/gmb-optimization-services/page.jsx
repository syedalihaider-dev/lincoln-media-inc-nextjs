import GmbOptimizationPage, { gmbOptimizationMetadata } from "@/components/GmbOptimization/GmbOptimizationPage";

// GMB Optimization — its own design, filled from src/data/services/gmbOptimization.js
export const metadata = gmbOptimizationMetadata();
export default function Page() {
  return <GmbOptimizationPage />;
}
