import Image from "next/image";
import Link from "next/link";
import type { NewsPost as NewsPostData } from "@/lib/news/news";

type NewsCardProps = {
  post: NewsPostData;
};

function formatDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(parsed);
}

export default function NewsCard({ post }: NewsCardProps) {
  return (
    <Link href={`/news#${post.slug}`} className="news-card">
      {post.coverImage ? (
        <figure className="news-card__cover">
          <Image
            src={post.coverImage}
            alt=""
            fill
            placeholder="blur"
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="news-card__image"
          />
        </figure>
      ) : null}

      <div className="news-card__body">
        <time className="news-card__date" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <h3 className="news-card__title">{post.title}</h3>
        <p className="news-card__summary">{post.summary}</p>
      </div>
    </Link>
  );
}
