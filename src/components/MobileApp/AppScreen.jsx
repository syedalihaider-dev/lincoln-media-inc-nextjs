import Image from "next/image";
import imgRing from "@public/images/work/aureum.jpg";
import imgBike from "@public/images/work/bike-store.jpg";
import imgDusk from "@public/images/home/nyc-dusk.jpg";
import imgLondon from "@public/images/work/belgravia-london.jpg";
import imgShop from "@public/images/services/ecommerce.jpg";
import imgHouse from "@public/images/work/betterhomes.jpg";
import styles from "./AppScreen.module.css";

/* Real mobile interfaces, written in HTML at a 390 × 844 phone screen and scaled into a Device.
   They describe a generic "Yourbrand" app — never a client — with real photography inside.
   platform: "ios" | "android" changes the system chrome (status bar, navigation, controls).
   mode: undefined (finished) · "wire" (wireframe) · "mono" (design, no imagery) · "dev" (inspector).
   All decorative: the Device that holds them is aria-hidden. */

const PHOTOS = { ring: imgRing, bike: imgBike, dusk: imgDusk, map: imgLondon, shop: imgShop, house: imgHouse };
const Pic = ({ k, sizes = "390px", className = "" }) => (
  <span className={`${styles.pic} ${className}`} data-img>
    <Image src={PHOTOS[k]} alt="" fill sizes={sizes} className={styles.cover} />
  </span>
);

const P = {
  home: "M4 11 12 4l8 7v9h-5v-6H9v6H4z", search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm5 12 4 4",
  bag: "M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0", user: "M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0",
  bell: "M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0", heart: "M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11z",
  back: "M15 5l-7 7 7 7", cal: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4", chart: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  chat: "M4 5h16v11H9l-5 4z", check: "M5 12l5 5 9-10", face: "M8 3H5v3M16 3h3v3M8 21H5v-3M16 21h3v-3M9 10v1M15 10v1M9 16c2 1.5 4 1.5 6 0M12 10v3",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2", lock: "M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3",
  pin: "M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12zM12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  plus: "M12 5v14M5 12h14", send: "M4 12 20 4l-6 16-3-7z", star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z",
};
const Ic = ({ n, className = "" }) => <svg viewBox="0 0 24 24" className={`${styles.ic} ${className}`}><path d={P[n]} /></svg>;

function Status({ dark }) {
  return (
    <div className={`${styles.status} ${dark ? styles.onDark : ""}`}>
      <b>9:41</b>
      <span className={styles.sys}><i className={styles.bars}><s /><s /><s /><s /></i><i className={styles.wifi} /><i className={styles.batt}><s /></i></span>
    </div>
  );
}

const TABS = { shop: [["home", "Home"], ["search", "Search"], ["bag", "Bag"], ["user", "Profile"]], work: [["chart", "Overview"], ["check", "Approvals"], ["chat", "Inbox"], ["user", "Account"]] };
function Tabs({ set = "shop", on = 0 }) {
  return (
    <nav className={styles.tabs}>
      {TABS[set].map(([n, l], i) => (
        <span key={l} className={i === on ? styles.tabOn : ""}><em><Ic n={n} /></em><small>{l}</small></span>
      ))}
    </nav>
  );
}

const Btn = ({ children, ghost, className = "" }) => <span className={`${styles.btn} ${ghost ? styles.ghost : ""} ${className}`}>{children}</span>;

