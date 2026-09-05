import type { Metadata } from "next";
import Link from "next/link";

import Name from "@/components/Name";
import Opener from "@/components/Opener";
import { socialChannels } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Team",
  description: "Who whIRLwind is, how to join, and where to follow the team.",
};

export default function TeamPage() {
  return (
    <div className="page">
      <section className="container opening" aria-label="Introduction">
        <div className="opening__text">
          <h1 className="t-title">Team</h1>
          <p className="t-lede">
            <Name /> is a team of students from the University of Amsterdam dedicated to pushing the boundaries of robotics and AI, and one of the top teams in the RoboCup Humanoid Soccer League's middle-sized division. We program humanoid robots to compete in fully autonomous robot football competitions globally, with a history going back to 2008. As part of the Intelligent Robotics Lab (IRL) we publish novel research related to our progress, provide workshops for students, and participate in educational events or conferences. One goal at a time, we try to bring the world closer to the shared RoboCup goal of humanoid robots defeating the top football team in 2050!
          </p>
          <p className="t-body">
            Want to join? <Link href="/contact">Send us a message</Link>. You
            don&apos;t need any robotics experience; most of us started without
            it.
          </p>
        </div>
      </section>

      <section className="container section" aria-labelledby="follow-heading">
        <Opener
          id="follow-heading"
          title="Follow along"
          artwork="k1-kick-windup"
          at={80}
          second={{ artwork: "k1-walk-stride", at: 30 }}
        />
        <p className="t-body">
          We post from competitions, demos and the lab. The code is on GitHub.
        </p>
        <ul className="stack stack--tight t-body channels">
          {socialChannels.map((channel) => (
            <li key={channel.name} className="channel">
              <span
                className="channel__logo"
                aria-hidden="true"
                style={{ ["--logo" as string]: `url(${channel.logo.src})` }}
              />
              <span>
                <a href={channel.url} target="_blank" rel="noopener noreferrer">
                  {channel.name}
                </a>
                {channel.handle ? (
                  <span className="t-meta"> {channel.handle}</span>
                ) : null}{" "}
                <span>{channel.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
