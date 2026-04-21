import Link from "next/link";

import type { IPublication } from "@/lib/publications/publication";
import { formatPublicationType } from "@/lib/publications/helpers";

import BibtexButton from "@/components/BibtexButton";
import PdfButton from "@/components/PdfButton";

type PublicationCardProps = {
  publication: IPublication;
  compact?: boolean;
};

function formatDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(parsedDate);
}

export default function PublicationCard({
  publication,
  compact = false,
}: PublicationCardProps) {
  const rawTags = [publication.type, ...publication.tags].filter(
    (tag): tag is string => Boolean(tag),
  );
  const tags = Array.from(
    new Set(
      rawTags
        .map((tag) => formatPublicationType(tag))
        .filter((tag) => Boolean(tag)),
    ),
  );
  const isExternal = publication.file.startsWith("http");

  return (
    <article
      className={`publication-card${compact ? " publication-card--compact" : ""}`}
    >
      <div className="publication-card__meta">
        <span>{formatDate(publication.date)}</span>
        <span>{publication.year}</span>
      </div>

      <div className="publication-card__body">
        <Link
          href={publication.file}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="publication-card__title"
        >
          {publication.title}
        </Link>
        <p className="publication-card__authors">
          {publication.authors.join(", ")}
        </p>

        {tags.length ? (
          <div className="publication-card__tags">
            {tags.map((tag) => (
              <span key={`${publication.id}-${tag}`}>{tag}</span>
            ))}
          </div>
        ) : null}

        <div className="publication-card__actions">
          <PdfButton publication={publication} />
          <BibtexButton publication={publication} />
        </div>
      </div>
    </article>
  );
}
