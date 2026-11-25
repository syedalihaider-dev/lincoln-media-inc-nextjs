import Image from "next/image";
import s from "./Screens.module.css";

/**
 * Real storefront and back-office interfaces in HTML, filled from a demo store (src/data/ecommerce/stores.js).
 * Every size is in --u, so a screen scales with its frame: desktop screens are drawn at 1280 units wide,
 * phone screens at 390. <Screen kind="product" store={STORES.maison} device="phone" />
 *
 * kinds: home · collection · search · product · cart · checkout · confirm · admin · quickorder · offers ·
 *        subscribe · lookbook. `loading` draws a product page as its skeleton (the moment before content).
 */
export default function Screen({ kind = "home", store, device = "desktop", loading = false, data = {}, className = "", ...rest }) {
  const View = VIEWS[kind] || Home;
  return (
    <div className={`${s.screen} ${s[device]} ${className}`} style={{ "--acc": store.accent }} {...rest}>
      <View store={store} phone={device === "phone"} loading={loading} data={data} />
    </div>
  );
}

const Pic = ({ img, alt = "", className = "", sizes = "30vw", priority = false }) => (
  <span className={`${s.pic} ${className}`}>
    <Image src={img} alt={alt} fill sizes={sizes} priority={priority} />
  </span>
);

function Nav({ store, phone, search = false, cartCount = 0 }) {
  return (
    <header className={s.nav}>
      {phone ? <span className={s.burger} aria-hidden="true"><i /><i /></span> : null}
      <strong className={s.logo}>{store.name}</strong>
      {!phone && <nav className={s.links}>{store.nav.map((n) => <span key={n}>{n}</span>)}</nav>}
      <span className={s.tools}>
        {search ? <span className={s.searchMini}>{store.search}<i className={s.caret} /></span> : !phone && <span>Search</span>}
        {!phone && <span>Account</span>}
        <span className={s.bag}>Bag{cartCount ? <b>{cartCount}</b> : null}</span>
      </span>
    </header>
  );
}

function Home({ store, phone }) {
  const list = store.products.slice(0, phone ? 2 : 3);
  return (
    <>
      <Nav store={store} phone={phone} />
      <section className={s.heroBanner}>
        <Pic img={store.hero.img} sizes="60vw" />
        <div className={s.heroCopy}>
          <em>New season</em>
          <h4>{store.hero.title}</h4>
          <p>{store.hero.sub}</p>
          <span className={s.btn}>Shop the edit</span>
        </div>
      </section>
      <section className={s.strip}>
        <div className={s.stripHead}><b>Most loved</b><span>View all</span></div>
        <div className={s.grid}>{list.map((p) => <Card key={p.name} p={p} />)}</div>
      </section>
    </>
  );
}

const Card = ({ p, compact = false }) => (
  <article className={`${s.card} ${compact ? s.compact : ""}`}>
    <Pic img={p.img} className={s.cardPic} sizes="20vw" />
    {p.tag && <em className={s.tag}>{p.tag}</em>}
    <h5>{p.name}</h5>
    <p><span>{p.variant}</span><b>{p.price}</b></p>
  </article>
);

function Collection({ store, phone, data }) {
  const chips = data.chips || ["All", "Leather", "Under $400", "In stock", "Sort: Featured"];
  return (
    <>
      <Nav store={store} phone={phone} />
      <section className={s.colHead}>
        <span className={s.crumbs}>Home / {data.title || "Shop all"}</span>
        <h4>{data.title || "Shop all"}</h4>
        <div className={s.chips}>{chips.map((c, i) => <span key={c} className={i === (data.active ?? 1) ? s.chipOn : ""}>{c}</span>)}</div>
      </section>
      <div className={`${s.grid} ${s.gridCol}`}>{store.products.slice(0, phone ? 4 : 6).map((p) => <Card key={p.name} p={p} compact />)}</div>
    </>
  );
}

