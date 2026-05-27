import type { Metadata } from "next";
import PageHero from "@/components/site/PageHero";
import NewsPost from "@/components/site/NewsPost";
import LinkButton from "@/components/LinkButton";
import { getAllNewsPosts } from "@/lib/news/news";

export const metadata: Metadata = {
  title: "News | Team whIRLwind",
  description: "Short updates from Team whIRLwind: competitions, robots, releases, and more.",
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
        eyebrow="What's new"
        title={
          <>
            Updates from the
            <br />
            <span>workshop floor.</span>
          </>
        }
        description="Short notes on competitions, robot builds, and releases."
        metrics={[
          { label: "Posts", value: `${posts.length}` },
          {
            label: "Latest update",
            value: latest ? formatDate(latest.date) : "None",
          },
        ]}
        actions={
          <LinkButton href="/contact" label="Get in touch" variant="secondary" />
        }
        aside={
          <div className="page-note">
            <p>Feed</p>
            <h2>Everything in one place, newest first.</h2>
            <span>Posted by team members straight from the repo.</span>
          </div>
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
