import type { Metadata } from "next";
import Image from "next/image";
import LinkButton from "@/components/LinkButton";
import PageHero from "@/components/site/PageHero";
import PhotoCollage from "@/components/site/PhotoCollage";
import SocialCard from "@/components/site/SocialCard";
import {
  homePhotos,
  socialChannels,
  socialCollagePhotos,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Socials | Team whIRLwind",
  description: "Follow Team whIRLwind on our social media channels.",
};

export default function SocialsPage() {
  return (
    <div className="page-shell">
      <PageHero
        eyebrow="Social channels"
        title={
          <>
            Match trips,
            <br />
            build days, and <span>lab updates.</span>
          </>
        }
        description="Follow the team across the channels where we share competition travel, demos, progress, and the code orbiting the project."
        metrics={[
          { label: "Channels", value: `${socialChannels.length}` },
          { label: "Photo archive", value: `${socialCollagePhotos.length}` },
          { label: "Base", value: "UvA IRL" },
        ]}
        actions={
          <LinkButton href="/contact" label="Reach the team" variant="secondary" />
        }
        aside={
          <figure className="page-hero__photo">
            <Image
              src={homePhotos.supportA.src}
              alt={homePhotos.supportA.alt}
              fill
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 28vw"
              className="media-panel__image"
            />
          </figure>
        }
      />

      <section className="site-section site-section--tight-top">
        <div className="site-container social-grid social-grid--page">
          {socialChannels.map((channel) => (
            <SocialCard key={channel.name} channel={channel} />
          ))}
        </div>
      </section>

      <section className="site-section site-section--deep">
        <div className="site-container">
          <PhotoCollage photos={socialCollagePhotos} variant="gallery" />
        </div>
      </section>
    </div>
  );
}
