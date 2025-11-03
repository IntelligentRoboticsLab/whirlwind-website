import type { Metadata, Viewport } from "next";
import SiteHeader from "@/components/SiteHeader";
import "./globals.scss";

const logoSingleDark = new URL(
  "../assets/logo_single_dark.svg",
  import.meta.url,
).toString();

export const metadata: Metadata = {
  title: "Team whIRLwind",
  description:
    "Humanoid robotics team from the University of Amsterdam Intelligent Robotics Lab.",
  icons: {
    icon: [
      { url: logoSingleDark, type: "image/svg+xml" },
      {
        url: logoSingleDark,
        rel: "shortcut icon",
        type: "image/svg+xml",
      },
    ],
    apple: logoSingleDark,
  },
  openGraph: {
    type: "website",
    title: "Team whIRLwind at the University of Amsterdam",
    description:
      "Humanoid robotics team from the University of Amsterdam Intelligent Robotics Lab.",
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
