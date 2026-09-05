import Link from "next/link";

import Lineup from "@/components/Lineup";
import Opener from "@/components/Opener";
import Name from "@/components/Name";
import NewsRow from "@/components/NewsRow";
import SeasonList from "@/components/SeasonList";
import { getAllNewsPosts } from "@/lib/news/news";
import { latestReport, seasons } from "@/lib/seasons";

export default async function Home() {
  const latestNews = (await getAllNewsPosts()).slice(0, 3);
  const report = latestReport();

  return (
    <div className="page page--home">
      <section aria-label="Introduction" className="section">
        <Lineup />
        <div className="container lineup-text">
          <h1 className="t-lede">
            <Name /> is the humanoid robotics team of the Intelligent Robotics
            Lab at the University of Amsterdam. We play in the RoboCup Humanoid
            Soccer League.
          </h1>
          {report?.newsSlug ? (
            <p className="t-body">
              <Link href={`/news/${report.newsSlug}`}>
                Read the latest news
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <section className="container section" aria-label="Seasons">
        {seasons.map((season, i) => (
          <SeasonList
            key={season.id}
            season={season}
            artwork={i === 0 ? "k1-keeper-step" : undefined}
            at={72}
          />
        ))}
      </section>

      <section className="container section" aria-labelledby="news-heading">
        <Opener
          id="news-heading"
          title="News"
          artwork="k1-kick-follow"
          at={38}
          aside={<Link href="/news">All news</Link>}
        />
        <div className="news">
          {latestNews.map((post) => (
            <NewsRow key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
