import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Socials — Team whIRLwind",
  description: "Find us on social platforms.",
};

const socials = [
  { name: "Twitter/X", url: "#", handle: "@whirlwind", emoji: "🐦" },
  { name: "LinkedIn", url: "#", handle: "whirlwind", emoji: "💼" },
  { name: "YouTube", url: "#", handle: "whirlwind", emoji: "▶️" },
  { name: "Instagram", url: "#", handle: "@whirlwind", emoji: "📸" },
  { name: "GitHub", url: "#", handle: "whirlwind", emoji: "🐙" },
];

export default function SocialsPage() {
  return (
    <section className="page">
      <div className="container">
        <h1>Socials</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          blandit tristique risus, sed cursus lorem hendrerit at.
        </p>

        <div className="grid">
          {socials.map((s) => (
            <article key={s.name} className="card" aria-label={s.name}>
              <h3>
                <span aria-hidden> {s.emoji} </span> {s.name}
              </h3>
              <p className="meta">{s.handle}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="actions">
                <Link
                  href={s.url}
                  className="btn"
                  aria-label={`Open ${s.name}`}
                >
                  Visit
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
