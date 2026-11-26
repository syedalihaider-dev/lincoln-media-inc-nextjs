import Image from "next/image";
import ScaledScreen from "@/components/InnerServices/ScaledScreen";
import { AI_IMAGES } from "@/data/services/aiSaasMobile";
import s from "./Halden.module.css";

/*
 * "Halden" — the page's one fictional product: an operations platform for property-maintenance teams.
 * Every interface is real HTML laid out at device size (console 1280×800, app 390×844) and scaled
 * into its frame. Data is illustrative and the frames say so.
 */

const I = {
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  inbox: "M3 13h5l1.5 3h5L16 13h5M5 5h14l2 8v6H3v-6z",
  cal: "M4 6h16v14H4zM4 10h16M8 3v5M16 3v5",
  flow: "M6 4v5M6 15v5M18 9v6M6 9a3 3 0 1 0 0 6M18 9a3 3 0 1 0 0-6M18 15a3 3 0 1 0 0 6M9 12h6",
  plug: "M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4",
  card: "M3 6h18v12H3zM3 10h18M7 15h4",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  ship: "M12 3v12M7 10l5 5 5-5M4 19h16",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
  bolt: "M13 3 5 14h6l-1 7 8-11h-6z",
  check: "M5 12l4 4 10-10",
  mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
  pin: "M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12zM12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  cam: "M4 8h4l2-3h4l2 3h4v11H4zM12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z",
  user: "M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0",
  home: "M4 11 12 4l8 7v9H4z",
  dots: "M5 12h.01M12 12h.01M19 12h.01",
};
export const Ic = ({ n, className = "" }) => <svg viewBox="0 0 24 24" className={`${s.ic} ${className}`} aria-hidden="true"><path d={I[n]} /></svg>;

const Logo = ({ light }) => <span className={`${s.logo} ${light ? s.logoLight : ""}`}><b /> Halden</span>;
const Tag = ({ tone = "mute", children }) => <span className={`${s.tag} ${s["t_" + tone]}`}>{children}</span>;
const Avatar = ({ n, c = 0 }) => <span className={s.av} style={{ "--h": [168, 28, 220, 340, 96][c % 5] }}>{n}</span>;

/* ───────────────────────── console (1280 × 800) ───────────────────────── */

const NAV = [["overview", "grid", "Overview"], ["requests", "inbox", "Requests"], ["schedule", "cal", "Schedule"], ["automations", "flow", "Automations"], ["integrations", "plug", "Integrations"], ["billing", "card", "Billing"], ["developers", "code", "Developers"], ["releases", "ship", "Releases"]];
const TITLES = { overview: "Today, Tue 12", requests: "Requests", schedule: "Schedule · this week", automations: "Automations", integrations: "Integrations", billing: "Plan & billing", developers: "Developers", releases: "Releases" };

const JOBS = [
  ["Dana R.", 0, [[1, 3, "Leak above panel · 4B", "hot"], [4.4, 2, "Boiler service", ""]]],
  ["Marco P.", 1, [[0.4, 1.6, "Lock change", ""], [2.4, 2.4, "Heating check · 12 Pine", ""], [5.2, 1.4, "Inspection", "ok"]]],
  ["Ines K.", 2, [[1.6, 1.4, "Intercom fault", ""], [3.6, 3, "Bathroom refit · day 2", "long"]]],
  ["Sam O.", 3, [[0.2, 2.2, "Gutter clearance", ""], [3, 1.4, "Smoke alarms", "ok"], [5, 1.8, "Window seal", ""]]],
  ["Priya D.", 4, [[2, 2, "Dishwasher repair", ""], [4.6, 1.8, "Move-out check", ""]]],
];

