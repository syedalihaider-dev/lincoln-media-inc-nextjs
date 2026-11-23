import Image from "next/image";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import VideoBackground from "@/components/Common/VideoBackground";
import styles from "./Screens.module.css";

/* Real interfaces, written in HTML at real device widths (1280 desktop · 390 phone) and scaled into
   their frames: a website, the CMS editor behind it, its code, its API, its theme, its store and its
   plugin settings. Real photography and real WordPress code — no drawn placeholders. They describe a
   generic "yourbrand" site, never a client. All decorative (aria-hidden by their frames). */

/* ---------- Frames ---------- */
export function Browser({ url = "yourbrand.com", children, className = "", dark = false }) {
  return (
    <div className={`${styles.browser} ${dark ? styles.dark : ""} ${className}`} aria-hidden="true">
      <div className={styles.chrome}><i /><i /><i /><span>{url}</span></div>
      <div className={styles.viewport}><ScaledScreen width={1280}>{children}</ScaledScreen></div>
    </div>
  );
}
export function Phone({ children, className = "" }) {
  return (
    <div className={`${styles.phone} ${className}`} aria-hidden="true">
      <span className={styles.notch} />
      <div className={styles.phoneScreen}><ScaledScreen width={390}>{children}</ScaledScreen></div>
    </div>
  );
}

/* ---------- The website ---------- */
export function Site({ photos = [], video, poster, compact = false }) {
  const [hero, ...cards] = photos;
  return (
    <div className={`${styles.site} ${compact ? styles.siteCompact : ""}`}>
      <header className={styles.siteNav}>
        <b>yourbrand</b>
        <nav><span>Collections</span><span>Journal</span><span>About</span><span>Contact</span></nav>
        <em>Book a visit</em>
        <i className={styles.burger}><s /><s /></i>
      </header>
      <section className={styles.siteHero}>
        {video && !compact ? <VideoBackground src={video} poster={poster} tint={false} className={styles.siteVideo} /> : hero && <Image src={hero} alt="" fill sizes="50vw" className={styles.cover} />}
        <div className={styles.siteHeroText}>
          <p>New season</p>
          <h3>Made to be remembered.</h3>
          <span>Discover more</span>
        </div>
      </section>
      <section className={styles.siteCards}>
        {["Collections", "Journal", "Visit us"].map((t, i) => (
          <div key={t} className={styles.siteCard}>
            <div className={styles.siteCardImg}>{cards[i] && <Image src={cards[i]} alt="" fill sizes="20vw" className={styles.cover} />}</div>
            <b>{t}</b><small>Read more →</small>
          </div>
        ))}
      </section>
    </div>
  );
}

/* ---------- The CMS editor ---------- */
export function Editor({ photo }) {
  return (
    <div className={styles.app}>
      <div className={styles.appBar}><b className={styles.appLogo} /><span>Home — Editing</span><small>Saved</small><em>Update</em></div>
      <div className={styles.editor}>
        <aside className={styles.edBlocks}>
          <p>Blocks</p>
          {["Heading", "Paragraph", "Image", "Cover", "Columns", "Gallery", "Buttons", "Query loop"].map((b, i) => <span key={b} className={i === 0 ? styles.edOn : ""}><i />{b}</span>)}
        </aside>
        <div className={styles.edCanvas}>
          <p className={styles.edLabel}>Heading</p>
          <h3 className={styles.edH}>Made to be remembered.<i className={styles.caret} /></h3>
          <p className={styles.edP}>Our new season arrives this month. Visit the studio, or browse the collection online.</p>
          <div className={styles.edImg}>{photo && <Image src={photo} alt="" fill sizes="30vw" className={styles.cover} />}</div>
        </div>
        <aside className={styles.edSide}>
          <p>Block · Heading</p>
          <label>Level<span>H1</span></label>
          <label>Typography<span>Display · 64</span></label>
          <label>Colour<span className={styles.sw}><i /><i /><i /></span></label>
          <label>Alignment<span>Left</span></label>
        </aside>
      </div>
    </div>
  );
}

/* ---------- The theme's code (real WordPress API) ---------- */
const CODE = [
  ["c", "<?php // functions.php — yourbrand theme"],
  ["", ""],
  ["k", "add_action( 'after_setup_theme', function () {"],
  ["", "    add_theme_support( 'editor-styles' );"],
  ["", "    add_theme_support( 'responsive-embeds' );"],
  ["", "    register_nav_menus( [ 'primary' => 'Main menu' ] );"],
  ["k", "} );"],
  ["", ""],
  ["k", "add_action( 'init', function () {"],
  ["", "    register_post_type( 'collection', ["],
  ["s", "        'label'        => 'Collections',"],
  ["s", "        'public'       => true,"],
  ["s", "        'show_in_rest' => true,"],
  ["s", "        'supports'     => [ 'title', 'editor', 'thumbnail' ],"],
  ["", "    ] );"],
  ["k", "} );"],
];
export function Code() {
  return (
    <div className={styles.code}>
      <div className={styles.codeTabs}><span className={styles.tabOn}>functions.php</span><span>theme.json</span><span>style.css</span></div>
      <pre>{CODE.map(([t, l], i) => <span key={i} className={styles[`t_${t || "n"}`]}><em>{String(i + 1).padStart(2, " ")}</em>{l}{"\n"}</span>)}</pre>
    </div>
  );
}

