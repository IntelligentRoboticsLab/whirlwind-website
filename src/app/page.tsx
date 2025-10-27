import Image from "next/image";

export default function Home() {
  return (
    <section className="center hero-like" aria-label="Hero">
      <div className="hero-backdrop" aria-hidden />

      <div className="wind-particles" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="wind-particle" />
        ))}
      </div>

      <div className="hero-container">
        <Image
          src="/logo_single.svg"
          width={160}
          height={160}
          alt="Whirlwind Robotics logo"
          className="logo-hero"
        />
        <div className="headline-row">
          <h1 className="headline plain">
            amsterdam wh
            <span className="irl-text">irl</span>
            wind
          </h1>
        </div>
        <p className="team">
          Your local artificially intelligent robotics team
        </p>
        <p className="tagline max-700">
          University of Amsterdam · Intelligent Robotics Lab.
        </p>

        <div className="cta-row">
          <a className="btn hero" href="/publications">
            Explore Publications
          </a>
        </div>
        <div className="hero-note">more coming soon</div>
      </div>
    </section>
  );
}
