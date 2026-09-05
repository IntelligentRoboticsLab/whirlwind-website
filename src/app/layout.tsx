import type { Metadata, Viewport } from "next";
import { TikTok_Sans } from "next/font/google";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "@/styles/brand.css";
import "./globals.css";

// One family for everything. Variable weight; the optical size, slant and
// width axes are what the wordmark slant (.t-result) and the scoreboard
// numerals (.t-score) use. See DESIGN.md, section 5.
const tiktokSans = TikTok_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "slnt", "wdth"],
  variable: "--font-sans",
  display: "swap",
  // Google has no metrics for a synthetic fallback yet; use the plain stack.
  adjustFontFallback: false,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const description =
  "whIRLwind is the humanoid robotics team of the Intelligent Robotics Lab at the University of Amsterdam. We play in the RoboCup Humanoid Soccer League with Booster K1 robots.";

export const metadata: Metadata = {
  metadataBase: new URL("https://whirlwind.team"),
  title: {
    default: "whIRLwind Amsterdam",
    template: "%s | whIRLwind Amsterdam",
  },
  description,
  icons: {
    // favicon.svg switches the indigo blades to white under
    // prefers-color-scheme: dark; the .ico is the fallback for browsers
    // without SVG icon support.
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48 32x32 16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "whIRLwind Amsterdam",
    title: "whIRLwind Amsterdam",
    description,
    images: [{ url: "/og.jpg", width: 2048, height: 1152, alt: "The Booster K1, rendered from its model." }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c22" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={tiktokSans.variable}>
      <body>
        <div className="top-bar" aria-hidden="true" />
        <SiteHeader />
        <main id="main" className="site-main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
