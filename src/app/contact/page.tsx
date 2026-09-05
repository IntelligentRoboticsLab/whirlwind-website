import type { Metadata } from "next";
import Link from "next/link";

import Opener from "@/components/Opener";
import Name from "@/components/Name";
import { siteContact } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to reach whIRLwind: email, address, joining and sponsoring.",
};

export default function ContactPage() {
  return (
    <div className="page">
      <section className="container opening" aria-label="Introduction">
        <div className="opening__text">
          <h1 className="t-title">Contact</h1>
          <p className="t-lede">
            Email us about sponsorships, research, demos, event invites or
            press. We&apos;ll get it to the right person.
          </p>
          <p className="t-body">
            <a className="button" href={`mailto:${siteContact.email}`}>
              <span>Email us</span>
            </a>
          </p>
        </div>
      </section>

      <section className="container section" aria-labelledby="where-heading">
        <Opener
          id="where-heading"
          title="Where to find us"
          artwork="k1-keeper-crouch"
          at={60}
        />
        <div className="stack stack--tight">
          <address className="t-body">
            Intelligent Robotics Lab, University of Amsterdam
            <br />
            {siteContact.addressLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </address>
        </div>
      </section>

      <section
        className="container section"
        aria-label="Joining and sponsoring"
      >
        <div className="stack stack--loose">
          <div className="stack stack--tight">
            <h2 className="t-heading">Joining</h2>
            <p className="t-body">
              <Name /> is run by students of the University of Amsterdam. You
              don&apos;t need robotics experience; most of us started without
              it.
            </p>
          </div>

          <div className="stack stack--tight">
            <h2 className="t-heading">Sponsoring</h2>
            <p className="t-body">
              <Link href="/sponsors">The organisations that support us</Link>{" "}
              keep the robots running and get us to competitions. If you want to
              be one of them, email us. We can figure out a sponsorship that
              fits.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
