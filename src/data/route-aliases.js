// Live-site URLs whose legacy copy is stored under an older route. The page is served at the live URL
// (src/app/[...slug]) and the older route redirects to it (next.config.mjs).
export const ROUTE_ALIASES = { "/services/whatsapp-web-integration": "/services/whatsapp-business-integration" };
export const ALIASED_SOURCES = new Set(Object.values(ROUTE_ALIASES));
export const sourceOf = (route) => ROUTE_ALIASES[route] || route;