function Search({ store, phone }) {
  const hits = store.products.slice(0, 3);
  return (
    <>
      <Nav store={store} phone={phone} />
      <section className={s.searchPane}>
        <div className={s.searchField}><span>{store.search}</span><i className={s.caret} /><em>Esc</em></div>
        <div className={s.searchCols}>
          <div className={s.suggest}>
            <b>Suggestions</b>
            {[`${store.search} bags`, `${store.search} accessories`, `${store.search} care guide`].map((t) => <span key={t}><mark>{store.search}</mark>{t.slice(store.search.length)}</span>)}
            <b>Collections</b>
            <span>{store.nav[1]}</span>
          </div>
          <div className={s.hits}>
            <b>Products</b>
            {hits.map((p) => (
              <div key={p.name} className={s.hit}><Pic img={p.img} sizes="8vw" /><span><strong>{p.name}</strong><small>{p.variant}</small></span><em>{p.price}</em></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Product({ store, phone, loading, data }) {
  const p = store.products[data.index ?? 0];
  if (loading) {
    return (
      <>
        <Nav store={store} phone={phone} />
        <section className={s.pdp}>
          <div className={`${s.gallery} ${s.sk}`} />
          <div className={s.info}><i className={s.skLine} style={{ width: "40%" }} /><i className={s.skLine} style={{ width: "80%", height: "calc(34 * var(--u))" }} /><i className={s.skLine} style={{ width: "25%" }} /><i className={s.skLine} style={{ width: "100%", height: "calc(56 * var(--u))", marginTop: "calc(30 * var(--u))" }} /></div>
        </section>
      </>
    );
  }
  return (
    <>
      <Nav store={store} phone={phone} cartCount={data.added ? 1 : 0} />
      <section className={s.pdp}>
        <div className={s.gallery}>
          <Pic img={p.img} alt="" sizes="40vw" />
          {!phone && <div className={s.thumbs}>{store.products.slice(0, 4).map((q, i) => <Pic key={q.name} img={q.img} className={i === 0 ? s.thumbOn : ""} sizes="5vw" />)}</div>}
        </div>
        <div className={s.info}>
          {p.tag && <em className={s.tag}>{p.tag}</em>}
          <h4>{p.name}</h4>
          <p className={s.price}>{p.price}</p>
          <div className={s.opt}><small>Colour — {p.variant}</small><span className={s.swatches}><i style={{ background: "#7a4a2a" }} className={s.swOn} /><i style={{ background: "#1b1b1b" }} /><i style={{ background: "#b9a48a" }} /></span></div>
          {data.subscribe ? (
            <div className={s.subs}>
              <label><i /> One-time purchase <b>{p.price}</b></label>
              <label className={s.subOn}><i /> Subscribe &amp; refill every 8 weeks <b>Save on every refill</b></label>
            </div>
          ) : null}
          <span className={`${s.btn} ${s.btnWide} ${data.added ? s.btnDone : ""}`}>{data.added ? "Added to bag ✓" : "Add to bag"}</span>
          <span className={`${s.btn} ${s.btnGhost} ${s.btnWide}`}>Express checkout</span>
          <ul className={s.notes}><li>Free delivery and returns</li><li>Order by 2pm for next-day dispatch</li></ul>
        </div>
      </section>
    </>
  );
}

function Cart({ store, phone }) {
  const lines = store.products.slice(0, 2);
  return (
    <div className={s.cartWrap}>
      {!phone && <div className={s.cartUnder}><Product store={store} phone={phone} data={{ added: true }} /></div>}
      <aside className={s.drawer}>
        <div className={s.drawerHead}><b>Your bag</b><span>{lines.length} items</span></div>
        <div className={s.ship}><span>You've unlocked free delivery</span><i><b /></i></div>
        {lines.map((p) => (
          <div key={p.name} className={s.line}><Pic img={p.img} sizes="8vw" /><span><strong>{p.name}</strong><small>{p.variant}</small><small className={s.qty}>− 1 +</small></span><em>{p.price}</em></div>
        ))}
        <div className={s.upsell}><small>Pairs well with</small><div className={s.line}><Pic img={store.products[2].img} sizes="6vw" /><span><strong>{store.products[2].name}</strong></span><em className={s.plus}>Add</em></div></div>
        <div className={s.total}><span>Subtotal</span><b>Calculated at checkout</b></div>
        <span className={`${s.btn} ${s.btnWide}`}>Checkout</span>
      </aside>
    </div>
  );
}

function Checkout({ store, phone }) {
  const lines = store.products.slice(0, 2);
  return (
    <div className={s.checkout}>
      <div className={s.coMain}>
        <strong className={s.logo}>{store.name}</strong>
        <div className={s.express}><b>Express checkout</b><span><i>Wallet</i><i>Pay later</i><i>Saved card</i></span></div>
        <div className={s.or}><span>or continue below</span></div>
        <fieldset className={s.fields}>
          <legend>Contact</legend>
          <span className={s.input}><small>Email</small>alex@example.com</span>
          <legend>Delivery</legend>
          <span className={s.inputRow}><span className={s.input}><small>First name</small>Alex</span><span className={s.input}><small>Last name</small>Morgan</span></span>
          <span className={s.input}><small>Address</small>667 Madison Ave<i className={s.caret} /></span>
          <span className={s.radio}><i className={s.on} /> Standard delivery <b>Free</b></span>
          <span className={s.radio}><i /> Next day <b>+ $15</b></span>
        </fieldset>
        <span className={`${s.btn} ${s.btnWide}`}>Pay now</span>
      </div>
      {!phone && (
        <aside className={s.coSide}>
          {lines.map((p) => <div key={p.name} className={s.line}><Pic img={p.img} sizes="6vw" /><span><strong>{p.name}</strong><small>{p.variant}</small></span><em>{p.price}</em></div>)}
          <div className={s.code}><span>Gift card or discount code</span><i>Apply</i></div>
          <div className={s.total}><span>Delivery</span><b>Free</b></div>
          <div className={s.total}><span>Total</span><b>Shown before you pay</b></div>
        </aside>
      )}
    </div>
  );
}

function Confirm({ store, phone }) {
  return (
    <div className={s.confirm}>
      <strong className={s.logo}>{store.name}</strong>
      <span className={s.tick} aria-hidden="true" />
      <h4>Thank you, Alex.</h4>
      <p>Your order is confirmed. We'll email you when it's on its way.</p>
      <div className={s.track}>{["Confirmed", "Packed", "Shipped", "Delivered"].map((t, i) => <span key={t} className={i === 0 ? s.trackOn : ""}><i />{t}</span>)}</div>
      {!phone && <div className={s.line}><Pic img={store.products[0].img} sizes="6vw" /><span><strong>{store.products[0].name}</strong><small>{store.products[0].variant}</small></span><em>{store.products[0].price}</em></div>}
    </div>
  );
}

const ADMIN_DEFAULT = {
  app: "Store admin",
  nav: ["Home", "Orders", "Products", "Customers", "Content", "Settings"],
  active: 1,
  title: "Orders",
  cols: ["Order", "Customer", "Channel", "Fulfilment", "Payment"],
  rows: [
    ["#1042", "A. Morgan", "Online store", "Unfulfilled", "Paid"],
    ["#1041", "J. Chen", "Mobile", "Fulfilled", "Paid"],
    ["#1040", "R. Patel", "In store", "Fulfilled", "Paid"],
    ["#1039", "S. Lopez", "Online store", "Partially fulfilled", "Paid"],
    ["#1038", "M. Okafor", "Marketplace", "Unfulfilled", "Pending"],
  ],
};
function Admin({ store, phone, data }) {
  const a = { ...ADMIN_DEFAULT, ...data };
  return (
    <div className={s.admin}>
      {!phone && (
        <aside className={s.adminNav}>
          <b>{a.app}</b>
          {a.nav.map((n, i) => <span key={n} className={i === a.active ? s.adminOn : ""}>{n}</span>)}
          {a.scope && <small className={s.scope}>{a.scope}</small>}
        </aside>
      )}
      <section className={s.adminMain}>
        <div className={s.adminHead}><h4>{a.title}</h4><span className={s.btn}>{a.action || "Create"}</span></div>
        {a.filters && <div className={s.chips}>{a.filters.map((f, i) => <span key={f} className={i === 0 ? s.chipOn : ""}>{f}</span>)}</div>}
        <table className={s.table}>
          <thead><tr>{a.cols.slice(0, phone ? 3 : undefined).map((c) => <th key={c}>{c}</th>)}</tr></thead>
          <tbody>
            {a.rows.map((r) => (
              <tr key={r[0]}>{r.slice(0, phone ? 3 : undefined).map((c, i) => <td key={i}>{/^(Unfulfilled|Pending|Draft|Review|Low|Processing)$/.test(c) ? <i className={s.warn}>{c}</i> : /^(Paid|Fulfilled|Active|Live|Approved|Synced|Enabled|Completed)$/.test(c) ? <i className={s.ok}>{c}</i> : c}</td>)}</tr>
            ))}
          </tbody>
        </table>
        <small className={s.store}>{store.domain}</small>
      </section>
    </div>
  );
}

function QuickOrder({ store, phone, data }) {
  const rows = store.products.slice(0, 4);
  return (
    <>
      <Nav store={store} phone={phone} />
      <section className={s.quick}>
        <div className={s.quickHead}><div><small>{data.account || "Trade account · invoice terms"}</small><h4>Quick order</h4></div><span className={`${s.btn} ${s.btnGhost}`}>Upload CSV</span></div>
        <table className={s.table}>
          <thead><tr><th>SKU</th>{!phone && <th>Product</th>}<th>Your price</th><th>Qty</th></tr></thead>
          <tbody>
            {rows.map((p, i) => (
              <tr key={p.name}><td>{p.sku || `SKU-${i}`}</td>{!phone && <td>{p.name}</td>}<td>{data.tiered ? "Price list" : p.price}</td><td><span className={s.qtyBox}>{[12, 6, 24, 4][i]}</span></td></tr>
            ))}
          </tbody>
        </table>
        <div className={s.quickFoot}><span>Delivery to: Main warehouse</span><span className={s.btn}>Add all to order</span></div>
      </section>
    </>
  );
}

function Offers({ store, phone }) {
  const p = store.products[0];
  return (
    <>
      <Nav store={store} phone={phone} />
      <section className={s.pdp}>
        <div className={s.gallery}><Pic img={p.img} sizes="40vw" /></div>
        <div className={s.info}>
          <em className={s.tag}>{store.offers.length} sellers</em>
          <h4>{p.name}</h4>
          <p className={s.price}>From {store.offers[0].price}</p>
          <div className={s.offers}>
            {store.offers.map((o, i) => (
              <div key={o.seller} className={`${s.offer} ${i === 0 ? s.offerOn : ""}`}><span><strong>{o.seller}</strong><small>{o.ship}{o.note ? ` · ${o.note}` : ""}</small></span><b>{o.price}</b></div>
            ))}
          </div>
          <span className={`${s.btn} ${s.btnWide}`}>Add to basket</span>
        </div>
      </section>
    </>
  );
}

function Lookbook({ store, phone }) {
  return (
    <div className={s.look}>
      <Nav store={store} phone={phone} />
      <Pic img={store.hero.img} sizes="70vw" className={s.lookPic} />
      <div className={s.lookCopy}><em>Lookbook</em><h4>{store.hero.title}</h4></div>
      {store.products.slice(0, 2).map((p, i) => (
        <span key={p.name} className={`${s.hot} ${s[`hot${i}`]}`}><i /><b>{p.name}<small>{p.price}</small></b></span>
      ))}
    </div>
  );
}

const VIEWS = {
  home: Home, collection: Collection, search: Search, product: Product, cart: Cart, checkout: Checkout, confirm: Confirm,
  admin: Admin, quickorder: QuickOrder, offers: Offers, lookbook: Lookbook,
  subscribe: (props) => <Product {...props} data={{ ...props.data, subscribe: true }} />,
};
