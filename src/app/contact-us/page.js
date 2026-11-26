import ContactPage, { contactMetadata } from "@/components/Contact/ContactPage";

// Contact Us — the enquiry page every "start a project" button leads to (src/data/contact.js)
export const metadata = contactMetadata();
export default function Page() {
  return <ContactPage />;
}
