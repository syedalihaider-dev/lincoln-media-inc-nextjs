import { Fragment } from "react";
import PageShell from "@/components/Common/PageShell";
import { SITE } from "@/data/site";
import { ROBOTS } from "@/config/site";
import { LEGAL, LEGAL_META, LEGAL_PAGES } from "@/data/legal";
import { CONTACT_FORM_HREF } from "@/data/contact";
import LegalHero from "./LegalHero";
import LegalToc from "./LegalToc";
import s from "./Legal.module.css";

/** "**bold**" in the source text → <strong> */
const Rich = ({ text }) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>
  );

function Contact() {
  return (
    <dl className={s.contact}>
      <div><dt>Email</dt><dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd></div>
      <div><dt>Phone</dt><dd><a href={SITE.phoneHref}>{SITE.phone}</a></dd></div>
      <div><dt>Studio</dt><dd>{SITE.street}, {SITE.locality}</dd></div>
      <div><dt>Write to us</dt><dd><a href={CONTACT_FORM_HREF}>Contact form</a></dd></div>
    </dl>
  );
}

function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.type === "p") return <p key={i}><Rich text={b.text} /></p>;
    if (b.type === "list") return <ul key={i}>{b.items.map((it, j) => <li key={j}><Rich text={it} /></li>)}</ul>;
    if (b.type === "contact") return <Contact key={i} />;
    if (b.type === "sub") return (
      <div key={i} className={s.sub}>
        <h3>{b.title}</h3>
        <Blocks blocks={b.blocks} />
      </div>
    );
    return null;
  });
}

/**
 * A policy page, built to be read: a compact hero, then one comfortable reading column with a
 * sticky, scroll-aware table of contents generated from the document's own sections (a fold-out
 * list on phones). The text is the live site's, unchanged (src/data/legal.js).
 */
export default function LegalPage({ doc }) {
  const meta = LEGAL_META[doc];
  const page = LEGAL[doc];
  const toc = page.sections.map((x) => ({ id: x.id, title: x.title }));
  const others = LEGAL_PAGES.filter((k) => k !== doc).map((k) => LEGAL_META[k]);

  return (
    <>
      <PageShell current={meta.path}>
        <LegalHero meta={meta} others={others} />
        <div className={s.layout}>
          <LegalToc items={toc} />
          <article className={s.doc} aria-labelledby="legal-title">
            {page.intro.length > 0 && <div className={s.lede}><Blocks blocks={page.intro} /></div>}
            {page.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className={s.section} aria-labelledby={`${sec.id}-h`} data-legal-section>
                <h2 id={`${sec.id}-h`}>{sec.title}</h2>
                <Blocks blocks={sec.blocks} />
              </section>
            ))}
            <footer className={s.end}>
              <p className={s.endLabel}>Other policies</p>
              <ul className={s.endLinks}>
                {others.map((o) => <li key={o.path}><a href={o.path}>{o.title}<span aria-hidden="true">→</span></a></li>)}
              </ul>
              <a href="#top" className={s.top}>Back to top ↑</a>
            </footer>
          </article>
        </div>
      </PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebPage", name: meta.title, url: `${SITE.url}${meta.path}`, description: meta.summary, publisher: { "@type": "Organization", name: SITE.name, url: SITE.url } },
            { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE.url }, { "@type": "ListItem", position: 2, name: meta.title, item: `${SITE.url}${meta.path}` }] },
          ],
        }) }}
      />
    </>
  );
}

export function legalMetadata(doc) {
  const meta = LEGAL_META[doc];
  return {
    title: { absolute: meta.seoTitle },
    description: `${meta.summary} ${SITE.name}, New York.`,
    alternates: { canonical: meta.path },
    robots: ROBOTS,
    openGraph: { type: "website", url: meta.path, title: meta.seoTitle, description: meta.summary, siteName: SITE.name, locale: "en_US" },
    twitter: { card: "summary", title: meta.seoTitle, description: meta.summary },
  };
}