/* ---------- The screens ---------- */
const SCREENS = {
  home: () => (
    <>
      <Status />
      <header className={styles.homeHead}>
        <div><small>Good evening</small><h3>Yourbrand</h3></div>
        <span className={styles.round}><Ic n="bell" /><i className={styles.dot} /></span>
      </header>
      <div className={styles.searchBar}><Ic n="search" /><span>Search the collection</span></div>
      <div className={styles.chips}>{["All", "New in", "Jewellery", "Cycling", "Home"].map((c, i) => <span key={c} className={i === 0 ? styles.chipOn : ""}>{c}</span>)}</div>
      <div className={styles.banner}>
        <Pic k="dusk" />
        <div className={styles.bannerText}><small>New season</small><b>Evenings in the city</b><Btn className={styles.bannerBtn}>Shop now</Btn></div>
      </div>
      <div className={styles.rowHead}><b>Popular this week</b><small>See all</small></div>
      <div className={styles.cards}>
        {[["ring", "Solitaire Ring", "$2,400"], ["bike", "Carbon Road", "$3,150"]].map(([k, n, p]) => (
          <div key={n} className={styles.card}><Pic k={k} sizes="180px" /><b>{n}</b><small>{p}</small><span className={styles.fav}><Ic n="heart" /></span></div>
        ))}
      </div>
      <Tabs />
    </>
  ),
  product: () => (
    <>
      <div className={styles.prodImg}><Pic k="ring" /><Status dark /><span className={`${styles.round} ${styles.floatL}`}><Ic n="back" /></span><span className={`${styles.round} ${styles.floatR}`}><Ic n="heart" /></span><i className={styles.pager}><s /><s /><s /></i></div>
      <div className={styles.sheet}>
        <small className={styles.over}>Fine jewellery</small>
        <h3 className={styles.big}>Solitaire Ring</h3>
        <div className={styles.meta}><span className={styles.stars}>★★★★★</span><small>4.9 · 128 reviews</small></div>
        <p className={styles.para}>18k recycled gold with a single lab-grown stone, set by hand.</p>
        <small className={styles.over}>Size</small>
        <div className={styles.sizes}>{[5, 6, 7, 8, 9].map((s) => <span key={s} className={s === 7 ? styles.sizeOn : ""}>{s}</span>)}</div>
        <div className={styles.buyRow}><div><small>Price</small><b>$2,400</b></div><Btn>Add to bag</Btn></div>
      </div>
    </>
  ),
  checkout: () => (
    <>
      <Status />
      <header className={styles.bar}><span className={styles.round}><Ic n="back" /></span><b>Checkout</b><i /></header>
      <div className={styles.list}>
        {[["ring", "Solitaire Ring", "Size 7", "$2,400"], ["shop", "Gift wrapping", "Signature box", "$30"]].map(([k, n, d, p]) => (
          <div key={n} className={styles.line}><Pic k={k} sizes="64px" className={styles.thumb} /><div><b>{n}</b><small>{d}</small></div><b>{p}</b></div>
        ))}
      </div>
      <div className={styles.block}><small className={styles.over}>Deliver to</small><div className={styles.addr}><Ic n="pin" /><div><b>Home</b><small>667 Madison Ave, New York</small></div><em>Change</em></div></div>
      <div className={styles.block}><small className={styles.over}>Pay with</small><div className={styles.addr}><i className={styles.cardChip} /><div><b>Visa •••• 4242</b><small>Expires 08/29</small></div><em>Change</em></div></div>
      <div className={styles.sum}><span><small>Subtotal</small><small>$2,430</small></span><span><small>Express delivery</small><small>$150</small></span><span><b>Total</b><b>$2,580</b></span></div>
      <div className={styles.payWrap}><Btn className={styles.pay}><Ic n="face" /> Pay $2,580</Btn><small>Confirm with Face ID</small></div>
    </>
  ),
  success: () => (
    <>
      <Status />
      <div className={styles.done}>
        <span className={styles.tick}><Ic n="check" /></span>
        <h3 className={styles.big}>Order confirmed</h3>
        <small>Order #YB-20418 · Arriving today</small>
      </div>
      <ol className={styles.steps}>
        {[["Order placed", "9:41 AM", 2], ["Packed", "10:05 AM", 2], ["On its way", "Courier assigned", 1], ["Delivered", "Expected by 1:30 PM", 0]].map(([n, t, s]) => (
          <li key={n} className={s === 2 ? styles.stDone : s === 1 ? styles.stNow : ""}><i /><div><b>{n}</b><small>{t}</small></div></li>
        ))}
      </ol>
      <div className={styles.foot}><Btn>Track order</Btn><Btn ghost>Back to shop</Btn></div>
    </>
  ),
  tracking: () => (
    <>
      <div className={styles.map}>
        <Pic k="map" />
        <svg viewBox="0 0 390 520" className={styles.route}><path d="M70 470 C 120 380, 90 320, 170 280 S 300 200, 290 110" /></svg>
        <span className={styles.me} /><span className={styles.dest}><Ic n="pin" /></span>
        <Status dark />
      </div>
      <div className={styles.sheet}>
        <i className={styles.grab} />
        <small className={styles.over}>Arriving in</small>
        <h3 className={styles.big}>12 minutes</h3>
        <div className={styles.progress}><s /></div>
        <div className={styles.courier}><span className={styles.avatar}>MR</span><div><b>Marco · Courier</b><small>Electric scooter · 1.8 mi away</small></div><span className={styles.round}><Ic n="chat" /></span><span className={`${styles.round} ${styles.roundA}`}><Ic n="phone" /></span></div>
      </div>
    </>
  ),
  booking: () => (
    <>
      <Status />
      <header className={styles.bar}><span className={styles.round}><Ic n="back" /></span><b>Book a visit</b><i /></header>
      <div className={styles.block}><small className={styles.over}>November</small>
        <div className={styles.days}>{[["Mon", 24], ["Tue", 25], ["Wed", 26], ["Thu", 27], ["Fri", 28]].map(([d, n]) => <span key={n} className={n === 25 ? styles.dayOn : ""}><small>{d}</small><b>{n}</b></span>)}</div>
      </div>
      <div className={styles.block}><small className={styles.over}>Available times</small>
        <div className={styles.slots}>{["9:00", "10:30", "11:15", "1:00", "2:45", "4:30"].map((t, i) => <span key={t} className={i === 1 ? styles.slotOn : i === 3 ? styles.slotOff : ""}>{t}</span>)}</div>
      </div>
      <div className={styles.svc}><Pic k="house" sizes="120px" className={styles.thumbL} /><div><b>Private viewing</b><small>Madison Ave studio · 45 min</small><small>Tue 25 Nov · 10:30 AM</small></div></div>
      <div className={styles.foot}><Btn>Confirm booking</Btn></div>
    </>
  ),
  dashboard: () => (
    <>
      <Status />
      <header className={styles.homeHead}><div><small>Monday, 24 Nov</small><h3>Overview</h3></div><span className={styles.seg}><s>Day</s><s className={styles.segOn}>Week</s><s>Month</s></span></header>
      <div className={styles.kpis}>
        <div className={styles.kpiA}><small>Revenue</small><b>$48.2k</b><em>▲ 12.4%</em></div>
        <div><small>Orders</small><b>1,284</b><em>▲ 8.1%</em></div>
      </div>
      <div className={styles.chart}>
        <div className={styles.rowHead}><b>Sales this week</b><small>USD</small></div>
        <div className={styles.cols}>{[46, 62, 38, 74, 58, 92, 70].map((h, i) => <span key={i} style={{ "--h": `${h}%` }} className={i === 5 ? styles.colOn : ""}><s /><small>{"MTWTFSS"[i]}</small></span>)}</div>
      </div>
      <div className={styles.rowHead}><b>Recent orders</b><small>See all</small></div>
      <div className={styles.list}>
        {[["#YB-20418", "Solitaire Ring", "Paid"], ["#YB-20417", "Carbon Road", "Packed"], ["#YB-20416", "Gift card", "Paid"]].map(([o, n, s]) => (
          <div key={o} className={styles.line}><span className={styles.ord}><Ic n="bag" /></span><div><b>{n}</b><small>{o}</small></div><em className={styles.tag}>{s}</em></div>
        ))}
      </div>
      <Tabs set="work" />
    </>
  ),
  approvals: () => (
    <>
      <Status />
      <header className={styles.homeHead}><div><small>Operations</small><h3>Approvals <em className={styles.count}>3</em></h3></div><span className={styles.round}><Ic n="search" /></span></header>
      <span className={`${styles.seg} ${styles.segWide}`}><s className={styles.segOn}>Pending</s><s>Approved</s><s>Declined</s></span>
      <div className={styles.reqs}>
        {[["Purchase order", "PO-2291 · Finance", "$12,400"], ["Field expenses", "Site visit · Operations", "$860"], ["Annual leave", "5 days · Design team", "Dec 22–29"]].map(([n, d, v], i) => (
          <div key={n} className={styles.req}>
            <div className={styles.reqTop}><div><b>{n}</b><small>{d}</small></div><b>{v}</b></div>
            {i === 0 && <div className={styles.reqActs}><Btn ghost>Decline</Btn><Btn>Approve</Btn></div>}
          </div>
        ))}
      </div>
      <Tabs set="work" on={1} />
    </>
  ),
  onboarding: () => (
    <>
      <div className={styles.onbImg}><Pic k="dusk" /><Status dark /></div>
      <div className={styles.onb}>
        <i className={styles.pager}><s /><s /><s /></i>
        <h3 className={styles.huge}>Everything you love, in one place.</h3>
        <p className={styles.para}>New arrivals, private viewings and delivery to your door — in a few taps.</p>
        <Btn>Get started</Btn>
        <small className={styles.center}>I already have an account</small>
      </div>
    </>
  ),
  login: () => (
    <>
      <Status />
      <div className={styles.login}>
        <span className={styles.mark}>Y</span>
        <h3 className={styles.big}>Welcome back</h3>
        <small>Sign in to continue to Yourbrand</small>
        <label className={styles.field}><small>Email</small><span>you@yourbrand.com</span></label>
        <label className={styles.field}><small>Password</small><span>••••••••••</span></label>
        <Btn>Sign in</Btn>
        <div className={styles.or}><i /><small>or</small><i /></div>
        <Btn ghost><Ic n="face" /> Sign in with Face ID</Btn>
        <Btn ghost><Ic n="lock" /> Use a passkey</Btn>
      </div>
    </>
  ),
  chat: () => (
    <>
      <Status />
      <header className={styles.bar}><span className={styles.round}><Ic n="back" /></span><div className={styles.who}><b>Yourbrand Support</b><small><i className={styles.live} />Online</small></div><i /></header>
      <div className={styles.thread}>
        <p className={styles.them}>Hi! Your ring has been packed and leaves the studio this afternoon.</p>
        <p className={styles.us}>Great — can it arrive before 2 PM?</p>
        <p className={styles.them}>Yes. I've switched you to express. You'll get a notification when the courier is close.</p>
        <p className={styles.us}>Perfect, thank you!</p>
        <p className={`${styles.them} ${styles.typing}`}><s /><s /><s /></p>
      </div>
      <div className={styles.compose}><span>Message</span><span className={`${styles.round} ${styles.roundA}`}><Ic n="send" /></span></div>
    </>
  ),
  profile: () => (
    <>
      <Status />
      <div className={styles.prof}><span className={styles.avatarL}>JD</span><b>Jordan Davis</b><small>Member since 2024</small></div>
      <div className={styles.settings}>
        {[["bell", "Push notifications", 1], ["face", "Face ID", 1], ["grid", "Dark appearance", 0], ["pin", "Location while using", 1]].map(([i, n, on]) => (
          <div key={n} className={styles.set}><span className={styles.setIc}><Ic n={i} /></span><b>{n}</b><i className={`${styles.toggle} ${on ? styles.toggleOn : ""}`} /></div>
        ))}
        {[["user", "Account details"], ["lock", "Privacy & data"], ["chat", "Help & support"]].map(([i, n]) => (
          <div key={n} className={styles.set}><span className={styles.setIc}><Ic n={i} /></span><b>{n}</b><em>›</em></div>
        ))}
      </div>
      <Tabs on={3} />
    </>
  ),
  store: () => (
    <>
      <Status />
      <div className={styles.listing}>
        <span className={styles.appIcon}>Y</span>
        <div><b>Yourbrand</b><small>Shop the new season</small><Btn className={styles.get}>Get</Btn></div>
      </div>
      <div className={styles.facts}>{[["4.9", "★★★★★"], ["#3", "Shopping"], ["4+", "Age"], ["EN", "+ 4 more"]].map(([a, b]) => <span key={b}><b>{a}</b><small>{b}</small></span>)}</div>
      <div className={styles.shots}>{["onboarding", "product", "tracking"].map((k) => <div key={k} className={styles.shot}><Pic k={k === "tracking" ? "map" : k === "product" ? "ring" : "dusk"} sizes="130px" /></div>)}</div>
      <div className={styles.block}><div className={styles.rowHead}><b>What's new</b><small>Version 2.4</small></div><p className={styles.para}>Private viewings can now be booked from the app, and live courier tracking arrives in more cities.</p></div>
    </>
  ),
  lock: () => (
    <>
      <div className={styles.lockBg}><Pic k="dusk" /></div>
      <Status dark />
      <div className={styles.clock}><small>Monday, 24 November</small><b>9:41</b></div>
      <div className={styles.notes}>
        {[["Yourbrand", "now", "Your courier is 5 minutes away", "Marco is on Madison Ave with your order."], ["Yourbrand", "9:12", "Booking confirmed", "Private viewing · Tue 25 Nov, 10:30 AM"], ["Yourbrand", "8:40", "Back in stock", "The Carbon Road is available in your size."]].map(([a, t, h, b], i) => (
          <div key={h} className={styles.note} style={{ "--i": i }}><span className={styles.noteIc}>Y</span><div><span className={styles.noteTop}><small>{a}</small><small>{t}</small></span><b>{h}</b><small>{b}</small></div></div>
        ))}
      </div>
      <i className={styles.homeBar} />
    </>
  ),
};
export const SCREEN_KINDS = Object.keys(SCREENS);

/**
 * kind     — one of SCREEN_KINDS
 * accent   — the app's own brand colour
 * dark     — dark appearance
 */
export default function AppScreen({ kind = "home", platform = "ios", accent = "#1f6feb", dark = false, mode, className = "" }) {
  const Body = SCREENS[kind] || SCREENS.home;
  return (
    <div className={`${styles.app} ${styles[platform]} ${dark ? styles.dark : ""} ${mode ? styles[mode] : ""} ${className}`} style={{ "--a": accent }}>
      <Body />
    </div>
  );
}
