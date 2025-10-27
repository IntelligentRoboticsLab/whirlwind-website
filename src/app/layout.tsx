import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";

import "./globals.scss";

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
        <header className="site-header">
          <div className="container nav">
            <Link href="/" className="brand" aria-label="Team whIRLwind home">
              <Image
                src="/logo_light.svg"
                width={240}
                height={80}
                alt="WhIRLwind logo"
                className="logo"
              />
            </Link>
            <nav aria-label="Primary">
              <ul className="nav-list">
                <li>
                  <Link href="/publications" className="nav-link">
                    <span aria-hidden="true" className="nav-link__spark" />
                    <span aria-hidden="true" className="nav-link__backdrop" />
                    <span className="nav-link__label">Publications</span>
                  </Link>
                </li>
                <li>
                  <Link href="/socials" className="nav-link">
                    <span aria-hidden="true" className="nav-link__spark" />
                    <span aria-hidden="true" className="nav-link__backdrop" />
                    <span className="nav-link__label">Socials</span>
                  </Link>
                </li>
                <li>
                  <Link href="/sponsors" className="nav-link">
                    <span aria-hidden="true" className="nav-link__spark" />
                    <span aria-hidden="true" className="nav-link__backdrop" />
                    <span className="nav-link__label">Sponsors</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <Link
              href="/contact"
              className="nav-link nav-link--cta"
              aria-label="Get in touch"
            >
              <span aria-hidden="true" className="nav-link__spark" />
              <span aria-hidden="true" className="nav-link__backdrop" />
              <span className="nav-link__label">Get in touch</span>
            </Link>
          </div>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <p>Made with ❤️ by Team whIRLwind — University of Amsterdam</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
