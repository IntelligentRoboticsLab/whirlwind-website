import Link from "next/link";

import { siteContact } from "@/lib/site-content";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer__grid">
        <div className="site-footer__brand">
          <p className="site-footer__kicker">whIRLwind Amsterdam</p>
          <p className="site-footer__summary">
            Humanoid robotics team part of the Intelligent Robotics Lab at the
            University of Amsterdam.
          </p>
        </div>

        <div className="site-footer__column">
          <p className="site-footer__label">Navigate</p>
          <Link href="/#team">Team</Link>
          <Link href="/#news">News</Link>
          <Link href="/publications">Publications</Link>
          <Link href="/socials">Socials</Link>
        </div>

        <div className="site-footer__column">
          <p className="site-footer__label">Contact</p>
          <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
          <Link href="/contact">Contact page</Link>
          <p>{siteContact.addressLines.join(", ")}</p>
        </div>
      </div>
    </footer>
  );
}
