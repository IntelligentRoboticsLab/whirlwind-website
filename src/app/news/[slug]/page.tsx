import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Figure from "@/components/Figure";
import MetaLine from "@/components/MetaLine";
import PhotoGrid from "@/components/PhotoGrid";
import ResultsBlock from "@/components/ResultsBlock";
import { formatDate } from "@/lib/format";
import { withName } from "@/lib/name";
import { getAllNewsPosts, getNewsPostBySlug } from "@/lib/news/news";
import { competitionForNews } from "@/lib/seasons";

type NewsPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllNewsPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: NewsPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) return { title: "News" };
  return { title: post.title, description: post.summary };
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) notFound();

  const competition = competitionForNews(slug);

  return (
    <div className="page">
      <article className="container news-post" id={post.slug}>
        <header className="news-post__head">
          <p className="t-meta">
            <Link href="/news">News</Link>
          </p>
          <h1 className="t-title">{withName(post.title)}</h1>
          <MetaLine
            items={[
              <time key="date" dateTime={post.date}>
                {formatDate(post.date)}
              </time>,
              competition ? competition.place : null,
              post.author ? withName(post.author) : null,
            ]}
          />
        </header>

        {post.coverImage ? (
          <Figure
            src={post.coverImage}
            alt={post.coverCaption ?? ""}
            caption={post.coverCaption}
            credit={post.coverCredit}
            sizes="(max-width: 72rem) 100vw, 1152px"
            priority
          />
        ) : null}

        <div
          className="prose t-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {competition ? <ResultsBlock competition={competition} /> : null}

        {post.gallery?.length ? (
          <PhotoGrid photos={post.gallery} captions />
        ) : null}

        {post.tags?.length ? (
          <p className="t-meta">Tags: {post.tags.join(", ")}</p>
        ) : null}
      </article>
    </div>
  );
}
