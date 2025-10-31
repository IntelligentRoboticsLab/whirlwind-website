import type { Metadata, Viewport } from "next";

import "./globals.scss";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Team whIRLwind",
  description:
    "whIRLwind is a robotics team in the University of Amsterdam's Intelligent Robotics Lab. Coming soon.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌀</text></svg>",
  },
  openGraph: {
    type: "website",
    title: "Team whIRLwind — UvA",
    description:
      "whIRLwind is a robotics team in the University of Amsterdam's Intelligent Robotics Lab. Coming soon.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div className="site-background" aria-hidden="true" />
        <SiteHeader />

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <div className="footer-inner w-full px-8 text-left sm:px-10 lg:px-12">
            <p>Made with ❤️ by Team whIRLwind — University of Amsterdam</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
