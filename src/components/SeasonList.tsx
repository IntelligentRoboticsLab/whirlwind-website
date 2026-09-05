import Link from "next/link";

import type { ArtworkName } from "@/lib/artwork";
import type { Season } from "@/lib/seasons";
import Opener from "./Opener";
import Placing from "./Placing";

// One season: heading, then every competition as a row (date, "event, city",
// result), newest first, with the next fixture on top carrying the orange bar
// and its dates in the result column (DESIGN.md, section 9). On the home page
// the current season's heading is an opener with a render in it.
export default function SeasonList({
  season,
  headingLevel = 2,
  artwork,
  at = 70,
}: {
  season: Season;
  headingLevel?: 2 | 3;
  artwork?: ArtworkName;
  at?: number;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <section className="season" aria-labelledby={`season-${season.id}`}>
      {artwork ? (
        <Opener
          id={`season-${season.id}`}
          title={season.label}
          artwork={artwork}
          at={at}
          level={headingLevel}
        />
      ) : (
        <Heading
          id={`season-${season.id}`}
          className={headingLevel === 2 ? "t-heading" : "t-subheading"}
        >
          {season.label}
        </Heading>
      )}
      <ol className="results">
        {season.competitions.map((c) => (
          <li
            key={c.id}
            className={c.upcoming ? "result result--next is-next" : "result"}
          >
            <span className="t-meta">{c.dateLabel}</span>
            <span>
              {c.newsSlug ? (
                <Link href={`/news/${c.newsSlug}`}>{c.name}</Link>
              ) : (
                c.name
              )}
              , {c.place}
            </span>
            {c.upcoming ? (
              <span className="result__place result__place--word">
                {c.dates ?? "Next"}
              </span>
            ) : c.placing ? (
              <Placing figure={c.placing.figure} word={c.placing.word} />
            ) : (
              <span className="result__place t-meta">Result to be added</span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
