import Image from "next/image";

import logoSingle from "@/assets/logo_single.svg";

export default function Home() {
  return (
    <section
      className="hero-like relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-8 sm:px-10 lg:px-12 xl:px-4"
      aria-label="Hero"
    >
      <div className="hero-backdrop" aria-hidden />

      <div className="wind-particles" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="wind-particle" />
        ))}
      </div>

      <div className="hero-container">
        <Image
          src={logoSingle}
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
        <p className="tagline max-w-[700px]">
          University of Amsterdam · Intelligent Robotics Lab.
        </p>

        <div className="mt-[0.6rem] flex justify-center gap-3">
          <a className="btn hero" href="/publications">
            Explore Publications
          </a>
        </div>
        <div className="mt-[0.6rem] text-[0.9rem] text-(--ink-muted)">
          more coming soon
        </div>
      </div>
    </section>
  );
}
