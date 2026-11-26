// /contact-us — the enquiry page. Form fields, dropdown options and consent text are the live site's
// "Speak to an Expert" form (lincolnmediainc.com); contact details are this site's (src/data/site.js).
// Submissions go to /api/lead (src/app/api/lead/route.js), which emails the lead over SMTP.
import nycDusk from "@public/images/home/nyc-dusk.jpg";
import { siteConfig, phoneDisplay } from "@/config/site";

export const CONTACT_PATH = "/contact-us";
// Every "start a project / speak to us" call to action across the site lands here
export const CONTACT_FORM_ID = "contact-form";
export const CONTACT_FORM_HREF = `${CONTACT_PATH}#${CONTACT_FORM_ID}`;

// "I'm interested in" — the live form's options, in order
export const INTERESTS = [
  "Corporate Identity / Branding",
  "Company Profile / Brochure / E-Magazine",
  "Website Design / CMS / CRM Portal Development / Intranet",
  "Digital Marketing / SEO / Social / Paid",
  "Mobile App / AR / VR",
  "Blockchain / NFT / Web 3.0",
  "Resource Augmentation",
  "Other",
];

// "Budget" — the live form's options, in order
export const BUDGETS = ["$0 - $300", "$300 - $600", "$600 - $800", "$800 - $1000", "$1000 - $2000", "2000+"];

// The consent line, word for word; {privacy} and {terms} are the two links
export const CONSENT = {
  before: "By checking this box and submitting this form, I consent to receive text messages from Lincoln Media Inc. and its affiliated brands regarding project updates and customer support. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for more information. View our ",
  privacy: { label: "Privacy Policy", href: "/privacy-policy" },
  middle: " and ",
  terms: { label: "Terms and Conditions", href: "/terms-and-condition" },
  after: ".",
};

export const CONTACT_PAGE = {
  seo: {
    title: "Contact Us — Speak to an Expert | The Lincoln Media",
    description:
      `Start a project with The Lincoln Media, a New York digital studio for web, mobile, e-commerce, branding, video and digital marketing. Call ${phoneDisplay}, email ${siteConfig.contact.email} or send your brief.`,
    image: nycDusk,
    imageAlt: "The Manhattan skyline at dusk",
  },
  hero: {
    kicker: "Contact · New York",
    // the studio's own line for its enquiry form (homepage, Contact chapter)
    lines: ["Tell us what", "you're building."],
    text: "Reach out to our team and we'll get back to you within a day.", // (live)
    cta: "Write to us",
    video: { src: "/videos/nyc-night.mp4", mobileSrc: "/videos/nyc-night-mobile.mp4", poster: "/videos/nyc-night-poster.jpg" },
  },
  form: {
    kicker: "Project enquiry",
    title: "Speak to an Expert", // (live form title)
    text: "A few details and the right person gets back to you. Fields marked * are required.",
    submit: "Submit",
  },
  lines: {
    kicker: "Prefer a direct line",
    title: "Four ways in",
  },
  studio: {
    kicker: "The studio",
    title: "New York, Madison Avenue",
    image: nycDusk,
    alt: "The Manhattan skyline at dusk across the Hudson River",
  },
};
