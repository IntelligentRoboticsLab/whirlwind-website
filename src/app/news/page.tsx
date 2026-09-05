import type { Metadata } from "next";

import NewsRow from "@/components/NewsRow";
import Opener from "@/components/Opener";
import { getAllNewsPosts } from "@/lib/news/news";
import { seasonOf, type Season } from "@/lib/seasons";

export const metadata: Metadata = {
  title: "News",
  description: "Match and competition reports, demos, and visits",
};

export default async function NewsPage() {
  const posts = await getAllNewsPosts();

  // Group by season, newest season first (posts are already newest first).
  const groups: { season: Season; posts: typeof posts }[] = [];
  for (const post of posts) {
    const season = seasonOf(post.date);
    const group = groups.find((g) => g.season.id === season.id);
    if (group) group.posts.push(post);
    else groups.push({ season, posts: [post] });
  }

  return (
    <div className="page">
      <div className="container section-head">
        <h1 className="t-title">News</h1>
        <p className="t-lede">Match and competition reports, demos, and visits. We'll do our best to keep you updated on all the latest developments.</p>
      </div>

      {groups.length === 0 ? (
        <p className="container t-body">No news yet.</p>
      ) : (
        groups.map(({ season, posts }, i) => (
          <section
            key={season.id}
            className="container section"
            aria-labelledby={`news-${season.id}`}
          >
            {/* the newest season opens with a render standing on its rule */}
            {i === 0 ? (
              <Opener
                id={`news-${season.id}`}
                title={season.label}
                artwork="k1-walk-swing"
                at={56}
              />
            ) : (
              <h2 id={`news-${season.id}`} className="t-heading">
                {season.label}
              </h2>
            )}
            <div className="news">
              {posts.map((post) => (
                <NewsRow key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
