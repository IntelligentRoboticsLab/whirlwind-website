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
            Get in <span>touch.</span>
          </>
        }
        description="Email us about sponsorships, research, demos, event invites, or press."
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
            <h2>Applications are closed for now.</h2>
            <span>
              We&apos;ll post on our channels when we open them again.
            </span>
          </div>
        }
      />

      <section className="site-section site-section--tight-top">
        <div className="site-container contact-layout">
          <div className="contact-stack">
            <article className="detail-card">
              <p className="detail-card__eyebrow">Contact</p>
              <h2>Email</h2>
              <a href={`mailto:${siteContact.email}`} className="detail-card__link">
                {siteContact.email}
              </a>
              <p>
                We&apos;ll get it to the right person.
              </p>
            </article>

            <article className="detail-card">
              <p className="detail-card__eyebrow">Topics</p>
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
              <p className="detail-card__eyebrow">Location</p>
              <h2>University of Amsterdam</h2>
              <p>The Intelligent Robotics Lab at Science Park.</p>
              <address className="detail-card__address">
                {siteContact.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            </article>

            <article className="detail-card">
              <p className="detail-card__eyebrow">Follow</p>
              <h2>Channels</h2>
              <p>
                For updates and demos, follow us on our socials.
              </p>
              <div className="detail-card__actions">
                <LinkButton href="/socials" label="Socials" variant="secondary" />
                <LinkButton
                  href="/publications"
                  label="Publications"
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
