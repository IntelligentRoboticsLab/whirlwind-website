export default function Home() {
  return (
    <section className="center hero-like" aria-label="Hero">
      <div className="hero-backdrop" aria-hidden />

      <div className="hero-container">
        <div className="headline-row">
          <h1 className="headline plain">
            team wh<span className="irl-text">irl</span>wind
          </h1>
          <img
            src="/logo-temp.svg"
            alt="Whirlwind Robotics logo"
            className="logo-hero"
          />
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
