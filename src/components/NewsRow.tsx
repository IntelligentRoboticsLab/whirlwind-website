import Image from "next/image";
import Link from "next/link";

import type { NewsPost } from "@/lib/news/news";
import { formatDate } from "@/lib/format";
import { withName } from "@/lib/name";

// A news item is a row, not a card: photo left, then date, title, summary.
export default function NewsRow({ post }: { post: NewsPost }) {
  return (
    <article className="news-row">
      {post.coverImage ? (
        <Link href={`/news/${post.slug}`} className="title-link" aria-hidden tabIndex={-1}>
          <Image
            src={post.coverImage}
            alt=""
            sizes="(max-width: 64rem) 100vw, 33vw"
            placeholder="blur"
          />
        </Link>
      ) : (
        <span />
      )}
      <div className="news-row__body">
        <time className="t-meta" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
        <h3 className="t-subheading">
          <Link href={`/news/${post.slug}`} className="title-link">
            {withName(post.title)}
          </Link>
        </h3>
        <p className="t-body">{withName(post.summary)}</p>
      </div>
    </article>
  );
}
