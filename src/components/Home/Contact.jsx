"use client";
import { SITE } from "@/data/site";
import { CONTACT_SERVICES } from "@/data/services";
import SectionLabel from "@/components/Common/SectionLabel";
import RevealText from "@/components/Common/RevealText";
import Button from "@/components/Common/Button";
import styles from "./Contact.module.css";

// Exact strings: the guided intro pre-selects the range that matches the visitor's estimate
const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"];

/**
 * Contact — the enquiry form.
 * Behaviour lives in public/app.js and is unchanged: it pre-fills these fields from the guided plan
 * (name, email, service, budget, message) and, on submit, opens an email to the studio and writes
 * into #formNote. So the form's id, field names and option values must stay exactly as they are.
 * Fields are uncontrolled on purpose, so React never overwrites what app.js fills in.
 */
export default function Contact() {
  return (
    <section id="contact" className={styles.section} data-chapter="Contact" data-nav="contact" aria-labelledby="contact-title">
      <div className={styles.left}>
        <SectionLabel index="13">Contact</SectionLabel>
        <RevealText id="contact-title" className={styles.title}>
          Tell us what <em>you&apos;re building.</em>
        </RevealText>
        <ul className={styles.direct}>
          <li><span>Email</span><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          <li><span>Phone</span><a href={SITE.phoneHref}>{SITE.phone}</a></li>
          <li><span>WhatsApp</span><a href={SITE.whatsapp} target="_blank" rel="noopener">Message us ↗</a></li>
          <li><span>Studio</span><address>{SITE.street},<br />{SITE.locality}</address></li>
        </ul>
        <p className={styles.plan}>Not sure where to start? <a href="/">Get your AI build plan →</a></p>
      </div>

      <form className={styles.form} id="contactForm" aria-label="Project enquiry">
        <label className={styles.field}>
          <input name="name" required autoComplete="name" placeholder=" " />
          <span>Name *</span>
        </label>
        <label className={styles.field}>
          <input name="email" type="email" required autoComplete="email" placeholder=" " />
          <span>Email *</span>
        </label>
        <label className={`${styles.field} ${styles.wide}`}>
          <input name="company" autoComplete="organization" placeholder=" " />
          <span>Company / Brand</span>
        </label>
        <label className={`${styles.field} ${styles.select}`}>
          <select name="service" required defaultValue="">
            <option value="" disabled>Choose a service</option>
            {CONTACT_SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <span>Service *</span>
        </label>
        <label className={`${styles.field} ${styles.select}`}>
          <select name="budget" required defaultValue="">
            <option value="" disabled>Choose a range</option>
            {BUDGETS.map((b) => <option key={b}>{b}</option>)}
          </select>
          <span>Budget range *</span>
        </label>
        <label className={`${styles.field} ${styles.wide}`}>
          <textarea name="message" rows={4} required placeholder=" " />
          <span>Project description *</span>
        </label>
        <div className={styles.foot}>
          <Button type="submit" size="lg">Send enquiry</Button>
          <p className={styles.avail}><i aria-hidden="true" />Available for new projects</p>
          <p className={styles.note} id="formNote" aria-live="polite" />
        </div>
      </form>
    </section>
  );
}
