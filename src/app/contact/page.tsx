import LinkButton from "@/components/LinkButton";
import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import { contactTopics, siteContact } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact | Team whIRLwind",
  description: "Contact Team whIRLwind.",
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Collaborations,
            <br />
            demos, and <span>press requests.</span>
          </>
        }
        description="Reach the team for sponsorships, research conversations, event invites, or general questions and we will connect you with the right people."
        metrics={[
          { label: "Base", value: "Science Park" },
          { label: "Lab", value: "UvA IRL" },
          { label: "Status", value: "Applications paused" },
        ]}
        actions={
          <>
            <a
              href={`mailto:${siteContact.email}`}
              className="link-button link-button--primary"
            >
              <span className="link-button__label">{siteContact.email}</span>
            </a>
            <LinkButton href="/socials" label="Follow updates" variant="secondary" />
          </>
        }
        aside={
          <div className="page-note">
            <p>Membership update</p>
            <h2>Applications are temporarily closed while the team ramps up.</h2>
            <span>
              We will post an update on our channels when we are ready to open
              up new member applications again.
            </span>
          </div>
        }
      />

      <section className="site-section site-section--tight-top">
        <div className="site-container contact-layout">
          <div className="contact-stack">
            <article className="detail-card">
              <p className="detail-card__eyebrow">Reach the team</p>
              <h2>Email</h2>
              <a href={`mailto:${siteContact.email}`} className="detail-card__link">
                {siteContact.email}
              </a>
              <p>
                For collaborations, sponsorships, demos, press, or general
                questions, send a note and we&apos;ll route it internally.
              </p>
            </article>

            <article className="detail-card">
              <p className="detail-card__eyebrow">How we can help</p>
              <div className="topic-list">
                {contactTopics.map((topic) => (
                  <section key={topic.title} className="topic-list__item">
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                  </section>
                ))}
              </div>
            </article>
          </div>

          <aside className="contact-stack">
            <article className="detail-card">
              <p className="detail-card__eyebrow">Where we are</p>
              <h2>University of Amsterdam</h2>
              <p>Team whIRLwind is based in the Intelligent Robotics Lab.</p>
              <address className="detail-card__address">
                {siteContact.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </article>

            <article className="detail-card">
              <p className="detail-card__eyebrow">Keep up</p>
              <h2>Public channels</h2>
              <p>
                For competition updates, demos, and team news, our public
                channels are the right place to follow along.
              </p>
              <div className="detail-card__actions">
                <LinkButton href="/socials" label="Social channels" variant="secondary" />
                <LinkButton
                  href="/publications"
                  label="Research archive"
                  variant="secondary"
                />
              </div>
            </article>
          </aside>
        </div>
      </section>
    </div>
  );
}
