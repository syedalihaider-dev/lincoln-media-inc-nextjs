import { SITE } from "@/data/site";
import "./globals.css";

// Typography: The Lincoln Media's own families (Unbounded, Instrument Sans, Inter Tight, JetBrains Mono)
// arrive with each page's original <head> — the same Google Fonts request the intro and the inner pages
// have always made — so the homepage uses exactly the brand's fonts without downloading a second copy.

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  applicationName: SITE.name,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: { type: "website", siteName: SITE.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false },
  // The brand mark (public/images/favicon.png, 64×64); src/app/favicon.ico carries the same PNG for /favicon.ico requests
  icons: {
    icon: [{ url: "/images/favicon.png", type: "image/png", sizes: "64x64" }],
    shortcut: [{ url: "/images/favicon.png", type: "image/png" }],
    apple: [{ url: "/images/favicon.png", sizes: "64x64" }],
  },
};

export const viewport = {
  themeColor: "#03050b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Each page sets its own body class (e.g. "locked") and the scripts change it at runtime */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
