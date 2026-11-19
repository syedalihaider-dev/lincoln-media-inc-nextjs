// Turns the visitor's answers into a personal build plan with Claude.
// Set ANTHROPIC_API_KEY in Vercel → Project → Settings → Environment Variables.
// If the key is missing or the call fails, the front end falls back to its built-in plan.
export const dynamic = "force-dynamic";

const ALLOWED = {
  build: ["ai", "saas", "mobile", "web", "ecom", "chatbot", "automation", "crm", "design", "marketing", "unsure"],
  stage: ["idea", "prototype", "live", "rebuild"],
  priority: ["speed", "scale", "experience", "automation"],
  timeline: ["6w", "3m", "6m", "flex"],
};
const json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  return json({ error: "POST only" }, 405);
}

export async function POST(req) {
  if (!process.env.ANTHROPIC_API_KEY) return json({ error: "AI not configured" }, 503);
  const b = await req.json().catch(() => ({}));
  const a = { name: String(b.name || "").replace(/[^\p{L}\p{M} '-]/gu, "").slice(0, 24) };
  for (const k of Object.keys(ALLOWED)) a[k] = ALLOWED[k].includes(b[k]) ? b[k] : "unsure";

  const prompt = `You are the strategist at The Lincoln Media, a New York studio (est. 2012) that builds AI systems, SaaS platforms and mobile apps.
A visitor answered: name=${a.name || "(none)"}, building=${a.build}, current stage=${a.stage}, top priority=${a.priority}, timeline=${a.timeline}.
Write a short, confident, specific build plan. Return ONLY JSON:
{"archetype": "The <2-word title>", "lede": "2 sentences addressed to the visitor by name if given", "stack": ["4 things we'd build, max 8 words each"], "plan": ["4 phases with week ranges that fit the timeline, max 12 words each"]}`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5", max_tokens: 600, messages: [{ role: "user", content: prompt }] }),
    });
    if (!r.ok) throw new Error("upstream " + r.status);
    const data = await r.json();
    const text = data.content?.[0]?.text || "";
    return json(JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)));
  } catch {
    return json({ error: "AI unavailable" }, 502);
  }
}
