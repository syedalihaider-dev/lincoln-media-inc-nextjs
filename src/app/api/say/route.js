// Speaks short lines (the visitor's name) with Kokoro, the same free voice as the recorded clips.
// Runs on your own machine (npm run dev / npm start). On Vercel it answers 404 — exactly as before —
// and the page falls back to the in-browser voice or the recorded line.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VOICE = process.env.VOICE || "af_heart";
const SPEED = Number(process.env.SPEED || 1.15);
const enabled = !process.env.VERCEL;

// Loaded once per server process and kept in memory (the model is ~90 MB)
const g = globalThis;
function voice() {
  if (!g.__lmVoice) {
    g.__lmVoice = { tts: null, queue: Promise.resolve(), cache: new Map() };
    const pkg = "kokoro-js"; // not bundled: only needed when the server speaks
    g.__lmVoice.loading = import(/* webpackIgnore: true */ pkg)
      .then(({ KokoroTTS }) => KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "q8", device: "cpu" }))
      .then((m) => { g.__lmVoice.tts = m; console.log(`Voice ready (${VOICE})`); })
      .catch((e) => console.error("Voice failed to load:", e.message));
  }
  return g.__lmVoice;
}

function speak(v, text) {
  if (v.cache.has(text)) return v.cache.get(text);
  const job = (v.queue = v.queue.then(async () => Buffer.from((await v.tts.generate(text, { voice: VOICE, speed: SPEED })).toWav())));
  v.cache.set(text, job);
  job.catch(() => v.cache.delete(text));
  if (v.cache.size > 50) v.cache.delete(v.cache.keys().next().value);
  return job;
}

export async function GET() {
  if (!enabled) return new Response("Not found", { status: 404 });
  return Response.json({ ok: true, ready: !!voice().tts }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req) {
  if (!enabled) return new Response("Not found", { status: 404 });
  const raw = await req.text();
  if (raw.length > 2000) return new Response(null, { status: 413 });
  let text = "";
  try { text = JSON.parse(raw).text; } catch {}
  const clean = String(text || "").replace(/[^\p{L}\p{M}\p{N}' .,?!…-]/gu, "").replace(/\s+/g, " ").trim().slice(0, 160);
  if (!clean) return new Response(null, { status: 400 });
  const v = voice();
  await v.loading;
  if (!v.tts) return new Response(null, { status: 503 });
  const t = Date.now();
  const wav = await speak(v, clean);
  console.log(`said in ${Date.now() - t}ms: ${clean}`);
  return new Response(wav, { headers: { "Content-Type": "audio/wav", "Content-Length": String(wav.length), "Cache-Control": "no-store" } });
}
