import Image from "next/image";
import Link from "next/link";

import type { SocialChannel } from "@/lib/site-content";
import SiteIcon from "./SiteIcon";

type SocialCardProps = {
  channel: SocialChannel;
};

export default function SocialCard({ channel }: SocialCardProps) {
  return (
    <Link
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="social-card"
      aria-label={`Open ${channel.name}`}
    >
      <div className="social-card__header">
        <Image
          src={channel.logo}
          alt={channel.logoAlt}
          width={42}
          height={42}
          className="social-card__logo"
        />
        <div>
          <h3>{channel.name}</h3>
          {channel.handle ? <p>{channel.handle}</p> : null}
        </div>
      </div>
      <p className="social-card__description">{channel.description}</p>
      <span className="social-card__cta">
        <span>Visit channel</span>
        <SiteIcon name="arrow-up-right" size={16} />
      </span>
    </Link>
  );
}
