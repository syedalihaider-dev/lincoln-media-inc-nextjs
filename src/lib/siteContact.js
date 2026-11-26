import { SITE } from "@/data/site";

// Pre-built markup (legacy pages, the guided intro) was written with the studio's details inline.
// This swaps every phone / WhatsApp / email for the single source of truth (src/config/site.js),
// so changing it there updates that markup too.
const OLD_PHONE = /(?:\+?1[-. ]?)?\(?332\)?[-. ]?222[-. ]?3984/g;
export const withSiteContact = (html) => html
  .replace(/tel:\+?13322223984/g, SITE.phoneHref)
  .replace(/https:\/\/wa\.me\/13322223984/g, SITE.whatsapp)
  .replace(OLD_PHONE, SITE.phone)
  .replace(/sales@thelincolnmedia\.com/g, SITE.email);
