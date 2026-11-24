// The seven UI/UX child pages on lincolnmediainc.com (header menu → Ui/Ux Design), at /services/<slug>.
// Split by the user (2026-11-24): design-led pages use the UI/UX inner master, build-led pages use the
// PSD-to-HTML inner master, and psd-to-html itself has its own main design.
export const UIUX_CHILDREN = [
  { slug: "psd-to-html", name: "PSD to Responsive HTML", master: "psd-main" },
  { slug: "ux-workshops", name: "UX Design Workshop", master: "uiux" },
  { slug: "responsive-website-design", name: "Responsive Web Design", master: "psd" },
  { slug: "ux-design", name: "UX Design", master: "uiux" },
  { slug: "landing-page-design", name: "Landing Page Design", master: "psd" },
  { slug: "ux-audit", name: "UX Audit", master: "uiux" },
  { slug: "graphic-design-services", name: "Graphic Design", master: "uiux" },
].map((c) => ({ ...c, path: `/services/${c.slug}` }));

export const UIUX_CHILD_PATHS = UIUX_CHILDREN.map((c) => c.path);
export const uiuxSiblings = (slug) => UIUX_CHILDREN.filter((c) => c.slug !== slug);
