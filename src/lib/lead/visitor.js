import "server-only";

// Who sent the lead: client IP (from the proxy chain) and location (platform geo headers first,
// then a trusted IP-geolocation lookup, else "Unknown"). Never trusts location sent by the browser,
// and never lets a failed lookup block delivery.

const first = (v) => (v || "").split(",")[0].trim();
const decode = (v) => { try { return decodeURIComponent(v); } catch { return v; } };

/** Client IP behind Vercel / Cloudflare / a standard reverse proxy */
export function clientIp(headers) {
  const ip =
    first(headers.get("x-vercel-forwarded-for")) ||
    first(headers.get("cf-connecting-ip")) ||
    first(headers.get("x-forwarded-for")) ||
    first(headers.get("x-real-ip")) ||
    "";
  return ip.replace(/^::ffff:/, "") || "Unknown";
}

const isPrivate = (ip) =>
  !ip || ip === "Unknown" || ip === "::1" || ip.startsWith("127.") || ip.startsWith("10.") || ip.startsWith("192.168.") ||
  /^172\.(1[6-9]|2\d|3[01])\./.test(ip) || /^f[cd][0-9a-f]{2}:/i.test(ip) || ip.startsWith("fe80:");

/** { country, region, city, source } */
export async function locate(headers, ip) {
  // 1. platform headers (Vercel, Cloudflare)
  const country = headers.get("x-vercel-ip-country") || headers.get("cf-ipcountry");
  if (country && country !== "XX") {
    return {
      country: decode(country),
      region: decode(headers.get("x-vercel-ip-country-region") || headers.get("cf-region") || "") || "Unknown",
      city: decode(headers.get("x-vercel-ip-city") || headers.get("cf-ipcity") || "") || "Unknown",
      source: "platform",
    };
  }
  // 2. trusted lookup (skipped for local / private addresses)
  if (!isPrivate(ip)) {
    try {
      const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}?fields=success,country,region,city`, {
        signal: AbortSignal.timeout(2500),
        cache: "no-store",
      });
      const d = await res.json();
      if (d?.success) return { country: d.country || "Unknown", region: d.region || "Unknown", city: d.city || "Unknown", source: "ipwho.is" };
    } catch {
      // fall through — the lead is still delivered
    }
  }
  return { country: "Unknown", region: "Unknown", city: "Unknown", source: isPrivate(ip) ? "local network" : "unavailable" };
}
