import Image from "next/image";

import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import { siteContact } from "@/lib/site-content";
import lab42Photo from "@/assets/photos/2026-06-LAB42/LAB42-172.jpg";

export const metadata: Metadata = {
  title: "Contact | Team whIRLwind",
  description: "Contact Team whIRLwind.",
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <PageHero
        title={
          <>
            Contact
          </>
        }
        description="Email us about sponsorships, research, demos, event invites, or press."
        belowDescription={
          <article className="detail-card">
            <h2>Email</h2>
            <a
              href={`mailto:${siteContact.email}`}
              className="detail-card__link"
            >
              {siteContact.email}
            </a>
            <p>We&apos;ll get it to the right person.</p>
            <h2 style={{ marginTop: "1.6rem" }}>Location</h2>
            <address className="detail-card__address">
              <span>The Intelligent Robotics Lab, University of Amsterdam</span>
              {siteContact.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </article>
        }
        aside={
          <div className="page-note">
            <figure className="page-note__image">
              <Image
                src={lab42Photo}
                alt="Team members at work in LAB42."
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </figure>
            <h2>Applications are closed for now.</h2>
            <span>
              We&apos;ll announce it on Instagram and LinkedIn when they open
              again.
            </span>
          </div>
        }
      />
    </div>
  );
}
