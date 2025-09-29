import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsors — Team whIRLwind",
  description: "Our generous sponsors.",
};

const sponsors = new Array(8).fill(0).map((_, i) => ({
  id: i + 1,
  name: `Sponsor ${String.fromCharCode(65 + i)}`,
}));

export default function SponsorsPage() {
  return (
    <section className="page">
      <div className="container">
        <h1>Sponsors</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          bibendum, eros non ultricies aliquet, lorem arcu tempor lorem, vitae
          dictum arcu mi non eros.
        </p>

        <div className="grid">
          {sponsors.map((s) => (
            <div
              key={s.id}
              className="panel"
              style={{ textAlign: "center", padding: "2rem 1rem" }}
            >
              <div
                style={{
                  width: "100%",
                  height: 90,
                  borderRadius: 12,
                  border: "1px dashed rgba(251,146,60,.35)",
                  display: "grid",
                  placeItems: "center",
                  background:
                    "linear-gradient(180deg, rgba(27,39,66,.3), rgba(27,39,66,.1))",
                }}
                aria-label={`${s.name} placeholder`}
              >
                <span style={{ fontWeight: 700, color: "var(--ink-dim)" }}>
                  {s.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
