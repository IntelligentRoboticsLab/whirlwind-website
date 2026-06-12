import Image from "next/image";
import type { NewsPost as NewsPostData } from "@/lib/news/news";
import NewsGallery from "./NewsGallery";

type NewsPostProps = {
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

export default function NewsPost({ post }: NewsPostProps) {
  return (
    <article className="news-post" id={post.slug}>
      <div className="news-post__meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.author ? <span>{post.author}</span> : null}
      </div>

      <h2 className="news-post__title">{post.title}</h2>

      {post.coverImage ? (
        <figure className="news-post__cover">
          <Image
            src={post.coverImage}
            alt=""
            sizes="(max-width: 1180px) 100vw, 1108px"
            quality={85}
          />
          {post.coverCredit ? (
            <figcaption className="news-post__cover-credit">
              {post.coverCredit}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <div
        className="news-post__body"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {post.gallery?.length ? <NewsGallery images={post.gallery} /> : null}

      {post.tags?.length ? (
        <div className="news-post__tags">
          {post.tags.map((tag) => (
            <span key={`${post.slug}-${tag}`}>{tag}</span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
