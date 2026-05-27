import type { Metadata, Viewport } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.scss";

const logoSingleDark = new URL(
  "../assets/logo_single_dark.svg",
  import.meta.url,
).toString();

export const metadata: Metadata = {
  title: "whIRLwind Amsterdam",
  description:
    "Humanoid robotics team from the Intelligent Robotics Lab at the University of Amsterdam.",
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
    title: "whIRLwind Amsterdam",
    description:
      "Humanoid robotics team from the Intelligent Robotics Lab at the University of Amsterdam.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1833",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="site-background" aria-hidden="true" />
        <SiteHeader />

        <main className="site-main">{children}</main>

        <SiteFooter />
      </body>
    </html>
  );
}
