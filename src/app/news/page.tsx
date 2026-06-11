import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import NewsPost from "@/components/site/NewsPost";
import { getAllNewsPosts } from "@/lib/news/news";

export const metadata: Metadata = {
  title: "News | Team whIRLwind",
  description:
    "Short updates from Team whIRLwind on competitions, robots, and releases.",
};

export default async function NewsPage() {
  const posts = await getAllNewsPosts();

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="News"
        title={<>Recent posts</>}
        description="Updates from the team on competitions, events, and research."
      />

      <section className="site-section site-section--deep site-section--tight-top">
        <div className="site-container news-feed">
          {posts.length === 0 ? (
            <p className="news-feed__empty">No news yet.</p>
          ) : (
            posts.map((post) => <NewsPost key={post.slug} post={post} />)
          )}
        </div>
      </section>
    </div>
  );
}
