import Image from "next/image";
import Link from "next/link";

import LinkButton from "@/components/LinkButton";
import NewsCard from "@/components/site/NewsCard";
import SectionIntro from "@/components/site/SectionIntro";
import {
  highlightedEvent,
  homePhotos,
  sponsorTiers,
} from "@/lib/site-content";
import { getAllNewsPosts } from "@/lib/news/news";

export default async function Home() {
  const latestNews = (await getAllNewsPosts()).slice(0, 4);

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="site-container home-hero__grid">
          <div className="home-hero__content">
            <h1 className="home-hero__title">
              Teaching robots
              <br />
              to play football
            </h1>
            <p className="home-hero__description">
              whIRLwind is the humanoid robotics team at the University of
              Amsterdam.
            </p>
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

      <section id="team" className="site-section site-section--deep">
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
            <SectionIntro title={<>The team</>} compact />
            <div className="home-team__copy">
              <p className="section-intro__description">
                whIRLwind is run by bachelor and master students at the
                University of Amsterdam. We come from computer science and AI
                backgrounds, and spend our spare time programming humanoid
                robots to compete in RoboCup.
              </p>
              <p className="section-intro__description">
                If you&apos;re interested in joining us on the field don&apos;t
                hesitate to send us a message! No prior robotics experience is
                required, just curiosity and the drive to make robots walk, see,
                and play football.
              </p>
            </div>
            <div className="home-team__actions">
              <LinkButton href="/contact" label="Join us" variant="primary" />
            </div>
          </div>
        </div>
      </section>

      <section id="news" className="site-section">
        <div className="site-container">
          <SectionIntro
            title={
              <>
                Recent news
              </>
            }
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
    </div>
  );
}
