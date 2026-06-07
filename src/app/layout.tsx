import type { Metadata } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
const GA_ID = "G-73PXTSJTTR";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  title: "The Remote Work Playbook – Updated June 2026 | Land a USD Remote Job in 7 Days",
  description:
    "A 7-day job search system for India-based professionals targeting remote US roles that pay in USD. Curated job boards, copy-paste search terms, and daily checklists for every role.",
  metadataBase: new URL("https://elevatemedia159.in"),
  openGraph: {
    title: "The Remote Work Playbook – Updated June 2026 | Land a USD Remote Job in 7 Days",
    description:
      "A 7-day job search system for India-based professionals targeting remote US roles that pay in USD. Curated job boards, copy-paste search terms, and daily checklists for every role.",
    type: "website",
    url: "https://elevatemedia159.in",
    siteName: "Elevate Media",
  },
  alternates: {
    canonical: "https://elevatemedia159.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
