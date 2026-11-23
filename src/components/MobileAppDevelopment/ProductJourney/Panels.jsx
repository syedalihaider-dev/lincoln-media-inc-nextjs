import styles from "./Panels.module.css";

/* The working documents of each stage, written as the real artefacts: a brief, design tokens, the
   architecture, code, a test run, a release checklist. They describe the generic "Yourbrand" app. */
const SWIFT = [
  ["c", "// ProductView.swift"],
  ["k", "struct ProductView: View {"],
  ["", "  let product: Product"],
  ["", "  @Environment(Cart.self) var cart"],
  ["", ""],
  ["k", "  var body: some View {"],
  ["", "    VStack(alignment: .leading) {"],
  ["", "      Gallery(product.photos)"],
  ["s", "      Text(product.name).font(.title.bold())"],
  ["", "      SizePicker(selection: $size)"],
  ["s", "      Button(\"Add to bag\") { cart.add(product) }"],
  ["", "        .buttonStyle(.primary)"],
  ["", "    }"],
  ["", "  }"],
  ["k", "}"],
];

const PANELS = {
  brief: () => (
    <>
      <h4>Product brief</h4>
      <dl className={styles.dl}>
        {[["Audience", "Returning customers, mostly on iPhone"], ["Goal", "More repeat orders from the app"], ["Must have", "Saved sizes · one-screen checkout · live tracking"], ["Success", "Orders completed in the app"]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </>
  ),
  tokens: () => (
    <>
      <h4>Design tokens</h4>
      <div className={styles.type}>
        {[["Display", "30 / 34 · Bold", 26], ["Title", "18 / 24 · Semibold", 18], ["Body", "15 / 21 · Regular", 14], ["Caption", "13 / 18 · Regular", 12]].map(([n, v, s]) => <div key={n}><span style={{ fontSize: s }}>{n}</span><small>{v}</small></div>)}
      </div>
      <div className={styles.swatches}>
        {[["#1F6FEB", "Accent"], ["#0D1220", "Ink"], ["#F6F6F8", "Surface"], ["#16A36A", "Success"]].map(([c, n]) => <span key={c}><i style={{ background: c }} /><small>{n}<br />{c}</small></span>)}
      </div>
      <p className={styles.chips}><span>Radius 18</span><span>Spacing 4 · 8 · 12 · 20</span><span>Touch ≥ 44 pt</span></p>
    </>
  ),
  arch: () => (
    <>
      <h4>Architecture</h4>
      <ol className={styles.arch}>
        {[["App", "iOS · Android"], ["API gateway", "REST · auth tokens"], ["Services", "Catalogue · Orders · Payments"], ["Data", "PostgreSQL · cache"], ["External", "Payments · Maps · Push"]].map(([n, d]) => <li key={n}><b>{n}</b><small>{d}</small></li>)}
      </ol>
    </>
  ),
  code: () => (
    <>
      <h4>ProductView.swift</h4>
      <pre className={styles.code}>{SWIFT.map(([t, l], i) => <span key={i} className={styles[`t_${t || "n"}`]}><em>{String(i + 1).padStart(2, " ")}</em>{l}{"\n"}</span>)}</pre>
    </>
  ),
  tests: () => (
    <>
      <h4>Test run · iPhone 15, Pixel 8, iPad Air</h4>
      <ul className={styles.log}>
        {["CheckoutTests.testPaysWithSavedCard", "CheckoutTests.testFaceIDConfirms", "CartTests.testAddsSelectedSize", "OrderAPITests.testRetriesOnTimeout", "UITests.testCheckoutVoiceOver", "SnapshotTests.testDarkMode"].map((t) => <li key={t}><i>✓</i><span>{t}</span></li>)}
      </ul>
      <p className={styles.pass}>All checks passed</p>
    </>
  ),
  release: () => (
    <>
      <h4>Release · version 1.0</h4>
      <ul className={styles.check}>
        {[["App Store review", "Approved"], ["Google Play", "Rolled out"], ["Store listings", "Published"], ["Crash reporting", "Live"], ["Analytics", "Live"]].map(([n, s]) => <li key={n}><span>{n}</span><b>{s}</b></li>)}
      </ul>
    </>
  ),
};

export default function Panel({ kind, className = "", ...rest }) {
  const Body = PANELS[kind];
  return <div className={`${styles.panel} ${className}`} aria-hidden="true" {...rest}><Body /></div>;
}