function Overview() {
  return (
    <div className={s.cols}>
      <section className={s.panel} style={{ flex: 1.65 }}>
        <header className={s.ph}><b>Field team</b><span className={s.muted}>08:00 – 17:00</span></header>
        <div className={s.hours}>{["08", "09", "10", "11", "12", "13", "14", "15", "16"].map((h) => <span key={h}>{h}</span>)}</div>
        {JOBS.map(([n, c, js]) => (
          <div key={n} className={s.lane}>
            <span className={s.who}><Avatar n={n[0]} c={c} />{n}</span>
            <div className={s.track}>
              {js.map(([x, w, t, k]) => <span key={t} className={`${s.job} ${k ? s["j_" + k] : ""}`} style={{ left: `${(x / 8) * 100}%`, width: `${(w / 8) * 100}%` }}>{t}</span>)}
              <i className={s.now} />
            </div>
          </div>
        ))}
        <div className={s.kpis}>
          <div><span className={s.muted}>Open requests</span><b>18</b></div>
          <div><span className={s.muted}>Due today</span><b>11</b></div>
          <div><span className={s.muted}>Awaiting approval</span><b>3</b></div>
        </div>
      </section>
      <aside className={`${s.panel} ${s.assist}`} style={{ flex: 1 }}>
        <header className={s.ph}><b><Ic n="bolt" className={s.icAcc} /> Assistant</b><Tag tone="acc">3 need you</Tag></header>
        <article className={s.card}>
          <Tag tone="hot">Urgent · Plumbing</Tag>
          <p className={s.cardT}>Water reported above the electrical panel, unit 4B.</p>
          <p className={s.muted}>Suggested: Dana R. at 14:00 — closest, licensed for both trades.</p>
          <div className={s.btns}><span className={s.btnP}>Assign Dana</span><span className={s.btnG}>Review</span></div>
        </article>
        <article className={s.card}>
          <Tag tone="warn">Overdue</Tag>
          <p className={s.cardT}>Heating check at 12 Pine Ave has no report.</p>
          <p className={s.muted}>Draft a reminder to Marco P.?</p>
        </article>
        <article className={s.card}>
          <Tag>Pattern</Tag>
          <p className={s.cardT}>Three intercom faults in Block C this month.</p>
          <p className={s.muted}>Open a planned-maintenance job?</p>
        </article>
      </aside>
    </div>
  );
}

const REQ = [
  ["Leak above electrical panel", "Portal · Unit 4B", "Plumbing", "hot", "2m"],
  ["Radiator not heating in bedroom", "SMS · 12 Pine Ave", "Heating", "warn", "14m"],
  ["Front door buzzer not working", "Email · Block C", "Electrical", "", "40m"],
  ["Request for spare key", "Portal · Unit 9A", "Admin", "", "1h"],
  ["Mould near bathroom window", "Email · 3 Hale St", "Damp", "warn", "2h"],
  ["Thank you for the quick repair!", "SMS · Unit 2F", "Feedback", "ok", "3h"],
];
function Requests() {
  return (
    <div className={s.cols}>
      <section className={s.panel} style={{ flex: 1.1, padding: 0 }}>
        <div className={s.filters}><span className={s.fOn}>All 18</span><span>Urgent 2</span><span>Unassigned 5</span><span>Mine</span></div>
        {REQ.map(([t, src, cat, k, age], i) => (
          <div key={t} className={`${s.row} ${i === 0 ? s.rowOn : ""}`}>
            <span className={`${s.dotS} ${k ? s["d_" + k] : ""}`} />
            <div><b>{t}</b><span className={s.muted}>{src}</span></div>
            <Tag tone={k === "hot" ? "hot" : "acc"}>{cat}</Tag>
            <span className={s.muted}>{age}</span>
          </div>
        ))}
      </section>
      <section className={s.panel} style={{ flex: 1 }}>
        <header className={s.ph}><b>Leak above electrical panel</b><span className={s.muted}>Unit 4B · tenant J. Alvarez</span></header>
        <p className={s.msg}>“Water is dripping from the ceiling right above the fuse box in the hallway. It started an hour ago.”</p>
        <div className={s.ai}>
          <span className={s.aiH}><Ic n="bolt" className={s.icAcc} /> Suggested by the assistant</span>
          <div className={s.aiTags}><Tag tone="hot">Urgent</Tag><Tag tone="acc">Plumbing</Tag><Tag tone="warn">Electrical hazard</Tag></div>
          <p className={s.draft}>Hi J., thanks for letting us know. Please keep clear of the fuse box and, if safe, switch off the hallway circuit. Dana from our team will be with you today at 14:00.</p>
          <div className={s.btns}><span className={s.btnP}>Approve & send</span><span className={s.btnG}>Edit</span><span className={s.btnG}>Reassign</span></div>
        </div>
      </section>
    </div>
  );
}

