import { Poppins } from "next/font/google";
import { SITE } from "@/data/site";
import "./globals.css";

// Typography: Unbounded (headings) arrives with each page's font request; Poppins (everything else) is loaded here.

// Poppins: every non-heading text on the site (body, labels, buttons, nav, forms). Headings keep Unbounded.
// Self-hosted by next/font and exposed as --font-poppins, which the font tokens in globals.css point at.
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], display: "swap", variable: "--font-poppins" });

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
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      {/* Each page sets its own body class (e.g. "locked") and the scripts change it at runtime */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
