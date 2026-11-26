import CaseStudiesPage, { caseStudiesMetadata } from "@/components/CaseStudies/CaseStudiesPage";

// Case studies — the exhibition of the studio's work (src/data/case-studies.js)
export const metadata = caseStudiesMetadata();
export default function Page() {
  return <CaseStudiesPage />;
}
