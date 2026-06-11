import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import NewsPost from "@/components/site/NewsPost";
import { getAllNewsPosts, getNewsPostBySlug } from "@/lib/news/news";

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

  if (!post) {
    return { title: "News | Team whIRLwind" };
  }

  return {
    title: `${post.title} | Team whIRLwind`,
    description: post.summary,
  };
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="page-shell">
      <section className="site-section site-section--deep">
        <div className="site-container news-detail">
          <Link href="/news" className="news-detail__back">
            ← All news
          </Link>
          <NewsPost post={post} />
        </div>
      </section>
    </div>
  );
}