function Schedule() {
  const days = ["Mon 11", "Tue 12", "Wed 13", "Thu 14", "Fri 15"];
  const blocks = [[0, 0.5, 2, "Boiler service", ""], [0, 3, 1.5, "Inspection", "ok"], [1, 1, 2.6, "Leak · 4B", "hot"], [1, 4.2, 1.4, "Lock change", ""], [2, 0.4, 3.4, "Bathroom refit", "long"], [2, 4.4, 1.2, "Smoke alarms", "ok"], [3, 1.6, 1.6, "Heating check", ""], [3, 3.8, 2, "Move-out check", ""], [4, 0.6, 1.4, "Gutters", ""], [4, 2.6, 2.6, "Window seals", ""]];
  return (
    <section className={s.panel} style={{ height: "100%" }}>
      <div className={s.week}>
        {days.map((d, i) => (
          <div key={d} className={s.day}>
            <span className={`${s.dayH} ${i === 1 ? s.dayOn : ""}`}>{d}</span>
            <div className={s.dayCol}>
              {blocks.filter((b) => b[0] === i).map(([, y, h, t, k]) => <span key={t} className={`${s.blk} ${k ? s["j_" + k] : ""}`} style={{ top: `${(y / 6.4) * 100}%`, height: `${(h / 6.4) * 100}%` }}><b>{t}</b><em>{["Dana R.", "Marco P.", "Ines K."][Math.round(y) % 3]}</em></span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Automations() {
  const node = (k, t, d, extra) => (
    <div className={`${s.node} ${s["n_" + k]}`}><span className={s.nK}>{{ trigger: "When", ai: "Assistant", cond: "If", act: "Then" }[k]}</span><b>{t}</b><span className={s.muted}>{d}</span>{extra}</div>
  );
  return (
    <div className={s.cols}>
      <section className={`${s.panel} ${s.canvas}`} style={{ flex: 1.6 }}>
        <header className={s.ph}><b>Urgent request routing</b><Tag tone="ok">Live</Tag></header>
        <div className={s.flow}>
          {node("trigger", "A new request arrives", "Portal, SMS or email")}
          <i className={s.wire} />
          {node("ai", "Classify trade & urgency", "Checks for safety hazards")}
          <i className={s.wire} />
          {node("cond", "Urgency is high", "or a hazard is detected")}
          <div className={s.split}>
            <div>{node("act", "Page the on-call technician", "Nearest with the right licence")}</div>
            <div>{node("act", "Add to tomorrow's route", "Reply with a time window")}</div>
          </div>
        </div>
      </section>
      <aside className={s.panel} style={{ flex: 1 }}>
        <header className={s.ph}><b>Recent runs</b></header>
        {[["Leak above panel · 4B", "Paged Dana R.", "hot"], ["Radiator not heating", "Tomorrow 09–11", ""], ["Buzzer not working", "Tomorrow 13–15", ""], ["Mould near window", "Needs review", "warn"]].map(([a, b, k]) => (
          <div key={a} className={s.run}><span className={`${s.dotS} ${k ? s["d_" + k] : s.d_ok}`} /><div><b>{a}</b><span className={s.muted}>{b}</span></div></div>
        ))}
      </aside>
    </div>
  );
}

function Integrations() {
  const list = [["Payments", "Card and bank payments for invoices", true], ["Accounting", "Invoices and costs synced nightly", true], ["Calendar", "Technician schedules, two-way", true], ["Team chat", "Urgent jobs posted to #on-call", true], ["CRM", "Tenants and owners as contacts", false], ["Webhooks", "Your systems, on every event", true]];
  return (
    <section className={s.panel} style={{ height: "100%" }}>
      <div className={s.tiles}>
        {list.map(([n, d, on]) => (
          <div key={n} className={s.tile}><span className={s.tileI}><Ic n={n === "Webhooks" ? "code" : "plug"} /></span><b>{n}</b><span className={s.muted}>{d}</span><span className={`${s.toggle} ${on ? s.tOn : ""}`}><i /></span></div>
        ))}
      </div>
    </section>
  );
}

function Billing() {
  return (
    <div className={s.cols}>
      <section className={s.panel} style={{ flex: 1.2 }}>
        <header className={s.ph}><b>Northgate Properties</b><Tag tone="acc">Business plan</Tag></header>
        <div className={s.plans}>
          {[["Team", "Up to 10 seats", false], ["Business", "Seats, roles & SSO", true], ["Enterprise", "Dedicated tenancy", false]].map(([n, d, on]) => (
            <div key={n} className={`${s.plan} ${on ? s.planOn : ""}`}><b>{n}</b><span className={s.muted}>{d}</span>{on && <Tag tone="ok">Current</Tag>}</div>
          ))}
        </div>
        <div className={s.seats}><span>Seats</span><div className={s.bar}><i style={{ width: "72%" }} /></div><span className={s.muted}>18 of 25 in use</span></div>
        <div className={s.seats}><span>Workspaces</span><div className={s.bar}><i style={{ width: "40%" }} /></div><span className={s.muted}>4 regions</span></div>
      </section>
      <section className={s.panel} style={{ flex: 1 }}>
        <header className={s.ph}><b>Invoices</b><span className={s.muted}>Auto-pay on</span></header>
        {["Nov 2026", "Oct 2026", "Sep 2026", "Aug 2026", "Jul 2026"].map((m) => (
          <div key={m} className={s.inv}><span>{m}</span><span className={s.muted}>Business · 18 seats</span><Tag tone="ok">Paid</Tag></div>
        ))}
      </section>
    </div>
  );
}

function Developers() {
  return (
    <div className={s.cols}>
      <section className={`${s.panel} ${s.dark}`} style={{ flex: 1.3 }}>
        <header className={s.ph}><b>Create a job</b><span className={s.muted}>POST /v2/jobs</span></header>
        <pre className={s.code}>{`curl https://api.halden.example/v2/jobs \\
  -H "Authorization: Bearer hk_live_••••••••3f9a" \\
  -H "Idempotency-Key: 7c1e…" \\
  -d property=prop_12pine \\
  -d trade=heating \\
  -d window="2026-11-13T09:00/11:00"

{
  "id": "job_5521",
  "status": "scheduled",
  "assignee": "tech_marco",
  "workspace": "northgate"
}`}</pre>
      </section>
      <aside className={s.panel} style={{ flex: 1 }}>
        <header className={s.ph}><b>Webhook deliveries</b></header>
        {[["job.created", "200", "ok"], ["job.assigned", "200", "ok"], ["invoice.paid", "200", "ok"], ["job.completed", "503 · retrying", "warn"], ["job.completed", "200", "ok"]].map(([e, c, k], i) => (
          <div key={i} className={s.hook}><code>{e}</code><Tag tone={k}>{c}</Tag></div>
        ))}
      </aside>
    </div>
  );
}

function Releases() {
  const st = [["Commit", "a3f9e21"], ["Build", "web · iOS · Android"], ["Tests", "unit · e2e · evals"], ["Staging", "QA sign-off"], ["Production", "10% rollout"]];
  return (
    <section className={s.panel} style={{ height: "100%" }}>
      <header className={s.ph}><b>Release 4.12 — offline photo queue</b><Tag tone="acc">Rolling out</Tag></header>
      <div className={s.pipe}>
        {st.map(([n, d], i) => <div key={n} className={`${s.stage} ${i < 4 ? s.sDone : s.sRun}`}><span className={s.sDot}>{i < 4 ? <Ic n="check" /> : null}</span><b>{n}</b><span className={s.muted}>{d}</span></div>)}
      </div>
      <div className={s.notes}>
        {["Photos taken offline upload when signal returns", "Assistant summaries cite the source message", "Faster schedule loading on large workspaces", "Fixed: duplicate push notifications on Android"].map((t) => <p key={t}><Ic n="check" className={s.icAcc} />{t}</p>)}
      </div>
    </section>
  );
}

const VIEWS = { overview: Overview, requests: Requests, schedule: Schedule, automations: Automations, integrations: Integrations, billing: Billing, developers: Developers, releases: Releases };

/** The web console at 1280 × 800 */
export function Console({ view = "overview" }) {
  const V = VIEWS[view] || Overview;
  return (
    <div className={s.console}>
      <nav className={s.side}>
        <Logo light />
        <span className={s.ws}><Avatar n="N" c={0} />Northgate Properties<Ic n="dots" /></span>
        {NAV.map(([k, ic, l]) => <span key={k} className={`${s.nav} ${k === view ? s.navOn : ""}`}><Ic n={ic} />{l}</span>)}
      </nav>
      <div className={s.main}>
        <header className={s.top}>
          <h4>{TITLES[view]}</h4>
          <span className={s.search}><Ic n="search" />Search jobs, tenants, properties<kbd>⌘K</kbd></span>
          <Avatar n="A" c={3} />
        </header>
        <div className={s.body}><V /></div>
      </div>
    </div>
  );
}

/* ───────────────────────── app (390 × 844) ───────────────────────── */

const Status = ({ dark }) => <div className={`${s.status} ${dark ? s.stDark : ""}`}><b>9:41</b><span><i /><i /><i /></span></div>;
const TabBar = ({ on }) => (
  <nav className={s.tabs}>{[["home", "Today"], ["cal", "Jobs"], ["mic", "Assistant"], ["user", "Me"]].map(([ic, l]) => <span key={l} className={l === on ? s.tabOn : ""}><Ic n={ic} />{l}</span>)}</nav>
);

function Today() {
  return (
    <>
      <div className={s.aHead}><span className={s.muted}>Tuesday 12</span><h5>Good morning, Dana</h5></div>
      <div className={s.mapStrip}>
        <svg viewBox="0 0 390 150" preserveAspectRatio="none"><path d="M-10 110 C80 90 120 130 200 96 S330 40 400 60" /><path d="M60 -10 L120 160" /><path d="M260 -10 L230 160" /><path className={s.route} d="M40 120 C110 104 150 100 200 96 S300 56 340 50" /></svg>
        {[[40, 120], [200, 96], [340, 50]].map(([x, y], i) => <i key={i} style={{ left: `${(x / 390) * 100}%`, top: `${(y / 150) * 100}%` }}>{i + 1}</i>)}
      </div>
      <div className={s.aList}>
        {[["09:00", "Boiler service", "41 Carroll St", ""], ["14:00", "Leak above panel", "Unit 4B · urgent", "hot"], ["16:30", "Move-out check", "3 Hale St", ""]].map(([t, n, a, k]) => (
          <div key={t} className={`${s.aJob} ${k ? s.aHot : ""}`}><b>{t}</b><div><strong>{n}</strong><span className={s.muted}>{a}</span></div><Ic n="pin" /></div>
        ))}
      </div>
      <TabBar on="Today" />
    </>
  );
}

function Job() {
  return (
    <>
      <div className={s.aBar}><span>‹ Today</span><Tag tone="hot">Urgent</Tag></div>
      <div className={s.aHead}><h5>Leak above electrical panel</h5><span className={s.muted}>Unit 4B · 22 Northgate Rd · 14:00</span></div>
      <div className={s.photo}><Image src={AI_IMAGES.desk} alt="" fill sizes="390px" /><span>Tenant photo</span></div>
      <div className={s.check}>
        {[["Isolate hallway circuit", true], ["Find source of leak", true], ["Replace failed joint", false], ["Moisture reading", false]].map(([t, d]) => <p key={t} className={d ? s.done : ""}><i>{d && <Ic n="check" />}</i>{t}</p>)}
      </div>
      <span className={s.bigBtn}><Ic n="cam" /> Add photos</span>
      <TabBar on="Jobs" />
    </>
  );
}

function Assistant() {
  return (
    <>
      <div className={s.aBar}><span>‹ Job</span><span className={s.muted}>Report</span></div>
      <div className={s.voice}>
        <span className={s.rec}><Ic n="mic" /></span>
        <div className={s.wave}>{Array.from({ length: 34 }, (_, i) => <i key={i} style={{ "--v": (0.25 + Math.abs(Math.sin(i * 1.7)) * 0.75).toFixed(3) }} />)}</div>
        <span className={s.muted}>0:24</span>
      </div>
      <div className={s.bubble}><span className={s.aiH}><Ic n="bolt" className={s.icAcc} /> Draft report</span>
        <p><b>Cause:</b> failed compression joint on the cold feed above the panel.</p>
        <p><b>Work done:</b> circuit isolated, joint replaced, area dried, moisture reading normal.</p>
        <p><b>Follow-up:</b> electrician to inspect panel — booked Thu 09:00.</p>
      </div>
      <div className={s.btnsA}><span className={s.btnP}>Looks right — send</span><span className={s.btnG}>Edit</span></div>
      <TabBar on="Assistant" />
    </>
  );
}

function Report() {
  return (
    <>
      <div className={s.aBar}><span>‹ Jobs</span><Tag tone="ok">Completed</Tag></div>
      <div className={s.aHead}><span className={s.muted}>Job report</span><h5>Unit 4B — leak repaired</h5></div>
      <div className={s.rep}>
        {[["Arrived", "13:52"], ["Completed", "15:10"], ["Parts", "1 × 15mm joint"], ["Follow-up", "Thu 09:00"]].map(([a, b]) => <p key={a}><span className={s.muted}>{a}</span><b>{b}</b></p>)}
      </div>
      <div className={s.sign}><svg viewBox="0 0 200 60"><path d="M10 40 C30 10 40 50 60 30 S90 10 100 36 S140 50 150 22 S180 30 190 26" /></svg><span className={s.muted}>Signed by tenant</span></div>
      <span className={s.bigBtn}>Share with owner</span>
      <TabBar on="Jobs" />
    </>
  );
}

function Onboard() {
  return (
    <>
      <div className={s.aBar}><span className={s.muted}>Step 2 of 3</span><span className={s.muted}>Skip</span></div>
      <div className={s.prog}><i /><i /><i /></div>
      <div className={s.aHead}><h5>Set up your workspace</h5><span className={s.muted}>You can change this later.</span></div>
      <div className={s.form}>
        <label>Company<span>Northgate Properties</span></label>
        <label>Properties you manage<span>24</span></label>
        <label>Trades on your team<span className={s.chips}><Tag tone="acc">Plumbing</Tag><Tag tone="acc">Heating</Tag><Tag>Electrical</Tag><Tag>+ Add</Tag></span></label>
      </div>
      <span className={s.bigBtn}>Continue</span>
    </>
  );
}

function Notify() {
  return (
    <div className={s.lock}>
      <Image src={AI_IMAGES.reader} alt="" fill sizes="390px" className={s.lockBg} />
      <Status dark />
      <div className={s.clock}><span>Tuesday 12 November</span><b>9:41</b></div>
      <div className={s.notes2}>
        {[["Urgent job assigned", "Leak above panel · Unit 4B at 14:00", "now"], ["Report approved", "Boiler service · 41 Carroll St", "8m"], ["Route updated", "Your 16:30 moved to 16:00", "21m"]].map(([t, d, w]) => (
          <div key={t} className={s.note}><Logo /><div><b>{t}</b><span>{d}</span></div><em>{w}</em></div>
        ))}
      </div>
    </div>
  );
}

const SCREENS = { today: Today, job: Job, assistant: Assistant, report: Report, onboard: Onboard, notify: Notify };

/** The technician app at 390 × 844 */
export function App({ screen = "today" }) {
  const V = SCREENS[screen] || Today;
  if (screen === "notify") return <div className={s.app}><Notify /></div>;
  return <div className={s.app}><Status /><V /></div>;
}

/* ───────────────────────── frames ───────────────────────── */

/** A browser window holding the console (one view, or stacked views to cross-fade via data-view) */
export function Browser({ views = ["overview"], note, className = "", ...rest }) {
  return (
    <figure className={`${s.browser} ${className}`} aria-hidden="true" {...rest}>
      <div className={s.chrome}><i /><i /><i /><span>app.halden.example</span></div>
      <div className={s.screen}>
        {views.map((v, i) => (
          <div key={v} className={s.vLayer} data-view={v} style={i ? { opacity: 0 } : undefined}>
            <ScaledScreen width={1280}><Console view={v} /></ScaledScreen>
          </div>
        ))}
      </div>
      {note && <figcaption className={s.demo}>{note}</figcaption>}
    </figure>
  );
}
