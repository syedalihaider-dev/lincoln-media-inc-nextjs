import PSDPage, { psdMetadata } from "@/components/PSDToHTML/Main/PSDPage";

// PSD to Responsive HTML — its own design, filled from src/data/psd-to-html/main.js
export const metadata = psdMetadata();
export default function Page() {
  return <PSDPage />;
}
