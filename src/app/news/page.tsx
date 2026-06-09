import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import NewsPost from "@/components/site/NewsPost";
import LinkButton from "@/components/LinkButton";
import { getAllNewsPosts } from "@/lib/news/news";

export const metadata: Metadata = {
  title: "News | Team whIRLwind",
  description:
    "Short updates from Team whIRLwind on competitions, robots, and releases.",
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

export default async function NewsPage() {
  const posts = await getAllNewsPosts();
  const latest = posts[0];

  return (
    <div className="page-shell">
      <PageHero
        eyebrow="News"
        title={<>Recent posts.</>}
        description="Updates from the team on competitions, events, and research."
        metrics={[{ label: "Posts", value: `${posts.length}` }]}
        aside={
          latest ? (
            <div className="page-note">
              <p>Latest</p>
              <h2>{latest.title}</h2>
              <span>{formatDate(latest.date)}</span>
            </div>
          ) : null
        }
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
