import LegalPage, { legalMetadata } from "@/components/Legal/LegalPage";

// Live-site policy text (src/data/legal.js), redesigned for reading
export const metadata = legalMetadata("refund");
export default function Page() {
  return <LegalPage doc="refund" />;
}