/* ---------- The REST API answering the front end ---------- */
export function Api() {
  return (
    <div className={styles.api}>
      <p className={styles.apiReq}><b>GET</b> /wp-json/wp/v2/collection?per_page=3 <span>200 OK</span></p>
      <pre className={styles.apiJson}>{`[
  {
    "id": 128,
    "title": { "rendered": "New season" },
    "status": "publish",
    "featured_media": 412,
    "link": "https://yourbrand.com/collections/new-season/"
  },
  { "id": 127, "title": { "rendered": "Journal" }, ... }
]`}</pre>
      <div className={styles.apiLinks}>
        {[["WooCommerce", "Orders & products"], ["ERP", "Stock & invoices"], ["WhatsApp", "Customer messages"]].map(([n, d]) => (
          <span key={n}><i />{n}<small>{d}</small></span>
        ))}
      </div>
    </div>
  );
}

/* ---------- The theme's design system ---------- */
export function Theme() {
  return (
    <div className={styles.theme}>
      <div className={styles.themeHead}><b>theme.json</b><span>yourbrand · v1.0</span></div>
      <div className={styles.themeGrid}>
        <div className={styles.themeType}>
          <p className={styles.tLabel}>Typography</p>
          <p className={styles.tDisplay}>Aa</p>
          <p className={styles.tScale}><span style={{ fontSize: 44 }}>Heading</span><span style={{ fontSize: 28 }}>Subheading</span><span style={{ fontSize: 18 }}>Body text, set for reading.</span></p>
        </div>
        <div className={styles.themeColors}>
          <p className={styles.tLabel}>Colour</p>
          {[["#0a101c", "Ink"], ["#1fa89a", "Accent"], ["#e9e4dc", "Sand"], ["#f8f9fc", "Paper"]].map(([c, n]) => <span key={n}><i style={{ background: c }} />{n}<small>{c}</small></span>)}
        </div>
        <div className={styles.themeSpace}>
          <p className={styles.tLabel}>Spacing</p>
          {[8, 16, 24, 40, 64].map((s) => <span key={s}><i style={{ width: s * 2 }} />{s}</span>)}
        </div>
      </div>
    </div>
  );
}

/* ---------- The draft, before the CMS ---------- */
export function Draft() {
  return (
    <div className={styles.draft}>
      <p className={styles.dMeta}>Draft · Homepage copy</p>
      <h3>Made to be remembered.</h3>
      <p>Our new season arrives this month. Visit the studio, or browse the collection online.</p>
      <p className={styles.dNote}>Sections: hero · collections · journal · visit us</p>
      <p className={styles.dNote}>Images: 4 · Call to action: “Book a visit”</p>
    </div>
  );
}

/* ---------- WooCommerce store ---------- */
export function Store({ photos = [] }) {
  return (
    <div className={styles.store}>
      <div className={styles.storeNav}><b>yourbrand</b><span>Shop</span><span>New in</span><span>Gifts</span><em>Cart · 2</em></div>
      <div className={styles.storeGrid}>
        {["Signature piece", "Everyday edit", "Limited series", "The classic", "Studio set", "Gift card"].map((t, i) => (
          <div key={t} className={styles.product}>
            <div className={styles.pImg}>{photos[i % photos.length] && <Image src={photos[i % photos.length]} alt="" fill sizes="15vw" className={styles.cover} />}</div>
            <b>{t}</b>
            <span>Add to cart</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- A custom plugin's settings ---------- */
export function Settings() {
  const rows = [["Online booking", true], ["Show on product pages", true], ["Email notifications", false], ["Sync with calendar", true]];
  return (
    <div className={styles.app}>
      <div className={styles.appBar}><b className={styles.appLogo} /><span>Bookings · Settings</span><em>Save changes</em></div>
      <div className={styles.settings}>
        <nav>{["General", "Availability", "Integrations", "Emails"].map((t, i) => <span key={t} className={i === 0 ? styles.edOn : ""}>{t}</span>)}</nav>
        <div className={styles.rows}>
          {rows.map(([r, on]) => <div key={r} className={styles.row}><span>{r}</span><i className={on ? styles.toggleOn : ""} /></div>)}
          <div className={styles.row}><span>Slots per day</span><b className={styles.slider}><i /></b></div>
        </div>
      </div>
    </div>
  );
}
