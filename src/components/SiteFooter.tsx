import FooterCrest from "./FooterCrest";
import Name from "./Name";
import { siteContact, socialChannels, sponsors } from "@/lib/site-content";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <FooterCrest />
      <div className="container footer__inner">
        <div className="footer__col">
          <p className="t-body">
            <Name /> is the humanoid robotics team of the Intelligent Robotics
            Lab, University of Amsterdam.
          </p>
          <div className="sponsors">
            <span className="t-meta">Supported by</span>
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                className="sponsor"
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={sponsor.name}
                style={{
                  ["--logo" as string]: `url(${sponsor.logo.src})`,
                  aspectRatio: `${sponsor.logoWidth} / ${sponsor.logoHeight}`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="footer__col t-body">
          {socialChannels.map((channel) => (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {channel.name}
            </a>
          ))}
        </div>

        <div className="footer__col t-body">
          <address>
            {siteContact.addressLines.map((line) => (
              <span key={line} style={{ display: "block" }}>
                {line}
              </span>
            ))}
          </address>
          <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
        </div>
      </div>
    </footer>
  );
}
