// ───────────────────────────────────────────────────────────────────────────────────────────────
// The site's single source of truth for brand and contact details.
// Change a value here and every page, component, legacy page and form picks it up.
// (Server-only secrets — SMTP etc. — live in .env.local, never here: this file reaches the browser.)
// ───────────────────────────────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "The Lincoln Media",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://thelincolnmedia.com").replace(/\/$/, ""),
  established: 2012,

  contact: {
    // E.164 — the raw value; displayed as +1-332-587-1198 via formatPhone()
    phone: "+13325871198",
    email: "sales@thelincolnmedia.com",
    // WhatsApp uses the same line
    whatsapp: "+13325871198",
  },

  address: {
    street: "667 Madison Ave, Floor 4&5",
    city: "New York",
    region: "NY",
    postalCode: "10065",
    country: "US",
  },

  // The studio's social profiles — exactly the links the reference site shows
  social: [
    { key: "facebook", label: "Facebook", href: "https://www.facebook.com/thelincolnmedia" },
    { key: "instagram", label: "Instagram", href: "https://www.instagram.com/thelincolnmedia_/" },
    { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/the-lincoln-media/" },
    { key: "x", label: "X", href: "https://x.com/lincolnmedia_1" },
    { key: "pinterest", label: "Pinterest", href: "https://www.pinterest.com/thelincolnmedia_/" },
    { key: "quora", label: "Quora", href: "https://www.quora.com/profile/The-Lincoln-Media" },
  ],

  // Live chat: the official Zendesk snippet, loaded once site-wide (Common/Chat/ZendeskScript)
  chat: { provider: "zendesk", key: "4338bf84-3cf8-46ef-9cd1-996399dc7b9d" },

  seo: {
    // Development / staging phase: the whole site is NOINDEX + NOFOLLOW (meta robots, X-Robots-Tag
    // header and robots.txt all read this). Flip to true at launch.
    indexing: false,
  },
};

/** "+13325871198" → "+1-332-587-1198" (North American numbers; anything else is returned as given) */
export function formatPhone(e164) {
  const d = String(e164).replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) return `+1-${d.slice(1, 4)}-${d.slice(4, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `+1-${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return e164;
}

export const phoneDisplay = formatPhone(siteConfig.contact.phone);
export const phoneHref = `tel:${siteConfig.contact.phone}`;
export const mailHref = (subject) => `mailto:${siteConfig.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
export const whatsappHref = `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`;

/** Next.js metadata `robots` for every page — follows siteConfig.seo.indexing */
export const ROBOTS = siteConfig.seo.indexing
  ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
  : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } };

/** schema.org PostalAddress for structured data */
export const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.address.street,
  addressLocality: siteConfig.address.city,
  addressRegion: siteConfig.address.region,
  postalCode: siteConfig.address.postalCode,
  addressCountry: siteConfig.address.country,
};
