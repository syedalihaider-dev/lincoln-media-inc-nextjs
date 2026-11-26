// Every lead form on the site identifies itself with one of these keys; the lead email shows the label.
// Add a key here when a new form is added — the server rejects keys it doesn't know (unknown → "website").
export const FORM_SOURCES = {
  contact: "Contact Us Form",
  homepage: "Homepage Contact Form",
  website: "Website Form",
};

// What each form sends, in the order the lead email lists it, and which fields are required.
export const FORM_FIELDS = {
  contact: {
    fields: [
      ["name", "Full Name"], ["company", "Company"], ["email", "Email"], ["phone", "Phone"],
      ["interest", "Interested In"], ["budget", "Budget"], ["message", "Message"], ["consent", "SMS Consent"],
    ],
    required: ["name", "company", "email", "phone"],
  },
  homepage: {
    fields: [
      ["name", "Name"], ["email", "Email"], ["company", "Company / Brand"], ["service", "Service"],
      ["budget", "Budget Range"], ["message", "Project Description"],
    ],
    required: ["name", "email", "service", "budget", "message"],
  },
};
FORM_FIELDS.website = FORM_FIELDS.contact;

export const LEAD_ENDPOINT = "/api/lead";
