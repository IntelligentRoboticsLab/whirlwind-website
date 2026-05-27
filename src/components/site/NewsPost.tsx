import Image from "next/image";
import type { NewsPost as NewsPostData } from "@/lib/news/news";

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
      <p className="news-post__summary">{post.summary}</p>

      {post.coverImage ? (
        <div className="news-post__cover">
          <Image
            src={post.coverImage}
            alt=""
            width={1280}
            height={720}
            sizes="(max-width: 900px) 100vw, 720px"
          />
        </div>
      ) : null}

      <div
        className="news-post__body"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

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
