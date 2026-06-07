import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-sans" });
const GA_ID = "G-73PXTSJTTR";

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  title: "The Remote Work Playbook v2 | Land a USD Remote Job in 7 Days",
  description:
    "A 7-day job search system for India-based professionals targeting remote US roles that pay in USD. Curated job boards, copy-paste search terms, and daily checklists for every role.",
  metadataBase: new URL("https://elevatemedia159.in"),
  openGraph: {
    title: "The Remote Work Playbook v2 | Land a USD Remote Job in 7 Days",
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
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
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
      <body>{children}</body>
    </html>
  );
}
