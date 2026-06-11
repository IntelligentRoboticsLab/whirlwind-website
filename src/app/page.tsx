import Image from "next/image";
import Link from "next/link";

import LinkButton from "@/components/LinkButton";
import SponsorCard from "@/components/SponsorCard";
import NewsCard from "@/components/site/NewsCard";
import PublicationCard from "@/components/site/PublicationCard";
import SectionIntro from "@/components/site/SectionIntro";
import {
  highlightedEvent,
  homePhotos,
  siteContact,
  sponsorTiers,
} from "@/lib/site-content";
import {
  getLatestPublications,
  getPublicationCount,
} from "@/lib/publications/helpers";
import { getAllNewsPosts } from "@/lib/news/news";

export default async function Home() {
  const latestPublications = getLatestPublications(4);
  const publicationCount = getPublicationCount();
  const latestNews = (await getAllNewsPosts()).slice(0, 4);
  const heroMetrics = [
    { value: "15", label: "Active members" },
    { value: "2025", label: "Founded" },
    { value: highlightedEvent.result, label: highlightedEvent.event },
    { value: `${publicationCount}`, label: "Publications" },
  ];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="site-container home-hero__grid">
          <div className="home-hero__content">
            <h1 className="home-hero__title">
              Teaching robots
              <br />
              to play <span>football</span>
            </h1>
            <p className="home-hero__description">
              whIRLwind is the humanoid robotics team at the University of
              Amsterdam.
            </p>
            <div className="home-hero__actions">
              <LinkButton
                href="/contact"
                label="Get in touch"
                variant="primary"
              />
              <LinkButton
                href="/publications"
                label="Explore publications"
                variant="secondary"
              />
            </div>
          </div>

          <div className="home-hero__media">
            <figure className="home-hero__image-frame">
              <Image
                src={homePhotos.hero.src}
                alt={homePhotos.hero.alt}
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="home-hero__image"
              />
            </figure>
            {highlightedEvent.newsSlug ? (
              <Link
                href={`/news#${highlightedEvent.newsSlug}`}
                className="home-hero__floating-card home-hero__floating-card--link"
              >
                <p>Latest result</p>
                <h2>{highlightedEvent.result}</h2>
                <span>
                  {highlightedEvent.event} / {highlightedEvent.location}
                </span>
              </Link>
            ) : (
              <div className="home-hero__floating-card">
                <p>Latest result</p>
                <h2>{highlightedEvent.result}</h2>
                <span>
                  {highlightedEvent.event} / {highlightedEvent.location}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="site-container metric-strip">
          {heroMetrics.map((metric) => (
            <div key={metric.label} className="metric-strip__item">
              <p>{metric.value}</p>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sponsor-rail">
        <div className="site-container sponsor-rail__inner">
          <p>Backed by</p>
          <div className="sponsor-rail__logos">
            {sponsorTiers
              .flatMap((tier) => tier.sponsors)
              .map((sponsor) => (
                <Link
                  key={sponsor.name}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-rail__logo-card"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.logoAlt}
                    width={sponsor.logoWidth}
                    height={sponsor.logoHeight}
                    style={{
                      width: "auto",
                      height: sponsor.logoDisplayHeight ?? "46px",
                      maxWidth: sponsor.logoMaxWidth ?? "180px",
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <section id="news" className="site-section site-section--deep">
        <div className="site-container">
          <SectionIntro
            eyebrow="News"
            title={
              <>
                Recent <span>news</span>
              </>
            }
            description="The latest updates from the team."
            action={
              <LinkButton href="/news" label="All news" variant="inline" />
            }
          />
          <div className="news-preview-grid">
            {latestNews.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="site-section">
        <div className="site-container home-team">
          <div className="home-team__photos">
            {homePhotos.team.map((photo, index) => (
              <figure
                key={photo.alt}
                className={`home-team__media${
                  index === 0 ? " home-team__media--lead" : ""
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 24vw"
                  className="home-team__image"
                />
              </figure>
            ))}
          </div>
          <div className="home-team__content">
            <SectionIntro
              eyebrow="Team"
              title={
                <>
                  The <span>team</span>
                </>
              }
              description="whIRLwind is run by bachelor and master students at the University of Amsterdam. We come from computer science and AI backgrounds, and spend our spare time programming humanoid robots to compete in RoboCup. No prior robotics experience required, just curiosity and the drive to make robots walk, see, and play football."
              compact
            />
            <div className="home-team__actions">
              <LinkButton href="/contact" label="Join us" variant="primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container team-showcase">
          <div className="team-showcase__intro">
            <SectionIntro
              eyebrow="The goal"
              title={
                <>
                  The <span>2050</span> goal
                </>
              }
              description="RoboCup's goal: by 2050, a team of humanoid robots that can beat the human football world champions."
              compact
            />
            <div className="team-showcase__photos">
              <figure className="media-panel media-panel--wide">
                <Image
                  src={homePhotos.supportA.src}
                  alt={homePhotos.supportA.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 28vw"
                  className="media-panel__image"
                />
              </figure>
              <figure className="media-panel media-panel--tall">
                <Image
                  src={homePhotos.supportB.src}
                  alt={homePhotos.supportB.alt}
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 20vw"
                  className="media-panel__image"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section site-section--deep">
        <div className="site-container">
          <SectionIntro
            eyebrow="Research"
            title={
              <>
                Papers, reports,
                <br />
                and <span>technical notes</span>
              </>
            }
            description="Qualification papers, team reports, and student theses."
            action={
              <LinkButton
                href="/publications"
                label="Full archive"
                variant="inline"
              />
            }
          />

          <div className="publication-preview-grid">
            {latestPublications.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                compact
              />
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container">
          <SectionIntro
            eyebrow="Sponsors"
            title={<>Who supports us</>}
            description="Robots, travel, and tooling are expensive. These organisations help cover it."
            action={
              <LinkButton
                href="/sponsors"
                label="Sponsor page"
                variant="inline"
              />
            }
          />

          <div className="sponsor-tier-grid">
            {sponsorTiers.map((tier) => (
              <section key={tier.name} className="tier-block">
                <div className="tier-block__heading">
                  <p>{tier.name}</p>
                  <span>{tier.description}</span>
                </div>
                <div className="tier-block__cards">
                  {tier.sponsors.map((sponsor) => (
                    <SponsorCard key={sponsor.name} sponsor={sponsor} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section">
        <div className="site-container contact-banner">
          <div>
            <span className="section-intro__eyebrow">Contact</span>
            <h2 className="contact-banner__title">
              Get in <span>touch.</span>
            </h2>
            <p className="contact-banner__description">
              Partnerships, research, demos, press. Email us.
            </p>
          </div>
          <div className="contact-banner__actions">
            <a
              href={`mailto:${siteContact.email}`}
              className="link-button link-button--primary"
            >
              <span className="link-button__label">{siteContact.email}</span>
            </a>
            <LinkButton
              href="/contact"
              label="Contact page"
              variant="secondary"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
