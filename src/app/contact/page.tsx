import LinkButton from "@/components/LinkButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Team whIRLwind",
  description: "Contact Team whIRLwind.",
};

export default function ContactPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-32 sm:pt-12">
      <div className="mx-auto w-full max-w-[1120px] px-8 sm:px-10 lg:px-12 xl:px-4">
        <div className="contact-header">
          <h1 className="mt-0 text-[clamp(1.8rem,2.5vw,2.4rem)]">Contact</h1>
        </div>

        <div className="contact-layout">
          <div className="contact-main">
            <div className="contact-highlight">
              <span className="contact-eyebrow">Membership update</span>
              <h2 className="contact-highlight__title">
                Applications temporarily closed
              </h2>
              <p className="contact-highlight__copy">
                We're pausing new member applications while we continue ramping
                up the team. We'll share an update on our channels once we're
                ready to welcome new teammates again.
              </p>
              <div className="contact-highlight__actions">
                <LinkButton
                  href="/socials"
                  label="Follow our socials"
                  bordered
                />
              </div>
            </div>

            <div className="card contact-card">
              <h3>Reach the team</h3>
              <p>
                For collaborations, sponsorships, press, or general questions,
                drop us a line and we'll connect you with the right person.
              </p>
              <dl className="contact-details">
                <div className="contact-detail">
                  <dt>Email</dt>
                  <dd>
                    <a
                      className="contact-link"
                      href="mailto:info@whirlwind.team"
                    >
                      info@whirlwind.team
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="card contact-card contact-card--topics">
              <h3>How we can help</h3>
              <div className="contact-topics">
                <div>
                  <h4>Research & demos</h4>
                  <p>
                    Invite us to showcase humanoid robotics work or speak with
                    your students, lab, or community.
                  </p>
                </div>
                <div>
                  <h4>Sponsorship & support</h4>
                  <p>
                    Share how you'd like to collaborate and we'll explore ways
                    to partner on upcoming competitions and events.
                  </p>
                </div>
                <div>
                  <h4>Media & press</h4>
                  <p>
                    Tell us your deadline and angle so we can coordinate
                    spokespeople, quotes, and assets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <aside className="contact-sidebar">
            <div className="card contact-card">
              <h3>Where we are</h3>
              <p>
                Team whIRLwind is based at the Intelligent Robotics Lab of the
                University of Amsterdam.
              </p>
              <address className="contact-address">
                Room L0.01
                <br />
                Science Park 900
                <br />
                1098 XH Amsterdam
              </address>
            </div>

            <div className="card contact-card">
              <h3>Stay updated</h3>
              <p>
                Follow along for competition news and hear first when we reopen
                member applications.
              </p>
              <div className="contact-actions">
                <LinkButton href="/socials" label="Social channels" bordered />
                <LinkButton
                  href="/publications"
                  label="Latest publications"
                  bordered
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
