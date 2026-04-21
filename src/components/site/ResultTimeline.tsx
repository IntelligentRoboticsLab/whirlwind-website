import type { SiteEvent } from "@/lib/site-content";
import SiteIcon from "./SiteIcon";

type ResultTimelineProps = {
  results: SiteEvent[];
};

export default function ResultTimeline({ results }: ResultTimelineProps) {
  return (
    <div className="result-timeline">
      {results.map((result) => (
        <article
          key={result.id}
          className={`result-card${result.highlight ? " result-card--highlight" : ""}`}
        >
          <p className="result-card__date">{result.dateLabel}</p>
          <div className="result-card__main">
            <h3>{result.event}</h3>
            <p>{result.detail}</p>
          </div>
          <p className="result-card__location">
            <SiteIcon name="pin" size={16} />
            <span>{result.location}</span>
          </p>
          <p className="result-card__result">{result.result}</p>
        </article>
      ))}
    </div>
  );
}
