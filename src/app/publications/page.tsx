import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Publications — Team whIRLwind",
  description: "Selected papers and preprints by Team whIRLwind.",
};

const pubs = new Array(10).fill(0).map((_, i) => ({
  id: i + 1,
  title: `Towards Reliable Mobile Manipulation ${i + 1}`,
  authors: "A. Ipsum, B. Dolor, C. Sit",
  venue: i % 2 ? "ICRA" : "IROS",
  year: 2025 - (i % 3),
}));

export default function PublicationsPage() {
  return (
    <section className="page">
      <div className="container">
        <h1>Publications</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          ultrices, sapien id dignissim pulvinar, magna urna placerat velit,
          vitae luctus lorem nibh et nibh.
        </p>

        <div className="pub-grid">
          {pubs.map((p) => (
            <article key={p.id} className="pub-item" aria-label={p.title}>
              <div className="pub-body">
                <h3 className="pub-title">{p.title}</h3>
                <p className="pub-sub">{p.authors}</p>
                <p className="pub-meta">
                  {p.venue} · {p.year}
                </p>
              </div>
              <div className="pub-actions">
                <Link href="#" className="pub-link" aria-label="Open PDF">
                  PDF
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
